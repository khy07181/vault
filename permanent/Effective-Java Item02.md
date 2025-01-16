---
title: Effective-Java Item02
aliases: 생성자에 매개변수가 많다면 빌더를 고려하라
categories: java
tags: effective-java, java
created: 2023-07-26 00:01
updated: 2024-09-19T17:45
---

생성자와 정적 팩토리 메소드는 선택적 매개변수가 많을 때 적절히 대응하기 어렵다.
고려할 수 있는 방안은 다음과 같다.

### 점층적 생성자 패턴

- 매개변수가 늘어나면 읽기, 작성이 좋지 않다.

```java
public class NutritionFacts {  
	private final int servingSize;  
	private final int servings;  
	private final int calories;  
	private final int fat;  
	private final int sodium;  
	private final int carbohydrate;  
  
	public NutritionFacts(int servingSize, int servings) {  
		this(servingSize, servings, 0);  
	}  
  
	public NutritionFacts(int servingSize, int servings, int calories) {  
		this(servingSize, servings, calories, 0);  
	}  
  
	public NutritionFacts(int servingSize, int servings, int calories, int fat) {  
		this(servingSize, servings, calories, fat, 0);  
	}  
  
	public NutritionFacts(int servingSize, int servings, int calories, int fat, int sodium) {  
		this(servingSize, servings, calories, fat, sodium, 0);  
	}  
  
	public NutritionFacts(int servingSize, int servings, int calories, int fat, int sodium, int carbohydrate) {  
		this.servingSize = servingSize;  
		this.servings = servings;  
		this.calories = calories;  
		this.fat = fat;  
		this.sodium = sodium;  
		this.carbohydrate = carbohydrate;  
	}  
  
	public static void main(String[] args) {  
		NutritionFacts cocaCola = new NutritionFacts(10, 10);  
	}  
  
}
```

### JavaBeans Pattern

- 완전한 객체를 만드려면 메소드를 여러번 호출해야 한다.
- 필수 값 세팅없이 사용될 수 있다.
- 클래스를 불변으로 만들 수 없다.

```java
public class NutritionFacts {
    private int servingSize = -1;
    private int servings = -1;
    private int calories = 0;
    private int fat = 0;
    private int sodium = 0;
    private int carbohydrate = 0;
    private boolean healthy;

    public NutritionFacts() {
    }

    public void setServingSize(int servingSize) {
        this.servingSize = servingSize;
    }

    public void setServings(int servings) {
        this.servings = servings;
    }

    public void setCalories(int calories) {
        this.calories = calories;
    }

    public void setFat(int fat) {
        this.fat = fat;
    }

    public void setSodium(int sodium) {
        this.sodium = sodium;
    }

    public void setCarbohydrate(int carbohydrate) {
        this.carbohydrate = carbohydrate;
    }

    public void setHealthy(boolean healthy) {
        this.healthy = healthy;
    }

    public static void main(String[] args) {
        NutritionFacts cocaCola = new NutritionFacts();
        cocaCola.setServingSize(240);
        cocaCola.setServings(8);
        cocaCola.setFat(100);
        cocaCola.setCalories(100);
        cocaCola.setSodium(35);
        cocaCola.setCarbohydrate(27);
    }

}
```

### Builder Pattern

- Lombok 의 @Builder 는 필수값을 생성자로 받고 사용할 수 없다.
- 직접 작성하면 필수값을 설정 가능하다.

