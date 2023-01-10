---
banner: "https://images.unsplash.com/photo-1507842217343-583bb7270b66?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2790&q=80"
banner_x: 0.5
banner_y: 0.05
banner_icon: 📚
cssClasses: row-alt, table-small, col-lines, row-lines
---

# 독서

## 🟦 읽고 있는 책

```dataview
TABLE without id
("![|100](" + cover_url + ")") as image,
file.link as title,
author as author,
category as category,
dateformat(finish_read_date, "yyyy-MM-dd") as 완독일,
rate as rate
FROM "library/book"
WHERE status = "읽고 있는 책"
SORT created desc
```

## 🟧 읽을 책

```dataview
TABLE without id
("![|100](" + cover_url + ")") as image,
file.link as title,
author as author,
category as category,
dateformat(finish_read_date, "yyyy-MM-dd") as 완독일,
rate as rate
FROM "library/book"
WHERE status = "읽을 책"
SORT created desc
```

## 🟨 읽다가 미룬 책

```dataview
TABLE without id
("![|100](" + cover_url + ")") as image,
file.link as title,
author as author,
category as category,
dateformat(finish_read_date, "yyyy-MM-dd") as 완독일,
rate as rate
FROM "library/book"
WHERE status = "읽다가 미룬 책"
SORT created desc
```

## 🟩 완독

```dataview
TABLE without id
("![|100](" + cover_url + ")") as image,
file.link as title,
author as author,
category as category,
dateformat(finish_read_date, "yyyy-MM-dd") as 완독일,
rate as rate
FROM "library/book"
WHERE status = "완독"
SORT finish_read_date desc
```
