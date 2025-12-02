---
title: brainstorming
aliases:
classification: area
tags:
  - brainstorming
created: 2025-01-19T01:01
updated: 2025-11-30T12:11
---

- [x] #task task 태그가 달린 문장 추가 또는 링크 ✅ 2025-02-18

```dataviewjs
const rows = [];

for (const p of dv.pages("#brainstorm")
  .where(p => p.file.path != dv.current().file.path)
  .sort(p => p.file.ctime, "desc")) {

  const lines = (await dv.io.load(p.file.path)).split("\n");
  const i = lines.findIndex(l => l.includes("#brainstorm"));
  if (i === -1) {
    rows.push([p.file.link, ""]);
    continue;
  }

  let text = lines[i]
    .replace(/^-?\s*#brainstorm\s*/u, "")
    .trim();

  if (!text && i + 1 < lines.length)
    text = lines[i + 1].trim();

  if (text.length > 120)
    text = text.slice(0, 120) + "…";

  rows.push([p.file.link, text]);
}

dv.table(["제목", "내용"], rows);
```

```dataviewjs
const rows = [];

for (const p of dv.pages("#brainstorm-done")
  .where(p => p.file.path != dv.current().file.path)
  .sort(p => p.file.utime, "desc")) {

  const lines = (await dv.io.load(p.file.path)).split("\n");
  const i = lines.findIndex(l => l.includes("#brainstorm-done"));
  if (i === -1) {
    rows.push([p.file.link, ""]);
    continue;
  }

  let text = lines[i]
    .replace(/^-?\s*#brainstorm-done\s*/u, "")
    .trim();

  if (!text && i + 1 < lines.length)
    text = lines[i + 1].trim();

  if (text.length > 120)
    text = text.slice(0, 120) + "…";

  rows.push([p.file.link, text]);
}

dv.table(["제목", "내용"], rows);
```
