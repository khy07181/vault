---
banner: "https://images.unsplash.com/photo-1507842217343-583bb7270b66?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2790&q=80"
banner_x: 0.5
banner_y: 0.05
banner_icon: π
cssClasses: row-alt, table-small, col-lines, row-lines
---

# λμ

## π¦ μ½κ³  μλ μ±

```dataview
TABLE without id
("![|100](" + cover_url + ")") as image,
file.link as title,
author as author,
category as category,
dateformat(finish_read_date, "yyyy-MM-dd") as μλμΌ,
rate as rate
FROM "library/book"
WHERE status = "μ½κ³  μλ μ±"
SORT created desc
```

## π§ μ½μ μ±

```dataview
TABLE without id
("![|100](" + cover_url + ")") as image,
file.link as title,
author as author,
category as category,
dateformat(finish_read_date, "yyyy-MM-dd") as μλμΌ,
rate as rate
FROM "library/book"
WHERE status = "μ½μ μ±"
SORT created desc
```

## π¨ μ½λ€κ° λ―Έλ£¬ μ±

```dataview
TABLE without id
("![|100](" + cover_url + ")") as image,
file.link as title,
author as author,
category as category,
dateformat(finish_read_date, "yyyy-MM-dd") as μλμΌ,
rate as rate
FROM "library/book"
WHERE status = "μ½λ€κ° λ―Έλ£¬ μ±"
SORT created desc
```

## π© μλ

```dataview
TABLE without id
("![|100](" + cover_url + ")") as image,
file.link as title,
author as author,
category as category,
dateformat(finish_read_date, "yyyy-MM-dd") as μλμΌ,
rate as rate
FROM "library/book"
WHERE status = "μλ"
SORT finish_read_date desc
```
