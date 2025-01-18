---
title: git submodule
aliases: 
classification: resource
tags:
  - git
created: 2024-09-19T17:45
updated: 2025-01-18T21:16
---

### git submodule

프로젝트를 수행하다 보면 다른 프로젝트를 함께 사용해야 하는 경우가 종종 있다.
함께 사용할 다른 프로젝트는 외부에서 개발한 라이브러리라던가 내부 여러 프로젝트에서 공통으로 사용할 라이브러리일 수 있다.
이런 상황에서 자주 생기는 이슈는 두 프로젝트를 서로 별개로 다루면서도 그 중 하나를 다른 하나 안에서 사용할 수 있어야 한다는 것이다.
Git 저장소 안에 다른 Git 저장소를 디렉토리로 분리해 넣는 것이 서브모듈이다. 다른 독립된 Git 저장소를 Clone 해서 내 Git 저장소 안에 포함할 수 있으며 각 저장소의 커밋은 독립적으로 관리한다.

submodule이라고 해서 main 과 sub 관리를 자동으로 해주진 않는다.
별개의 프로젝트로 관리 및 버전 관리가 되기 때문에 push/pull 을 각각의 프로젝트에서 따로 해주어야 한다.

```shell
# -b {branch_name} 을 생략하면 default branch 기준으로 submodule 을 등록한다.
git submodule add -b {branch_name} {submodule_repository_url}
```
