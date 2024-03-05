---
title: 2023-06-05
aliases: 
categories: daily
tags:
  - daily
created: 2023-06-05 09:57
---

### enum 의 value 값을 DB에 저장하는 방법

```java
@Converter(autoApply = true)  
public class StatusConverter implements AttributeConverter<Status, String> { 

	@Override  
	public String convertToDatabaseColumn(Status attribute) {  
		return attribute.value(); 
	}  
  
	@Override  
	public Status convertToEntityAttribute(String value) {  
		return Status.from(value);
	}  
  
}
```

```ad-question
AttributeConverter를 구현하지 않고 DB 컬럼에 저장할 수 있는 방법?
```
---
title: 2023-06-14
aliases: 
categories: daily
tags:
  - daily
created: 2023-06-14
---

### Stream - findFirst() vs findAny()

`findFirst()`
- 조건에 일치하는 첫번째 element를 반환한다.

`findAny()`
- 조건에 일치하는 요소 element를 반환한다.

Stream을 직렬로 처리할 경우 `findFirst()` 와 `findAny()`는 차이점이 없지만
병렬의 경우 `findAny()` 가장 먼저 찾은 element를 반환하고, `findFirst()` 는 가장 먼저 찾은 것이 아니라 가장 앞에 있는 element를 반환한다.

### IntelliJ에서 패키지 분리해서 표시하기

- Project 메뉴 -> Options -> Tree Appearance -> Compact Middle Packages 체크 해제
---
title: 2023-06-15
aliases: 
categories: daily
tags:
  - daily
created: 2023-06-15 15:30
---

### JPA Auditing 에서 createdAt 갱신

```java
@Getter  
@MappedSuperclass  
@EntityListeners(AuditingEntityListener.class)  
public abstract class BaseEntity {  
	@CreatedBy  
	@Column(updatable = false)
	protected String createdBy;
  
	@CreatedDate  
	@Column(updatable = false)  
	protected LocalDateTime createdAt;  
  
	@LastModifiedBy  
	protected String updatedBy;
  
	@LastModifiedDate  
	protected LocalDateTime updatedAt;  
  
}
```

JPA 에서는 새로운 객체를 만들어서 insert를 해도 pk만 같으면 update가 되는데
새로운 객체를 만들 때나 방어적 복사를 할 때 createdBy, createdAt을 값을 설정하지 않으면 null로 update 돼버린다.
따라서 반드시 기존 값을 설정하거나 `@Column(updatable = false)` 옵션으로 값이 변경되지 않도록 설정해야 한다.
---
title: 2023-06-16
aliases: 
categories: daily
tags:
  - daily
created: 2023-06-16 13:29
---

### select for update 를 이용한 동시성 제어

### Fixture Monkey

[Fixture Monkey](https://github.com/naver/fixture-monkey)
---
title: 2023-06-21
aliases: 
categories: daily
tags:
  - daily
created: 2023-06-21 10:29
---

JPA 연관관계 설정과 실제 DB의 FK 설정
- JPA 연관관계를 설정하라도 실제로 DB에는 FK를 설정하지 않는 경우가 많다.
- 이유와 장단점 정리

---
title: 2023-06-29
aliases: 
categories: daily
tags:
  - daily
created: 2023-06-29 10:22
---

LazyConnectionDataSourceProxy
- read, write DB 부하 분산에 자주 쓰이는 방법

feign client

wireMock
---
title: 2023-06-30
aliases: 
categories: daily
tags:
  - daily
created: 2023-06-30 10:16
sticker: lucide//file
---

postgresql의 postgis에서 두 좌표 간의 거리 계산

```sql
-- degree
select st_distance(st_point(longitude_1, latitude_1), st_point(longitude_2, latitude_2));

-- km
select st_distancesphere(st_point(longitude_1, latitude_1), st_point(longitude_2, latitude_2)) / 1000.0;
```
