---
title: Multi-line String
aliases: 
classification: java
tags:
  - java
  - string
created: 2024-01-30 10:40
updated: 2025-01-18T20:16
---
Java 에서 여러 줄 문자열을 선언하는 방법

### Text Blocks

- Java 15

```java
public String textBlocks() {
    return """
        Get busy living
        or
        get busy dying.
        --Stephen King""";
}
```

### String Join

- Java 8

```java
private final String NEW_LINE = System.getProperty("line.separator");

public String stringJoin() {  
    return String.join(NEW_LINE,  
            "Get busy living",  
            "or",  
            "get busy dying.",  
            "--Stephen King");  
}
```

### StringBuilder

- Java 1.5

```java
private final String NEW_LINE = System.getProperty("line.separator");

public String stringBuilder() {
    return new StringBuilder()
            .append("Get busy living")
            .append(NEW_LINE)
            .append("or")
            .append(NEW_LINE)
            .append("get busy dying.")
            .append(NEW_LINE)
            .append("--Stephen King")
            .toString();
}
```

### Links

[Java Multi-line String](https://www.baeldung.com/java-multiline-string)
