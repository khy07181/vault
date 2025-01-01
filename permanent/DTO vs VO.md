---
title: DTO vs VO
aliases: 
categories: 
tags:
  - java
created: 2024-04-09 22:51
---
DTO(Data Transfer Object)
- 레이어 간 데이터를 전달하는 객체
- 데이터 접근 메소드 외에 기능을 가지지 않는다.
	- 정렬, 직렬화 등 데이터 표현을 위한 기능은 가질 수 있다.
- 데이터의 캡슐화를 통해 유연한 대응이 가능하다.
	- 데이터 요청 수 감소 효과

VO(Value Object)
- 값을 가지는 객체
- 값 자체로 의미를 가지는 객체
- 변하지 않는 값을 가지는 객체로, 값이 변하지 않음을 보장하며 코드의 안정성과 생산성을 높인다.
- 값이 같다면 동일한 객체이다.
	- 각 객체를 비교하는 데 사용되는 ID가 없다.
	- 같은 객체인지 판단하기 위해 각 속성들의 값을 비교한다.

```java
@NotNull
public String substring(int beginIndex, int endIndex) {  
    int length = length();  
    checkBoundsBeginEnd(beginIndex, endIndex, length);  
    if (beginIndex == 0 && endIndex == length) {  
        return this;  
    }  
    int subLen = endIndex - beginIndex;  
    return isLatin1() ? StringLatin1.newString(value, beginIndex, subLen)  
                      : StringUTF16.newString(value, beginIndex, subLen);  
}
```

공통점
- 레이어 간 데이터를 전달할 때 사용 가능하다.
- VO는 불변을 보장하기 때문에 데이터 전달 용도로 사용 가능

차이점

| DTO                     | VO                    |
| ----------------------- | --------------------- |
| 값이 변할 수 있다.             | 값이 변하지 않는다            |
| 레이어와 레이어 사이에서 사용        | 모든 레이어에서 사용 가능        |
| 데이터 접근 이외의 기능을 가지지 않는다. | 특정한 비즈니스 로직을 가질 수 있다. |
