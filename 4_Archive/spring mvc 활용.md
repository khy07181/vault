---
title: spring mvc 활용
aliases: 
classification: resource
tags:
  - spring
  - java
  - framework
created: 2022-09-13 15:54
updated: 2025-01-18T21:35
---

# 스프링 MVC 활용

## 요청 맵핑하기 1. HTTP Method

HTTP 요청을 핸들러에 맵핑하는 방법

핸들러란 컨트롤러안에 있는 요청을 처리할 수 있는 메소드

### HTTP Method

- GET, POST, PUT, PATCH, DELETE, ...

### GET 요청

- 클라이언트가 서버의 리소스를 요청할 때 사용한다.
- 캐싱을 할 수 있다. (조건적인 GET으로 바뀔 수 있다.)
- 브라우저 기록에 남는다.
- 북마크 할 수 있다.
- URL에 보이므로 민감한 데이터를 보낼 때 사용하지 않는 것이 좋다.
- Idempotent하다.
	* 동일한 GET요청일 경우 항상 동일한 응답을 return해야 한다.

### POST 요청

- 클라이언트가 서버의 리소스를 수정하거나 새로 만들 때 사용한다.
- 서버에 보내는 데이터를 POST 요청 본문에 담는다.
- 캐시할 수 없다.
- 브라우저 기록에 남지 않는다.
- 북마크 할 수 없다.
- 데이터 길이 제한이 없다.
- Idempotent하지 않을 수도 있다.

### PUT 요청

- URI에 해당하는 데이터를 새로 만들거나 수정할 때 사용한다.
- POST와 다른 점은 “URI”에 대한 의미가 다르다.
	* POST의 URI는 보내는 데이터를 처리할 리소스를 지칭하며
	* PUT의 URI는 보내는 데이터에 해당하는 리소스를 지칭한다.
- Idempotent하다.

### PATCH 요청

- PUT과 비슷하지만, 기존 엔티티와 새 데이터의 차이점만 보낸다는 차이가 있다.
- Idempotent하다.

### DELETE 요청

- URI에 해당하는 리소스를 삭제할 때 사용한다.
- Idempotent하다.

### 스프링 웹 MVC에서 HTTP method 맵핑하기 예시

- `@RequestMapping(method=RequestMethod.GET)`
- `@RequestMapping(method={RequestMethod.GET, RequestMethod.POST})`
- `@GetMapping`, `@PostMapping`, ...

### HTTP Method 실습

```java
@Controller
// @RequestMapping을 클래스 레벨로 설정할 수 있다.
@RequestMapping(method = RequestMethod.GET) // 모든 핸들러에서 HTTP Method : GET만 처리한다.
public class SampleController {

    @RequestMapping("/hello")
    @ResponseBody
    public String hello() {
        return "hello";
    }
}
// @RequestMapping으로 원하는 Method(GET)를 줘도 되고, 간단하게 @GetMapping을 써도 된다.
```

- 테스트

```java
@RunWith(SpringRunner.class)
@WebMvcTest
public class SampleControllerTest {

    @Autowired
    MockMvc mockMvc;

    @Test
    public void helloTest() throws Exception {
        mockMvc.perform(get("/hello"))
                .andDo(print())
                .andExpect(status().isOk())
        ;

        mockMvc.perform(put("/hello"))
                .andDo(print())
                .andExpect(status().isMethodNotAllowed())
        ;

        mockMvc.perform(post("/hello"))
                .andDo(print())
                .andExpect(status().isMethodNotAllowed())
        ;
    }
} 
```

## 요청 맵핑하기 2. URI 패턴 맵핑

### 요청 식별자로 맵핑하기

