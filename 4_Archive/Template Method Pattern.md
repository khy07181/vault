---
title: Template Method Pattern
aliases:
  - Template Method
classification: 
tags:
  - design-pattern
  - OOP
created: 2024-04-10 10:18
updated: 2025-01-18T20:16
---

### Template Method Pattern

여러 클래스에서 공통으로 사용하는 메서드를 템플릿화하여 상위 클래스에서 정의하고, 하위 클래스마다 세부 동작 사항을 다르게 구현하는 패턴
- 정해진 단계들을 거쳐서 실행되어야 하는 일들을 구현할 때 사용된다.
	- 각 단계를 어떻게 수행할 것인지 다양하게 구현할 수 있지만 반드시 순서에 따라 실행되어야 할 때 유용하다.

### 예시코드

구현할 알고리즘의 구조는 고정되고 세부 과정은 변경되거나 확장될 수 있는 경우에 유용하게 활용된다.

```java
abstract class Beverage {
    // Template method
    final void prepareRecipe() {
        boilWater();
        brew();
        pourInCup();
        addCondiments();
    }

    void boilWater() {
        System.out.println("Boiling water");
    }

    void pourInCup() {
        System.out.println("Pouring into cup");
    }

    abstract void brew();
    abstract void addCondiments();
}
```

```java
public class Tea extends Beverage {

    void brew() {
        System.out.println("Steeping the tea");
    }

    void addCondiments() {
        System.out.println("Adding lemon");
    }
}
```

```java
public class Coffee extends Beverage {

    void brew() {
        System.out.println("Dripping Coffee through filter");
    }

    void addCondiments() {
        System.out.println("Adding Sugar and Milk");
    }
}
```

```java
class CafeTest {  
  
    @Test  
    void templateMethodTest() {  
        Beverage tea = new Tea();  
        System.out.println("Making tea...");  
        tea.prepareRecipe();  
  
        System.out.println();  
  
        Beverage coffee = new Coffee();  
        System.out.println("Making coffee...");  
        coffee.prepareRecipe();  
    }  
}
```

```
Making tea...
Boiling water
Steeping the tea
Pouring into cup
Adding lemon

Making coffee...
Boiling water
Dripping Coffee through filter
Pouring into cup
Adding Sugar and Milk
```

---

```java
abstract class DataProcessor {
    public final void process(String data) {
        loadData(data);
        if (!isValidData(data)) {
            throw new IllegalArgumentException("Data is invalid, processing aborted.");
        }
        processData(data);
        saveData(data);
    }

    protected abstract void loadData(String data);
    protected abstract boolean isValidData(String data);
    protected abstract void processData(String data);
    protected abstract void saveData(String data);
}
```

```java
public class CSVDataProcessor extends DataProcessor {

    @Override
    protected void loadData(String data) {
        System.out.println("Loading data from CSV file: " + data);
    }

    @Override
    protected boolean isValidData(String data) {
        return data != null && data.contains("CSV");
    }

    @Override
    protected void processData(String data) {
        System.out.println("Processing CSV data");
    }

    @Override
    protected void saveData(String data) {
        System.out.println("Saving CSV data to database");
    }
}
```

```java
public class JSONDataProcessor extends DataProcessor {  
  
    @Override  
    protected void loadData(String data) {  
        System.out.println("Loading data from JSON file: " + data);  
    }  
  
    @Override  
    protected boolean isValidData(String data) {  
        return data != null && data.contains("JSON");  
    }  
  
    @Override  
    protected void processData(String data) {  
        System.out.println("Processing JSON data");  
    }  
  
    @Override  
    protected void saveData(String data) {  
        System.out.println("Saving JSON data to database");  
    }  
}
```

```java
class DataProcessorTest {

    @Test
    void templateMethod() {
        DataProcessor csvDataProcessor = new CSVDataProcessor();
        csvDataProcessor.process("CSV data");

        System.out.println();

        DataProcessor jsonProcessor = new JSONDataProcessor();
        assertThatThrownBy(() -> jsonProcessor.process("XML data"))
                .isInstanceOf(IllegalArgumentException.class)
                .hasMessage("Data is invalid, processing aborted.");
    }
}
```

```java
Loading data from CSV file: CSV data
Processing CSV data
Saving CSV data to database
```
