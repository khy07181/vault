---
title: spring boot 원리
aliases: 
classification: resource
tags:
  - springBoot
  - java
  - framework
created: 2022-09-13 15:56
updated: 2025-01-18T21:32
---

# 스프링 부트 원리

## 의존성 관리 이해

- spring-boot-stater의 부모인 spring-boot-stater-parent, 그리고 다시 그 parent의 부모인 spring-Boot-dependencies에 의존성들이 정의되어 있고 dependencyManegement 영역 안에도 의존성들이 정의 되어 있다.
	* 따라서 우리는 각 스타터의 버전을 명시하지 않아도 되고, 관리해야할 의존성들이 줄어들고 parent가 관리하는 버전을 사용하게 된다.
	* 버젼을 명시하지 않아도 되고 특별히 원하는 버젼이 있어서 명시해주면 부모로부터 상속받아 오버라이딩된다.

## 의존성 관리 응용

### 스프링 부트가 버전 관리 해주는 의존성 추가

- `<dependency>` element를 사용하여 추가한다.
- starter를 스프링부트에서 제공해 줄 경우 버전을 명시해주지 않아도 된다.

```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-data-jpa</artifactId>
    //버젼관리를 해주기 때문에 version은 명시안해도 된다.
</dependency>
```

### 스프링 부트가 버전 관리 해주지 않는 의존성 추가

- 별도로 추가해야 하는 의존성들은 https://mvnrepository.com/ 를 통해서 검색해서 직접 추가하면 된다.
- 스타터의 parent에서 버전관리가 되지 않으므로 직접 버전까지 명시해줘야 한다.
- 원래 버젼을 무조건 명시하는게 베스트다.

### 스프링 부트가 관리하는 의존성 버전 변경하기

- spring-Boot-dependencies의 `<properties>`에 각각의 의존성들에 대한 버전을 일괄적으로 정의해져 있다.
- 이곳에서 변경하고 싶은 properties를 프로젝트로 가져와 버젼을 변경하여 사용할 수 있다.

## 자동 설정 이해

- `@SpringBootApplication` 이 선언되어 있는 메인 클래스에서 저 애노테이션을 따라 들어가보면,
- `@SpringBootConfiguration`, `@ComponentScan`, `@EnableAutoConfiguration`, 등이 선언되어 있다.
- 스프링 부트 애플리케이션은 빈을 두 단계로 나눠서 두번 등록한다.
- `@ComponentScan`으로 빈을 등록한 다음 그다음에 `@EnableAutoConfiguration`으로 추가적인 빈들을 읽어서 등록한다.
	* 1단계 : `@ComponentScan`
		* `@Component`라는 애노테이션을 가진 클래스들을 스캔해서 빈으로 등록한다. (Filter로 걸려진 것들은 제외)
		* `@Component`을 확장한 `@Configuration`, `@Repository`, `@Service`, `@Controller`, `@RestController`도 빈으로 등록한다.
	* 2단계 : `@EnableAutoConfiguration`
		* Maven: org.springframework.boot:spring-boot-autoconfigure:버전.RELEASE의 스프링 메타 파일 spring.factories라는 파일에 key값(EnableAutoConfiguration) 밑에 설정되어 있는 클래스들은 AutoConfiguration 적용 대상이다.
		* 다 빈으로 등록되는건 아니고 @Conditional~로 시작하는 애노테이션 조건에 맞는 빈을 등록한다.

## 자동 설정 만들기

- XXX-Spring-Boot-Autoconfigure 모듈: 자동 설정
- XXX-Spring-Boot-Starter 모듈 : 필요한 의존성 정의. pom 파일이 핵심, 소스 코드가 없는 경우도 많다.
- 굳이 프로젝트를 둘로 쪼개지 않고 하나로 만들고 싶으면 자동설정을 starter에 넣어 하나로 만들어도 된다.
	- Xxx-Spring-Boot-Starter

### 구현 방법

1. 의존성 추가

```xml
<dependencies>
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-autoconfigure</artifactId>
    </dependency>
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-autoconfigure-processor</artifactId>
        <optional>true</optional>
    </dependency>
</dependencies>

<dependencyManagement>
    <dependencies>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-dependencies</artifactId>
            <version>2.0.3.RELEASE</version>
            <type>pom</type>
            <scope>import</scope>
        </dependency>
    </dependencies>
</dependencyManagement>
```

2. @Configuration 파일 작성

```java
@Configuration
public class HolonameConfiguration {

    @Bean
    public Holoman holoman() {
        Holoman holoman = new Holoman();
        holoman.setHowLong(5);
        holoman.setName("Hayoung");
        return holoman;
    }
}
```

3. src/main/resource/META-INF에 spring.factories 파일 만들기
4. spring.factories 안에 자동 설정 파일 추가.

```properties
org.springframework.boot.autoconfigure.EnableAutoConfiguration= me.hayoung.HolomanConfiguration
```

5. mvn install(Maven Projects -> Lifecycle -> install 더블클릭도 가능)
- 콘솔에서 mvn install
- 본인이 만든 의존성에 의해 만들어지는 빈이 @ComponentScan에 의해서 먼저 만들어진다.

