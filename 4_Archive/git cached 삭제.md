---
title: git cache 삭제
aliases: []
classification: resource
tags:
  - git
  - gitignore
created: 2023-06-02 18:01
updated: 2025-01-18T21:29
---

### git cache 삭제

.gitignore가 작동하지 않거나 이미 remote에 push 되어 있어서 작업 내용에 나타나는 경우에 cache를 삭제 해준다.

```shell
git rm -r --cached .
git add .
git commit -m "fixed untracked files"
git push
```
