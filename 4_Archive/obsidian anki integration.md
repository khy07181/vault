---
title: obsidian anki integration
aliases: 
classification: resource
tags: 
created: 2024-09-19T17:45
updated: 2025-01-18T21:31
---

[Anki](https://apps.ankiweb.net/) 설치
- `brew install --cask anki`

obsidian anki plugin 설치
![[Pasted image 20240112184554.png]]

anki connect 확장 프로그램 설치
- [AnkiConnect](https://ankiweb.net/shared/info/2055492159)
![[Pasted image 20240112184716.png]]

AnkiConnect 설정값 입력

```json
{
  "apiKey": null,
  "apiLogPath": null,
  "webBindAddress": "127.0.0.1",
  "webBindPort": 8765,
  "webCorsOrigin": "http://localhost",
  "webCorsOriginList": [
    "http://localhost",
    "app://obsidian.md"
  ]
}
```

![[Pasted image 20240112184816.png]]
