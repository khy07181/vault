---
title: Singleton
aliases: 
categories: 
tags:
  - design-pattern
created: 2024-06-04 22:13
---

### singleton 패턴을 가장 단순히 구현하는 방법

- private 생성자와 public static 메소드를 사용하는 방법
- 멀티스레드 환경에서 안전하지 않다.

```java
public class Settings1 {  
  
    private static Settings1 instance;  
  
    private Settings1() {  
    }
    
    public static Settings1 getInstance() {  
        if (instance == null) {  
            instance = new Settings1();  
        }   
        return instance;  
    }  
  
}
```

### 멀티 쓰레드 환경에서 안전하게 구현하는 방법

- getInstance() 를 호출할 때마다 동기화 작업 때문에 성능이 떨어질 수 있다.
	- 동기화가 lock 을 가지고 있는 스레드만 접근할 수 있게끔 한다.

```java
public class Settings2 {  
  
    private static Settings2 instance;  
  
    private Settings2() {  
    }    // synchronized 사용해서 동기화 처리  
    public static synchronized Settings2 getInstance() {  
        if (instance == null) {  
            instance = new Settings2();  
        }  
        return instance;  
    }  
}
```

#### Eager initialization

- 객체를 나중에 만들지 않아도 되고 만드는 비용이 비싸지 않다면 미리 만들어도 된다.

```java
public class Settings2 {  
  
    private static final Settings2 INSTANCE = new Settings2();  
  
    private Settings2() {  
    }
    
    public static Settings2 getInstance() {  
        return INSTANCE;  
    }  
  
}
```

#### Double-checked locking

- instance 가 없는 경우에만 sychronized가 동작하여 double-check 을 통해 효율적으로 사용
- volatile 키워드를 반드시 사용해야 한다. (Java 1.5+)

```java
public class Settings3 {  
  
    private static volatile Settings3 instance;  
  
    private Settings3() { }  
  
    public static Settings3 getInstance() {  
        if (instance == null) {  
            synchronized (Settings3.class) {  
                if (instance == null) {  
                    instance = new Settings3();  
                }  
            }  
        }  
        return instance;  
    }
}
```

> [!info] volatile 키워드를 반드시 사용해야 하는 이유
> 자바에서 객체를 생성하는 과정은 다음과 같은 세 단계로 이루어진다.
> 1. 메모리 할당
> 2. 생성자를 호출하여 객체 초기화되기
> 3. 메모리 주소를 변수에 할당
>
> 컴파일러와 JVM은 최적화를 통해 명령어의 순서를 재배치할 수 있다. 이로 인해 다른 스레드가 객체가 완전히 초기화되기 전에 instance 변수에 할당된 메모리 주소를 읽을 수 있다. 이 경우, 다른 스레드에서 아직 초기화되지 않은 객체를 사용할 위험이 있다.
>
> volatile 키워드는 변수에 대한 읽기와 쓰기가 항상 메모리에서 이루어지도록 보장한다. 즉, 특정 스레드가 volatile 변수를 변경하면 다른 모든 스레드에 즉시 해당 변경 사항이 반영된다. 이를 통해 객체가 완전히 초기화되지 않은 상태에서 다른 스레드가 접근하는 문제를 방지할 수 있다.

#### static inner class holder

- 멀티스레드 환경에서 안전하고 getInstance() 가 호출될 때 SettingsHolder inner class가 호출이 되고 그 때 인스턴스를 만들기 때문에 lazy loading 가능하다.

```java
public class Settings4 {  
  
    private Settings4() { }  
  
    private static class Settings4Holder {  
        private static final Settings4 INSTANCE = new Settings4();  
    }  
  
    public static Settings4 getInstance() {  
        return Settings4Holder.INSTANCE;  
    }  
}
```

### Singleton 패턴을 깨트리는 방법

1. Reflection
- reflection 을 통해 private 생성자에 접근하면 singleton 이 깨질 수 있다.

