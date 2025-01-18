---
title: Reflection
aliases: 
classification: java
tags: reflection
created: 2023-07-12 00:22
updated: 2025-01-18T20:16
---

ClassLoader를 통해 읽어온 클래스 정보(거울에 반사된 정보)를 사용하는 기술

reflection을 사용해 클래스를 읽어오거나, 인스턴스를 만들거나, 메소드를 실행하거나, 필드의 값을 가져오거나 변경하는 것이 가능하다.

활용
- 특정 애노테이션이 붙어있는 필드 또는 메소드 읽어오기 (JUnit, Spring)
- 특정 이름 패턴에 해당하는 메소드 목록 가져와 호출하기 (getter, setter)

### Links

[oracle - reflect](https://docs.oracle.com/javase/tutorial/reflect/)
