---
title: 도커 교과서 Chapter03
aliases: 
categories: 
tags:
  - docker
created: 2024-02-07 22:47
updated: 2024-09-19T17:45
---

## 도커 이미지 만들기

### Docker image

Docker image는 물리적으로는 여러 개의 작은 파일로 구성돼 있다.
도커 이미지에는 우리가 패키징에 포함시킨 모든 파일이 들어 있다. 이들 파일은 나중에 컨테이너의 파일 시스템을 형성한다. 이외에도 자신에 대한 여러 메타데이터 정보가 들어 있다.
도커 이미지는 이미지 레이어가 모인 논리적 대상이고, 레이어는 도커 엔진의 캐시에 물리적으로 저장된 파일이다.
같은 레이어를 사용하면 이미지 레이어를 공유한다. 따라서 다른 이미지와 레이어를 공유한다면 SIZE 보다 실제로 차지하는 디스크 용량이 작다.

이미지가 저장 사용된 실제 디스크 용량 확인
- `docker system df`
도커 이미지의 히스토리 정보 확인
- `docker image history [image name]`
- CREATED BY 항목은 해당 레이어를 구성한 Dockerfile 스크립트의 instruction 이다.

### Dockerfile

Dockerfile은 애플리케이션을 패키징하기 위한 간단한 스크립트다.
Dockerfile은 일련의 instruction으로 구성되어 있는데, instruction을 실행한 결과로 도커 이미지가 만들어진다.
이미지 레이어와 Dockerfile instruction 은 1:1 관계를 갖는다.

```dockerfile
FROM diamol/node

ENV TARGET="blog.sixeyed.com"
ENV METHOD="HEAD"
ENV INTERVAL="3000"

WORKDIR /web-ping
COPY app.js .

CMD ["node", "/web-ping/app.js"]
```

- FROM
	- 모든 이미지는 다른 이미지로부터 출발한다.
- EVN
	- 환경 변수 값을 지정하기 위한 instruction
- WORKDIR
	- 컨테이너 이미지 파일 시스템에 directory를 만들고 작업 directory 로 지정하는 instruction
- COPY
	- 로컬 파일 시스템의 파일 혹은 디렉터리를 컨테이너 이미지로 복사하는 instruction
- CMD
	- 도커가 이미지로부터 컨테이너를 실행했을 때 실행할 명령을 지정하는 instruction

이미지 레이어를 여러 이미지가 공유한다면, 공유되는 레이어는 수정할 수 없어야 한다.
만약 이미지의 레이어를 수정할 수 있다면 그 수정이 레이어를 공유하는 다른 이미지에도 영향을 미치게 된다.
도커는 이미지 레이어를 읽기 전용으로 만들어서 문제를 방지한다. 이미지를 빌드하면서 레이어가 만들어지면 레이어는 다른 이미지에서 재사용될 수 있다. 그러나 수정할 수는 없다.

#### Dockerfile script optimize

도커는 캐시에 일치하는 레이어가 있는지 확인하기 위해 해시값을 이용한다. 기존 이미지 레이어에 해시값이 일치하는 것이 없다면 캐시 미스가 발생하고 해당 instruction 이 실행된다. 따라서 중간에 instruction 결과가 다르다면 그 이후 instruction 들은 수정된 것이 없더라도 모두 실행된다.
**Dockerfile 의 instruction 은 수정이 자주 일어나지 않는 것이 앞으로 오고 수정이 자주 일어나는 것이 뒤에 오도록 배치해야 한다.
캐시에 저장된 이미지 레이어를 많이 재사용하고, 시간, 디스크 용량, 네트워크 대역폭을 모두 절약할 수 있다.**

위 Dockerfile을 최적화하면 다음과 같다.

```dockerfile
FROM diamol/node

CMD ["node", "/web-ping/app.js"]

ENV TARGET="blog.sixeyed.com" \
    METHOD="HEAD" \
    INTERVAL="3000"

WORKDIR /web-ping
COPY app.js .

```

### Links

[Readwise - 도커 교과서](https://read.readwise.io/read/01hnryq9qrm1cq52ccj5ey6cwa)
[DockerFile reference](https://docs.docker.com/engine/reference/builder/#format)
