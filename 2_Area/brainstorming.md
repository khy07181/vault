---
title: brainstorming
aliases: 
classification: area
tags:
  - brainstorming
created: 2025-01-19T01:01
updated: 2025-01-19T03:12
---

- [ ] #task task 태그가 달린 문장 추가 또는 링크

```dataview
TABLE
From #brainstorm
WHERE file.path != this.file.path
SORT created desc
```

```dataview
TABLE
From #brainstorm-done
WHERE file.path != this.file.path
SORT created desc
```