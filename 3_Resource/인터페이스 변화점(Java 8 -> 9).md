---
title: 인터페이스 변화점(Java 8 -> 9)
aliases: 
classification: resource
tags:
  - java
  - interface
created: 2023-07-12 00:21
updated: 2025-01-18T21:15
---

- 기본 메소드 (default method)와 정적 메소드를 가질 수 있다.
- 기본 메소드
	- 인터페이스에서 메소드 선언 뿐 아니라, 기본적인 구현체까지 제공할 수 있다.
	- 기존의 인터페이스를 구현하는 클래스에 새로운 기능을 추가할 수 있다.
- 정적 메소드
	- 자바 9부터 private static 메소드도 가질 수 있다.
	- 단, private 필드는 아직도 선언할 수 없다.
