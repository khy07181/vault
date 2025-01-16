---
title: Bridge Pattern
aliases: 
categories: 
tags:
  - design-pattern
  - OOP
created: 2024-10-08 12:13
updated: 2024-10-08T00:41
---
추상화와 구현을 분리해서 이 둘을 독립적으로 다양화할 수 있도록 하는 패턴

```java  
public interface Device {  
    void tuoOn();  
  
    void turnOff();  
  
    void setVolume(int volume);  
  
    boolean isEnabled();  
}  
```  

```java  
public class TV implements Device {  
  
    private boolean on = false;  
  
    private int volume = 30;  
  
    @Override  
    public void tuoOn() {  
        on = true;  
        System.out.println("TV is now ON.");  
    }  
  
    @Override  
    public void turnOff() {  
        on = false;  
        System.out.println("TV is now OFF.");  
  
    }  
  
    @Override  
    public void setVolume(int volume) {  
        this.volume = volume;  
        System.out.println("TV Volume is set to " + volume);  
    }  
  
    @Override  
    public boolean isEnabled() {  
        return on;  
    }  
}
```  

```java  
public class Radio implements Device {  
  
    private boolean on = false;  
  
    private int volume = 30;  
  
    @Override  
    public void tuoOn() {  
        on = true;  
        System.out.println("Radio is now ON.");  
    }  
  
    @Override  
    public void turnOff() {  
        on = false;  
        System.out.println("Radio is now OFF.");  
    }  
  
    @Override  
    public void setVolume(int volume) {  
        this.volume = volume;  
        System.out.println("Radio Volume is set to " + volume);  
    }  
  
    @Override  
    public boolean isEnabled() {  
        return on;  
    }  
} 
```  

```java  
public abstract class Remote {  
  
    protected Device device;  
  
    protected Remote(Device device) {  
        this.device = device;  
    }  
  
    public abstract void power();  
  
    public void volumeUp() {  
        device.setVolume(device.isEnabled() ? 1 : 0);  
    }  
  
    public void volumeDown() {  
        device.setVolume(device.isEnabled() ? -1 : 0);  
    }  
  
} 
```  

```java  
public class BasicRemote extends Remote {  
  
    protected BasicRemote(Device device) {  
        super(device);  
    }  
  
    @Override  
    public void power() {  
        if (device.isEnabled()) {  
            device.turnOff();  
            return;  
        }  
        device.tuoOn();  
    }  
}
```  

```java  
public class AdvancedRemote extends Remote {  
  
    protected AdvancedRemote(Device device) {  
        super(device);  
    }  
  
    @Override  
    public void power() {  
        if (device.isEnabled()) {  
            device.turnOff();  
            return;  
        }  
        device.tuoOn();  
    }  
  
    public void mute() {  
        device.setVolume(0);  
        System.out.println("Device is muted.");  
    }  
}
```

```
TV is now ON.
TV Volume is set to 1

Radio is now ON.
Radio Volume is set to 0
Device is muted.
```

---

```java
public interface MessageSender {  
  
    void sendMessage(String message);  
  
}
```

```java
public class EmailSender implements MessageSender {  
  
    @Override  
    public void sendMessage(String message) {  
        System.out.println("Sending email with message: " + message);  
    }  
  
}
```

```java
public class SMSSender implements MessageSender {  
  
    @Override  
    public void sendMessage(String message) {  
        System.out.println("Sending SMS with message: " + message);  
    }  
  
}
```

```java
public abstract class Message {  
  
    protected MessageSender messageSender;  
  
    protected Message(MessageSender messageSender) {  
        this.messageSender = messageSender;  
    }  
  
    public abstract void send(String message);  
}
```

```java
public class TextMessage extends Message {  
  
    protected TextMessage(MessageSender messageSender) {  
        super(messageSender);  
    }  
  
    @Override  
    public void send(String message) {  
        messageSender.sendMessage("Text Message: " + message);  
    }  
}
```

```java
public class EncryptedMessage extends Message {  
  
    protected EncryptedMessage(MessageSender messageSender) {  
        super(messageSender);  
    }  
  
    @Override  
    public void send(String message) {  
        String encryptedMessage = encrypt(message);  
        messageSender.sendMessage("Encrypted Message: " + encryptedMessage);  
    }  
  
    private String encrypt(String message) {  
        return new StringBuilder(message).reverse().toString();  
    }  
}
```

```
Sending email with message: Text Message: Hello, World!
Sending SMS with message: Encrypted Message: !dlroW ,olleH
```
