---
title: Spring Batch Listener
aliases: Spring Batch Listener
categories: spring
tags: spring, batch
created: 2022-12-09 11:39
fc-calendar: Gregorian Calendar
fc-date: 2022-12-09 11:39
---

### JobExecutionListener

- Job 성공/실패 여부와 관계없이 Job 실행 전 후 정보를 제공한다.
- `beforeJob()`
- `aftterJob()`

```java
@Slf4j  
public class SimpleJobListener implements JobExecutionListener {  
  
    @Override  
    public void beforeJob(JobExecution jobExecution) {  
        log.info(jobExecution.getJobInstance().getJobName() + " is started.");  
    }  
  
    @Override  
    public void afterJob(JobExecution jobExecution) {  
        String jobName = jobExecution.getJobInstance().getJobName();  
        if (jobExecution.getStatus() == BatchStatus.FAILED) {  
            log.info(jobName + " is failed.");  
        }  
        log.info(jobName + " is finished.");  
    }  
}
```

### StepExecutionListener

- Step 성공/실패 여부와 관계없이 Step 실행 전 후 정보를 제공한다.
- `beforeStep()`
- `afterStep()`
	- parameter로 받는 stepExecution으로 ExitStatus를 수정할 수 있다.

```java
@Slf4j  
public class SimpleStepListener implements StepExecutionListener {  
  
    @Override  
    public void beforeStep(StepExecution stepExecution) {  
        log.info(stepExecution.getStepName() + " is started.");  
    }  
  
    @Override  
    public ExitStatus afterStep(StepExecution stepExecution) {  
        log.info(stepExecution.getStepName() + " is finished.");  
  
        return stepExecution.getExitStatus();  
    }  
}
```

### ChunkListener

- `beforeChunk()`
- `afterChunk()`
	- 에러 발생 시 호출되지 않는다.
- `afterChunkError()`
	- 에러 발생 시 호출된다.
- chunk 기반이 아닌 tasklet에도 사용 가능하다.
	- tasklet 전, 후 호출

```java 
public class CustomChunkListener implements ChunkListener {  
  
    @Override  
    public void beforeChunk(ChunkContext context) {  
        
    }  
  
    @Override  
    public void afterChunk(ChunkContext context) {  
        
    }  
  
    @Override  
    public void afterChunkError(ChunkContext context) {  
        
    } 
}
```

### ItemReadListner

- `beforeRead()`
	- `ItemReader`의 `read()` 호출 전 매번 호출된다
- `afterRead()`
	- `read()`호출 성공 시 매번 호출 되며 paramter로 item을 받는다.
- `onReadError()`
	- 에러 발생 시 호출되며 paramter로 exception 정보를 받는다.

```java
public class CustomItemReadListener implements ItemReadListener {  
  
    @Override  
    public void beforeRead() {  
  
    }  
    @Override  
    public void afterRead(Object item) {  
  
    }  
    @Override  
    public void onReadError(Exception ex) {  
  
    }  
}
```

ItemProcessorListener
- `beforeProcess()`
	- `ItemProcessor`의 `process()` 전 호출되며, 처리할 item을 받는다.
- `afterProcess()`
	- item을 성공적으로 처리한 다음 호출된다.
	- process 도중 에러 발생 시 호출되지 않는다.
- `onProcessError()`
	- 에러 발생 시 호출되며 exception과 처리하려고 했던 item 정보를 받는다.

```java
public class CustomItemProcessListener implements ItemProcessListener {  
  
    @Override  
    public void beforeProcess(Object item) {  
  
    }  
    @Override  
    public void afterProcess(Object item, Object result) {  
  
    }  
    @Override  
    public void onProcessError(Object item, Exception e) {  
  
    }  
}
```

ItemWriteListener
- `beforeWrite()`
	- `ItemWriter`의 `write()` 전 호출되며 write할 item list를 넘겨받는다.
- `afterWrite()`
	- item을 성공적으로 write한 다음 호출된다.
	- write 도중 에러 발생 시 호출되지 않는다.
- `onWriteError()`
	- write 도중 에러 발생 시 호출되며 exception과 write하려 했던 item 정보를 함께 받는다.

```java
public class CustomItemWriterListener implements ItemWriteListener {  
  
    @Override  
    public void beforeWrite(List items) {  
  
    }  
    @Override  
    public void afterWrite(List items) {  
  
    }  
    @Override  
    public void onWriteError(Exception exception, List items) {  
  
    }  
}
```

### SkipListener

- `onSkipInRead()`
	- item을 read하는 동안 skip 될 때 호출된다
- `onSkipInWrite()`
	- item을 write하는 동안 skip 될 때 호출된다.
- `onSkipInProcess()`
	- item을 process하는 동안 skip될 때 호출된다.

```java
public class CustomSkipListener implements SkipListener {  
  
    @Override  
    public void onSkipInRead(Throwable t) {  
  
    }  
    @Override  
    public void onSkipInWrite(Object item, Throwable t) {  
  
    }  
    @Override  
    public void onSkipInProcess(Object item, Throwable t) {  
  
    } 
}
```

### RetryListener

- `open()`
- `close()`
	- `RetryCallback` 이 마지막으로 던진 `Throwable`을 받는다.
- `onError()`

```java
public class CustomRetryListener implements RetryListener {  
  
    @Override  
    public <T, E extends Throwable> boolean open(RetryContext context,
		RetryCallback<T, E> callback) {  
        return false;  
    }  
  
    @Override  
    public <T, E extends Throwable> void close(RetryContext context,
	    RetryCallback<T, E> callback, Throwable throwable) {  
  
    }  
    @Override  
    public <T, E extends Throwable> void onError(RetryContext context,
	    RetryCallback<T, E> callback, Throwable throwable) {  
  
    }
}
```

---

## Reference

- [Spring Batch Document](https://docs.spring.io/spring-batch/docs/current/reference/html/)
- [Spring Batch는 어떤 리스너가 존재할까요?](https://abbo.tistory.com/244)
