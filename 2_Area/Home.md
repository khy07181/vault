---
title: Home
aliases:
classification: area
tags:
  - homepage
created: 2024-06-30 23:12
updated: 2025-12-26T15:31
---

### Recent File

```dataview
table file.mtime as "Modified Time"
from ""
where !contains(file.path, "readwise") and !contains(file.path, "private/daily")
sort file.mtime desc
limit 50
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
    rows.file.link AS "location",
    key AS "uncreated_note"
FLATTEN file.outlinks as outlinks
WHERE 
    !(outlinks.file)
    AND !(contains(meta(outlinks).path, "/"))
    AND !contains(file.folder, "6_Discard")
    AND !contains(file.folder, "private/6_Discard")
GROUP BY outlinks
```
