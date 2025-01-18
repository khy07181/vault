---
title: Prototype Pattern
aliases: 
classification: resource
tags:
  - design-pattern
created: 2025-01-14 10:51
updated: 2025-01-18T22:13
---
생성 비용이 큰 클래스의 인스턴스들을 매번 새로 생성하는 것이 아닌, 한 번 만들어진 프로토 타입을 복제해서 사용할 수 있도록 하는 패턴

```java
public interface Prototype {  
    Prototype clone();  
}
```

```java
public class Person implements Prototype {  
  
    private String name;  
    private int age;  
    private String address;  
  
    public Person(String name, int age, String address) {  
        this.name = name;  
        this.age = age;  
        this.address = address;  
    }  
  
    public Person(Person other) {  
        this.name = other.name;  
        this.age = other.age;  
        this.address = other.address;  
    }  
  
    @Override  
    public Person clone() {  
        return new Person(this);  
    }  
  
    public void updateAddress(String newAddress) {  
        this.address = newAddress;  
    }  
  
    public void displayInfo() {  
        System.out.println("Name: " + name + ", Age: " + age + ", Address: " + address);  
    }  
}
```

```java
class PersonTest {  
  
    @Test  
    void prototype() {  
        Person original = new Person("John", 30, "123 Main St");  
        original.displayInfo();  
  
        Person cloned = original.clone();  
        cloned.updateAddress("456 Clone St");  
  
        original.displayInfo();  
        cloned.displayInfo();  
    }  
  
}
```

```
Name: John, Age: 30, Address: 123 Main St
Name: John, Age: 30, Address: 123 Main St
Name: John, Age: 30, Address: 456 Clone St
```

---

```java
public interface Prototype {  
    Prototype clone();  
}
```

```java
public interface Document extends Prototype {  
  
    void setContent(String content);  
  
    String getContent();  
}
```

```java
public class TextDocument implements Document {  
  
    private String content;  
  
    public TextDocument(String content) {  
        this.content = content;  
    }  
  
    @Override  
    public Prototype clone() {  
        return new TextDocument(this.content);  
    }  
  
    @Override  
    public void setContent(String content) {  
        this.content = content;  
    }  
  
    @Override  
    public String getContent() {  
        return content;  
    }  
  
}
```

```java
public class DocumentTemplateManager {  
  
    private static final Map<String, Document> templates = new HashMap<>();  
  
    public static void addTemplate(String name, Document document) {  
        templates.put(name, document);  
    }  
  
    public static Document createDocument(String templateName) {  
        Document template = templates.get(templateName);  
        if (template == null) {  
            throw new IllegalArgumentException("Template not found: " + templateName);  
        }  
        return (Document) template.clone();  
    }  
}
```

```java
class DocumentTest {

    @Test
    void prototype() {
        DocumentTemplateManager.addTemplate(
                "welcome",
                new TextDocument("Welcome, {name}!")
        );
        DocumentTemplateManager.addTemplate(
                "meeting",
                new TextDocument("Meeting scheduled on {date} at {time}")
        );

        Document welcomeDocument = DocumentTemplateManager.createDocument("welcome");
        welcomeDocument.setContent(
                welcomeDocument.getContent().replace("{name}", "John Doe")
        );

        System.out.println("Welcome document: " + welcomeDocument.getContent());

        Document meetingDocument = DocumentTemplateManager.createDocument("meeting");
        welcomeDocument.setContent(
                welcomeDocument.getContent()
                        .replace("{date}", "2025-01-14")
                        .replace("{time}", "14:00")
        );

        System.out.println("Meeting document: " + meetingDocument.getContent());
    }

}
```

```
Welcome document: Welcome, John Doe!
Meeting document: Meeting scheduled on {date} at {time}
```
