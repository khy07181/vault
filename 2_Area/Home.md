---
title: Home
aliases:
classification: area
tags:
  - homepage
created: 2024-06-30 23:12
updated: 2026-03-31T16:01
---

### Recent File

```dataview
table updated as "Modified Time"
from ""
where !contains(file.path, "readwise")
and !contains(file.path, "private/2_Area/daily") 
and !contains(file.path, "private/6_Discard") 
and !contains(file.path, "6_Discard") 
and !contains(file.path, "private/2_Area/agent-session")
sort updated desc
limit 50
```

### Recent Created

```dataview
table created as "Created Time"
from ""
where typeof(created) = "date"
and !contains(file.path, "readwise")
and !contains(file.path, "private/2_Area/daily")
and !contains(file.path, "private/6_Discard")
and !contains(file.path, "6_Discard")
and !contains(file.path, "private/2_Area/agent-session")
sort created desc
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
