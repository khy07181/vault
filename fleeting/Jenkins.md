---
title: Jenkins
aliases: Jenkins
categories: 
tags: 
created: 2022-11-30 16:22
fc-calendar: Gregorian Calendar
fc-date: 2022-11-30 16:22
---

jenkins 설치
- `docker pull jenkins/jenkins:lts`

jenkins 실행
- `docker run -d --name jenkins -p 8080:8080 jenkins/jenkins:lts`
![jenkins_1](../attachment/img/jenkins_1.png)

password를 찾기 위해 jenkins container 접속
- `docker exec -it jenkins /bin/bash`

password 조회
`cat /var/jenkins_home/secrets/initialAdminPassword`


