---
title: Effective-Java Item03
aliases:
  - private 생성자나 열거 타입으로 Singleton임을 보증하라.
categories: java
tags:
  - effective-java
  - java
created: 2024-01-09 23:11
updated: 2024-09-19T17:45
---

## private 생성자나 열거 타입으로 Singleton임을 보증하라.

Singleton이란 인스턴스를 오직 하나만 생성할 수 있는 클래스를 말한다.
클래스를 Singleton으로 만들면 이를 사용하는 클라이언트를 테스트하기 어려워질 수 있다.

타입을 인터페이스로 정의한 다음 그 인터페이스를 구현해서 사용하면
Singleton 인스턴스를 mock 객체 구현으로 대체할 수 있다.

```java
public interface IElvis {

}
```

```java
public class Elvis implements IElvis {
	...
}
```

```java
public class MockElvis implements IElvis {
	...
}
```

### singleton 클래스 생성 방식

public static final 필드 방식

```java
public class Elvis {

	public static final Elvis INSTANCE = new Elvis();

	private Elvis() { ... }

}
```

- 해당 클래스가 Singleton임이 API에 명백히 드러난다.

정적 팩토리 방식

```java
public class Elvis {

	private static final Elvis INSTANCE = new Elvis();

	private Elvis() { ... }

	public static Elvis getInstance() {
		return INSTANCE; 
	}

}
```

- API를 바꾸지 않고도 싱클턴이 아니게 변경할 수 있다.
- 정적 팩토리를 제네릭 Singleton 팩토리로 만들 수 있다.
- 정적 팩터리의 메서드 참조를 supplier로 사용할 수 있다.

enum 타입의 방식

```java
public enum Elvis {

	INSTANCE,

	...
}
```

- 대부분의 상황에서는 원소가 하나뿐인 열거 타입이 Singleton을 만드는 가장 좋은 방법이다.

### Reflection 방어

- Reflection의 AccessibleObject.setAccessible을 사용해 private 생성자를 호출할 수 있다.
- 이러한 공격을 방어하려면 생성자에서 두 번째 객체가 생성되려 할 때 예외를 던지게 하면 된다.

```java
public class Elvis {
    public static final Elvis INSTANCE = new Elvis();
    
    private Elvis() {
        if (INSTANCE != null) {
            throw new RuntimeException("Can't be created by constructor.");
        }
        //... 
    }
}
```

## Singleton Class 직렬화

Singleton class를 직렬화하려면 단순히 `Serializable`을 구현하는 것만으로는 부족하다.
모든 인스턴스 필드를 `transient` 선언하고 `readResolve` 메서드를 제공해야한다.
이렇게 하지 않으면, Deserialize시 새로운 인스턴스가 생성된다.

```java
public class Elvis implements IElvis, Serializable {

    ...

    private Object readResolve() {
        return INSTANCE;
    }

}
```

### Links
