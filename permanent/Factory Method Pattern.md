---
title: Factory Method Pattern
aliases: 
categories: 
tags:
  - design-pattern
created: 2024-06-17 21:56
updated: 2024-10-09T00:12
---
객체 생성을 Factory 클래스로 캡슐화하여 대신 생성하게 하는 생성 디자인 패턴

객체 생성 코드를 캡슐화하여 클라이언트 코드가 구체적인 클래스 이름에 의존하지 않도록 한다.
- 객체 생성 로직의 변경이 필요할 때 클라이언트 코드를 수정하지 않고도 확장할 수 있다.

```java
public interface Vehicle {  
  
    void drive();  
  
}
```

```java
public class Car implements Vehicle {  
    @Override  
    public void drive() {  
        System.out.println("Driving a car");  
    }  
}
```

```java
public class Motorcycle implements Vehicle {  
    @Override  
    public void drive() {  
        System.out.println("Riding a motorcycle");  
    }  
}
```

```java
public abstract class VehicleFactory {  
  
    abstract Vehicle createVehicle();  
  
    public void deliverVehicle() {  
        Vehicle vehicle = createVehicle();  
        System.out.println("Delivering the vehicle:");  
        vehicle.drive();  
    }  
}
```

```java
public class CarFactory extends VehicleFactory {
    @Override
    Vehicle createVehicle() {
        return new Car();
    }
}

```

```java
public class MotorcycleFactory extends VehicleFactory {  
    @Override  
    Vehicle createVehicle() {  
        return new Motorcycle();  
    }  
}
```

- Car 와 Motorcycle 객체를 직접 사용하지 않고 Factory 를 통해 생성

```java
class VehicleFactoryTest {  
  
    @Test
    void factoryMethod() {  
        VehicleFactory carFactory = new CarFactory();  
        carFactory.deliverVehicle();  
  
        VehicleFactory motorcycleFactory = new MotorcycleFactory();  
        motorcycleFactory.deliverVehicle();  
    }  
  
}
```

```
Delivering the vehicle:
Driving a car
Delivering the vehicle:
Riding a motorcycle
```

---

```java
public interface Product {  
  
    void create();  
  
}
```

```java
public class Electronics implements Product {
    @Override
    public void create() {
        System.out.println("Electronics product created.");
    }
}

```

```java
public class Clothing implements Product {
    @Override
    public void create() {
        System.out.println("Clothing product created.");
    }
}

```

```java
public class Book implements Product {  
    @Override  
    public void create() {  
        System.out.println("Book product created.");  
    }  
}
```

```java
public abstract class ProductFactory {

    public abstract Product createProduct(String type);

    public Product orderProduct(String type) {
        Product product = createProduct(type);
        product.create();
        return product;
    }

}
```

```java
public class ConcreteProductFactory extends ProductFactory {  
    @Override  
    public Product createProduct(String type) {  
        if (type.equalsIgnoreCase("electronics")) {  
            return new Electronics();  
        } else if (type.equalsIgnoreCase("clothing")) {  
            return new Clothing();  
        } else if (type.equalsIgnoreCase("book")) {  
            return new Book();  
        } else {  
            throw new IllegalArgumentException("Unknown product type.");  
        }  
    }  
}
```

- ConcreteProductFactory 만 사용해 어떤 값을 넣는지에 따라 다른 Product 객체를 생성
- 어떤 클래스의 객체가 만들어져 사용될지를 전적으로 Factory 에 위임함으로써 클라이언트 코드는 객체 종류의 변화에 영향을 받지 않는 독립된 요소로 분리될 수 있다.

```java
class ProductFactoryTest {  
  
    @Test
    void factoryMethod() {  
        ProductFactory factory = new ConcreteProductFactory();  
  
        Product electronics = factory.orderProduct("electronics");  
  
        Product clothing = factory.orderProduct("clothing");  
  
        Product book = factory.orderProduct("book");  
    }  
  
}
```

```
Electronics product created.
Clothing product created.
Book product created.

```

---

```java
public interface Payment {

    void processPayment(double amount);
}

```

```java
public class CreditCardPayment implements Payment {

    private String creditCardNumber;

    public CreditCardPayment(String creditCardNumber) {
        this.creditCardNumber = creditCardNumber;
    }

    @Override
    public void processPayment(double amount) {
        System.out.println("Credit card: $" + amount);
    }
}
```

```java
public class PayPalPayment implements Payment {

    private String payPalEmail;

    public PayPalPayment(String payPalEmail) {
        this.payPalEmail = payPalEmail;
    }

    @Override
    public void processPayment(double amount) {
        System.out.println("PayPal: $" + amount);
    }
}

```

```java
public class BankTransferPayment implements Payment {  
  
    private String bankAccountNumber;  
  
    public BankTransferPayment(String bankAccountNumber) {  
        this.bankAccountNumber = bankAccountNumber;  
    }  
  
    @Override  
    public void processPayment(double amount) {  
        System.out.println("Bank transfer: $" + amount);  
    }  
}
```

```java
public abstract class PaymentFactory {  
  
    abstract Payment createPayment(FinancialInfo info);  
  
}
```

```java
public class CreditCardPaymentFactory extends PaymentFactory {
    @Override
    Payment createPayment(FinancialInfo info) {
        return new CreditCardPayment(info.creditCardNumber);
    }
}

```

```java
public class PayPalPaymentFactory extends PaymentFactory {
    @Override
    Payment createPayment(FinancialInfo info) {
        return new PayPalPayment(info.payPalEmail);
    }
}

```

```java
public class BankTransferPaymentFactory extends PaymentFactory {  
    @Override  
    Payment createPayment(FinancialInfo info) {  
        return new BankTransferPayment(info.bankAccountNumber);  
    }  
}
```

```java
public class FinancialInfo {  
  
    String creditCardNumber;  
  
    String payPalEmail;  
  
    String bankAccountNumber;  
  
    public FinancialInfo(  
            String creditCardNumber,  
            String payPalEmail,  
            String bankAccountNumber  
    ) {  
        this.creditCardNumber = creditCardNumber;  
        this.payPalEmail = payPalEmail;  
        this.bankAccountNumber = bankAccountNumber;  
    }  
}
```

```java
class PaymentFactoryTest {  
  
    @Test  
    void factoryMethod() {  
        FinancialInfo info = new FinancialInfo(  
                "1234-5678-9012-3456",  
                "user@example.com",  
                "987654321"  
        );  
  
        PaymentFactory factory = new CreditCardPaymentFactory();  
        Payment payment = factory.createPayment(info);  
        payment.processPayment(100.0);  
  
        factory = new PayPalPaymentFactory();  
        payment = factory.createPayment(info);  
        payment.processPayment(200.0);  
  
        factory = new BankTransferPaymentFactory();  
        payment = factory.createPayment(info);  
        payment.processPayment(300.0);  
    }  
  
}
```

```
Credit card: $100.0
PayPal: $200.0
Bank transfer: $300.0
```
