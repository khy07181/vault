---
title: Effective-Java Item05
aliases:
  - 자원을 직접 명시하지 말고 의존 객체 주입을 사용하라.
categories: java
tags:
  - effective-java
  - java
created: 2024-01-09 23:11
---

## 자원을 직접 명시하지 말고 의존 객체 주입을 사용하라.

사용하는 자원에 따라 동작이 달라지는 클래스에는 정적 유틸리티 클래스나 싱클턴 방식이 적합하지 않다.

다음과 같이 자원을 직접 명시하면 유연성과 재사용성, 테스트 용이성이 낮다.

```java
public class SpellChecker {  
  
	private static final Dictionary dictionary = new DefaultDictionary();  
  
	private SpellChecker() {  
	}  
  
	public static boolean isValid(String word) {  
		return dictionary.contains(word);  
	}  
  
	public static List<String> suggestions(String typo) {  
		return dictionary.closeWordsTo(typo);  
	}  
  
}
```

의존 객체 주입을 사용하면 유연성과 재사용성, 테스트 용이성을 높일 수 있다.
다음과 같이 작성했을 때 Dictionary가 interface라면 모든 코드가 재사용 가능하다.

```java
public class SpellChecker {  
  
	private final Dictionary dictionary;  
  
	public SpellChecker(Dictionary dictionary) {  
		this.dictionary = dictionary;  
	}  
  
	public SpellChecker(Supplier<Dictionary> dictionarySupplier) {  
		this.dictionary = dictionarySupplier.get();  
	}  
  
	public boolean isValid(String word) {  
		return dictionary.contains(word);  
	}  
  
	public List<String> suggestions(String typo) {  
		return dictionary.closeWordsTo(typo);  
	}  
  
}
```

- SpellChecker 를 사용하면서도 얼마든지 원하는 Dictionary를 주입해서 사용할 수 있다.

```java
class SpellCheckerTest {  
  
	@Test  
	void isValid() {  
		SpellChecker spellChecker = new SpellChecker(MockDictionary::new);  
		spellChecker.isValid("test");  
	}  
  
}
```

생성자에 자원 팩토리를 넘겨주는 방식
- Java 8의 `Supplier<T>` interface가 완벽한 예시이다.
- 받는 인자없이 리턴

```java
public class DictionaryFactory {  
  
public static DefaultDictionary get() {  
return new DefaultDictionary();  
}  
  
}
```

```java
public class SpellChecker {  
  
private final Dictionary dictionary;  
  
public SpellChecker(Dictionary dictionary) {  
this.dictionary = dictionary;  
}  
  
public SpellChecker(Supplier<Dictionary> dictionarySupplier) {  
this.dictionary = dictionarySupplier.get();  
}  
  
public boolean isValid(String word) {  
return dictionary.contains(word);  
}  
  
public List<String> suggestions(String typo) {  
return dictionary.closeWordsTo(typo);  
}  
  
}
```

---

### Factory method pattern

- Dictionary 도 interface를 사용하고, DictionaryFactory 도 interface 타입을 사용하기 때문에 객체지향저으로 확장에 열려있고 변경에 닫혀는 구조가 만들어진다. [[OCP]]

```java
public interface DictionaryFactory {  
  
Dictionary getDictionary();  
  
}
```

```java
public class DefaultDictionaryFactory implements DictionaryFactory {  
  
@Override  
public Dictionary getDictionary() {  
return new DefaultDictionary();  
}  
  
}
```

```java
public class SpellChecker {  
  
private Dictionary dictionary;  
  
public SpellChecker(DictionaryFactory dictionaryFactory) {  
this.dictionary = dictionaryFactory.getDictionary();  
}  
  
public boolean isValid(String word) {  
return dictionary.contains(word);  
}  
  
public List<String> suggestions(String typo) {  
return dictionary.closeWordsTo(typo);  
}  
  
}
```

추가로 새로운 factory가 생기더라도 SpellChecker 클래스의 코드는 전혀 변경이 없다.

```java
public class MockDictionaryFactory implements DictionaryFactory {  
  
@Override  
public Dictionary getDictionary() {  
return new MockDictionary();  
}  
  
}
```

### Spring IoC

- IoC 컨테이너를 사용하면 검증된 코드를 사용할 수 있으며 자바 표준 스펙도 지원한다.
- 손쉽게 Singleton scope를 사용할 수 있다.
- 객체 생성(bean) 관련 lifecycle interface를 제공한다.

```java 
@Component  
public class SpringDictionary implements Dictionary {  
  
@Override  
public boolean contains(String word) {  
System.out.println("contains " + word);  
return false;  
}  
  
@Override  
public List<String> closeWordsTo(String typo) {  
return null;  
}  
  
}
```

```java
@Component  
public class SpellChecker {  
  
private Dictionary dictionary;  
  
public SpellChecker(Dictionary dictionary) {  
this.dictionary = dictionary;  
}  
  
public boolean isValid(String word) {  
return dictionary.contains(word);  
}  
  
public List<String> suggestions(String typo) {  
return dictionary.closeWordsTo(typo);  
}  
}
```

```java
@Configuration
@ComponentScan(basePackageClasses = AppConfig.class)
public class AppConfig { 
  
}
```

```java
public class App {  
  
public static void main(String[] args) {  
ApplicationContext applicationContext = new AnnotationConfigApplicationContext(AppConfig.class);  
SpellChecker spellChecker = applicationContext.getBean(SpellChecker.class);  
spellChecker.isValid("test");  
}  
}

```

>[!note]
> 딱히 달라진게 없어 보이지만 Spring은 이 상태를 원한다.
> Spring 코드가 개발자의 코드에 노출되는 것을 원하지 않는다.
> Spring 철학 중 하나가 non-Invasive이다. [[POJO]] 유지
