---
title: Simple Design 개론 - 코드 품질에 대하여
aliases:
classification: resource
tags:
  - code
  - lecture
url:
created: 2026-02-01T19:16
updated: 2026-02-01T19:16
---

- 가독성이라는 표현은 해롭다.
	- 클린 코드도 마찬가지
	- 내가 읽기 어려우면 나쁜 코드라고 판단하게 만든다.

Kent Beck의 Simple Design
- 테스트를 모두 통과할 것
- 중복이 없어야 한다. 평행상속구조 같은 숨은 중복에 주의할 것
- 의도를 드러내라 - 프로그래머에게 중요한 의도를 모두 서술할 것
- 최소한의 문법요소 - 클래스와 메서드 등의 개수가 최소한이어야 한다.

좋은 코드
- 중복이 없는 코드
- 구성요소가 최소한인 코드

Extract Method의 위험성
- Long Method는 나쁘지만 잘못된 Extract Method는 코드 품질을 떨어뜨린다.
- 정적인 코드와 동적으로 실행되는 프로세스 사이의 개념적 불일치
	- 나쁜 것은 컨텍스트의 점프
- 컨텍스트가 유지되는 함수를 만들자
	- 함수 안을 들여다 보지 않아도 되는 함수
- 중복 제거를 위함이라면 대체로 좋다

Side Effect를 제거하라
- 순수함수
- Mutator와 Accessor를 구분하라

알아차리기 어려운 중복
- IF 조건 중복
	- 다형성을 해결
		- IF 조건을 유발하는 함수를 도메인안으로 위임

구성요소를 줄이기를 방해하는 관점
- 과도한 일관서
- 함수가 작아야 이해하기 쉽다
	- 한 번에 이해해야 하는 단위가 더 중요하다


### Links

- [Simple Design 개론 - 코드 품질에 대하여](https://www.inflearn.com/course/%EC%9D%B8%ED%94%84%EB%9F%B0-simple-design-25/dashboard?cid=337868)
- [Simple Design \| 영록이 홈페이지](https://youngrok.com/Simple%20Design?action=printout)
