## CI / CD

- Continuous Integration (지속적인 통합)

  코드와 코드가 합쳐지고, 그 코드가 제대로 돌아가는지 확인 했을 때가 진정한 통합이 이루어진 것입니다.

- Continuous Delivery (지속적인 배포)

  유저가 사용할 수 있는 곳에 배포 하는 것입니다.

### CI / CD 플랫폼의 종류

CI / CD 파이프라인 구축을 해야하는데, 설치형과 클라우드 형으로 나눌 수가 있습니다.

- 설치형

  구축하는 개발자가 직접 특정 컴퓨터에 CI/CD 플랫폼을 설치해서 활용하는 방법입니다.

  - Jenkins

- 클라우드 형

  CI/CD 플랫폼을 운영할 컴퓨터를 개발자가 직접 관리할 필요 없이 서비스 제공자가 클라우드에서 모두 운영해주는 형태입니다.

  - Travis CI

  - GitHub Actions

    GitHub과의 연동도 쉽고, 레파지토리 안에서 CI/CD까지 함께 구축하고 관리할 수 있습니다.
    public 레파지토리는 무료로 사용할 수 있어, 기업이 아닌 개인이 사용하기에 용이합니다.

#### 윈도우 bash설정

윈도우에서 bash를 사용하고 있어, AWS Command Line 설치하여도 vsCode 안에서 경로가 잡히지않아 경로를 따로 설정해줍니다.

- 설정 방법1

```
touch .bashrc
alias aws='"C:\Program Files\Amazon\AWSCLIV2\aws.exe"'
source .bashrc
```

- 설정 방법2

  - 시스템 환경 변수에 aws란 이름으로 경로를 추가합니다.
  - AWS Command Line 설치

    AWS Command Line Interface를 설치하여 명령어로 동작을 제어할 수 있게 됩니다.

  - aws --version => 설치 여부를 확인합니다.

#### AWS Command Line 사용방법

AWS 우측 상단에서 나의 로그인 정보가 써있는 곳에 있는 보안자격증명에 들어갑니다.
**엑세스키와 비밀 엑세스키를 생성** 할 수 있는데 누군가에게 보여주면 나의 AWS를 조작할 수 있어 공유하지 않아야합니다. 한번 확인하면 다시 확인 할 수 없기 때문에, 어딘가에 저장을 하거나 다시 만들어 줘야합니다.

`aws configure --profile default`

- 따로 프로필키 안넣어도 되지만 여러개 이면 입력
- 엑세스키와 비밀 엑세스키를 입력
- region 서울로 설정
- ap-northeast-2 (서울)
- output format은 enter로 넘어갈 수 있다.

`aws s3 ls --profile default`

- 인증이 된 것을 확인할 수 있다.

`aws s3 sync local_folder bucketname --delete --profile`

- 삭제하고 업로드가 동시에 된다.
- 적용예시: `aws s3 sync out/ s3://richcollector.shop --delete`

### 자동화

deploy라는 명령어로 scripts에 넣어줍니다.
build 다음 업로드할 코드를 실행시켜줍니다.
`build && aws s3 sync local_folder buketname --delete`

### GitHub Actions 사용방법

- Workflow

  CI/CD 전체의 작업의 흐름을 말합니다. YAML 형식의 파일을 통해서 설정 할 수 있습니다.

- event

  레파지토리에서 발생하는 push, pull request open, issue open등의 특정한 활동을 의미합니다.

- jobs

  하나의 runner1에서 실행될 여러 step의 모음을 의미합니다.

  - job1 => 병렬로 시작되지만, 설정으로 바꿀 수도 있습니다.
  - step1 => shell script 또는 section을 의미합니다.

- actions

  gitHub Marketplace에서 Action들을 검색하고 활용할 수 있습니다.
  자주 사용되는 기능들을 모아둔 일종의 커스텀 애플리케이션입니다.

- runner

  workflow를 실행할 서버를 의미하고, 현재 GitHub Actions의 Runner는 기본적으로 Node 16 version을 탑재하고 있습니다.

### 설정 파일

.github/ => workflows 폴더 => CICD.yaml 파일에 설정 코드를 넣어줍니다.

다른 컴퓨터에서는 configure를 하지 않은 상태라 해결을 해야합니다.
그 모든 것을 설정해줄 수 있는 actions 모음을 Marketplace에서 찾을 수 있습니다.

```yaml
name: CI/CD

on:
  push:
    branches:
      - "main"
  workflow_dispatch:

jobs:
  cicd:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - run: npm install
      - run: npm run test
      - run: npm run build
      - name: deploy to s3
        uses: jakejarvis/s3-sync-action@master
        with:
          args: --delete
        env:
          AWS_S3_BUCKET: ${{ secrets.AWS_S3_BUCKET }}
          AWS_ACCESS_KEY_ID: ${{ secrets.AWS_ACCESS_KEY_ID }}
          AWS_SECRET_ACCESS_KEY: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
          AWS_REGION: "ap-northeast-2"
```

name으로 이름을 붙여줄 수 있고, github actions에서 확인이 가능합니다.

### GitHub Setting의 secrets and variables

#### secrets (공개 되지 않아야 하는 정보)

- new repository secret만들어주기
- name에 키값을 넣어주고, secret에 value 넣어주기
- 사용법: ${{secrets.키값}}

#### variables (공개 되도 되는 정보)

- new repository variables만들어주기
- name에 키값을 넣어주고, Value에 value 넣어주기
- 사용법: ${{ variables.VARIABLE_NAME }}
