---
title: Docker
aliases: 
categories: 
tags: 
created: 2024-02-05 21:22
---

가상 머신은 애플리케이션이 실행될 독립적 환경이 생긴다는 점에서는 컨테이너와 큰 차이가 없다. 다만 가상 머신은 컨테이너와 달리 호스트컴퓨터의 운영체제를 공유하지 않고 별도의 운영체제를 필요로 한다.

>[!warning]
>모든 컨테이너 삭제
>- `docker rm -f $(docker ps -aq)`
>
>모든 이미지 삭제
>- `docker rm -f $(docker ps -aq)`

도커 엔진(Docker Engine)
- 도커의 관리 기능을 맡는 컴포넌트
- 로컬 이미지 캐시를 담당하므로 새로운 이미지가 필요하면 이미지를 내려받으며, 기존 이미지가 있다면 전에 내려받은 이미지를 사용한다.
- 호스트 운영체제와 함께 컨테이너와 가상 네트워크 등 도커 리소스를 만드는 일도 담당한다.
- 도커 엔진은 항시 동작하는 백그라운드 프로세스다(리눅스 데몬 또는 윈도 서비스와 같다).
- 도커 엔진과 상호작용할 수 있는 유일한 방법은 API를 통하는 방법뿐이다.
- containerd라는 컴포넌트를 통해 컨테이너를 실제로 관리하는데, containerd는 호스트 운영체제가 제공하는 기능을 통해 컨테이너, 즉 가상 환경을 만든다.




