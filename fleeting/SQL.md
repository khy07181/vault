# SQL

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
