---
title: sv_convention 논의
aliases: 
categories: 
tags: 
created: 2024-08-28 06:53
updated: 2024-08-28 06:54
---
### Workflow

1. 요구사항 정의
2. 이슈 생성
3. 브랜치 생성
4. 코드 작업
5. MR 생성
6. 코드 리뷰
7. MR 병합
8. 배포

### Issue

- [ ] 이슈 템플릿 정의
- [ ] 먼데이와 이중으로 작성을 해야하기 때문에 먼데이의 업데이트 템플릿과 이슈 템플릿을 통일하는 방법(?)
	- 작업 내용에 따라 템플릿 다름..

### MR

- [ ] MR 템플릿 정의

MR 크기를 가능한 작게 유지

### Code Review

- [x] 이모지 vs Pn룰(?)
- Pn룰 결정


리뷰 기간
- [x] 업무일 기준 최대 2일

승인 인원
- 필수로 1명, 일반적으로 2명

예외 상황
- hot-fix
- 2명 이상 부재중인 경우
- 리뷰가 무의미한 경우, 작업 내용에 비해 리뷰로 인한 리소스 낭비가 심한 경우


**공유하고 싶은 내용이 있거나 공유 받고 싶은 내용**이 있는 경우 오프라인 코드 리뷰 진행
- [x] 정기적 vs 비정기적
- 아이디어, 브레인 스토밍
- 비정기적!


### Code Convention
- 코드 리뷰를 통해서 점진적으로 확립 예정


### Naming Convention

일반적으로 쓰이는 약어가 아니면 가능한 전체 단어로 설정

의미가 있는 변수에 의미가 없는 naming 금지

기간에 관한 날짜 이름을 from/to 로 설정

### 기타

- 현재 API 에서 feat 과 fix 만 반영되는

### Link

[Google’s Code Review Guidelines](https://google.github.io/eng-practices/)
[구글의 코드 리뷰 가이드: 한글 번역본](https://madplay.github.io/post/google-code-review-guide)
[코드 리뷰 in 뱅크샐러드 개발 문화](https://blog.banksalad.com/tech/banksalad-code-review-culture/#%EC%BB%A4%EB%AE%A4%EB%8B%88%EC%BC%80%EC%9D%B4%EC%85%98-%EB%B9%84%EC%9A%A9%EC%9D%84-%EC%A4%84%EC%9D%B4%EA%B8%B0-%EC%9C%84%ED%95%9C-pn-%EB%A3%B0)
[우리, 이모지로 코드 리뷰할까요?](https://wormwlrm.github.io/2024/02/04/Code-Review-with-Emoji.html)