- `@RequestMapping`은 다음과 같은 패턴을 지원한다.
	* ? : 한 글자 ex) /author/??? => /author/123
	* \* : 여러 글자 ex) /author/* => /author/hayoung
	* ** : 여러 패스 ex) /author/** => /author/hayoung/book
- 패턴이 중복되는 경우에는 가장 구체적으로 맵핑되는 핸들러를 사용하게 된다.
	* 밑의 코드에서 URI를 `"/hello/hayoung"`이라고 보내면 두 핸들러 모두 해당되지만 `helloHayoung()`이 맵핑된다.

```java
@Controller
@RequestMapping("/hello")
public class SampleController {
    @RequestMapping("/hayoung")
    @ResponseBody
    public String helloHayoung() {
        return "hello hayoung";
    }

    @RequestMapping("/**")
    @ResponseBody
    public String hello() {
        return "hello";
}
```

- 테스트

```java
@RunWith(SpringRunner.class)
@WebMvcTest
public class SampleControllerTest {

    @Autowired
    MockMvc mockMvc;

    @Test
    public void helloTest() throws Exception {
        mockMvc.perform(get("/hello"))
        mockMvc.perform(get("/hello/hayoung"))
                .andDo(print())
                .andExpect(status().isOk())
                .andExpect(content().string("hello hayoung"))
                //핸들러 확인
                .andExpect(handler().handlerType(SampleController.class)) 
                .andExpect(handler().methodName("helloHayoung")) // 핸들러의 메소드 이름이 helloHayoung일 것이다.
        ;
    }
}
```

### 클래스에 선언한 @RequestMapping과 조합

- 클래스에 선언한 URI 패턴과 이어서 맵핑할 수도 있다.
- 예를 들어 `@RequestMapping("/hello/**")`를 다음 코드와 같이 작성할 수 있다.

```java
@Controller
@RequestMapping("/hello")
public class SampleController {

    @RequestMapping("/**")
    @ResponseBody
    public String hello() {
        return "hello";
    }
}
```

### 정규 표현식으로 맵핑하기

- `/{name:정규식}`

```java
@Controller
@RequestMapping("/hello")
public class SampleController {

    @RequestMapping("/{name:[a-z]+}")   // a~z에 해당하는 문자열 패턴이 올 수 있다. name으로 받겠다.
    @ResponseBody
    // @PathVariable를 사용해 받을 수 있다. ex) hello hayoung 등
    public String hello(@PathVariable String name) {
        return "hello" + name;
    }
}
```

- 테스트

```java
@RunWith(SpringRunner.class)
@WebMvcTest
public class SampleControllerTest {

    @Autowired
    MockMvc mockMvc;

    @Test
    public void helloTest() throws Exception {
        mockMvc.perform(get("/hello"))
        mockMvc.perform(get("/hello/hayoung"))
                .andDo(print())
                .andExpect(status().isOk())
                .andExpect(content().string("hello hayoung"))
        ;
    }
}
```

### URI 확장자 맵핑 지원

- 기본적으로 스프링 MVC가 지원하지만 권장되지 않는다.
	* 보안 이슈 ([RFD Attack](https://www.trustwave.com/en-us/resources/blogs/spiderlabs-blog/reflected-file-download-a-new-web-attack-vector/))
	* URI 변수, Path 매개변수, URI 인코딩을 사용할 때 할 때 불명확하다.
- 예를 들어 `RequestMapping("/hayoung")` 이라고 설정하면 스프링이 알아서 자동으로 `RequestMapping({"/hayoung", "/hayoung.*})` 이러한 맵핑을 해준다.
	* hayoung.html, hayoung.json, hayoung.xml 등의 요청도 처리할 수 있게 등록해준다.
- 스프링 부트는 기본으로 이 기능을 사용하지 않도록 설정 해준다.
- 최근에는 URI에 확장자 패턴을 쓰는 것이 아니라 accept header에 표현한다.
	* parameter를 사용할 수도 있다. ex) `RequestMapping("/hayoung?type=xml")`

## 요청 맵핑하기 3. 미디어 타입

### 특정한 타입의 데이터를 담고 있는 요청만 처리하는 핸들러

- consumes를 사용하여 원하는 타입의 데이터 요청만 처리할 수 있다.
- ex) `@RequestMapping(value = "/hello", consumes = MediaType.APPLICATION_JSON_UTF8_VALUE)`
	* 문자열(application/json)을 입력하는 대신 MediaType을 사용하면 상수를 (IDE에서) 자동 완성(MediaType.APPLICATION_JSON_UTF8_VALUE)으로 사용할 수 있다.
- Content-Type 헤더로 필터링한다.
- 매치 되는 않는 경우에 415(Unsupported Media Type) 에러가 난다.

### 특정한 타입의 응답을 만드는 핸들러

- produces를 사용하여 원하는 응답을 설정할 수 있다.
- ex) `@RequestMapping(produces=”application/json”)`
	* 문자열 대신 자동완성으로 사용 가능하다.
- Accept 헤더로 필터링한다.
	* accept type이 없는 경우에는 content type이 반드시 맞아야 하는게 아니라 다 맵핑이 된다.
- 매치 되지 않는 경우에 406(Not Acceptable) 에러가 난다.

### 클래스에 선언한 @RequestMapping과 조합

- 클래스에 선언한 @RequestMapping에 사용한 것과 조합이 되지 않고 메소드에 사용한 @RequestMapping의 설정으로 덮어쓴다(Overriding).

### 미디어 타입 실습

- Not (!)을 사용해서 특정 미디어 타입이 아닌 경우로 맵핑 할 수도 있다.

```java
@Controller
@RequestMapping(consumes = MediaType.APPLICATION_XML_VALUE) // 클래스에 선언해도 밑의 메소드에 선언한 설정으로 덮어쓴다.
public class SampleController {

    @RequestMapping("/hayoung")
    @GetMapping(
            value = "/hello",
            consumes = MediaType.APPLICATION_JSON_UTF8_VALUE, // 요청 설정
            produces = MediaType.TEXT_PLAIN_VALUE   // 응답 설정
    )
    @ResponseBody
    public String hello() {
        return "hello";
    }
}
```

- 테스트

```java
@RunWith(SpringRunner.class)
@WebMvcTest
public class SampleControllerTest {

    @Autowired
    MockMvc mockMvc;

    @Test
    public void helloTest() throws Exception {
        mockMvc.perform(get("/hello"))
        mockMvc.perform(get("/hello/hayoung"))
                    .contentType(MediaType.APPLICATION_JSON)
                    .accept(MediaType.APPLICATION_JSON))
                .andDo(print())
                .andExpect(status().isOk())
        ;
    }
}
```

## 요청 맵핑하기 4. 헤더와 매개변수

- 특정한 헤더가 있는 요청을 처리하고 싶은 경우
	* `@RequestMapping(headers = “key”)`
	* ex) `@GetMapping(value = "/hello", headers = HttpHeaders.AUTHORIZATION)`
- 특정한 헤더가 없는 요청을 처리하고 싶은 경우
	* `@RequestMapping(headers = “!key”)`
	* ex) `@GetMapping(value = "/hello", headers = "!" + HttpHeaders.FROM)`
- 특정한 헤더 키/값이 있는 요청을 처리하고 싶은 경우
	* `@RequestMapping(headers = “key=value”)`
	* ex) `@GetMapping(value = "/hello", headers = HttpHeaders.AUTHORIZATION + "=" + "111")`
- 특정한 요청 매개변수 키를 가지고 있는 요청을 처리하고 싶은 경우
	* `@RequestMapping(params = “a”)`
	* ex) `@GetMapping(value = "/hello", params = "name")`
- 특정한 요청 매개변수가 없는 요청을 처리하고 싶은 경우
	* `@RequestMapping(params = “!a”)`
- 특정한 요청 매개변수 키/값을 가지고 있는 요청을 처리하고 싶은 경우
	* `@RequestMapping(params = “a=b”)`
	* ex) `@GetMapping(value = "/hello", params = "name=hayoung")`

## 요청 맵핑하기 5. HEAD와 OPTIONS 요청 처리

- 직접 구현하지 않아도 스프링 웹 MVC에서 제공해주는 기능의 HTTP Method
	* HEAD
	* OPTIONS
- 참고 - [HTTP Method Definitions](https://www.w3.org/Protocols/rfc2616/rfc2616-sec9.html)

### HEAD

- GET 요청과 동일하지만 응답 본문을 받아오지 않고 응답 헤더만 받아온다.

### OPTIONS

- 서버 또는 URI에 해당하는 특정 리소스가 제공하는 기능을 확인할 수 있다.
- 사용할 수 있는 HTTP Method 제공해 준다.
- 서버는 Allow 응답 헤더에 사용할 수 있는 HTTP Method 목록을 제공한다.

## 요청 맵핑하기 6. 커스텀 애노테이션

- 예를 들어 `@RequestMapping` 애노테이션을 메타 애노테이션으로 사용해 `@GetMapping` 같은 커스텀한 애노테이션을 만들 수 있다.

### 메타(Meta) 애노테이션

- 애노테이션에 사용할 수 있는 애노테이션
- 스프링이 제공하는 대부분의 애노테이션은 메타 애노테이션으로 사용할 수 있다.

### 조합(Composed) 애노테이션

- 한개 혹은 여러 메타 애노테이션을 조합해서 만든 애노테이션
- 코드를 간결하게 줄일 수 있다.
- 보다 구체적인 의미를 부여할 수 있다.

### @Retention

- 해당 애노테이션 정보를 언제까지 유지할 것인가.
	* 기본값은 Class이다.
- Source
	* 소스 코드까지만 유지.
	* 컴파일 하면 해당 애노테이션 정보는 사라진다.
- Class
	* 컴파인 한 .class 파일에도 유지.
	* 런타임 시, 클래스를 메모리로 읽어오면 해당 정보는 사라진다.
- Runtime
	* 클래스를 메모리에 읽어왔을 때까지 유지
	* 코드에서 이 정보를 바탕으로 특정 로직을 실행할 수 있다.

### @Target

- 해당 애노테이션을 어디에 사용할 수 있는지 결정한다.

### @Documented

- 해당 애노테이션을 사용한 코드의 문서에 그 애노테이션에 대한 정보를 표기할지 결정한다.

### 커스텀 애노테이션 만들기 실습

- hello라는 요청 맵핑을 많이 해야 할 경우 커스텀 애노테이션 `@GetHelloMapping` 만들기

```java
@Documented
@Target(ElementType.METHOD) // 애노테이션을 Method에 사용할 수 있다고 설정
@Retention(RetentionPolicy.RUNTIME) // 애노테이션 정보 유지 설정
// @GetMapping은 메타 애노테이션이 아니므로 @RequestMapping을 써야한다.
@RequestMapping(method = RequestMethod.GET, value = "/hello")
public @interface GetHelloMapping {
}
```

```java
@Controller
public class SampleController {

    @GetHelloMapping
    @ResponseBody
    public String hello() {
        return "hello";
    }
```

- 테스트

```java
@RunWith(SpringRunner.class)
@WebMvcTest
public class SampleControllerTest {

    @Autowired
    MockMvc mockMvc;

    @Test
    public void helloTest() throws Exception {
        mockMvc.perform(get("/hello"))
                .andDo(print())
                .andExpect(status().isOk())
        ;
    }
}
```

## 핸들러 메소드 1. 지원하는 메소드 아규먼트와 리턴 타입

### 핸들러 메소드 아규먼트

- 주로 요청 그 자체 또는 요청에 들어있는 정보를 받아오는데 사용한다.
![SpringMVCUtilization_1](../attachment/img/SpringMVCUtilization_1.png)
- [Handler Methods - Method Arguments](https://docs.spring.io/spring/docs/current/spring-framework-reference/web.html#mvc-ann-arguments)

### 핸들러 메소드 리턴

- 주로 응답 또는 모델을 랜더링할 뷰에 대한 정보를 제공하는데 사용한다.
![SpringMVCUtilization_2](../attachment/img/SpringMVCUtilization_2.png)
- [Return Values](https://docs.spring.io/spring/docs/current/spring-framework-reference/web.html#mvc-ann-return-types)

## 핸들러 메소드 2. URI 패턴

### @PathVariable

- 요청 URI 패턴의 일부를 핸들러 메소드 아규먼트로 받는 방법이다.
- 자동으로 타입 변환을 지원한다.
- (기본)값이 반드시 있어야 한다.
- Optional을 지원한다.

### @PathVariable 실습

```java
public class Event {

    private Integer id;

    private String name;

    ...getter and setter...
}
```

```java
@Controller
@RequestMapping(method = RequestMethod.GET)
public class SampleController {

    @GetMapping("/events/{id}")
    @ResponseBody
    public Event getEvent(@PathVariable Integer id) {
        Event event = new Event();
        event.setId(id);
        return event;
    }
}
```

- 테스트

```java
@RunWith(SpringRunner.class)
@WebMvcTest
public class SampleControllerTest {

    @Autowired
    MockMvc mockMvc;

    @Test
    public void helloTest() throws Exception {
        mockMvc.perform(get("/events/1"))   // 넘겨준 값은 문자열이지만 int형으로 자동으로 타입 변환을 지원해준다.
                .andDo(print())
                .andExpect(status().isOk())
                .andExpect(jsonPath("id").value(1))
        ;
    }

}
```

### @MatrixVariable

- 요청 URI 패턴에서 키/값 쌍의 데이터를 메소드 아규먼트로 받는 방법
- 자동으로 타입 변환을 지원한다.
- (기본)값이 반드시 있어야 한다.
- Optional을 지원한다.
- 이 기능은 기본적으로 비활성화 되어 있다.
	* 활성화 하려면 추가 설정을 해야 한다.(실습에 있음)

### @MatrixVariable 실습

```java
public class Event {

    private Integer id;

    private String name;

    ...getter and setter...
}
```

```java
@Controller
@RequestMapping(method = RequestMethod.GET)
public class SampleController {

    @GetMapping("/events/{id}")
    @ResponseBody
    public Event getEvent(@PathVariable Integer id, @MatrixVariable String name) {
        Event event = new Event();
        event.setId(id);
        event.setName(name);
        return event;
    }
}
```

- @MatrixVariable 사용을 위한 추가 설정

```java
@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Override
    public void configurePathMatch(PathMatchConfigurer configurer) {
        UrlPathHelper urlPathHelper = new UrlPathHelper();
        urlPathHelper.setRemoveSemicolonContent(false); // 세미콜론을 제거하지 않도록
        configurer.setUrlPathHelper(urlPathHelper);
    }
}
```

- 테스트

```java
@RunWith(SpringRunner.class)
@WebMvcTest
public class SampleControllerTest {

    @Autowired
    MockMvc mockMvc;

    @Test
    public void helloTest() throws Exception {
        mockMvc.perform(get("/events/1;name=hayoung"))   
                .andDo(print())
                .andExpect(status().isOk())
                .andExpect(jsonPath("id").value(1))
        ;
    }

}
```

## 핸들러 메소드 3. 요청 매개변수

- `@RequestParam`애노테이션을 사용하여 받을 수 있다.

### 요청 매개변수

- 쿼리 매개변수
- 폼 데이터

### @RequestParam

- 요청 매개변수에 들어있는 단순 타입 데이터를 메소드 아규먼트로 받아올 수 있다.
- 값이 반드시 있어야 한다.
	* required=false 또는 Optional을 사용해서 부가적인 값으로 설정할 수도 있다.
	* `required= "true"`가 기본값이다.
	* `defaultValue = "원하는이름"`으로 기본값을 정할 수 있다.
- String이 아닌 값들은 타입 컨버전을 지원한다.
- Map<String, String> 또는 MultiValueMap<String, String>에 사용해서 모든 요청 매개변수를 받아 올 수도 있다.
- 이 애노테이션은 생략 할 수 있다. (헷갈릴 수가 있기 때문에 명시적으로 적어주는 것도 좋다.)

### 요청 매개변수 실습(쿼리 파라미터)

```java
public class Event {

    private Integer id;

    private String name;

    private Integer limit;

    ...getter and setter...
}
```

```java
@Controller
@RequestMapping(method = RequestMethod.GET)
public class SampleController {

    @PostMapping("/events")
    @ResponseBody
    public Event getEvent(@RequestParam String name, @RequestParam Integer limit) {
        Event event = new Event();
        event.setName(name);
        event.setLimit(limit);
        return event;
    }
}
```

- 테스트

```java
@RunWith(SpringRunner.class)
@WebMvcTest
public class SampleControllerTest {

    @Autowired
    MockMvc mockMvc;

    @Test
    public void helloTest() throws Exception {
        mockMvc.perform(post("/events")
                    .param("name", "hayoung")
                    .param("limit", "20"))
                .andDo(print())
                .andExpect(status().isOk())
                .andExpect(jsonPath("name").value("hayoung"))
        ;
    }

}
```

## 핸들러 메소드 4. 폼 서브밋

- 폼 데이터도 `@RequestParam`으로 받을 수 있다.

### 요청 매개변수 실습(폼 데이터)

- 폼을 보여줄 요청 처리
	* 컨트롤러 : GET /events/form
	* 뷰 : events/form.html
	* 모델 : "event", new Event()
- 타임리프
	* @{}: URL 표현식
	* ${}: variable 표현식
	* *{}: selection 표현식
- 컨트롤러 작성

```java
@Controller
public class SampleController {

    @GetMapping("/events/form")
    public String eventsForm(Model model) {
        Event newEvent = new Event();
        newEvent.setLimit(50);
        model.addAttribute("event", newEvent);
        return "/events/form";
    }

    @PostMapping("/events")
    public @ResponseBody Event events(@RequestParam String name, @RequestParam Integer id) {
        Event event = new Event();
        event.setId(id);
        event.setName(name);
        return event;
    }
}
```

- 뷰 작성

```html
<!DOCTYPE html>
<html lang="en" xmlns:th="http://www.thymeleaf.org">
<head>
    <meta charset="UTF-8">
    <title>Create New Event</title>
</head>
<body>
<form action="#" th:action="@{/events}" method="post" th:object="${event}">
    <input type="text" title="name" th:field="*{name}"/>
    <input type="text" title="limit" th:field="*{limit}"/>
    <input type="submit" value="Create"/>
</form>
</body>
</html> 
```

- 테스트
	* 타임리프 html은 test코드를 작성하여 어떻게 렌더링되는지 확인이 가능하다. (jsp는 불가능)

```java
@RunWith(SpringRunner.class)
@WebMvcTest
public class SampleControllerTest {

    @Autowired
    MockMvc mockMvc;

    @Test
    public void eventForm() throws Exception {
        mockMvc.perform(get("/events/form"))
                .andDo(print())
                .andExpect(view().name("/events/form"))
                .andExpect(model().attributeExists("event"))
        ;
    }

}
```

## 핸들러 메소드 5. @ModelAttribute

- `@RequestParam`이 request parameter를 하나씩 받아왔다면, `@ModelAttribute`는한꺼번에 객체에 맵핑해주는 기능이다.
- 여러 곳(URI 패스, 요청 매개변수, 세션 등)에 있는 단순 타입 데이터를 복합 타입의 객체로 받아오거나 해당 객체를 새로 만들 때 사용할 수 있다.
- 생략 가능하다.
- 값을 바인딩 할 수 없는 경우
	* BindException이 발생하고 400에러가 발생한다.

```java
// @PostMapping("/events")
// public @ResponseBody Event events(@RequestParam String name, @RequestParam Integer id) {
//     Event event = new Event();
//     event.setId(id);
//     event.setName(name);
//     return event;
// }
@Controller
public class SampleController {
    
  @PostMapping("/events")
  @ResponseBody
  public Event postEvent(@ModelAttribute Event event) {
    return event;
  }
}
```

### 바인딩 에러를 직접 다루고 싶은 경우

- @ModelAttribute가 붙은 메소드 아규먼트 옆에 BindingResult를 추가하면 된다.
- bindingResult에 바인딩과 관련된 에러가 담겨온다.
- 요청은 처리된다. (바인딩은 제대로 되지 않는다.)

```java
@Controller
public class SampleController {
    
  @PostMapping("/events")
  @ResponseBody
  public Event postEvent(@ModelAttribute Event event, BindingResult bindResult) {
    if(bindingReuslt.hasError()) {
      bindingResult.getAllErrors().forEach(c -> {
        System.out.println(c.toString());
      });
    }
    return event;
  }
}
```

### 바인딩 이후에 검증 작업을 추가로 하고 싶은 경우

- `@Valid` 또는 `@Validated` 애노테이션을 사용한다.
- Validation에 관련한 에러도 bindingResult에 담긴다.
- `@Validated`는 group validation을 지원한다.

```java
@Controller
public class SampleController {
    
  @PostMapping("/events")
  @ResponseBody
  public Event postEvent(@Valid @ModelAttribute Event event, BindingResult bindResult) {
    if(bindingReuslt.hasError()) {
      bindingResult.getAllErrors().forEach(c -> {
        System.out.println(c.toString());
      });
    }
    return event;
  }
}
```

## 핸들러 메소드 6. @Validated

- 스프링 MVC 핸들러 메소드 아규먼트에 사용할 수 있으며 validation group이라는 힌트를 사용할 수 있다.
- `@Valid` 애노테이션에는 그룹을 지정할 방법이 없다.
- `@Validated`는 스프링이 제공하는 애노테이션으로 그룹 클래스를 설정할 수 있다.

### @Validated 실습

```java
public class Event {

    interface ValidateLimit {}
    interface ValidateName{}

    private Integer id;

    @NotBlank(groups = ValidateName.class)
    private String name;

    @Min(value = 0, groups = ValidateLimit.class)
    private Integer limit;
    
    ...getter and setter...
}
```

```java
@Controller
public class SampleController {
    
  @PostMapping("/events")
  @ResponseBody
  // ValidateLimit이라는 그룹으로 검증을 하겠다고 했으므로 Event클래스의 @NotBlank 애노테이션은 적용되지 않고 @Min 애노테이션만 검증에 사용된다.
  public Event postEvent(@Validated(Event.ValidateName.class) @ModelAttribute Event event, BindingResult bindResult) {
    if(bindingReuslt.hasError()) {
      bindingResult.getAllErrors().forEach(c -> {
        System.out.println(c.toString());
      });
    }
    return event;
  }
}
```
