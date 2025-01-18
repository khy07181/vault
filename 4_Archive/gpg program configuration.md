---
title: gpg program configuration
aliases: 
classification: resource
tags:
  - gpg
created: 2023-06-02 18:15
updated: 2025-01-18T21:29
---
obsidian git 실행 중 발생 에러

>[!error]
>cannot run gpg no such file or directory

`which gpg` 로 gpg 경로 확인 후

```shell
git config --global gpg.program /usr/local/bin/gpg
```

로 설정해주면 gpg.program 경로가 설정되어 동작한다.

그러나 갑자기 또 커밋이 오류나서 보니 `which gpg` 경로가 /usr/local/MacGPG2/bin/gpg 로 변경되었다.

gpg를 직접 다운로드 하거나 homebrew 와 같은 패키지 매니저로 설치할 경우 /usr/local/bin/gpg로,
GPG Suite으로 설치할 경우 /usr/local/MacGPG2/bin/gpg로 경로가 설정된다고 한다.

```shell
git config --global gpg.program /usr/local/MacGPG2/bin/gpg
```

로 변경하니 다시 커밋이 된다.

>[!question]
>아직도 gpg 경로가 갑자기 바뀐 이유는 모르겠다.
