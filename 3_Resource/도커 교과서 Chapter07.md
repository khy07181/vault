---
title: 도커 교과서 Chapter07
aliases: 
classification: 
tags:
  - docker
created: 2024-02-28 18:05
updated: 2025-01-18T20:16
---

## 도커 컴포즈로 분산 애플리케이션 실행하기

Docker compose 는 multi-container applications를 정의하고 실행하기 위한 도구이다. 
- 간단하고 효율적으로 개발 및 배포 환경을 구성할 수 있다.
- 이해하기 쉬운 단일 YAML 구성 파일에서 서비스, 네트워크 및 볼륨을 쉽게 관리할 수 있다.
- 단일 명령어을 사용하여 구성 파일에서 모든 서비스를 생성하고 시작할 수 있다.

Docker compose 파일은 다음과 같이 세 개의 statement로 구성된다.
- version
- services
- networks

```dockerfile
version: '3.7'

services:

  todo-web:
    image: diamol/ch06-todo-list
    ports:
      - "8020:80"
    networks:
      - app-net

networks:
  app-net:
    external:
      name: nat
```

위 파일 구성을 `docker container run -p 8020:80 --name todo-web --network nat diamol/ch06-todo-list` 명령어를 실행한 것과 같다.

Docker compose 실행
- `docker-compose up`

services statement에 다음과 같이 세가지의 컨테이너를 등록하면 여러 서비스로 구성된 application을 실행할 수 있다.
- depends_on 항목을 추가해 의존 관계를 나타낼 수 있다.
	- image-gallery 서비스는 accesslog, iotd 서비스가 실행된 후 실행된다.
	- 
```dockerfile
accesslog:
  image: diamol/ch04-access-log

iotd:
  image: diamol/ch04-image-of-the-day
  ports:
    - "80"

image-gallery:
  image: diamol/ch04-image-gallery
  ports:
    - "8010:80"
  depends_on:
    - accesslog
    - iotd
```
