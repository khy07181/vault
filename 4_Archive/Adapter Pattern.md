---
title: Adapter Pattern
aliases: 
classification: resource
tags:
  - design-pattern
  - OOP
created: 2024-10-07 11:41
updated: 2025-01-18T21:28
---

클래스를 Adapter 로 사용하는 구조 패턴으로, 호환성이 없는 인터페이스 때문에 함께 동작할 수 없는 클래스들을 함께 작동해주도록 변환 역할을 해주는 행동 패턴

```java  
public interface OldMessageSender {  
  
    int send(String[] messageData);  
  
}  
```  

```java  
public interface ModernMessageSender {  
  
    void sendMessage(String message, String recipient);  
  
}  
```  

```java  
public class OldMessageSystem implements OldMessageSender {  
    @Override    public int send(String[] messageData) {  
        System.out.println("OldMessageSystem: Sending message " + messageData[0] + " to " + messageData[1]);  
  
        return 1;    }  
}  
```  

```java  
public class MessageAdapter implements ModernMessageSender {  
  
    private OldMessageSender oldSystem;  
    public MessageAdapter(OldMessageSender oldSystem) {  
        this.oldSystem = oldSystem;    }  
  
    @Override    public void sendMessage(String message, String recipient) {  
        String[] messageData = {message, recipient};  
        int result = oldSystem.send(messageData);  
        if (result != 1) {  
            System.out.println("Failed to send message");  
        }  
    }  
}  
```  

```java  
class MessageAdapterTest {  
  
    @Test    void adapter() {  
        OldMessageSystem oldSystem = new OldMessageSystem();  
        MessageAdapter adapter = new MessageAdapter(oldSystem);  
  
        adapter.sendMessage("Hello, World!", "john@example.com");  
        // OldMessageSystem: Sending message Hello, World! to john@example.com
    }  
  
}  
```

---

```java  
public class USB {  
  
    void connectWithUsbCable(String data) {  
        System.out.println("Displaying via USB with data: " + data);  
    }  
  
}  
```  

```java  
public class HDMI {  
  
    void connectWithHdmiCable(int resolution) {  
        System.out.println("Displaying via HDMI with resolution: " + resolution + "p");  
    }  
}  
```  

```java  
public class VGA {  
  
    void connectWithVgaCable(boolean highQuality) {  
        System.out.println("Displaying via VGA with high quality: " + highQuality);  
    }  
}  
```  

```java  
public interface DisplayAdapter {  
  
    void display();  
  
}  
```  

```java  
public class USBAdapter implements DisplayAdapter {  
  
    private USB usb;  
    private String data;  
  
    public USBAdapter(USB usb, String data) {  
        this.usb = usb;  
        this.data = data;  
    }  
  
    @Override  
    public void display() {  
        usb.connectWithUsbCable(data);  
    }  
  
} 
```  

```java  
public class HDMIAdapter implements DisplayAdapter {  
  
    private HDMI hdmi;  
  
    private int resolution;  
  
    public HDMIAdapter(HDMI hdmi, int resolution) {  
        this.hdmi = hdmi;  
        this.resolution = resolution;  
    }  
  
    @Override  
    public void display() {  
        hdmi.connectWithHdmiCable(resolution);  
    }  
  
}
```  

```java  
public class VGAAdapter implements DisplayAdapter {  
  
    private VGA vga;  
  
    private boolean highQuality;  
  
    public VGAAdapter(VGA vga, boolean highQuality) {  
        this.vga = vga;  
        this.highQuality = highQuality;  
    }  
  
    @Override  
    public void display() {  
        vga.connectWithVgaCable(highQuality);  
    }  
}
```  

```java  
class DisplayAdapterTest {  
  
    @Test  
    void adapter() {  
        USB usb = new USB();  
        HDMI hdmi = new HDMI();  
        VGA vga = new VGA();  
  
        List<DisplayAdapter> adapters = List.of(  
                new USBAdapter(usb, "Video data"),  
                new HDMIAdapter(hdmi, 1080),  
                new VGAAdapter(vga, true)  
        );  
  
        for (DisplayAdapter adapter : adapters) {  
            adapter.display();  
        }  
    }  
  
}
```

```
Displaying via USB with data: Video data
Displaying via HDMI with resolution: 1080p
Displaying via VGA with high quality: true
```
