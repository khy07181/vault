---
title: Mediator Pattern
aliases: 
classification: resource
tags:
  - design-pattern
created: 2025-04-14T22:35
updated: 2025-04-14T23:09
---
객체 간의 직접 통신을 제한하고 중재자 객체를 통해서만 협력하도록 하여 객체 간의 혼란스러운 의존 관계들을 줄일 수 있는 행동 디자인 패턴

```java
public interface ChatMediator {

    void sendMessage(String message, User user);

    void addUser(User user);

}
```

```java
public class ChatMediatorImpl implements ChatMediator {

    private final List<User> users;

    public ChatMediatorImpl() {
        this.users = new ArrayList<>();
    }

    @Override
    public void sendMessage(String message, User user) {
        for (User u : this.users) {
            if (u != user) {
                u.receive(message);
            }
        }
    }

    @Override
    public void addUser(User user) {
        this.users.add(user);
    }
}
```

```java
public abstract class User {

    protected ChatMediator mediator;
    protected String name;

    public User(ChatMediator mediator, String name) {
        this.mediator = mediator;
        this.name = name;
    }

    public abstract void send(String message);

    public abstract void receive(String message);
}
```

```java
public class UserImpl extends User {

    public UserImpl(ChatMediator mediator, String name) {
        super(mediator, name);
    }

    @Override
    public void send(String message) {
        System.out.println(this.name + ": Sending Message = " + message);
        mediator.sendMessage(message, this);
    }

    @Override
    public void receive(String message) {
        System.out.println(this.name + ": Received Message: " + message);
    }
}
```

```java
class ChatMediatorTest {  
  
    @Test  
    void mediator() {  
        ChatMediator mediator = new ChatMediatorImpl();  
  
        User user1 = new UserImpl(mediator, "John");  
        User user2 = new UserImpl(mediator, "Jane");  
        User user3 = new UserImpl(mediator, "Bob");  
        User user4 = new UserImpl(mediator, "Alice");  
  
        mediator.addUser(user1);  
        mediator.addUser(user2);  
        mediator.addUser(user3);  
        mediator.addUser(user4);  
  
        user1.send("Hi All");  
    }  
}
```

```
John: Sending Message = Hi All
Jane: Received Message: Hi All
Bob: Received Message: Hi All
Alice: Received Message: Hi All
```

---

```java
public interface AirportMediator {

    boolean isRunwayAvailable();

    void setRunwayAvailability(boolean status);

}
```

```java
public class AirportControlTower implements AirportMediator {
    private boolean isRunwayAvailable = true;

    public boolean isRunwayAvailable() {
        return isRunwayAvailable;
    }

    public void setRunwayAvailability(boolean status) {
        isRunwayAvailable = status;
    }
}
```

```java
public class Flight {

    private final AirportMediator mediator;

    private final String flightNumber;

    public Flight(AirportMediator mediator, String flightNumber) {
        this.mediator = mediator;
        this.flightNumber = flightNumber;
    }

    public void land() {
        if (mediator.isRunwayAvailable()) {
            System.out.println("Flight " + flightNumber + " is landing.");
            mediator.setRunwayAvailability(false);
        } else {
            System.out.println("Flight " + flightNumber + " is waiting to Land.");
        }
    }
}

```

```java
public class Runway {  
  
    private final AirportMediator mediator;  
  
    public Runway(AirportMediator mediator) {  
        this.mediator = mediator;  
  
    }  
  
    public void clear() {  
        System.out.println("Runway is clear.");  
        mediator.setRunwayAvailability(true);  
    }  
}
```

```java
class AirportMediatorTest {  
  
    @Test  
    void mediator() {  
        AirportMediator controlTower = new AirportControlTower();  
  
        Flight flight1 = new Flight(controlTower, "KE123");  
        Flight flight2 = new Flight(controlTower, "0Z456");  
        Runway runway = new Runway(controlTower);  
  
        flight1.land();  
        flight2.land();  
        runway.clear();  
        flight2.land();  
    }  
  
}
```

```
Flight KE123 is landing.
Flight 0Z456 is waiting to Land.
Runway is clear.
Flight 0Z456 is landing.
```
