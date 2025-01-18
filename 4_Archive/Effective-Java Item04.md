---
title: Effective-Java Item04
aliases:
  - 인스턴스화를 막으려거든 private 생성자를 사용하라.
classification: resource
tags:
  - effective-java
  - java
created: 2024-01-09 23:11
updated: 2025-01-18T21:28
---

## 인스턴스화를 막으려거든 private 생성자를 사용하라.

생성자를 명시하지 않으면 컴파일러가 기본 생성자를 만들어준다.

```java
// static method로 사용하기를 바랬으나,
UtiltyClass.utiltyMethod();

// 인스턴스를 생성해서 사용할 수도 있다.
UtiltyClass utiltyClass = new UtiltyClass();
Object something = utiltyClass.utiltyMethod();
```

static 한 유틸리티 클래스는 인스턴스로 만들어 쓰려고 설게한 것이 아니다.

추상 클래스로 만드는 것으로는 인스턴스화를 막을 수 없다.
- 하위 클래스를 만들어서 인스터화할 수 있다.

priate 생성자를 다음과 같이 추가하면 클래스의 인스턴스화를 막을 수 있다.
- 상속을 불가능하게 하는 효과도 있다.

```java
public class UtilityClass {  
  
	private UtilityClass() {  
		throw new AssertionError();  
	}  
  
}
```

### Links
