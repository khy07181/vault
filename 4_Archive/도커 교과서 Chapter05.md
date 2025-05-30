---
title: 도커 교과서 Chapter05
aliases: 
classification: resource
tags:
  - docker
created: 2024-02-15 16:18
updated: 2025-01-18T21:24
---

## 도커 허브 등 레지스트리에 이미지 공유하기

이미지에 새로운 이미지 참조를 부여
`docker image tag [image name] [image name]:v1`

이미지 참조 목록 확인

`docker image ls --filter reference=[image name] --filter reference='*/[image name]'

레지스트리 역시 도커 엔진과 같은 방식으로 이미지 레이어를 다루며 그만큼 Dockerfile 스크립트의 최적화가 더욱 중요해진다.
레지스트리에서도 캐시상에 레이어 해시와 일치하는 레이어가 없을 경우에만 실제로 업로드가 이뤄진다.

도커 이미지 태그에는 어떤 문자열이라도 포함시킬 수 있다.
같은 이미지에 여러 개의 태그를 부여하는 것도 가능하다. 태그를 통해 버전을 구별하고 이미지를 사용할 다른 사람들이 자신이 원하는 이미지가 무엇인지 찾을 수 있다.
직접 작성한 Dockerfile 스크립트의 기반 이미지는 가능한 한 정확한 버전을 지정하는 것이 좋다. 개발 팀과 동일한 도구로 빌드하고 동일한 런타임을 사용해 실행할 수 있기 때문이다.
버전을 구체적으로 지정하지 않으면 향후 문제가 생기기 쉽다. 빌드용 이미지가 업데이트되면서 빌드가 깨질 수도 있고, 런타임의 업데이트로 인해 애플리케이션 실행 과정에서 오류가 발생할 수도 있다.

### 신뢰성 있는 이미지

도커 허브 등과 레지스트리는 보안에 취약한 조건을 가지고 있다. 그럴싸한 이름과 설명을 붙이고 이미지를 푸시한 다음 피해자가 걸려들기를 기다리기만 하면 되기 때문이다. 도커 허브는 검증된 퍼블리셔와 공식 이미지를 통해 피해를 방지한다.
검증된 퍼블리셔는 마이크로소프트, 오라클, IBM 같은 신뢰성 있는 큰 기업을 지정하고, 검증된 퍼블리셔로 인정받는다.
공식 이미지로 배포되는 소프트웨어는 주로 오픈 소스 소프트웨어로, 해당 프로젝트 개발 팀과 도커가 함께 이미지를 관리한다.
골든 이미지는 공식 이미지를 기반 이미지로 삼아 인증서나 환경 설정값 등 자신이 필요한 설정을 추가한 것이다.
