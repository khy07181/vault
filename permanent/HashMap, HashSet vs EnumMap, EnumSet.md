---
title: HashMap, HashSet vs EnumMap, EnumSet
aliases: hashMap vs enumMap
categories: java
tags: enum, enumMap, java
created: 2023-07-12 14:07
updated: 2024-09-19T17:45
---

EnumMap은 사용 가능한 모든 키를 이미 알고 있고, 내부적으로 배열에 값을 저장할 수 있다. 또한 겹치지 않는 일정한 순번을 가지고 있으니, 해싱을 할 필요도, 해시 충돌 (Hash Collision)을 처리할 필요도 없기 때문에 성능이 좋다.
> All of the keys in an enum map must come from a single enum type that is specified, explicitly or implicitly, when the map is created. Enum maps are represented internally as arrays. This representation is extremely compact and efficient.

Set의 경우에도 EnumSet은 모든 메소드가 산술 비트 연산을 사용하여 구현되기 때문에 HashSet 보다는 EnumSet을 사용하는 것이 좋다.
>A specialized Set implementation for use with enum types. All of the elements in an enum set must come from a single enum type that is specified, explicitly or implicitly, when the set is created. Enum sets are represented internally as bit vectors. This representation is extremely compact and efficient. The space and time performance of this class should be good enough to allow its use as a high-quality, typesafe alternative to traditional int-based "bit flags." Even bulk operations (such as `containsAll` and `retainAll`) should run very quickly if their argument is also an enum set.

>[!info]
>EnumMap, EnumSet 모두 Thread-safe 하지 않기 때문에
>필요하다면 다음과 같이 wrap하여 사용하는 것이 권장된다.

```java
Map<EnumKey, V> m = Collections.synchronizedMap(new EnumMap<EnumKey, V>(...));
```

```java
Set<MyEnum> s = Collections.synchronizedSet(EnumSet.noneOf(MyEnum.class));
```

### Links

[EnumMap(Java SE 17 & JDK 17)](https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/util/EnumMap.html)
[John Grib - Java enum의 사용](https://johngrib.github.io/wiki/java/enum/)
[A Guide to EnumMap](https://www.baeldung.com/java-enum-map)
[A Guide to EnumMap](https://www.baeldung.com/java-enumset)
