# Docker

- 컨테이너 기반의 오픈소스 가상화 플랫폼
- 다양한 프로그램, 실행 환경을 컨테이너로 추상화하고 동일한 인터페이스를 제공하여 프로그램의 배포 및 관리를 단순하게 해준다.
- 백엔드 프로그램, DB 서버, 메시지 큐 등 어떤 프로그램도 컨테이너로 추상화 할 수 있다.

## Container

- 어플리케이션이 하나의 환경에서 다른 환경으로 빠르고 안정적이게 실행될 수 있도록 코드와 모든 종속성을 패키징하는 소프트웨어의 표준 단위이다.
- 컨테이너는 격리된 프로세스가 동작하는 기술이다.
- VM 비해 매우 빠르다.

## Image

- 컨테이너 실행에 필요한 파일과 설정값 등을 포함하고 있는 것
- 상태값을 가지지 않고 변하지 않는다.
	- immutable
- 컨테이너는 이미지를 실행한 상태이며 추가되거나 변하는 값은 컨테이너에 저장된다.
- 같은 이미지에서 여거 개의 컨테이너를 생성할 수 있고 컨테이너의 상태가 바뀌거나 컨테이너가 삭제되더라도 이미지는 변하지 않고 그대로 남아있다.
- 도커 이미지는 [Docker hub](https://hub.docker.com/)에 등록하거나 [Docker registry](https://docs.docker.com/registry/) 저장소를 직접 만들어 관리할 수 있다.

---

### Docker 설치하기

Linux
- `curl -fsSL https://get.docker.com/ | sudo sh`

Docker for Mac
- [Docker for Mac](https://docs.docker.com/desktop/get-started/)
- 네이티브처럼 보이지만 가상머신에 설치된다.

설치 확인
- `docker version`

### Container 실행하기

- `docker run [OPTIONS] IMAGE[:TAG|@DIGEST] [COMMAND] [ARG...]`

| 옵션  | 설명                                                   |
| ----- | ------------------------------------------------------ |
| -d    | detached mode : 백그라운드 모드                        |
| -p    | 호스트와 컨테이너의 포트를 연결(포워딩)                |
| -v    | 호스트와 컨테이너의 디렉토리를 연결(마운트)            |
| -e    | 컨테이너 내에서 사용할 환경변수 설정                   |
| -name | 컨테이너 이름 설정                                     |
| -rm   | 프로세스 종료 시 컨테이너 자동 제거                    |
| -it   | -i와 -t를 동시에 사용한 것으로 터미널 입력을 위한 옵션 |
| -link | 컨테이너 연결                                          |

### Docker 기본 명령어

container 목록 확인
- `docker ps [OPTIONS]`

container 중지
- `docker stop [OPTIONS] CONTAINER [CONTAINER...]`

container 제거
- `docker rm [OPTIONS] CONTAINER [CONTAINER...]`

image 목록 확인
- `docker images [OPTIONS] [REPOSITORY[:TAG]]`

image 다운로드
- `docker pull [OPTIONS] NAME[:TAG|@DIGEST]`

image 삭제
- `docker rmi [OPTIONS] IMAGE [IMAGE...]`

### Container 둘러보기

container 로그 보기
- `docker logs [OPTIONS] CONTAINER`

container 명령어 실행하기
- `docker exec [OPTIONS] CONTAINER COMMAN [ARG...]`
