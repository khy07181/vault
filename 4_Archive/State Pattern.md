---
title: State Pattern
aliases: 
classification: resource
tags:
  - design-pattern
  - OOP
created: 2024-10-07 10:46
updated: 2025-01-18T21:35
---
객체가 특정 상태에 따라 행위를 달리하는 상황에서, 상태를 조건문으로 검사해서 행위를 달리하는 것이 아닌, 상태를 객체화 하여 상태가 행동을 할 수 있도록 위임하는 패턴
- 상태를 클래스로 분리해서 상태에서 메서드들을 구현하고 스스로 상태를 전환하도록 하여 코드의 복잡성을 줄이고 유연성을 높인다.
- 각 상태를 싱글톤으로 만들면 새로 생성해서 쓰지 않아도 된다.

```java
public interface State {  
  
    void open(Door door);  
  
    void close(Door door);  
      
}
```

```java
public class Door {  
  
    private State state;  
  
    public Door() {  
        this.state = new ClosedState();  
    }  
  
    public void setState(State state) {  
        this.state = state;  
    }  
  
    public void open() {  
        state.open(this);  
    }  
  
    public void close() {  
        state.close(this);  
    }  
}
```

```java
public class ClosedState implements State {  
    @Override  
    public void open(Door door) {  
        System.out.println("Door is now open.");  
        door.setState(new OpenState());  
    }  
  
    @Override  
    public void close(Door door) {  
        System.out.println("Door is already closed.");  
    }  
}
```

```java
public class OpenState implements State {  
    @Override  
    public void open(Door door) {  
        System.out.println("Door is already open.");  
    }  
  
    @Override  
    public void close(Door door) {  
        System.out.println("Door is now closed.");  
        door.setState(new ClosedState());  
    }  
}
```

```java
class DoorTest {  
  
    @Test  
    void state() {  
        Door door = new Door();  
  
        door.open(); // Door is now open.  
        door.open(); // Door is already open.  
        door.close(); // Door is now closed.  
        door.close(); // Door is already closed.  
    }  
  
}
```

---

```java
public interface State {  
  
    void play(VideoPlayer videoPlayer);  
  
    void stop(VideoPlayer videoPlayer);  
  
}
```

```java
public class StoppedState implements State {  
  
    @Override  
    public void play(VideoPlayer videoPlayer) {  
        System.out.println("Playing the video.");  
        videoPlayer.setState(new PlayingState());  
    }  
  
    @Override  
    public void stop(VideoPlayer videoPlayer) {  
        System.out.println("Video is already stopped.");  
    }  
}
```

```java
public class PlayingState implements State {  
    @Override  
    public void play(VideoPlayer videoPlayer) {  
        System.out.println("Video is already playing.");  
    }  
  
    @Override  
    public void stop(VideoPlayer videoPlayer) {  
        System.out.println("Pausing the video.");  
        videoPlayer.setState(new PausedState());  
    }  
}
```

```java
public class PausedState implements State {  
  
    @Override  
    public void play(VideoPlayer videoPlayer) {  
        System.out.println("Resuming the video.");  
        videoPlayer.setState(new PlayingState());  
    }  
  
    @Override  
    public void stop(VideoPlayer videoPlayer) {  
        System.out.println("Stopping the video.");  
        videoPlayer.setState(new StoppedState());  
    }  
}
```

```java
public class VideoPlayer {  
  
    private State state;  
  
    public VideoPlayer() {  
        this.state = new StoppedState();  
    }  
  
    public void setState(State state) {  
        this.state = state;  
    }  
  
    public void play() {  
        state.play(this);  
    }  
  
    public void stop() {  
        state.stop(this);  
    }  
}
```

```java
class VideoPlayerTest {  
  
    @Test  
    void state() {  
        VideoPlayer videoPlayer = new VideoPlayer();  
  
        videoPlayer.play(); // "Starting the video."  
        videoPlayer.play(); // "Video is already playing."  
        videoPlayer.stop(); // "Pausing the video."  
        videoPlayer.play(); // "Resuming the video."  
        videoPlayer.stop(); // "Pausing the video."  
        videoPlayer.stop(); // "Stopping the video."  
        videoPlayer.stop(); // "Video is already stopped."  
    }  
  
}
```

만약 if 문으로 상태에 따라서 동작하도록 코드를 작성했다면

```java
public class VideoPlayer {  
  
    private String state;  
  
    public VideoPlayer() {  
        this.state = "Stopped";  
    }  
  
    public void play() {  
        if (state.equals("Stopped")) {  
            System.out.println("Starting the video.");  
            state = "Playing";  
        } else if (state.equals("Playing")) {  
            System.out.println("Video is already playing.");  
        } else if (state.equals("Paused")) {  
            System.out.println("Resuming the video.");  
            state = "Playing";  
        }  
    }  
  
    public void stop() {  
        if (state.equals("Playing")) {  
            System.out.println("Pausing the video.");  
            state = "Paused";  
        } else if (state.equals("Paused")) {  
            System.out.println("Stopping the video.");  
            state = "Stopped";  
        } else if (state.equals("Stopped")) {  
            System.out.println("Video is already stopped.");  
        }  
    }  
}
```
