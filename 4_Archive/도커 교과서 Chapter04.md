---
title: 도커 교과서 Chapter04
aliases: 
classification: 
tags:
  - docker
created: 2024-02-13 15:52
updated: 2025-01-18T20:16
---

## 애플리케이션 소스 코드에서 도커 이미지까지

대부분의 프로그래밍 언어는 프로젝트를 빌드하기 위해 다양한 도구가 필요하다.

Docker를 사용하면 빌드를 위한 Dockerfile 스크립트를 작성한 다음 이를 이미지로 만들고, 애플리케이션 패키징을 위한 Dockerfile 스크립트에서 이 이미지를 사용해 소스 코드를 컴파일함으로써 애플리케이션을 패키징할 수 있다.

멀티 스테이지 빌드를 적용한 Dockerfile 스크립트
- COPY instrcution을 보면 --from 인자를 사용해 해당 파일이 호스트 컴퓨터의 파일 시스템이 아니라 앞선 빌드 단계의 파일 시스템에 있는 파일임을 알려 준다.
- build-stage단계에서 파일 하나를 생성하는데, 이 파일을 test-stage로 복사하고 다시 test-stage에서 생성한 파일을 마지막 단계로 복사한다.

```dockerfile
FROM diamol/base AS build-stage
RUN echo 'Building...' > /build.txt

FROM diamol/base AS test-stage
COPY --from=build-stage /build.txt /build.txt
RUN echo 'Testing...' >> /build.txt

FROM diamol/base
COPY --from=test-stage /build.txt /build.txt
CMD cat /build.txt
```

![[Pasted image 20240215145315.png]]
애플리케이션의 진정한 이식성을 확보할 수 있다. Docker만 갖춰진다면 컨테이너를 통해 어떤 환경에서든 애플리케이션을 빌드하거나 실행할 수 있다.

컨테이너는 컨테이너가 실행될 때 부여되는 가상 네트워크 내 가상 IP를 통해 서로 통신한다. 이 가상 네트워크 역시 명령행 인터페이스를 통해 관리할 수 있다.
`docker network create test-net`
컨테이너를 실행할 때 --network 옵션을 사용하면 새로 만들 컨테이너를 연결할 네트워크를 직접 지정할 수 있다.
`docker run --name [containerName] -d -p 800:80 --network test-net [imageName]

컨테이너 내부 빌드가 유용한 이유
1. 표준화
- 어떤 운영체제를 사용하든, 그리고 로컬 컴퓨터에 어떤 도구를 설치했는지와 상관없이 모든 빌드 과정은 도커 컨테이너 내부에서 이뤄진다.
- 빌드 서버의 관리 부담, 혹은 개발자 간 도구 버전의 차이로 인한 빌드 실패를 크게 줄일 수 있다.
2. 성능 향상
- 멀티 스테이지 빌드의 각 단계는 자신만의 캐시를 따로 갖는다. 도커는 빌드 중에 각 instruction에 해당하는 레이어 캐시를 찾는다.
- 처음 Dockerfile을 최적화한다면 캐시 재사용을 통해 90% 이상의 빌드 단계에서 시간을 절약할 수 있다.
3. 이미지를 가능한 한 작게 유지할 수 있다.
- 컴파일러뿐만 아니라 어떤 도구든지 그 도구가 사용되는 단계만으로 도구의 포함 여부를 국한시킬 수 있다.
- 최종 산출물인 이미지에 불필요한 도구는 빼버릴 수 있는 것이다.
- 이 좋은 예가 curl이다. curl은 인터넷을 통해 필요한 파일을 내려받을 수 있는 중요한 도구이지만, 파일 다운로드를 빌드 초기 단계에 모아 놓는다면 최종 이미지에는 curl을 포함시키지 않아도 된다.
- 이런 방법으로 이미지 크기를 줄여서 애플리케이션의 시작 시간을 단축할 수 있으며, 애플리케이션의 의존 모듈 자체를 줄여 취약점을 이용한 외부 공격의 가능성도 최대한 차단할 수 있다.
