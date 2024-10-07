---
title: Facade Pattern
aliases:
  - Facade
categories: 
tags:
  - design-pattern
  - OOP
  - java
created: 2024-08-06 11:19
updated: 2024-08-06 11:59
---
어떤 건물의 외벽, 전면을 의미하는 프랑스어 Facade는 여러 요소들로 복잡하게 구성된 시스템을 하나의 창구를 통해 간단하게 사용할 수 있도록 하는 디자인 패턴이다.

### 예시 코드

```java
public class Thermostat {
    public void setTemperature(int temperature) {
        System.out.println("Setting thermostat to " + temperature + " degrees.");
    }
}
```

```java
public class Lights {
    public void on() {
        System.out.println("Lights are on.");
    }

    public void off() {
        System.out.println("Lights are off.");
    }
}
```

```java
public class CoffeeMaker {  
    public void brewCoffee() {  
        System.out.println("Brewing coffee.");  
    }  
}
```

```java
public class SmartHomeFacade {
    private Thermostat thermostat;
    private Lights lights;
    private CoffeeMaker coffeeMaker;

    public SmartHomeFacade(Thermostat thermostat, Lights lights, CoffeeMaker coffeeMaker) {
        this.thermostat = thermostat;
        this.lights = lights;
        this.coffeeMaker = coffeeMaker;
    }

    public void wakeUp() {
        System.out.println("Waking up...");
        thermostat.setTemperature(22);
        lights.on();
        coffeeMaker.brewCoffee();
    }

    public void leaveHome() {
        System.out.println("Leaving home...");
        thermostat.setTemperature(18);
        lights.off();
    }
}
```

```java
class SmartHomeFacadeTest {  
  
    @Test  
    void smartHomeFacadeTest() {  
        Thermostat thermostat = new Thermostat();  
        Lights lights = new Lights();  
        CoffeeMaker coffeeMaker = new CoffeeMaker();  
  
        SmartHomeFacade smartHome = new SmartHomeFacade(thermostat, lights, coffeeMaker);  
  
        smartHome.wakeUp();  
        smartHome.leaveHome();  
    }  
}
```

```
Waking up...
Setting thermostat to 22 degrees.
Lights are on.
Brewing coffee.

Leaving home...
Setting thermostat to 18 degrees.
Lights are off.
```

---

```java
class FileReader {
    public String readFile(String filePath) throws IOException {
        return new String(Files.readAllBytes(Paths.get(filePath)));
    }
}
```

```java
class FileWriter {
    public void writeFile(String filePath, String content) throws IOException {
        Files.write(Paths.get(filePath), content.getBytes());
    }
}
```

```java
class FileDeleter {
    public void deleteFile(String filePath) throws IOException {
        Files.delete(Paths.get(filePath));
    }
}
```

```java
class FileSystemFacade {
    private FileReader fileReader;
    private FileWriter fileWriter;
    private FileDeleter fileDeleter;

    public FileSystemFacade() {
        this.fileReader = new FileReader();
        this.fileWriter = new FileWriter();
        this.fileDeleter = new FileDeleter();
    }

    public String readFile(String filePath) {
        try {
            return fileReader.readFile(filePath);
        } catch (IOException e) {
            System.err.println("Error reading file: " + e.getMessage());
            return null;
        }
    }

    public boolean writeFile(String filePath, String content) {
        try {
            fileWriter.writeFile(filePath, content);
            return true;
        } catch (IOException e) {
            System.err.println("Error writing file: " + e.getMessage());
            return false;
        }
    }

    public boolean deleteFile(String filePath) {
        try {
            fileDeleter.deleteFile(filePath);
            return true;
        } catch (IOException e) {
            System.err.println("Error deleting file: " + e.getMessage());
            return false;
        }
    }
}
```

```java
class FileSystemFacadeTest {  
  
    @Test  
    void fileSystemFacadeTest() {  
        FileSystemFacade fs = new FileSystemFacade();  
  
        // Write to file  
        boolean writeSuccess = fs.writeFile("test.txt", "Hello, Facade Pattern!");  
        System.out.println("File write success: " + writeSuccess);  
  
        // Read from file  
        String content = fs.readFile("test.txt");  
        System.out.println("File content: " + content);  
  
        // Delete file  
        boolean deleteSuccess = fs.deleteFile("test.txt");  
        System.out.println("File delete success: " + deleteSuccess);  
    }  
}
```

```
File write success: true
File content: Hello, Facade Pattern!
File delete success: true
```

### Links

[얄팍한 코딩사전 - 파사드(Facade) 패턴](https://www.youtube.com/playlist?list=PLpO7kx5DnyIFMZnGJyez_kpM8Bvy6Y1_w)
[refactroing guru - facade parttern](https://refactoring.guru/ko/design-patterns/facade)
[퍼사드(Facade) 패턴 - 완벽 마스터하기](https://inpa.tistory.com/entry/GOF-%F0%9F%92%A0-%ED%8D%BC%EC%82%AC%EB%93%9CFacade-%ED%8C%A8%ED%84%B4-%EC%A0%9C%EB%8C%80%EB%A1%9C-%EB%B0%B0%EC%9B%8C%EB%B3%B4%EC%9E%90)
