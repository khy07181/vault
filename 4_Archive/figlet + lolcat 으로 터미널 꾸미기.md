---
title: figlet + lolcat 으로 터미널 꾸미기
aliases:
classification: resource
tags:
created: 2024-02-05 23:43
updated: 2026-03-12T18:56
---

figlet & lolcat 설치

```shell
brew install figlet
```

```shell
brew install lolcat
```

다음과 같이 figlet font 가 있는 디렉토리로 가서 쉘 스크립트 명령어를 실행하면 font 별로 스타일을 확인할 수 있다.

```shell
cd /opt/homebrew/share/figlet/fonts/
```

```shell
for file in *.flf; do echo $file; figlet -f $file 'hello world' | lolcat; done
```

font 를 선택했다면 다음과 같이 원하는 문구를 작성해서 .zshrc 파일에 적어주면
터미널이 실행할 때마다 출력된다.

```shell
figlet -f standard "Hello $AUTHOR" | lolcat
```
