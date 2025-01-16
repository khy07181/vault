---
title: SOLID 원칙
aliases: 
categories: 
tags:
  - SOLID
  - OOP
created: 2023-07-12 00:37
updated: 2024-09-19T17:45
---
좋은 설계란 시스템에 새로운 요구사항이나 변경사항이 있을 때, 영향을 받는 범위가 적은 구조를 말한다. 그래서 시스템에 예상하지 못한 변경사항이 발생하더라도, 유연하게 대처하고 이후에 확장성이 있는 시스템 구조를 만들 수 있다.

SOLID 객체 지향 원칙을 적용하면 코드를 확장하고 유지 보수 관리하기가 더 쉬워지며, 불필요한 복잡성을 제거해 리펙토링에 소요되는 시간을 줄임으로써 프로젝트 개발의 생산성을 높일 수 있다

### SRP(Single Responsibility Principle)

- 단일 책임 원칙
- 각 클래스들은 하나의 책임만 가지고 있어야 한다.
`⛔️ Noncompliant Example`

```java
public class UserService {
    public void saveUser(User user) {
        // Save user to database
        System.out.println("User saved to database: " + user.getName());
    }

    public void sendWelcomeEmail(User user) {
        // Send welcome email to user
        System.out.println("Welcome email sent to: " + user.getEmail());
    }

    public void logUserActivity(User user) {
        // Log user activity
        System.out.println("Logging activity for user: " + user.getName());
    }
}

class User {
    private String name;
    private String email;

    public User(String name, String email) {
        this.name = name;
        this.email = email;
    }

    public String getName() {
        return name;
    }

    public String getEmail() {
        return email;
    }
}
```

`✅ Compliant Example

```java
public class UserRepository {
    public void saveUser(User user) {
        // Save user to database
        System.out.println("User saved to database: " + user.getName());
    }
}

public class EmailService {
    public void sendWelcomeEmail(User user) {
        // Send welcome email to user
        System.out.println("Welcome email sent to: " + user.getEmail());
    }
}

public class UserActivityLogger {
    public void logUserActivity(User user) {
        // Log user activity
        System.out.println("Logging activity for user: " + user.getName());
    }
}

class User {
    private String name;
    private String email;

    public User(String name, String email) {
        this.name = name;
        this.email = email;
    }

    public String getName() {
        return name;
    }

    public String getEmail() {
        return email;
    }
}

public class UserService {
    private UserRepository userRepository = new UserRepository();
    private EmailService emailService = new EmailService();
    private UserActivityLogger userActivityLogger = new UserActivityLogger();

    public void registerUser(User user) {
        userRepository.saveUser(user);
        emailService.sendWelcomeEmail(user);
        userActivityLogger.logUserActivity(user);
    }
}
```

### OCP(Open Closed Priciple)

- 개방 폐쇄 원칙
- 각 클래스가 확장에는 열려 있어야 하고, 변경에는 닫혀 있어야 한다.
`⛔️ Noncompliant Example`

```java
public class ReportGenerator {
    public void generateReport(String type) {
        if (type.equals("PDF")) {
            System.out.println("Generating PDF report...");
        } else if (type.equals("HTML")) {
            System.out.println("Generating HTML report...");
        }
        // If we need to add another format, we have to modify this method.
    }
}
```

`✅ Compliant Example`

```java
public interface Report {
    void generate();
}

public class PDFReport implements Report {
    @Override
    public void generate() {
        System.out.println("Generating PDF report...");
    }
}

public class HTMLReport implements Report {
    @Override
    public void generate() {
        System.out.println("Generating HTML report...");
    }
}

public class XMLReport implements Report {
    @Override
    public void generate() {
        System.out.println("Generating XML report...");
    }
}

