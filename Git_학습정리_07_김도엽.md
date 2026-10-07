Git & GitHub 학습 정리
1. Git & GitHub
Git과 GitHub를 사용하는 이유
프로젝트를 개발하다 보면 코드가 계속 수정되고 새로운 기능이 추가된다. 이때 변경 사항을 기록하고 이전 버전으로 돌아갈 수 있도록 버전 관리가 필요하다.
Git은 소스 코드의 변경 이력을 관리하는 분산 버전 관리 시스템이다.
Git을 사용하면 다음과 같은 작업을 할 수 있다.
- 코드 변경 이력 관리
- 이전 버전으로 복구
- 여러 사람이 동시에 개발
- 기능별 개발 관리
- 변경 사항 비교
- Merge 및 Conflict 관리
GitHub는 Git Repository를 인터넷에서 관리하고 공유할 수 있는 서비스이다.
Git = 버전 관리 도구
GitHub = Git Repository를 온라인에서 관리하고 협업하는 서비스

Git과 GitHub의 차이
구분	Git	GitHub
역할	버전 관리 시스템	Git 저장소 호스팅 서비스
사용 환경	로컬 컴퓨터	웹 기반 온라인 서비스
주요 기능	Commit, Branch, Merge 등	Repository 공유, 협업, Pull Request 등
인터넷 필요 여부	없어도 사용 가능	인터넷 기반
목적	코드 변경 이력 관리	코드 공유 및 협업


예를 들어 내 컴퓨터에서 Git으로 프로젝트의 버전을 관리하고, GitHub에 Repository를 업로드하여 다른 사람과 공유할 수 있다.
Git의 기본적인 원격 저장소 작업 흐름은 다음과 같다.
Local Repository → git push → GitHub Repository
GitHub Repository → git pull → Local Repository
Repository
**Repository(저장소)**는 프로젝트의 파일과 Git의 변경 이력을 저장하는 공간이다.
Repository는 크게 두 가지로 나눌 수 있다.
Local Repository
내 컴퓨터에 존재하는 Repository이다.
프로젝트 파일과 Git의 변경 이력이 로컬 컴퓨터에 저장된다.
Remote Repository
GitHub와 같은 원격 서버에 존재하는 Repository이다.
Remote Repository를 통해 다른 사람과 프로젝트를 공유하고 협업할 수 있다.
Commit
Commit은 현재까지의 변경 사항을 하나의 버전으로 기록하는 작업이다.
일반적으로 다음과 같은 순서로 Commit한다.
git add .
git commit -m "커밋 메시지"

예시:
git add .
git commit -m "로그인 기능 추가"

Commit 메시지를 통해 어떤 변경 사항이 추가되었는지 확인할 수 있다.
Commit을 통해 프로젝트의 변경 이력을 관리할 수 있으며, 문제가 발생했을 때 이전 상태를 확인하거나 되돌리는 데 활용할 수 있다.
Branch
**Branch(브랜치)**는 하나의 프로젝트에서 독립적인 작업을 진행할 수 있도록 개발 흐름을 분리하는 기능이다.
예를 들어 새로운 로그인 기능을 개발할 때 main에서 직접 작업하는 대신 별도의 Branch를 생성할 수 있다.
main
  └── feature/login

이를 통해 기존의 안정적인 코드에 영향을 주지 않고 새로운 기능을 개발할 수 있다.
2. Git 기본 명령어
git config
Git의 사용자 정보와 환경 설정을 관리하는 명령어이다.
사용자 이름 설정:
git config --global user.name "이름"

이메일 설정:
git config --global user.email "이메일"

현재 Git 설정 확인:
git config --list

Commit을 작성한 사용자를 식별하기 위해 사용자 이름과 이메일을 설정한다.
git init
현재 폴더를 Git Repository로 초기화하는 명령어이다.
git init

실행하면 해당 폴더에 .git 디렉터리가 생성되고 Git이 해당 프로젝트의 변경 사항을 관리할 수 있게 된다.
예를 들어 다음과 같은 프로젝트에서:
project/
├── .git/
├── index.html
├── app.js
└── README.md

.git 폴더에 Git의 버전 관리 정보가 저장된다.
git status
현재 Git Repository의 상태를 확인하는 명령어이다.
git status

