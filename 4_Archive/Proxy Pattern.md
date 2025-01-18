---
title: Proxy Pattern
aliases: 
classification: resource
tags:
  - design-pattern
  - OOP
created: 2024-10-09 12:14
updated: 2025-01-18T21:31
---
대상 원본 객체를 대리하여 대신 처리하게 함으로써 로직의 흐름을 제어하는 행동 패턴

일반적으로 다음과 같은 경우에 자주 사용된다.
1. 보안
	- 보안상 민감한 기능을 가지고 있는 객체의 경우 보안상의 기준을 통과한 경우에만 접근
2. 지연 초기화
	- 실제 객체를 생성하는 비용이 큰 경우 필요한 시점에 로드
3. 데이터 유효성 검사
4. Caching
5. logging
실제 클래스를 대리하는 프록시를 만듦으로써 성능을 최적화하고 접근 제어가 필요한 로직을 효율적으로 설계할 수 있다.

```java
public interface Image {

    void display();

    String getFileName();

}
```

```java
public class RealImage implements Image {

    private String fileName;

    public RealImage(String fileName) {
        this.fileName = fileName;
        loadFromDisk(fileName);
    }

    private void loadFromDisk(String fileName) {
        System.out.println("Loading " + fileName);
    }

    @Override
    public void display() {
        System.out.println("Displaying " + fileName);
    }

    @Override
    public String getFileName() {
        return fileName;
    }
}
```

```java
public class ProxyImage implements Image {  
  
    private RealImage realImage;  
  
    private String fileName;  
  
    public ProxyImage(String fileName) {  
        this.fileName = fileName;  
    }  
  
    @Override  
    public void display() {  
        if (realImage == null) {  
            realImage = new RealImage(fileName);  
        }  
        realImage.display();  
    }  
  
    @Override  
    public String getFileName() {  
        return fileName;  
    }  
  
    public String getFileExtension() {  
        int lastIndexOfDot = fileName.lastIndexOf(".");  
        if (lastIndexOfDot == -1) {  
            return "";  
        }  
        return fileName.substring(lastIndexOfDot + 1);  
    }  
}
```

```java
class ImageTest {  
  
    @Test  
    void proxy() {  
        ProxyImage iamge = new ProxyImage("test_image.jpg");  
  
        System.out.println("File name: " + iamge.getFileName());  
        System.out.println("File extension: " + iamge.getFileExtension());  
  
        iamge.display();  
        iamge.display();  
    }  
  
}
```

```
File name: test_image.jpg
File extension: jpg
Loading test_image.jpg
Displaying test_image.jpg
Displaying test_image.jpg
```

```java
public interface BankAccount {

    void withdraw(double amount);

    void deposit(double amount);

}
```

```java
public class RealBankAccount implements BankAccount {

    private double balance;

    public RealBankAccount(double initialBalance) {
        this.balance = initialBalance;
    }

    @Override
    public void withdraw(double amount) {
        if (balance >= amount) {
            balance -= amount;
            System.out.println(amount + " withdrawn. Current balance: " + balance);
        } else {
            System.out.println("Insufficient balance.");
        }
    }

    @Override
    public void deposit(double amount) {
        balance += amount;
        System.out.println(amount + " deposited. Current balance: " + balance);
    }
}
```

```java
public class BankAccountProxy implements BankAccount {

    private RealBankAccount realBankAccount;
    private String userRole;

    public BankAccountProxy(String userRole, double initialBalance) {
        this.userRole = userRole;
        this.realBankAccount = new RealBankAccount(initialBalance);
    }

    private boolean hasAccess () {
        return "Admin".equalsIgnoreCase(userRole);
    }

    @Override
    public void withdraw(double amount) {
        if (hasAccess()) {
            realBankAccount.withdraw(amount);
        } else {
            System.out.println("Access denied. Only Admin can withdraw.");
        }
    }

    @Override
    public void deposit(double amount) {
        realBankAccount.deposit(amount);
    }
}
```

```java
class BankAccountTest {  
  
    @Test  
    void proxy() {  
        // User with Admin access  
        BankAccount adminAccount = new BankAccountProxy("Admin", 1000);  
        adminAccount.deposit(500); // Deposit allowed  
        adminAccount.withdraw(300); // Withdraw allowed  
  
        // User without Admin access        
        BankAccount userAccount = new BankAccountProxy("User", 1000);  
        userAccount.deposit(500); // Deposit allowed  
        userAccount.withdraw(300); // Withdraw denied  
    }  
  
}
```

```
500.0 deposited. Current balance: 1500.0
300.0 withdrawn. Current balance: 1200.0
500.0 deposited. Current balance: 1500.0
Access denied. Only Admin can withdraw.
```
