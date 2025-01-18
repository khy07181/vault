---
title: Strategy Pattern
aliases:
  - Staretegy
classification: 
tags:
  - design-pattern
  - java
  - OOP
created: 2024-08-02 22:11
updated: 2025-01-18T20:16
---
특정 작업을 하는 방식, 전략들을 여러개 두고 필요에 따라 선택해서 사용할 수 있도록 하는 패턴

### 예시 코드

```java
public interface PaymentStrategy {

    void pay(int amount);
}
```

```java
public class CreditCardPayment implements PaymentStrategy {

    private String name;
    private String cardNumber;

    public CreditCardPayment(String name, String cardNumber) {
        this.name = name;
        this.cardNumber = cardNumber;
    }

    @Override
    public void pay(int amount) {
        System.out.println(amount + " paid with credit card.");
    }
}
```

```java
public class PayPalPayment implements PaymentStrategy {

    private String email;

    public PayPalPayment(String email) {
        this.email = email;
    }

    @Override
    public void pay(int amount) {
        System.out.println(amount + " paid with PayPal.");
    }
}
```

```java
public class ShoppingCart {

    private final PaymentStrategy paymentStrategy;

    public ShoppingCart(PaymentStrategy paymentStrategy) {
        this.paymentStrategy = paymentStrategy;
    }

    public void checkout(int amount) {
        paymentStrategy.pay(amount);
    }
}
```

```java
class PaymentStrategyTest {  
  
    @Test  
    void strategyTest() {  
        ShoppingCart creditCardCart = new ShoppingCart(new CreditCardPayment("John Doe", "1234567890123456"));  
        creditCardCart.checkout(100);  
  
        ShoppingCart payPalCart = new ShoppingCart(new PayPalPayment("johndoe@example.com"));  
        payPalCart.checkout(200);  
    }  
}
```

```java
100 paid with credit card.
200 paid with PayPal.
```

---

```java
public interface CompressionStrategy {

    String compress(String text);
}
```

```java
class RunLengthEncoding implements CompressionStrategy {
    @Override
    public String compress(String data) {
        StringBuilder compressed = new StringBuilder();
        int count = 1;
        for (int i = 1; i <= data.length(); i++) {
            if (i < data.length() && data.charAt(i) == data.charAt(i - 1)) {
                count++;
            } else {
                compressed.append(data.charAt(i - 1));
                compressed.append(count);
                count = 1;
            }
        }
        return compressed.toString();
    }
}
```

```java
public class SimpleReplacementCompression implements CompressionStrategy {

    @Override
    public String compress(String data) {
        return data.replace("a", "1")
                .replace("e", "2")
                .replace("i", "3")
                .replace("o", "4")
                .replace("u", "5");

    }
}
```

```java
public class Compressor {

    private final CompressionStrategy compressionStrategy;

    public Compressor(CompressionStrategy compressionStrategy) {
        this.compressionStrategy = compressionStrategy;
    }

    public String compress(String data) {
        return compressionStrategy.compress(data);
    }
}
```

```java
class CompressionStrategyTest {

    @Test
    void strategyTest() {
        String data = "aabcccccaaa";
        Compressor RLEcompressor = new Compressor(new RunLengthEncoding());
        Compressor simpleReplacementCompressor = new Compressor(new SimpleReplacementCompression());

        // a2b1c5a3
        System.out.println(RLEcompressor.compress(data));
        // 11bccccc111
        System.out.println(simpleReplacementCompressor.compress(data));
    }

}
```

### Strategy vs Temaplate Method

유사점
- Strategy pattern 과 [[Template Method Pattern]]은 알고리즘을 때에 따라 적용한다는 컨셉으로써, 둘이 공통점을 가지고 있다.
- 전략 및 Template Method Pattern은 개방형 폐쇄 원칙을 충족하고 코드를 변경하지 않고 소프트웨어 모듈을 쉽게 확장할 수 있도록 하는 데 사용할 수 있다. 

패턴 차이점

1. Strategy Pattern은 합성(composition)을 통해 해결책을 강구하며, Template Method Pattern은 상속(inheritance)을 통해 해결책을 제시한다.
2. 그래서 Strategy Pattern은 클라이언트와 객체 간의 결합이 느슨한 반면, Template Method Pattern에서는 두 모듈이 더 밀접하게 결합된다. (결합도가 높으면 안좋음)
3. Strategy Pattern에서는 대부분 인터페이스를 사용하지만, Template Method Pattern서는 주로 추상 클래스나 구체적인 클래스를 사용한다.
4. Strategy Pattern에서는 전체 전략 알고리즘을 변경할 수 있지만, Template Method Pattern에서는 알고리즘의 일부만 변경되고 나머지는 변경되지 않은 상태로 유지된다. (템플릿에 종속)
5. 따라서 단일 상속만이 가능한 자바에서 상속 제한이 있는 Template Method Pattern보다는, 다양하게 많은 전략을 implements 할 수 있는 Strategy Pattern이 협업에서 많이 사용되는 편이다.

### Link

[얄팍한 코딩사전 - Strategy Pattern](https://www.youtube.com/watch?v=xlaAiHrZN3U&list=PLPyAJnFDA5SHB7u2QLDUE9kA18N6vamzi&index=76)
[전략(Strategy) 패턴 - 완벽 마스터하기](https://inpa.tistory.com/entry/GOF-%F0%9F%92%A0-%EC%A0%84%EB%9E%B5Strategy-%ED%8C%A8%ED%84%B4-%EC%A0%9C%EB%8C%80%EB%A1%9C-%EB%B0%B0%EC%9B%8C%EB%B3%B4%EC%9E%90)