다음과 같은 정보를 확인할 수 있다.
- 수정된 파일
- 새로 생성된 파일
- 삭제된 파일
- Staging Area에 추가된 파일
- 현재 Branch
Git으로 작업할 때 현재 상태를 확인하기 위해 자주 사용하는 명령어이다.
git add
변경된 파일을 Staging Area에 추가하는 명령어이다.
특정 파일 추가:
git add 파일명

모든 변경 사항 추가:
git add .

Git의 기본적인 변경 흐름은 다음과 같다.
Working Directory → git add → Staging Area → git commit → Repository
즉, git add는 Commit하기 전에 어떤 변경 사항을 Commit할 것인지 선택하는 과정이다.
git commit
Staging Area에 있는 변경 사항을 하나의 버전으로 저장하는 명령어이다.
git commit -m "커밋 메시지"

예시:
git commit -m "회원가입 기능 추가"

Commit 메시지는 변경된 내용을 명확하게 작성하는 것이 좋다.
Commit을 통해 프로젝트의 작업 이력이 하나의 기록으로 남게 된다.
git push
Local Repository의 Commit을 Remote Repository인 GitHub에 업로드하는 명령어이다.
git push

처음 Branch를 연결할 때는 다음과 같이 사용할 수 있다.
git push -u origin main

기본적인 흐름은 다음과 같다.
Local Repository → git push → GitHub Repository
git pull
GitHub의 Remote Repository에 있는 최신 변경 사항을 Local Repository로 가져오는 명령어이다.
git pull

다른 사람이 GitHub에 새로운 변경 사항을 올렸거나 다른 컴퓨터에서 작업한 내용을 현재 컴퓨터에 반영할 때 사용할 수 있다.
기본적인 흐름은 다음과 같다.
GitHub Repository → git pull → Local Repository
3. Branch
Branch란?
Branch는 하나의 프로젝트에서 서로 다른 개발 작업을 독립적으로 진행할 수 있도록 만들어진 개발 흐름이다.
예를 들어 하나의 프로젝트에서 로그인, 결제, 검색 기능을 각각 개발한다면 다음과 같이 Branch를 나눌 수 있다.
main
├── feature/login
├── feature/payment
└── feature/search

각 기능을 독립적으로 개발한 후 작업이 완료되면 Merge를 통해 하나의 Branch로 합칠 수 있다.
Branch를 사용하면 새로운 기능을 개발하는 동안 기존의 안정적인 코드에 영향을 주지 않고 작업할 수 있다.
git branch 명령어
현재 Branch 확인:
git branch

새로운 Branch 생성:
git branch feature/login

Branch 이동:
git switch feature/login

Branch 생성과 동시에 이동:
git switch -c feature/login

Branch 삭제:
git branch -d feature/login

4. Branch 관리
프로젝트의 규모와 개발 방식에 따라 다양한 Branch 전략을 사용할 수 있다.
main
실제 서비스에 배포할 수 있는 안정적인 코드를 관리하는 Branch이다.
main

develop
개발 중인 여러 기능을 통합하여 관리하는 Branch이다.
develop

feature
새로운 기능을 개발하기 위한 Branch이다.
feature/login
feature/search
feature/payment

기능별로 Branch를 만들어 독립적으로 개발할 수 있다.
hotfix
운영 중인 서비스에서 긴급하게 발생한 버그를 수정하기 위한 Branch이다.
hotfix/login-error

서비스 운영 중 긴급한 문제가 발생했을 때 빠르게 수정하기 위해 사용한다.
release
배포를 준비하면서 최종 테스트와 버그 수정을 진행하는 Branch이다.
release/v1.0.0

개발이 완료된 기능을 실제 배포하기 전에 안정성을 확인하는 용도로 사용할 수 있다.
5. Fast-forward
Fast-forward Merge는 두 Branch를 Merge할 때 별도의 Merge Commit을 만들 필요 없이 Branch의 위치를 앞으로 이동시키는 방식이다.
예를 들어 다음과 같은 상황이 있다고 가정한다.
A---B---C  main
         \
          D---E  feature

main에서 새로운 Commit이 발생하지 않았다면 feature Branch를 Merge할 때 다음과 같이 변경될 수 있다.
A---B---C---D---E  main

