---
title: Flyweight Pattern
aliases:
classification:
tags:
  - design-pattern
created: 2025-02-20T23:01
updated: 2025-12-06T19:52
---
재사용 가능한 객체 인스턴스를 공유시켜 메모리 사용량을 최소화하는 구조 패턴

```java
public class Book {  
  
    private final String title;  
  
    public Book(String title) {  
        this.title = title;  
    }  
  
    public void read() {  
        System.out.println("Reading book ttitle: " + title);  
    }  
}
```

```java
public class Bookshelf {  
  
    private static final Map<String, Book> bookshelf = new HashMap<>();  
  
    public static Book getBook(String title) {  
        Book book = bookshelf.get(title);  
  
        if (book == null) {  
            book = new Book(title);  
            bookshelf.put(title, book);  
            System.out.println("Adding a new book to the bookshelf: " + title);  
  
            return book;  
        }  
  
        System.out.println("Returning an existing book from the bookshelf: " + title);  
        return book;  
    }  
}
```

```java
class BookshelfTest {  
  
    @Test  
    void flyweight() {  
        Book book1 = Bookshelf.getBook("Effective Java");  
        book1.read();  
  
        Book book2 = Bookshelf.getBook("Effective Java");  
        book2.read();  
  
        Book book3 = Bookshelf.getBook("Clean Code");  
        book3.read();  
  
        System.out.println(book1 == book2 ? "Same book for 'Effective Java'" : "Different books for 'Effective Java'");  
    }  
}
```

```
Adding a new book to the bookshelf: Effective Java
Reading book ttitle: Effective Java
Returning an existing book from the bookshelf: Effective Java
Reading book ttitle: Effective Java
Adding a new book to the bookshelf: Clean Code
Reading book ttitle: Clean Code
Same book for 'Effective Java'
```

---

```java
public interface Font {
    void apply(String text);
}
```

```java
public class ConcreteFont implements Font {

    private String font;
    private int size;
    private String color;

    public ConcreteFont(String font, int size, String color) {
        this.font = font;
        this.size = size;
        this.color = color;
    }

    @Override
    public void apply(String text) {
        System.out.println(
                "Text: '" + text + "' with Font: " + font + ", Size: " + size + ", Color: " + color);
    }

}
```

```java
public class FontFactory {  
  
    private static final HashMap<String, Font> fontMap = new HashMap<>();  
  
    public static Font getFont(String font, int size, String color) {  
        String key = font + size + color;  
        Font concreteFont = fontMap.get(key);  
  
        if (concreteFont == null) {  
            concreteFont = new ConcreteFont(font, size, color);  
            fontMap.put(key, concreteFont);  
            System.out.println("Creating a new font: " + key);  
  
            return concreteFont;  
        }  
  
        System.out.println("Returning font: " + key);  
        return concreteFont;  
    }  
}
```

```java
class FontFactoryTest {  
  
    @Test  
    void flyweight() {  
        Font font1 = FontFactory.getFont("Arial", 12, "Black");  
        font1.apply("Hello, World!");  
  
        Font font2 = FontFactory.getFont("Arial", 12, "Black");  
        font2.apply("Hello, World!");  
  
        Font font3 = FontFactory.getFont("Times New Roman", 14, "Blue");  
        font3.apply("Design Patterns");  
  
        Font font4 = FontFactory.getFont("Arial", 12, "Black");  
        font4.apply("Another Text");  
    }  
  
}
```

```
Creating a new font: Arial12Black
Text: 'Hello, World!' with Font: Arial, Size: 12, Color: Black
Returning font: Arial12Black
Text: 'Hello, World!' with Font: Arial, Size: 12, Color: Black
Creating a new font: Times New Roman14Blue
Text: 'Design Patterns' with Font: Times New Roman, Size: 14, Color: Blue
Returning font: Arial12Black
Text: 'Another Text' with Font: Arial, Size: 12, Color: Black
```
