---
title: Builder Pattern
aliases: 
categories: 
tags: 
created: 2024-07-29 17:32
updated: 2024-09-19T17:45
---
복잡한 객체들을 단계별로 생성할 수 있도록 하는 생성 디자인 패턴, 생성하는 방법을 정의하는 클래스를 별도로 분리하여, 동일한 생성 과정에서 다양한 표현을 만들 수 있다.

### 예시 코드

```java
public class Pizza {
    private final String dough;
    private final String sauce;
    private final String topping;

    private Pizza(PizzaBuilder builder) {
        this.dough = builder.dough;
        this.sauce = builder.sauce;
        this.topping = builder.topping;
    }

    @Override
    public String toString() {
        return "Pizza with " + dough + " dough, " + sauce + " sauce, and " + topping + " topping.";
    }

    public static class PizzaBuilder {
        private String dough;
        private String sauce;
        private String topping;

        public PizzaBuilder dough(String dough) {
            this.dough = dough;
            return this;
        }

        public PizzaBuilder sauce(String sauce) {
            this.sauce = sauce;
            return this;
        }

        public PizzaBuilder topping(String topping) {
            this.topping = topping;
            return this;
        }

        public Pizza build() {
            return new Pizza(this);
        }
    }
}
```

```java
public interface PizzaBuilder {
    PizzaBuilder buildDough();
    PizzaBuilder buildSauce();
    PizzaBuilder buildTopping();
    Pizza build();
}
```

```java
public class HawaiianPizzaBuilder implements PizzaBuilder {
    private Pizza.PizzaBuilder builder;

    public HawaiianPizzaBuilder() {
        this.builder = new Pizza.PizzaBuilder();
    }

    @Override
    public PizzaBuilder buildDough() {
        builder.dough("cross");
        return this;
    }

    @Override
    public PizzaBuilder buildSauce() {
        builder.sauce("mild");
        return this;
    }

    @Override
    public PizzaBuilder buildTopping() {
        builder.topping("ham+pineapple");
        return this;
    }

    @Override
    public Pizza build() {
        return builder.build();
    }
}
```

```java
public class SpicyPizzaBuilder implements PizzaBuilder {
    private Pizza.PizzaBuilder builder;

    public SpicyPizzaBuilder() {
        this.builder = new Pizza.PizzaBuilder();
    }

    @Override
    public PizzaBuilder buildDough() {
        builder.dough("pan baked");
        return this;
    }

    @Override
    public PizzaBuilder buildSauce() {
        builder.sauce("hot");
        return this;
    }

    @Override
    public PizzaBuilder buildTopping() {
        builder.topping("pepperoni+salami");
        return this;
    }

    @Override
    public Pizza build() {
        return builder.build();
    }
}
```

```java
public class Waiter {
    private PizzaBuilder pizzaBuilder;

    public void setPizzaBuilder(PizzaBuilder pizzaBuilder) {
        this.pizzaBuilder = pizzaBuilder;
    }

    public Pizza getPizza() {
        return pizzaBuilder.build();
    }

    public void constructPizza() {
        pizzaBuilder.buildDough().buildSauce().buildTopping();
    }
}
```

```java
public class BuilderPatternDemo {
    public static void main(String[] args) {
        Waiter waiter = new Waiter();
        PizzaBuilder hawaiianPizzaBuilder = new HawaiianPizzaBuilder();
        PizzaBuilder spicyPizzaBuilder = new SpicyPizzaBuilder();

        waiter.setPizzaBuilder(hawaiianPizzaBuilder);
        waiter.constructPizza();
        Pizza pizza1 = waiter.getPizza();
        System.out.println(pizza1);

        waiter.setPizzaBuilder(spicyPizzaBuilder);
        waiter.constructPizza();
        Pizza pizza2 = waiter.getPizza();
        System.out.println(pizza2);
    }
}
```
