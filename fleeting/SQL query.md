# SQL query

```ad-info
Postgresql 기준으로 작성되었습니다.
```

### sequence 재설정

`ALTER SEQUENCE seaquence_name RESTART WITH 1;`
- 설정한 sequence 다음부터 동작하는 것이 아닌 설정값 부터 sequence가 동작된다.

### date_trunc

```sql
select date_trunc('day', snapshot_dt) as day, count(*) as cnt  
from ts_port_insight  
group by day  
order by day desc;
```

### timestamp 간의 시간 차이

```sql
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
