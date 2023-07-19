---
banner: "https://images.unsplash.com/photo-1507842217343-583bb7270b66?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2790&q=80"
banner_x: 0.5
banner_y: 0.05
cssClasses: row-alt, table-small, col-lines, row-lines
---

# Library

## Currently Reading

```dataview

TABLE without id

("![|100](" + cover_url + ")") as book,

file.link as title,

author as author,

category as category,

dateformat(read_date, "yyyy-MM-dd") as read_date,

rate as rate

FROM "library/book"

WHERE status = "reading"

SORT created desc

```

## Unread

```dataview

TABLE without id

("![|100](" + cover_url + ")") as book,

file.link as title,

author as author,

category as category,

dateformat(read_date, "yyyy-MM-dd") as read_date,

rate as rate

FROM "library/book"

WHERE status = "unread"

SORT created

```

## Read

```dataview

TABLE without id

("![|100](" + cover_url + ")") as book,

file.link as title,

author as author,

category as category,

dateformat(read_date, "yyyy-MM-dd") as read_date,

rate as rate

FROM "library/book"

WHERE status = "read"

SORT read_date desc

```

## List of Read Books

### 2023

```dataview

TABLE without id

("![|100](" + cover_url + ")") as book,

file.link as title,

author as author,

category as category,

dateformat(read_date, "yyyy-MM-dd") as read_date,

rate as rate

FROM "library/book"

WHERE status = "read" and read_date >= date(2023-01-01) AND read_date < date(2024-01-01)

SORT read_date asc

```
