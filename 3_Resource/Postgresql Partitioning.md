---
title: Postgresql Partitioning
aliases: 
classification: db
tags:
  - postgresql
  - partitioning
created: 2024-05-24 11:20
updated: 2025-01-18T20:16
---

### 기존 테이블 파티셔닝 방법

프로시저 생성

```sql
create function fn_insert_ship_data_v2() returns trigger  
    language plpgsql  
as  
$$  
--변수선언  
DECLARE  
partition_month TEXT;  
partition_month_date TEXT;  
partition_next_month_date TEXT;  
partition TEXT;  
  
--로직 시작  
BEGIN  
  
--파티션 변수 Setpartition_month := to_char(NEW.AIS_LOCATION_RCV_DT,'YYYYMM');  
partition_month_date := to_char(NEW.AIS_LOCATION_RCV_DT,'YYYY-MM');  
partition_next_month_date:= to_char(NEW.AIS_LOCATION_RCV_DT+'1 month','YYYY-MM');  
partition := TG_RELNAME || '_' || partition_month;  
  
--테이블 미 존재 시  
IF NOT EXISTS(SELECT relname FROM pg_class WHERE relname=partition) THEN  
RAISE NOTICE 'A partition has been created %',partition;  
  
--테이블 생성  
EXECUTE 'CREATE TABLE IF NOT EXISTS ' || 'ship_data_v2.'|| partition||  
        '( CONSTRAINT th_ship_data_v2_'||partition||'_pkey PRIMARY KEY (timestamp, mmsi, imo_no),  
           CONSTRAINT th_ship_data_v2_'||partition||'_ais_location_rcv_dt_check CHECK(ais_location_rcv_dt >= ''' || partition_month_date ||'-01 00:00:00'||'''  
         AND ais_location_rcv_dt<'''|| partition_next_month_date ||'-01 00:00:00'||'''))  
         INHERITS (seavantage.'|| TG_RELNAME || ')  
         WITH(             OIDS = FALSE         )         TABLESPACE pg_default;';  
  
--인덱스 생성  
EXECUTE 'CREATE INDEX IF NOT EXISTS '||partition||'_imo_timestamp_idx  
        ON ship_data_v2.'||partition||' USING btree'||'  
        (imo_no COLLATE pg_catalog."default" ASC NULLS LAST, "timestamp" ASC NULLS LAST)        TABLESPACE pg_default;';  
  
EXECUTE 'CREATE INDEX IF NOT EXISTS '||partition||'_timestamp_idx'||'  
        ON ship_data_v2.'||partition||' USING btree'||'  
        ("timestamp" ASC NULLS LAST)'||'  
        TABLESPACE pg_default;';  
  
EXECUTE 'CREATE INDEX IF NOT EXISTS '||partition||'_ais_location_rcv_dt_idx'||'  
        ON ship_data_v2.'||partition||' USING btree'||'  
        (ais_location_rcv_dt ASC NULLS LAST)'||'  
        TABLESPACE pg_default;';  
  
END IF;  
  
--테이블에 데이터 삽입  
EXECUTE format('INSERT INTO ship_data_v2.th_ship_data_v2_%s SELECT $1.* ON CONFLICT(timestamp, imo_no, mmsi) DO NOTHING',  to_char(new.ais_location_rcv_dt, 'YYYYMM')) using new;  
  
RETURN NULL;  
END;  
$$;  
  
alter function fn_insert_ship_data_v2() owner to postgres;
```

트리거 생성

```sql
-- auto-generated definition
create trigger trigger_ship_data_insert_v2
    before insert
    on th_ship_data_v2
    for each row
execute procedure fn_insert_ship_data_v2();
```

스키마 생성

```sql
create schema ship_data_v2;
```

테이블 생성