6. 다른 프로젝트에서 생성된 프로젝트 의존성 추가

```xml
<dependency>
    <groupId>me.hayoung</groupId>
    <artifactId>hayoung-springboot-starter</artifactId>
    <version>1.0-SNAPSHOT</version>
</dependency>
```

7. Runner로 불러와서 사용

```java
@Component
public class HolomanRunner implements ApplicationRunner {

  @Autowired
  Holoman holoman;

  @Override
  public void run(ApplicationArguments args) throws Exception {
    System.out.println(holoman);
  }
}
```

### 문제점

- bean을 재정의하고 실행하면 재정의한 bean이 무시된다.
- 즉, 스프링 부트에서 빈을 등록하는 2가지 방법 중 ComponentScan으로 빈이 등록된 뒤에 AutoConfiguration으로 등록되어 덮어씌워 졌다.

```java
@SpringBootApplication
public class Application {

    public static void main(String[] args) {
            SpringApplication application = new SpringApplication(Application.class);
            application.setWebApplicationType(WebApplicationType.NONE);
            application.run(args);
    }

    @Bean
    public Holoman holoman() {
        Holoman holoman = new Holoman();
        holoman.setName("hayoung");
        holoman.setHowLong(60);
        return holoman;
    }
}
```

### 해결방법

- 덮어쓰기 방지하기
	* ComponentScan이 항상 우선 시 되야 한다.
	* `@ConditionalOnMissingBean`을 사용(이 타입의 bean이 없으면 그럴 때만 이 빈을 등록하라는 의미)

```java
@Configuration
public class HolonameConfiguration {

    @Bean
    @ConditionalOnMissingBean
    public Holoman holoman() {
        Holoman holoman = new Holoman();
        holoman.setHowLong(5);
        holoman.setName("Hayoung");
        return holoman;
    }
}
```

### 빈 재정의 수고 덜기

- src/main/resources에 applicaiton.properties 파일을 만든 뒤 properties 값을 정의한다.
- properties를 써서 변경할 수 있게 하려면 properties에 해당하는 것을 정의해줘야한다.

```java
@ConfigurationProperties("holoman")// IDE에서 오류가 뜨면서 자동완성을 지원하려면 의존성 추가하라고 뜬다. 추가하면 된다. 
public class HolomanProperties {

    private String name;
    private int howLong;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getHowLong() {
        return howLong;
    }

    public void setHowLong(int howLong) {
        this.howLong = howLong;
    }
}
```

- 이제 다른 프로젝트에서 bean을 등록하지 않으면 bean이 없으므로 @ConditionalOnMissingBean에 의해 bean을 등록하는데 HolomanProperties를 참조해서 그 값들을 받아 만든다

```java
@Configuration
@EnableConfigurationProperties(HolomanProperties.class)
public class HolomanConfiguration {

    @Bean
    @ConditionalOnMissingBean
    public Holoman holoman(HolomanProperties properties) {
        Holoman holoman = new Holoman();
        holoman.setName(properties.getName());
        holoman.setHowLong(properties.getHowLong());
        System.out.println(holoman);
        return holoman;
    }
}
```

## 내장 웹 서버 이해

- 스프링 부트는 웹 서버가 아니다.
- 자바로 톰캣, 서블릿 만들기

```java
@SpringBootApplication
public class Application {

    public static void main(String[] args) throws LifecycleException {
        Tomcat tomcat = new Tomcat();

        Context context = tomcat.addContext("/","/");

        HttpServlet servlet = new HttpServlet() {
            @Override
            protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
                PrintWriter writer = resp.getWriter();
                writer.println("<html><head><title>");
                writer.println("Hey, Tomcat");
                writer.println("</title></head>");
                writer.println("<body><h1>Hello Tomcat</h1></body>");
                writer.println("</html>");
            }
        };

        String servletName = "helloServlet";
        tomcat.addServlet("/", servletName, servlet);
        context.addServletMappingDecoded("/hello", servletName);

        tomcat.start();
        tomcat.getServer().await();

    }
}
```

- 이 모든 과정을 보다 상세히 또 유연하게 설정하고 실행해주는게 스프링 부트의 자동 설정이다.
	* spring.factories 안에 자동 설정되어 있다.
	* ServletWebServerFactoryAutoConfiguration (서블릿 웹 서버 설정)
		- TomcatServletWebServerFactoryCustomizer (서버 커스터마이징)
	* DispatcherServletAutoConfiguration
		- 서블릿 만들고 등록

## 내장 웹 서버 응용 - 컨테이너와 포트

- 서블릿 기반의 웹MVC 어플리케이션을 개발할 때 기본적으로 tomcat을 쓰게 된다.

### tomcat이 아닌 다른 서블릿 컨테이너를 쓰는 방법

- 의존성에서 tomcat을 빼고 원하는 컨테이너의 starter를 넣어준다.

```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-web</artifactId>
    <exclusions>
        <exclusion>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-tomcat</artifactId>
        </exclusion>
    </exclusions>
</dependency>

<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-jetty</artifactId>
</dependency>
```

### 웹 서버 사용하지 않기