public class Main {
    public static void main(String[] args) {
        Report pdfReport = new PDFReport();
        pdfReport.generate();  // Generating PDF report...

        Report htmlReport = new HTMLReport();
        htmlReport.generate();  // Generating HTML report...

        Report xmlReport = new XMLReport();
        xmlReport.generate();  // Generating XML report...
    }
}
```

### LSP(Liskov Substitution Priciple)

- 리스코프 치환 원칙
- 자식 클래스는 항상 부모 클래스를 대체할 수 있어야 한다.
`⛔️ Noncompliant Example`

```java
// Parent class Bird
public class Bird {
    public void fly() {
        System.out.println("Bird is flying");
    }
}

// Child class Penguin that violates LSP
public class Penguin extends Bird {
    @Override
    public void fly() {
        // Penguins cannot fly
        throw new UnsupportedOperationException("Penguins cannot fly");
    }
}

public class Main {
    public static void main(String[] args) {
        Bird bird = new Bird();
        bird.fly(); // Bird is flying

        Bird penguin = new Penguin();
        penguin.fly(); // Throws UnsupportedOperationException
    }
}
```

`✅ Compliant Example`

```java
// Interface for birds that can fly
public interface Flyable {
    void fly();
}

// Base class Bird
public class Bird {
    public void eat() {
        System.out.println("Bird is eating");
    }
}

// Class for a bird that can fly
public class Sparrow extends Bird implements Flyable {
    @Override
    public void fly() {
        System.out.println("Sparrow is flying");
    }
}

// Class for a bird that cannot fly
public class Penguin extends Bird {
    // Penguins do not implement Flyable
}

public class Main {
    public static void main(String[] args) {
        Bird sparrow = new Sparrow();
        sparrow.eat(); // Bird is eating
        ((Flyable) sparrow).fly(); // Sparrow is flying

        Bird penguin = new Penguin();
        penguin.eat(); // Bird is eating
        // ((Flyable) penguin).fly(); // Compilation error, Penguin is not Flyable
    }
}
```

---
`⛔️ Noncompliant Example`

```java
// Base class
class Rectangle {
    protected int width;
    protected int height;

    public void setWidth(int width) {
        this.width = width;
    }

    public void setHeight(int height) {
        this.height = height;
    }

    public int getArea() {
        return width * height;
    }
}

// Subclass violating LSP
class Square extends Rectangle {
    @Override
    public void setWidth(int width) {
        this.width = width;
        this.height = width;
    }

    @Override
    public void setHeight(int height) {
        this.width = height;
        this.height = height;
    }
}

// Client code
class AreaCalculator {
    public void calculateArea(Rectangle rectangle) {
        rectangle.setWidth(5);
        rectangle.setHeight(4);
        System.out.println("Area: " + rectangle.getArea());
        // Expected output for Rectangle: Area: 20
        // Actual output for Square: Area: 16 (LSP violation)
    }
}
```

`✅ Compliant Example`

```java
// Base interface
interface Shape {
    int getArea();
}

// Implementations
class Rectangle implements Shape {
    private int width;
    private int height;

    public Rectangle(int width, int height) {
        this.width = width;
        this.height = height;
    }

    @Override
    public int getArea() {
        return width * height;
    }
}

class Square implements Shape {
    private int side;

    public Square(int side) {
        this.side = side;
    }

    @Override
    public int getArea() {
        return side * side;
    }
}

// Client code
class AreaCalculator {
    public void calculateArea(Shape shape) {
        System.out.println("Area: " + shape.getArea());
    }
}

// Usage
public class Main {
    public static void main(String[] args) {
        AreaCalculator calculator = new AreaCalculator();

        // LSP Violation
        Rectangle rectangle = new Rectangle();
        calculator.calculateArea(rectangle); // Output: Area: 20

        Square square = new Square();
        calculator.calculateArea(square); // Output: Area: 16 (Unexpected)

        // LSP Compliant
        Shape rectangle = new Rectangle(5, 4);
        calculator.calculateArea(rectangle); // Output: Area: 20

        Shape square = new Square(5);
        calculator.calculateArea(square); // Output: Area: 25 (Expected)
    }
}
```

### ISP(Interface Segregation Principle)

- 인터페이스 분리 원칙
- 클래스는 자신이 사용하지 않을 메소드를 구현하도록 강요받지 않아야 한다.
`⛔️ Noncompliant Example`

```java
// Interface for workers
public interface Worker {
    void work();
    void eat();
}

