# HoBom Image Server

**호봄 프로젝트**는 '하고 싶은 개발'을 원없이 하기 위해 시작되었습니다.  
**호봄 이미지 서버**는 호봄 서비스들에 들어가는 이미지를 처리합니다.

**HoBom project** is named after our initial, has begun to freely do all the development we want regardless of companies' technical limitation.  
**HoBom Image Server** deal with all images from the HoBom services.

<br/>

## 기술 스택(Tech Stack)

`NodeJS` `NestJS` `AWS-S3`

- WAS distribution on `Koyeb` free-tier

<br/>

## 시작하기(Getting started)

Of course, `.env` on private note.

```bash
# Git clone
git clone https://github.com/HoBom-s/hb-imageServer.git

# start
npm install
npm run start
```

<br/>

## 기능(Features)

**_※ 호봄 서비스 확장에 따라 이미지 처리 기능이 추가될 예정입니다._**  
**_※ More features will be added as the Hobom service expands._**

### Upload single image

- 버킷 단일 객체(이미지) 업로드 (ex. [호봄 테크 블로그](https://github.com/HoBom-s/hbtb-back-v2) 게시글 썸네일, 유저 프로필 이미지)  
  Processing a single image from HoBom services. (ex. [HoBom Tech Blog](https://github.com/HoBom-s/hbtb-back-v2)'s thumbnails or profile images)

### Remove one image

- 버킷 단일 객체(이미지) 삭제

### Logging

- Using [winston](https://www.npmjs.com/package/winston), [winston-daily-rotate-file](https://www.npmjs.com/package/winston-daily-rotate-file), and [morgan](https://www.npmjs.com/package/morgan) for logging and tracking issues

<br/>

## 문제 해결(TroubleShooting)

- **_...ing..._** WIP on Notion **_...ing..._**
