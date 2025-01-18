---
title: mac 키보드 반복 설정
aliases: 
classification: 
tags: 
created: 2024-04-22 18:53
updated: 2025-01-18T20:16
---

```shell
# 반복 지연 시간
defaults read -g InitialKeyRepeat
defaults write -g InitialKeyRepeat -int 10

# 키 반복 속도
defaults read -g KeyRepeat
defaults write -g KeyRepeat -int 10
```
