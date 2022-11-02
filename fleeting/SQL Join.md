# SQL Join

## Join

- A `JOIN` clause is used to combine rows from two or more tables, based on a related column between them.
![SQL_Join_1](SQL_Join_1.png)

### Inner Join

- The `INNER JOIN` keyword selects records that have matching values in both tables.

```sql
SELECT column_name
FROM table1
INNER JOIN table2  
ON table1.column_name = table2.column_name;
```

Left Join
- The `LEFT JOIN` keyword returns all records from the left table (table1), and the matching records from the right table (table2). The result is 0 records from the right side, if there is no match.

```sql
SELECT column_name
FROM table1
LEFT JOIN table2  
ON table1.column_name = table2.column_name;
```

### Right Join

- The `RIGHT JOIN` keyword returns all records from the right table (table2), and the matching records from the left table (table1). The result is 0 records from the left side, if there is no match.

```sql
SELECT column_name
FROM table1
RIGHT JOIN table2
ON table1.column_name = table2.column_name;
```

Full Join
- The `FULL OUTER JOIN` keyword returns all records when there is a match in left (table1) or right (table2) table records.
- `FULL OUTER JOIN` and `FULL JOIN` are the same.

```sql
SELECT column_name
FROM table1
FULL OUTER JOIN table2
ON table1.column_name = table2.column_name WHERE condition;
```

### Self Join

- A self join is a regular join, but the table is joined with itself.

```sql
SELECT column_name
FROM table1 T1, table1 T2
WHERE condition;
```

Cross Join
- The `CROSS JOIN` keyword returns all records from both tables (table1 and table2).

```sql
SELECT column_name
FROM table1
CROSS JOIN table2;
```