즉, 새로운 Merge Commit을 생성하지 않고 main의 위치를 feature Branch의 마지막 Commit까지 이동시키는 방식이다.
이것을 Fast-forward Merge라고 한다.
6. 3-way Merge
3-way Merge는 두 Branch가 서로 다른 방향으로 개발된 경우 공통 조상 Commit과 각각의 변경 사항을 비교하여 Merge하는 방식이다.
예를 들어 다음과 같은 상황이 있다.
        D---E  feature
       /
A---B---C
       \
        F---G  main

feature와 main이 서로 다른 방향으로 진행되었기 때문에 단순히 Branch의 위치만 이동할 수 없다.
Git은 공통 조상인 B와 각각의 Branch에서 변경된 내용을 비교하여 Merge한다.
결과는 다음과 같은 형태가 될 수 있다.
        D---E
       /     \
A---B---C-----M
       \     /
        F---G

여기서 M은 Merge Commit이다.
7. Merge Conflict
Merge Conflict는 서로 다른 Branch에서 같은 부분의 코드를 다르게 수정하여 Git이 자동으로 어떤 변경 사항을 적용해야 할지 판단하지 못하는 상황이다.
예를 들어 main과 feature Branch에서 동일한 코드를 서로 다르게 수정했다면 Conflict가 발생할 수 있다.
Git은 충돌이 발생한 부분을 다음과 같이 표시한다.
<<<<<<< HEAD
Hello World
=======
Hello Git
>>>>>>> feature

각 영역을 확인한 후 개발자가 최종적으로 사용할 코드를 직접 선택하고 수정해야 한다.
Conflict를 해결한 후에는 다시 Staging Area에 추가하고 Commit한다.
git add .
git commit -m "merge conflict 해결"

Merge Conflict는 여러 개발자가 같은 파일이나 같은 코드 영역을 동시에 수정할 때 자주 발생할 수 있기 때문에 Branch를 사용할 때 중요한 개념이다.
8. Git 전체 작업 흐름
일반적인 Git 작업 과정은 다음과 같다.
GitHub에서 프로젝트 가져오기
↓
git pull
↓
Branch 생성
↓
기능 개발
↓
git status
↓
git add
↓
git commit
↓
git push
↓
GitHub에서 Merge / Pull Request
실제 명령어 예시는 다음과 같다.
git pull

git switch -c feature/search

# 코드 작성

git status

git add .

git commit -m "검색 기능 추가"

git push -u origin feature/search

9. Git의 기본적인 변경 관리 구조
Git에서는 파일의 변경 사항이 다음과 같은 과정을 거쳐 저장된다.
Working Directory
       │
       │ git add
       ▼
Staging Area
       │
       │ git commit
       ▼
Local Repository
       │
       │ git push
       ▼
Remote Repository
       │
       │ git pull
       ▼
Local Repository

각 단계의 역할을 이해하면 Git의 전체적인 동작 방식을 쉽게 이해할 수 있다.
10. 핵심 정리
개념	설명
Git	소스 코드의 버전을 관리하는 시스템
GitHub	Git Repository를 온라인에서 관리하고 공유하는 서비스
Repository	프로젝트 파일과 변경 이력을 관리하는 저장소
Commit	변경 사항을 하나의 버전으로 기록
Branch	독립적인 개발 작업을 위한 개발 흐름
git config	Git 사용자 정보 및 환경 설정
git init	Git Repository 초기화
git status	현재 Git 상태 확인
git add	변경 사항을 Staging Area에 추가
git commit	변경 사항을 버전으로 저장
git push	Local Repository의 Commit을 Remote Repository로 업로드
git pull	Remote Repository의 변경 사항을 Local Repository로 가져오기
Fast-forward	Merge Commit 없이 Branch의 위치를 앞으로 이동하는 Merge 방식
3-way Merge	공통 조상을 기준으로 서로 다른 Branch를 Merge하는 방식
Merge Conflict	Git이 자동으로 Merge할 수 없는 충돌 상황


11. 오늘 학습한 내용 한 줄 정리
Git은 코드의 변경 이력을 관리하는 버전 관리 시스템이고, GitHub는 Git Repository를 온라인에서 공유하고 협업할 수 있도록 해주는 서비스이다. Branch를 사용하면 기능별로 독립적인 개발이 가능하며, Commit과 Merge를 통해 변경 사항을 체계적으로 관리할 수 있다.