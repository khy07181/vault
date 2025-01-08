---
title: Observer Pattern
aliases: 
categories: 
tags:
  - design-pattern
created: 2025-01-08 11:10
updated: 2025-01-08 11:10
---
하나의 대상과, 하나 이상의 관찰자들간의 일대다 관계에서 관찰자들이 대상에 변화가 있을 때마다 이를 통지받고 반응하도록 설계된 패턴

```java
public interface Observer {
    void update(String news);
}
```

```java
public interface Subject {   
    void registerObserver(Observer observer);  
    void removeObserver(Observer observer);  
    void notifyObservers();  
}
```

```java
public class NewsAgency implements Subject {  
  
    private List<Observer> observers = new ArrayList<>();  
    private String news;  
  
    @Override  
    public void registerObserver(Observer observer) {  
        observers.add(observer);  
    }  
  
    @Override  
    public void removeObserver(Observer observer) {  
        observers.remove(observer);  
    }  
  
    @Override  
    public void notifyObservers() {  
        for (Observer observer : observers) {  
            observer.update(news);  
        }  
    }  
  
    public void publishNews(String news) {  
        this.news = news;  
        notifyObservers();  
    }  
}
```

```java
public class NewsChannel implements Observer {  
  
    private String name;  
  
    public NewsChannel(String name) {  
        this.name = name;  
    }  
  
    @Override  
    public void update(String news) {  
        System.out.println(name + " received news: " + news);  
    }  
  
}
```

```java
class NewsTest {  
  
    @Test  
    void observer() {  
        NewsAgency agency = new NewsAgency();  
  
        NewsChannel channel1 = new NewsChannel("Channel 1");  
        NewsChannel channel2 = new NewsChannel("Channel 2");  
  
        agency.registerObserver(channel1);  
        agency.registerObserver(channel2);  
  
        agency.publishNews("Breaking news: Observer pattern in action!");  
  
        agency.removeObserver(channel2);  
  
        agency.publishNews("Another update: Channel 2 unsubscribed.");  
    }   
  
}
```

```
Channel 1 received news: Breaking news: Observer pattern in action!
Channel 2 received news: Breaking news: Observer pattern in action!
Channel 1 received news: Another update: Channel 2 unsubscribed.
```

---

```java
public interface WeatherStation {  
    void registerObserver(WeatherObserver o);  
    void removeObserver(WeatherObserver o);  
    void notifyObservers();  
}
```

```java
public interface WeatherObserver {  
    void update(float temp, float humidity, float pressure);  
}
```

```java
public class WeatherData implements WeatherStation {  
  
    private List<WeatherObserver> observers = new ArrayList<>();  
    private float temperature, humidity, pressure;  
  
    public void setMeasurements(float temperature, float humidity, float pressure) {  
        this.temperature = temperature;  
        this.humidity = humidity;  
        this.pressure = pressure;  
        notifyObservers();  
    }  
  
    @Override  
    public void registerObserver(WeatherObserver o) {  
        observers.add(o);  
    }  
  
    @Override  
    public void removeObserver(WeatherObserver o) {  
        observers.remove(o);  
    }  
  
    @Override  
    public void notifyObservers() {  
        for (WeatherObserver observer : observers) {  
            observer.update(temperature, humidity, pressure);  
        }  
    }  
}
```

```java
public class CurrentConditionDisplay implements WeatherObserver {  
  
    @Override  
    public void update(float temp, float humidity, float pressure) {  
        System.out.println("Current: " + temp + "F, " + humidity + "% humidity");  
    }  
  
}
```

```java
public class StatisticDisplay implements WeatherObserver {  
  
    @Override  
    public void update(float temp, float humidity, float pressure) {  
        System.out.println("Avg/Max/Min temp: " + temp + "/" + (temp + 2) + "/" + (temp - 2));  
    }  
  
}
```

```java
public class ForecastDisplay implements WeatherObserver {  
  
    @Override  
    public void update(float temp, float humidity, float pressure) {  
        System.out.println("Forecast: " + (pressure < 29.92 ? "Rain" : "Sunny"));  
    }  
  
}
```

```java
class WeatherTest {  
  
    @Test  
    void observer() {  
        WeatherData weatherData = new WeatherData();  
  
        CurrentConditionDisplay currentDisplay = new CurrentConditionDisplay();  
        StatisticDisplay statisticsDisplay = new StatisticDisplay();  
        ForecastDisplay forecastDisplay = new ForecastDisplay();  
  
        weatherData.registerObserver(currentDisplay);  
        weatherData.registerObserver(statisticsDisplay);  
        weatherData. registerObserver(forecastDisplay);  
  
        weatherData.setMeasurements (80, 65, 30.4f);  
    }  
  
}
```

```
Current: 80.0F, 65.0% humidity
Avg/Max/Min temp: 80.0/82.0/78.0
Forecast: Sunny
```