```java
class Settings4Test {  
  
    @Test  
    void break_singleton_reflection()  
            throws NoSuchMethodException, InvocationTargetException, InstantiationException, IllegalAccessException {  
        Settings4 instance = Settings4.getInstance();  
  
        Constructor<Settings4> constructor = Settings4.class.getDeclaredConstructor();  
        constructor.setAccessible(true);  
        Settings4 newInstance = constructor.newInstance();  
  
        then(instance).isNotEqualTo(newInstance);  
    }  
}
```

2. Serialization&Deserialization
- Serializable 인터페이스를 구현하면 serialization/deserialization를 통해 singleton 이 깨질 수 있다.

```java
public class Settings4 implements Serializable {  
  
    private Settings4() { }  
  
    private static class Settings4Holder {  
        private static final Settings4 INSTANCE = new Settings4();  
    }  
  
    public static Settings4 getInstance() {  
        return Settings4Holder.INSTANCE;  
    }  
  
}
```

```java
@Test
void break_singleton_serialization() throws IOException, ClassNotFoundException {  
    Settings4 instance = Settings4.getInstance();  
  
    Settings4 deserializationInstance = null;  
    try (ObjectOutput out = new ObjectOutputStream(new FileOutputStream("settings.obj"))) {  
        out.writeObject(instance);  
    }  
  
    try (ObjectInput in = new ObjectInputStream(new FileInputStream("settings.obj"))) {  
        deserializationInstance = (Settings4) in.readObject();  
    }  
  
    then(instance).isNotEqualTo(deserializationInstance);  
}
```

다음과 같이 readResolve() 를 구현하면 deserialization 시 singleton 을 유지할 수 있다.

```java
public class Settings4 implements Serializable {  
  
    private Settings4() { }  
  
    private static class Settings4Holder {  
        private static final Settings4 INSTANCE = new Settings4();  
    }  
  
    public static Settings4 getInstance() {  
        return Settings4Holder.INSTANCE;  
    }  
  
    protected Object readResolve() {  
        return getInstance();  
    }  
}
```

### Enum Singleton

- Best Practice
- Singleton 이 깨지지 않도록 안전하고 간단하게 사용할 수 있다.
- 상속을 사용하지 못한다.
	- 상속이 필요하거나 lazy loading이 필요한 경우 [[Singleton#static inner class holder]] 사용하는 것이 좋다.

```java
public enum Settings5 {  
  
    INSTANCE
  
}
```

- Enum 은 reflection 을 통해 private 생성자에 접근해서 생성하는 것을 막아놓았기 때문에 singleton 이 깨지지 않는다.

```java
class Settings5Test {  
  
    @Test  
    void enum_break_singleton_reflection() {  
        Constructor<?>[] declaredConstructor = Settings5.class.getDeclaredConstructors();  
        Constructor<?> constructor = Arrays.stream(declaredConstructor).findAny().orElseThrow();  
  
        constructor.setAccessible(true);  
        assertThatThrownBy(constructor::newInstance)  
                .isInstanceOf(IllegalArgumentException.class)  
                .hasMessage("Cannot reflectively create enum objects");  
    }  
}
```

- Enum 은 Serializable 을 기본적으로 구현하고 있고 deserialization 하더라도 동일한 instance를 얻을 수 있다.

```java
class Settings5Test {  
  
    @Test  
    void enum_break_singleton_serialization() throws IOException, ClassNotFoundException {  
        Settings5 instance = Settings5.INSTANCE;  
  
        Settings5 deserializationInstance = null;  
        try (ObjectOutput out = new ObjectOutputStream(new FileOutputStream("settings.obj"))) {  
            out.writeObject(instance);  
        }  
  
        try (ObjectInput in = new ObjectInputStream(new FileInputStream("settings.obj"))) {  
            deserializationInstance = (Settings5) in.readObject();  
        }  
  
        then(instance).isEqualTo(deserializationInstance);  
    }  
}
```