- applicaiton.properties 파일에 `spring.main.web-application-type=none`으로 설정하면 WebServlet 의존성들이 클래스패스에 있더라도 무시하고 그냥 None WebApplication으로 실행하고 끝낸다.

### 포트 바꾸기

- applicaiton.properties 파일에 `server.port=7070(원하는포트번호)`으로 설정하면 원하는 포트 번호로 사용가능하다.
- `server.port=0`으로 설정하면 랜덤 포트 번호로 사용된다.
- 포트 번호를 Application 코드에서 사용하는 방법(Spring Boot Reference에서 추천하는 best way)

```java
@Component
public class PortListener implements ApplicationListener<ServletWebServerInitializedEvent> {

    @Override
    public void onApplicationEvent(
        ServletWebServerInitializedEvent servletWebServerInitializedEvent) {
        ServletWebServerApplicationContext applicationContext = servletWebServerInitializedEvent.getApplicationContext();
        System.out.println(applicationContext.getWebServer().getPort());
    }
}
```

## 내장 웹 서버 응용 - HTTPS와 HTTP2

- 내장 웹 서버에 HTTPS와 HTTP2를 적용하는 방법

### 내장 웹 서버에 HTTPS 적용 방법

- HTTPS를 사용하려면 key-store를 만들어야 한다.
	* 터미널 `keytool -genkey -alias tomcat -storetype PKCS12 -keyalg RSA -keysize 2048 -keystore keystore.p12 -validity 4000`
- 비밀번호와 인증서 내용을 입력하면 key-store가 생기고 이것으로 설정을 하면 된다.
- application.properties에 key-store 설정

```properties
server.ssl.key-store=keystore.p12
server.ssl.key-store-type= PKCS12
server.ssl.key-store-password=123456
server.ssl.key-alias=spring
```

- 애플리케이션을 실행하면 오류가 난다.
	* 스프링 부트는 기본적으로 톰캣이 사용하는 커넥터가 하나만 등록된다.
	* 그 커넥터에 ssl을 적용해주기 때문에 모든 요청은 HTTPS를 붙여서 해야한다.

### HTTP 커넥터 설정하기

- 더이상 HTTP를 받을 커넥터가 없다. 가능하게 설정하려면 커넥터를 추가하는 코드를 작성해야 한다.
	* 포트번호만 다르게 한다면 HTTP와 HTTPS를 둘 다 받을 수 있는 톰캣 서버가 된다.

```java
@Bean
public ServletWebServerFactory serverFactory() {
    TomcatServletWebServerFactory tomcat = new TomcatServletWebServerFactory();
    tomcat.addAdditionalTomcatConnectors(createStandardConnector());    // 커넥터 추가
    return tomcat;
}

private Connector createStandardConnector() {
    Connector connector = new Connector("org.apache.coyote.http11.Http11NioProtocol");
    connector.setPort(8080);
    return connector;
}
```

### 내장 웹 서버에 HTTP2 적용 방법

- HTTP2를 쓰려면 ssl은 기본적으로 적용되어 있어야 한다.
- application.properties에 `server.http2.enabled=true`로 설정
- 제약사항은 서버마다 다르다.
	* Undertow : HTTPS만 적용돼있으면 아무런 추가 설정을 하지 않아도 된다.
	* Tomcat : 톰캣 8.5.x 기준 라이브러리와 디렉토리를 설정해야하지만 톰캣 9.0.x, JDK9 이상부터는 추가 설정을 하지 않아도 된다.
- 톰캣 HTTP2
	* File - Project Structure - Project와 File - Project Structure - Modules - Dependencies에서 JDK 버전 변경(9이상)

## 독립적으로 실행 가능한 JAR

- 애플리케이션을 개발 할 때는 IDE에서 실행하는게 편하지만 배포하거나 도커 이미지로 만들 때는 jar 패키지로 패키징한 다음 jar파일을 실행하는 것이 유용하다.
	* 이 부분도 스프링 부트도 중요한 특징 중 하나이다.
- 터미널에 `mvn clean package -DskipTests` 라고 입력하면 패키지 파일(jar)이 생성된다.
- `java -jar` 명령어를 사용하면 jar 파일 **하나**만으로 앱이 구동된다.
- 만든 애플리케이션 클래스들과 라이브러리들이 jar 파일 하나에 다 들어가 있다.

### 스프링 부트에서의 jar

- 자바에는 jar안에 들어있는 jar파일을 읽을 수 있는 표준적인 방법이 없다. 그래서 옛날에는 'uber jar'를 사용했다.
	* 모든 클래스(의존성 및 애플리케이션)를 하나로 합축하는 방법
	* 무슨 라이브러리를 쓰는지 알 수 없다.
	* 파일 이름은 같지만 내용이 다른 경우 문제 발생
- 스프링 부트에서의 jar
	* 애플리케이션 클래스와 라이브러리 위치를 구분
	* 내장 jar로 jar안에 jar파일들을 묶어놓고 읽을 수 있는 파일을 만들어 놓았다.
	* org.springframework.boot.loader.jar.JarFile : 내장 JAR를 읽기.
	* org.springframework.boot.loader.Launcher : jar파일 실행.
