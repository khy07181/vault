---
title: Decorator Pattern
aliases:
classification:
tags:
  - design-pattern
created: 2025-02-18T22:03
updated: 2025-12-06T19:52
---
객체들을 새로운 행동들을 포함한 특수 래퍼 객체들 내에 넣어서 위 행동들을 해당 객체들에 연결시키는 구조적 디자인 패턴

```java
public interface Coffee {  
    String getDescription();  
    double getCost();  
}
```

```java
public class SimpleCoffee implements Coffee {  
    @Override  
    public String getDescription() {  
       return "Simple coffee";  
    }  
  
    @Override  
    public double getCost() {  
        return 5.0;  
    }  
}
```

```java
public class MilkDecorator extends CoffeeDecorator {
    public MilkDecorator(Coffee decoratedCoffee) {
        super(decoratedCoffee);
    }

    @Override
    public String getDescription() {
        return super.getDescription() + ", milk";
    }

    @Override
    public double getCost() {
        return super.getCost() + 1.5;
    }
}

```

```java
public class SugarDecorator extends CoffeeDecorator {  
    public SugarDecorator(Coffee decoratedCoffee) {  
        super(decoratedCoffee);  
    }  
  
    @Override  
    public String getDescription() {  
        return super.getDescription() + ", sugar";  
    }  
  
    @Override  
    public double getCost() {  
        return super.getCost() + 0.5;  
    }  
}
```

```java
public class CoffeeDecorator implements Coffee {  
    protected final Coffee decoratedCoffee;  
  
    public CoffeeDecorator(Coffee decoratedCoffee) {  
        this.decoratedCoffee = decoratedCoffee;  
    }  
  
    @Override  
    public String getDescription() {  
        return decoratedCoffee.getDescription();  
    }  
  
    @Override  
    public double getCost() {  
        return decoratedCoffee.getCost();  
    }  
}
```

```java
class CoffeeDecoratorTest {  
  
    @Test  
    void decorator() {  
       Coffee simpleCoffee = new SimpleCoffee();  
        System.out.println(simpleCoffee.getDescription() + ": " + simpleCoffee.getCost());  
  
        Coffee milkCoffee = new MilkDecorator(new SimpleCoffee());  
        System.out.println(milkCoffee.getDescription() + ": " + milkCoffee.getCost());  
  
        Coffee sugarCoffee = new SugarDecorator(new MilkDecorator(new SimpleCoffee()));  
        System.out.println(sugarCoffee.getDescription() + ": " + sugarCoffee.getCost());  
    }  
  
}
```

```
Simple coffee: 5.0
Simple coffee, milk: 6.5
Simple coffee, milk, sugar: 7.0
```

---

```java
public interface Text {  
    String getContent();  
}
```

```java
public class PlainText implements Text {  
    private String content;  
  
    public PlainText(String content) {  
        this.content = content;  
    }  
  
    @Override  
    public String getContent() {  
        return content;  
    }  
}
```

```java
public abstract class TextDecorator implements Text {  
    protected final Text decoratedText;  
  
    public TextDecorator(Text decoratedText) {  
        this.decoratedText = decoratedText;  
    }  
  
    @Override  
    public String getContent() {  
        return decoratedText.getContent();  
    }  
}
```

```java
public class BoldDecorator extends TextDecorator {
    public BoldDecorator(Text text) {
        super(text);
    }

    @Override
    public String getContent() {
        return "<b>" + decoratedText.getContent() + "</b>";
    }
}

```

```java
public class ItalicDecorator extends TextDecorator {
    public ItalicDecorator(Text text) {
        super(text);
    }

    @Override
    public String getContent() {
        return "<i>" + decoratedText.getContent() + "</i>";
    }
}

```

```java
public class UnderlineDecorator extends TextDecorator {  
    public UnderlineDecorator(Text text) {  
        super(text);  
    }  
  
    @Override  
    public String getContent() {  
        return "<u>" + decoratedText.getContent() + "</u>";  
    }  
}
```

```java
class TextDecoratorTest {

    @Test
    void decorator() {
        Text text = new PlainText("Hello, Decorator Pattern!");
        System.out.println("Plain text: " + text.getContent());

        text = new BoldDecorator(text);
        System.out.println("Bold text: " + text.getContent());

        text = new ItalicDecorator(text);
        System.out.println("Bold and Italic text: " + text.getContent());

        text = new UnderlineDecorator(text);
        System.out.println("Bold, Italic and Underline text: " + text.getContent());

        Text anotherText = new UnderlineDecorator(new ItalicDecorator(new PlainText("Another example")));
        System.out.println("Underline and Italic text: " + anotherText.getContent());
    }
}

```

```
Plain text: Hello, Decorator Pattern!
Bold text: <b>Hello, Decorator Pattern!</b>
Bold and Italic text: <i><b>Hello, Decorator Pattern!</b></i>
Bold, Italic and Underline text: <u><i><b>Hello, Decorator Pattern!</b></i></u>
Underline and Italic text: <u><i>Another example</i></u>
```
