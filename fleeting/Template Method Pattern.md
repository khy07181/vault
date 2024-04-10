---
title: Template Method Pattern
aliases:
  - Template Method
categories: 
tags:
  - design-pattern
created: 2024-04-10 10:18
---

### Template Method Pattern

- 객체 지향 디자인 패턴 중 하나로, 알고리즘의 구조를 메소드에 정의하고, 일부 단계를 서브 클래스에서 확장할 수 있게 하는 패턴
- 주로 상위 클래스에서 골격을 정의하고, 하위 클래스에서 그 틀의 일부를 구체적으로 구현할 수 있게 한다.
- 코드 중복을 줄이고 재사용 가능성을 높이며, 확장에 용이한 구조를 만들 수 있다.
- 고정된 프로세스를 필요로 하는 어플리케이션에 적합하며, 특히 프레임워크 내에서 많이 사용된다.

```java
abstract class CaffeineBeverage {
    // Template method
    final void prepareRecipe() {
        boilWater();
        brew();
        pourInCup();
        addCondiments();
    }

	// 서브클래스에서 구체적으로 구현될 메소드
    abstract void brew();       
    abstract void addCondiments();

    void boilWater() {
        System.out.println("Boiling water");
    }

    void pourInCup() {
        System.out.println("Pouring into cup");
    }
}
```

```java
public class Tea extends CaffeineBeverage {
    void brew() {
        System.out.println("Steeping the tea");
    }

    void addCondiments() {
        System.out.println("Adding lemon");
    }
}
```

```java
public class Coffee extends CaffeineBeverage {
    void brew() {
        System.out.println("Dripping Coffee through filter");
    }

    void addCondiments() {
        System.out.println("Adding sugar and milk");
    }
}
```