```sql
create table th_ship_data_v2  
(  
    timestamp                    timestamp   not null,  
    imo_no                       varchar(20) not null,  
    mmsi                         varchar(20) not null,  
    mmsi_process                 varchar(20),  
    mmsi_origin                  varchar(10),  
    imono_origin                 varchar(10),  
    position_process_status_type varchar(10),  
    static_process_status_type   varchar(10),  
    mapping_process_status_type  varchar(10),  
    cluster_total_count          integer,  
    device_type      w            varchar(36),  
    call_sign                    varchar(7),  
    ship_nm                      varchar(36),  
    ais_ship_type                smallint,  
    ais_dim_a                    smallint,  
    ais_dim_b                    smallint,  
    ais_dim_c                    smallint,  
    ais_dim_d                    smallint,  
    ais_eta                      varchar(8),  
    ais_destination              varchar(32),  
    ais_static_rcv_dt            timestamp,  
    ais_location_rcv_dt          timestamp,  
    ais_class                    char,  
    nvg_status                   smallint,  
    rot                          real,  
    sog                          real,  
    pos_accrcy                   smallint,  
    longitude                    numeric(12, 8),  
    latitude                     numeric(12, 8),  
    cog                          real,  
    heading                      smallint,  
    ais_max_draught              smallint,  
    ais_source                   varchar(36),  
    elapsed                      integer,  
    utc_second                   smallint,  
    dte                          smallint,  
    special_maneuver_indicator   char,  
    raim_flag                    char,  
    static_message_no            smallint,  
    location_message_no          smallint,  
    static_raw_id                uuid,  
    location_raw_id              uuid,  
    valid_ship_code              varchar(36),  
    cluster_total                integer,  
    cluster_count                integer,  
    primary key (timestamp, imo_no, mmsi)  
);  
  
alter table th_ship_data_v2  
    owner to postgres;  
  
create index th_ship_data_v2_imono_origin_idx  
    on th_ship_data_v2 (imono_origin, mmsi_origin, mmsi_process, timestamp);  
  
create index th_ship_data_v2_timestamp_status_type_idx  
    on th_ship_data_v2 (timestamp, position_process_status_type)  
    where ((position_process_status_type)::text = ANY  
           (ARRAY [('02'::character varying)::text, ('03'::character varying)::text, ('04'::character varying)::text]));  
  
create index idx_th_ship_data_v2_process_status  
    on th_ship_data_v2 (position_process_status_type);  
  
create index idx_th_ship_data_v2_imo_no  
    on th_ship_data_v2 (imo_no);
```

### Portgresql 에서 권장하는 테이블 파티셔닝 방법

`PARTITION BY`를 사용하는 방법

원본 테이블 생성

```sql
CREATE TABLE seavantage.monthly_sales (  
    id SERIAL,  
    sale_date DATE NOT NULL,  
    amount DECIMAL,  
    PRIMARY KEY (id, sale_date)  
) PARTITION BY RANGE (sale_date);
```

중간 테이블 생성 (insert 용)

```sql
CREATE TABLE seavantage.sales_staging (  
    id SERIAL PRIMARY KEY,  
    sale_date DATE NOT NULL,  
    amount DECIMAL  
);
```

파티션 테이블 자동 생성을 위한 funtion 생성

```sql
CREATE OR REPLACE FUNCTION manage_partitions() RETURNS TRIGGER AS $$  
DECLARE  
    partition_name TEXT;  
    partition_start DATE;  
    partition_end DATE;  
BEGIN  
    -- 파티션 이름 및 범위 계산  
    partition_name := 'monthly_sales_' || to_char(NEW.sale_date, 'YYYY_MM');  
    partition_start := date_trunc('MONTH', NEW.sale_date);  
    partition_end := date_trunc('MONTH', NEW.sale_date) + INTERVAL '1 MONTH';  
  
    -- 해당 파티션 테이블이 존재하는지 확인  
    IF NOT EXISTS(SELECT 1 FROM pg_class WHERE relname = partition_name) THEN  
        -- 파티션 테이블 생성  
        EXECUTE format('CREATE TABLE %I PARTITION OF monthly_sales FOR VALUES FROM (%L) TO (%L)',  
                       partition_name, partition_start, partition_end);  
        EXECUTE 'CREATE INDEX IF NOT EXISTS '||partition_name||'_sale_date_idx'||'  
        ON '||partition_name||' USING btree'||'  
        (sale_date ASC NULLS LAST)'||'  
        TABLESPACE pg_default;';  
    END IF;  
  
    -- 데이터를 적절한 파티션에 삽입  
    EXECUTE format('INSERT INTO %I (id, sale_date, amount) VALUES ($1, $2, $3)',  
                   partition_name) USING NEW.id, NEW.sale_date, NEW.amount;  
    RETURN NULL; -- 원본 데이터는 중간 테이블에 남지 않음  
END;  
$$ LANGUAGE plpgsql;  
```

트리거 생성

```sql
CREATE TRIGGER trigger_manage_partitions  
BEFORE INSERT ON sales_staging  
FOR EACH ROW EXECUTE FUNCTION manage_partitions();
```

### Links

[postgresql - Table Partitioning](https://www.postgresql.org/docs/current/ddl-partitioning.html)
