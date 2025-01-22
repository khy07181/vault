---
title: Composite Pattern
aliases: 
classification: resource
tags:
  - design-pattern
created: 2025-01-21T21:11
updated: 2025-01-21T21:48
---

특정 클래스의 객체들을 트리 관계로 다루고 포함하는 객체와 포함되는 객체를 같은 인터페이스로 다룰 수 있도록 하는 패턴

```java
public interface Component {

    int getPrice();

}
```

```java
@Getter
public class Bag implements Component {

    private List<Component> components = new ArrayList<>();

    public void add(Component component) {
        components.add(component);
    }

    @Override
    public int getPrice() {
        return components.stream().mapToInt(Component::getPrice).sum();
    }
}
```

```java
public class Item implements Component {

    private String name;

    private int price;

    public Item(String name, int price) {
        this.name = name;
        this.price = price;
    }

    @Override
    public int getPrice() {
        return this.price;
    }
}
```

```java
class CompositeTest {  
  
    @Test  
    void composite() {  
        Item doranBlade = new Item("도란검", 450);  
        Item healPotion = new Item("체력 물약", 50);  
  
        Bag bag = new Bag();  
        bag.add(doranBlade);  
        bag.add(healPotion);  
  
        System.out.println(doranBlade.getPrice());  
        System.out.println(bag.getPrice());  
    }  
  
}
```

```
450
500
```
