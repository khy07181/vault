---
title: Thread.sleep() vs TimeUnit.sleep()
aliases: thread.sleep
categories: java
tags: java, thread
created: 2023-01-16 13:24
fc-calendar: Gregorian Calendar
fc-date: 2023-01-16 13:24
updated: 2024-09-19T17:45
---

TimeUnit의 sleep은 내부적으로 Thread.sleep을 사용한다.

```java
/**  
 * Performs a {@link Thread#sleep(long, int) Thread.sleep} using  
 * this time unit. * This is a convenience method that converts time arguments into the * form required by the {@code Thread.sleep} method.  
 * * @param timeout the minimum time to sleep. If less than  
 * or equal to zero, do not sleep at all. * @throws InterruptedException if interrupted while sleeping  
 */
public void sleep(long timeout) throws InterruptedException {  
    if (timeout > 0) {  
        long ms = toMillis(timeout);  
        int ns = excessNanos(timeout, ms);  
        Thread.sleep(ms, ns);  
    }  
}
```

TimeUnit은 enum이므로, 시간 단위로 직관적인 선언이 가능하다.

```java
// Thread.sleep - 1분
Thread.sleep(60 * 1000);

// TimeUnit.slee - 1분
TimeUnit.MINUTES.sleep(1);
```
