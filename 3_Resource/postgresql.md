---
title: postgresql
aliases:
  - postgresql
classification: resource
tags:
  - postgresql
  - sql
  - db
created: 2023-01-10 20:35
updated: 2025-01-18T21:21
---

# postgresql

>[!info]
>Postgresql 기준으로 작성되었습니다.

### sequence 재설정

`ALTER SEQUENCE seaquence_name RESTART WITH 1;`
- `is_called` 의 default 값이 false이기 때문에 설정한 sequence 다음부터 동작하는 것이 아닌 설정값 부터 sequence가 동작된다.

### date_trunc

```sql
select date_trunc('day', snapshot_dt) as day, count(*) as cnt  
from ts_port_insight  
group by day  
order by day desc;
```

### timestamp 간의 시간 차이

```sql
-- second
select abs(extract(epoch from timestamp1) - extract(epoch from timestamp1));
```

### 현재 시간 기준 전후 시간

```sql
select now() - interval '1 month';
```

postgis의 geom 데이터가 다른 geom 데이터를 포함하는 지 확인

```sql
-- geom1이 geom2를 포함하면 true
select st_contains(geom1, geom2);
```

날짜의 원하는 시간 추출

```sql
-- year-month
select to_char(now(), 'yyyy-mm');
-- year-week
select to_char(now(), 'IYYY-IW');
```

테이블 인덱스 조회

```sql
select *
from pg_indexes
where schemaname = 'schemaname'
and tablename = 'tablename'
```

table constraints

```sql
select *  
from information_schema.table_constraints  
where table_name = 'table_name'  
	and constraint_type = 'constraint_type';
```

### connection

max_connection

```sql
select *  
from pg_settings  
where name = 'max_connections';
```

activity connection

```sql
select *  
from pg_stat_activity  
where datname = 'databaseName';
```

### table tuple 수 구하기

```sql
select relname as table_name, reltuples as count  
from pg_class  
where relname not like '%key%'  
  and relname not like '%idx%'  
  and relname not like '%pk%'  
  and relname not like '%index%'  
order by reltuples desc;
```

### 컬럼 타입 변경

```sql
ALTER TABLE table_name ALTER COLUMN column TYPE type;
```

- varchar 타입을 integer 타입으로 변경 시 오류 해결

```sql
ALTER TABLE table_name ALTER COLUMN column TYPE type USING column::integer;
```

### 두 좌표간의 거리 계산

```sql
-- degree
select st_distance(st_point(longitude_1, latitude_1), st_point(longitude_2, latitude_2));

-- km
select st_distancesphere(st_point(longitude_1, latitude_1), st_point(longitude_2, latitude_2)) / 1000.0;
```

### 유사도

```sql
select similarity(text, text);
```

### 테이블 생성 순서

```sql
SELECT schemaname,  
       tablename  
FROM pg_tables  
         JOIN  
     pg_class ON pg_tables.tablename = pg_class.relname  
WHERE schemaname NOT IN ('pg_catalog', 'information_schema')  
ORDER BY relfilenode desc;
```