```java
public class NutritionFacts {
    private final int servingSize;
    private final int servings;
    private final int calories;
    private final int fat;
    private final int sodium;
    private final int carbohydrate;

    public static void main(String[] args) {
        NutritionFacts cocaCola = new Builder(240, 8)
                .calories(100)
                .sodium(35)
                .carbohydrate(27)
                .build();
    }

    public static class Builder {
        // 필수
        private final int servingSize;
        private final int servings;

        // 선택 - 기본값 초기화
        private int calories = 0;
        private int fat = 0;
        private int sodium = 0;
        private int carbohydrate = 0;

        // Lombok 의 @Builder 는 필수값을 생성자로 받고 사용할 수 없다.
        // 직접 작성하면 필수값을 설정 가능
        public Builder(int servingSize, int servings) {
            this.servingSize = servingSize;
            this.servings = servings;
        }

        public Builder calories(int val) {
            calories = val;
            return this;
        }

        public Builder fat(int val) {
            fat = val;
            return this;
        }

        public Builder sodium(int val) {
            sodium = val;
            return this;
        }

        public Builder carbohydrate(int val) {
            carbohydrate = val;
            return this;
        }

        public NutritionFacts build() {
            return new NutritionFacts(this);
        }
    }

    private NutritionFacts(Builder builder) {
        servingSize = builder.servingSize;
        servings = builder.servings;
        calories = builder.calories;
        fat = builder.fat;
        sodium = builder.sodium;
        carbohydrate = builder.carbohydrate;
    }

}
```

### Hierarchical Builder

- 계층적으로 설계된 클래스와 잘 어울리는 빌더 패턴

```java
public abstract class Pizza {  
	public enum Topping {HAM, MUSHROOM, ONION, PEPPER, SAUSAGE}  
  
	final Set<Topping> toppings;  
  
	abstract static class Builder<T extends Builder<T>> {  
		EnumSet<Topping> toppings = EnumSet.noneOf(Topping.class);  
  
		public T addTopping(Topping topping) {  
		toppings.add(Objects.requireNonNull(topping));  
		return self();  
	}  
  
	abstract Pizza build();  
  
	// 하위 클래스는 이 메서드를 재정의(overriding)하여  
	// "this"를 반환하도록 해야 한다.  
	protected abstract T self();  
	}  
  
	Pizza(Builder<?> builder) {  
		toppings = builder.toppings.clone();  
	}  
	
}
```

```java 
public class NewYorkPizza extends Pizza {  
	public enum Size {SMALL, MEDIUM, LARGE}  
  
	private final Size size;  
  
	public static class Builder extends Pizza.Builder<Builder> {  
		private final Size size;  
  
		public Builder(Size size) {  
			this.size = Objects.requireNonNull(size);  
		}  
  
		@Override  
		public NewYorkPizza build() {  
			return new NewYorkPizza(this);  
		}  
  
		@Override  
		protected Builder self() {  
			return this;  
		}  
	}  
  
	private NewYorkPizza(Builder builder) {  
		super(builder);  
		size = builder.size;  
	}  
  
	@Override  
	public String toString() {  
		return toppings + "로 토핑한 뉴욕 피자";  
	}  
  
}
```

```java
public class Calzone extends Pizza {  
	private final boolean sauceInside;  
  
	public static class Builder extends Pizza.Builder<Builder> {  
		private boolean sauceInside = false; // 기본값  
  
		public Builder sauceInside() {  
			sauceInside = true;  
			return this;  
		}  
  
		@Override public Calzone build() {  
			return new Calzone(this);  
		}  
  
		@Override protected Builder self() {
			 return this; 
		}  
	}  
  
	private Calzone(Builder builder) {  
		super(builder);  
		sauceInside = builder.sauceInside;  
	}  
  
	@Override 
	public String toString() {  
		return String.format("%s로 토핑한 칼초네 피자 (소스는 %s에)",  toppings, sauceInside ? "안" : "바깥"); 
	}  
	
}
```

```java
class PizzaTest {  
	public static void main(String[] args) {  
		NewYorkPizza pizza = new NewYorkPizza.Builder(SMALL)  
				.addTopping(SAUSAGE)  
				.addTopping(ONION)  
				.build();  
  
		Calzone calzone = new Calzone.Builder()  
				.addTopping(HAM)  
				.sauceInside()  
				.build();  
  
		System.out.println(pizza);  
		System.out.println(calzone);  
	}  
}
```

### Links

[이펙티브 자바 완벽 공략 1부](https://www.inflearn.com/course/%EC%9D%B4%ED%8E%99%ED%8B%B0%EB%B8%8C-%EC%9E%90%EB%B0%94-1/dashboard)
[ITEM 2: Builder Pattern](https://dahye-jeong.gitbook.io/java/java/effective_java/2021-01-13-builder-pattern)