// Class representing a regular worker
public class Employee implements Worker {
    @Override
    public void work() {
        System.out.println("Employee is working");
    }

    @Override
    public void eat() {
        System.out.println("Employee is eating");
    }
}

// Class representing a robot
public class Robot implements Worker {
    @Override
    public void work() {
        System.out.println("Robot is working");
    }

    @Override
    public void eat() {
        // Robots do not eat
        throw new UnsupportedOperationException("Robots do not eat");
    }
}

public class Main {
    public static void main(String[] args) {
        Worker employee = new Employee();
        employee.work(); // Employee is working
        employee.eat(); // Employee is eating

        Worker robot = new Robot();
        robot.work(); // Robot is working
        robot.eat(); // Throws UnsupportedOperationException
    }
}

```

`✅ Compliant Example`

```java
// Interface for work-related actions
public interface Workable {
    void work();
}

// Interface for eating-related actions
public interface Eatable {
    void eat();
}

// Class representing a regular worker
public class Employee implements Workable, Eatable {
    @Override
    public void work() {
        System.out.println("Employee is working");
    }

    @Override
    public void eat() {
        System.out.println("Employee is eating");
    }
}

// Class representing a robot
public class Robot implements Workable {
    @Override
    public void work() {
        System.out.println("Robot is working");
    }
    // Robot does not implement Eatable interface
}

public class Main {
    public static void main(String[] args) {
        Workable employee = new Employee();
        employee.work(); // Employee is working
        ((Eatable) employee).eat(); // Employee is eating

        Workable robot = new Robot();
        robot.work(); // Robot is working
        // ((Eatable) robot).eat(); // Compilation error, Robot does not implement Eatable
    }
}

```

### DIP(Dependency Inversion Principle)

- 의존 역전 원칙
- 고수준 모듈이 저수준 모듈에 의존해서는 안 된다.
`⛔️ Noncompliant Example`

```java
// Low-level class
public class Fan {
    public void spin() {
        System.out.println("Fan is spinning");
    }

    public void stop() {
        System.out.println("Fan is stopping");
    }
}

// High-level class
public class Switch {
    private Fan fan;

    public Switch(Fan fan) {
        this.fan = fan;
    }

    public void turnOn() {
        fan.spin();
    }

    public void turnOff() {
        fan.stop();
    }
}
```

`✅ Compliant Example`

```java
// Interface for switchable devices
public interface Switchable {
    void turnOn();
    void turnOff();
}

// Low-level class implementing the interface
public class Fan implements Switchable {
    @Override
    public void turnOn() {
        System.out.println("Fan is spinning");
    }

    @Override
    public void turnOff() {
        System.out.println("Fan is stopping");
    }
}

// High-level class
public class Switch {
    private Switchable device;

    public Switch(Switchable device) {
        this.device = device;
    }

    public void turnOn() {
        device.turnOn();
    }

    public void turnOff() {
        device.turnOff();
    }
}
```

### Links

[SOLID 원칙](https://www.youtube.com/@yalco-coding/videos)
[객체 지향 설계의 5가지 원칙 - S.O.L.I.D](https://inpa.tistory.com/entry/OOP-%F0%9F%92%A0-%EA%B0%9D%EC%B2%B4-%EC%A7%80%ED%96%A5-%EC%84%A4%EA%B3%84%EC%9D%98-5%EA%B0%80%EC%A7%80-%EC%9B%90%EC%B9%99-SOLID)
