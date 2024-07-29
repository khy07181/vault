---
title: Factory Method Pattern
aliases: 
categories: 
tags:
  - design-pattern
created: 2024-06-17 21:56
---
![|1000](https://i.imgur.com/CAunDXA.png)

부모 클래스에서 객체들을 생성할 수 있는 인터페이스를 제공하지만, 자식 클래스들이 생성될 객체들의 유형을 변경할 수 있도록 하는 생성 패턴
객체 생성의 책임을 서브클래스에 위임한다.
객체 생성 코드를 캡슐화하여 클라이언트 코드가 구체적인 클래스 이름에 의존하지 않도록 한다.
- 객체 생성 로직의 변경이 필요할 때 클라이언트 코드를 수정하지 않고도 확장할 수 있다.

```java
public interface Transport {  
  
    void deliver();  
  
    int getCapacity();  
  
    double getSpeed();  
}
```

```java
public class Truck implements Transport {  
  
    private int capacity;  
  
    private double speed;  
  
    public Truck(int capacity, double speed) {  
        this.capacity = capacity;  
        this.speed = speed;  
    }  
  
    @Override  
    public void deliver() {  
        System.out.println("Delivering goods by truck");  
    }  
  
    @Override  
    public int getCapacity() {  
        return capacity;  
    }  
  
    @Override  
    public double getSpeed() {  
        return speed;  
    }  
}
```

```java
public class Ship implements Transport {  
  
    private int capacity;  
  
    private double speed;  
  
    public Ship(int capacity, double speed) {  
        this.capacity = capacity;  
        this.speed = speed;  
    }  
  
    @Override  
    public void deliver() {  
        System.out.println("Delivering goods by ship");  
    }  
  
    @Override  
    public int getCapacity() {  
        return capacity;  
    }  
  
    @Override  
    public double getSpeed() {  
        return speed;  
    }  
}
```

```java
public class Airplane implements Transport {  
  
    private int capacity;  
  
    private double speed;  
  
    public Airplane(int capacity, double speed) {  
        this.capacity = capacity;  
        this.speed = speed;  
    }  
  
    @Override  
    public void deliver() {  
        System.out.println("Delivering goods by airplane");  
    }  
  
    @Override  
    public int getCapacity() {  
        return capacity;  
    }  
  
    @Override  
    public double getSpeed() {  
        return speed;  
    }  
}
```

```java
public abstract class TransportFactory {  
  
    public abstract Transport createTransport(int capacity, double speed);  
      
}
```

```java
public class TruckFactory extends TransportFactory {  
  
    @Override  
    public Transport createTransport(int capacity, double speed) {  
        return new Truck(capacity, speed);  
    }  
}
```

```java
public class ShipFactory extends TransportFactory {  
  
    @Override  
    public Transport createTransport(int capacity, double speed) {  
        return new Ship(capacity, speed);  
    }  
}
```

```java
public class AirplaneFactory extends TransportFactory {  
  
    @Override  
    public Transport createTransport(int capacity, double speed) {  
        return new Airplane(capacity, speed);  
    }  
}
```

```java
class FactoryMethodTest {  
  
    @Test  
    void factoryMethod() {  
        TransportFactory truckFactory = new TruckFactory();  
        TransportFactory shipFactory = new ShipFactory();  
        TransportFactory airplaneFactory = new AirplaneFactory();  
  
        Transport truck = truckFactory.createTransport(10, 80.0);  
        Transport ship = shipFactory.createTransport(200, 30.0);  
        Transport airplane = airplaneFactory.createTransport(50, 600.0);  
  
        then(truck.getClass()).isEqualTo(Truck.class);  
        then(ship.getClass()).isEqualTo(Ship.class);  
        then(airplane.getClass()).isEqualTo(Airplane.class);  
    }  
  
}
```
