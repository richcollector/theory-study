## 도커

내컴퓨터에 컴퓨터 하나 더 놓는 것과 같이 부팅 등 운영체제의 핵심 기능(커널)을 공유하는 가상머신의 컴퓨터를 만듭니다. 추가로 윈도우에서는 WSL (window subsystem for Linux)를 깔아야합니다.

### 도커의 이점

- 개발 / 배포 환경 통일
- 프로그램 미리설치
- 가벼운 가상컴퓨터

### 사용법

#### .dockerignore

같은 환경으로 설치하려는 목적이므로 복사가 되지 말아야 하는 목록을 적어줍니다.

- node_modules
- out
- .next
- Dockerfile

### Dockerfile

```
# 나만의 가짜 컴퓨터 만드는 설명서

# 1. 운영체제 및 프로그램 하나 하나 설치
# FROM ubuntu:22.04

# RUN sudo apt install -y nodejs
# RUN sudo npm install -g yarn

# 2. 이미 리눅스, node, npm, yarn까지 모두 깔려있는 컴퓨터 다운로드
FROM node:14

# 2-2, 패키지 먼저 설치하기
COPY ./packge.json /myfolder/
COPY ./yarn.lock /myfolder/
WORKDIR /myfolder/
RUN yarn install

# 2-3. 프로그램 셋팅하기
# RUN mkdir myfolder => 아래에서 COPY할 때, 자동으로 만들어주므로 굳이 필요 없음!
# 왼쪽 우리 오른쪽 도커
COPY . /myfolder/
RUN yarn build

# 2-4. 도커안에서 프로그램 실행하기
CMD yarn start

```

#### docker-compose

```yaml
version: "3.7"

# 컴퓨터들
services:
  # 첫번째 컴퓨터 이름
  my-frontend:
    build:
      # 도커파일이 어디에 있는지 확인
      context: .
      # 도커파일 확인
      dockerfile: Dockerfile
    #3000으로 들어온애들 3000으로 접속
    ports: -3000:3000

  # 두번째 컴퓨터 이름
  #...
```

### 명령어

- docker pull, docker push로 깃허브처럼 운영체제를 받고 올릴 수 있습니다.
- docker ps 실행
- docker ps -a 꺼진 컴퓨터까지 다 확인합니다.
- docker exec -it 실행하고 수정하게끔 권한을 줍니다.
- docker exec -it 컨테이너 id /bin/bash
- exit 도커 컴퓨터 빠져나오는 명령어
- docker-compose down 이미지삭제
- docker rm 도커 id 꺼진 것 삭제
- docker rm `docker ps -a -q` 아이디 모두 가져오기 / 빽틱안의 명령어를 먼저 실행시켜줍니다.
- docker images 꺼진 것들 볼 수 있습니다.
- docker rmi `docker images -q` 도커이미지에 있는 아이디들을 삭제 하는 것
- docker system prune -a 전체 삭제(꺼져있는 것들만 지움)
- docker-compose up -d foreground가 아닌, background에서 실행
- docker-compose stop 서버 종료
- docker-compose logs -f => 로그를 실시간으로 계속 보여줌
- docker-compose logs -f —tail=100 마지막 100개의 로그만 보여주기

### 주의사항

#### 포트포워딩

도커컴퓨터의 대한 연결 통로를 만들어야합니다.
ports: -3000:3000

#### 프로젝트가 업데이트 됐을 때

캐시가 한 번이라도 깨지면 해당 코드의 아래는 모두 재시작하기 때문에 순서를 생각해서 실행시켜야합니다.
(빌드 최적화)
