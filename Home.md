---
title: Home
aliases: 
classification: 
tags: 
created: 2024-06-30 23:12
updated: 2025-01-19T03:17
---

### Tasks

![[tasks]]

### brainstorming

![[brainstorming#^bccf1a]]

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
FROM "private/2_Area/library/book"
WHERE status = "reading"
SORT created desc
```

### Uncreated Note

^353533

```dataview
TABLE WITHOUT ID 
    rows.file.link AS "note",
    key AS "uncreated"
FLATTEN file.outlinks as outlinks
WHERE !(outlinks.file) AND !(contains(meta(outlinks).path, "/"))
GROUP BY outlinks
```
