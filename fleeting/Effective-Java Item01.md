---
title: Effective-Java Item01
aliases: 생성자 대신 정적 팩토리 메소드를 고려하라
categories: java
tags: effective-java, java
created: 2023-07-11 21:59
---

## 생성자 대신 정적 팩토리 메소드를 고려하라.

장점
- 이름을 가질 수 있다.

```java
public class Order {  
  
	private boolean prime;  
  
	private boolean urgent;  
  
	private Product product;  
  
	public static Order primeOrder(Product product) {  
		Order order = new Order();  
		order.prime = true;  
		order.product = product;  
		return order;  
	}  
  
	public static Order urgentOrder(Product product) {  
		Order order = new Order();  
		order.urgent = true;  
		order.product = product;  
		return order;  
	}  

}
```

- 호출될 때마다 인스턴스를 새로 생성하지는 않아도 된다.
	- [[Flyweight Pattern]]도 이와 비슷한 기법이다.

```java
public final class Boolean implements java.io.Serializable,  
Comparable<Boolean>, Constable {  
  
	/**  
	* The {@code Boolean} object corresponding to the primitive  
	* value {@code true}.  
	*/  
	public static final Boolean TRUE = new Boolean(true);  
  
	/**  
	* The {@code Boolean} object corresponding to the primitive  
	* value {@code false}.  
	*/  
	public static final Boolean FALSE = new Boolean(false);

	// 이미 생성된 인스턴스 사용
	public static Boolean valueOf(boolean b) {  
		return (b ? TRUE : FALSE);  
	}
  
}
```

- 반환 타입의 하위 타입 객체를 반환할 수 있는 능력이 있다.

```java
public class HelloServiceFactory {
	public static HelloService of(String lang) {
		if (lang.equals("ko")) {
			return new KoreanHelloService();
		}
		return EnglishHelloService
	}
}
```

- 입력 매개변수에 따라 매번 다른 클래스의 객체를 반환할 수 있다.
	- 하위 타입 클래스이기만 하면 어떠한 클래스의 객체도 반환할 수 있다.

```java
public static <E extends Enum<E>> EnumSet<E> noneOf(Class<E> elementType) {  
	Enum<?>[] universe = getUniverse(elementType);  
	if (universe == null)  
		throw new ClassCastException(elementType + " not an enum");  
	  
	if (universe.length <= 64)  
		return new RegularEnumSet<>(elementType, universe);  
	else  
		return new JumboEnumSet<>(elementType, universe);  
}
```

- 정적 팩토리 메소드를 작성하는 시점에는 반환할 객체의 클래스가 존재하지 않아도 된다.
	- 대표적인 예가 JDBC
		- 코드는 어떠한 DB를 사용할 지 알지 못한다.

단점
- 상속을 하려면 public이나 protected 생성자가 필요하니 정적 팩토리 메소드만 제공하면 하위 클래스를 만들 수 없다.

```java
// Settings를 상속받을 수는 없지만 안에서 사용하게 하면 오히려 장점이 될 수 있다.
public class AdvancedSettings {  
  
	Settings settings;  
  
}
```

- 정적 팩토리 메소드는 프로그래머가 찾기 어렵다.

### Links

[이펙티브 자바 완벽 공략 1부](https://www.inflearn.com/course/%EC%9D%B4%ED%8E%99%ED%8B%B0%EB%B8%8C-%EC%9E%90%EB%B0%94-1/dashboard)
[ITEM 1: Static Factory Method(정적 메소드)](https://dahye-jeong.gitbook.io/java/java/effective_java/2021-01-12-static-factory-methods)
