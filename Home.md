---
title: Home
aliases: 
categories: 
tags: 
created: 2024-06-30 23:12
updated: 2025-01-07T10:12
---

### Recent File

```dataview
table file.mtime as "Modified Time"
from ""
where !contains(file.path, "readwise") and !contains(file.path, "private/daily")
sort file.mtime desc
limit 30
```

### Currently Reading

```dataview
TABLE without id
("![|100](" + cover_url + ")") as book,
file.link as title,
author as author,
category as category,
dateformat(read_date, "yyyy-MM-dd") as read_date,
rate as rate
FROM "private/library/book"
WHERE status = "reading"
SORT created desc
```

```dataview
TABLE WITHOUT ID 
    rows.file.link AS "파일",
    key AS "미해결 링크"
FLATTEN file.outlinks as outlinks
WHERE !(outlinks.file) AND !(contains(meta(outlinks).path, "/"))
GROUP BY outlinks
```
