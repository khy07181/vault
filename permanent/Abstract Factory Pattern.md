---
title: Abstract Factory Pattern
aliases: 
categories: 
tags:
  - design-pattern
created: 2024-06-18 16:16
updated: 2024-09-19T17:45
---
![](https://i.imgur.com/rL5sYe5.png)

객체들의 구상 클래스(Concrete class)들을 지정하지 않고도 관련 객체들의 모음을 생성할 수 있도록 하는 생성 패턴
>[!info] 구상 클래스(Concrete class)
>- Abstract class 와 대조적인 클래스로 구체적이고 명확한 뜻을 가진 클래스

### 예시 코드

Abstract Product Class

```java
public interface Engine {
    void design();
}

public interface Tire {
    void design();
}

public interface Body {
    void design();
}
```

 Concrete Product Class

 ```java
public class USEngine implements Engine {
    @Override
    public void design() {
        System.out.println("Designing engine for US market.");
    }
}

public class USTire implements Tire {
    @Override
    public void design() {
        System.out.println("Designing tire for US market.");
    }
}

public class USBody implements Body {
    @Override
    public void design() {
        System.out.println("Designing body for US market.");
    }
}
```

```java
public class EUEngine implements Engine {
    @Override
    public void design() {
        System.out.println("Designing engine for EU market.");
    }
}

public class EUTire implements Tire {
    @Override
    public void design() {
        System.out.println("Designing tire for EU market.");
    }
}

public class EUBody implements Body {
    @Override
    public void design() {
        System.out.println("Designing body for EU market.");
    }
}
```

Abstract Factory Interface

```java
public interface CarFactory {
    Engine createEngine();
    Tire createTire();
    Body createBody();
}
```

Concrete Factory Class

```java
public class USCarFactory implements CarFactory {
    @Override
    public Engine createEngine() {
        return new USEngine();
    }

    @Override
    public Tire createTire() {
        return new USTire();
    }

    @Override
    public Body createBody() {
        return new USBody();
    }
}
```

```java
public class EUCarFactory implements CarFactory {
    @Override
    public Engine createEngine() {
        return new EUEngine();
    }

    @Override
    public Tire createTire() {
        return new EUTire();
    }

    @Override
    public Body createBody() {
        return new EUBody();
    }
}
```

Product Class

```java
public class Car {
    private Engine engine;
    private Tire tire;
    private Body body;

    public Car(CarFactory factory) {
        this.engine = factory.createEngine();
        this.tire = factory.createTire();
        this.body = factory.createBody();
    }

    public void assemble() {
        engine.design();
        tire.design();
        body.design();
        System.out.println("Car assembly complete.");
    }
}
```

---

```java
class AbstractFactoryTest {  
  
    @Test  
    void abstractFactoryTest() {  
        CarFactory usFactory = new USCarFactory();  
        CarFactory euFactory = new EUCarFactory();  
  
        Car usCar = new Car(usFactory);  
        usCar.assemble();  
  
        Car euCar = new Car(euFactory);  
        euCar.assemble();  
    }  
}
```

### [[Factory Method Pattern]]과 비교

- [[Factory Method Pattern]] 은 factory 를 구현하는 방법(inheritance)에 초점을 두고, 구체적인 객체 생성 과정을 하위 또는 구체적인 클래스로 옮기는 것이 목적이다.
- Abstract Factory Pattern은 factory를 사용하는 방법(composition)에 초점을 두고, 관련있는 여러 객체를 구체적인 클래스에 의존하지 않고 만들 수 있게 해주는 것이 목적이다.
