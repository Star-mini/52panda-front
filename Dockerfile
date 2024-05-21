# 1. Node.js 기반 이미지 사용
FROM node:16 AS builder

# 2. 작업 디렉토리 설정
WORKDIR /app

# 3. 패키지 파일을 복사하고 의존성 설치
COPY package.json yarn.lock ./
RUN yarn install

# 4. 소스 코드를 복사
COPY . .

# 5. 애플리케이션 빌드
RUN yarn build

# 6. 정적 파일을 제공하는 Nginx 설정
FROM nginx:alpine
COPY --from=0 /app/build /usr/share/nginx/html

# 7. Nginx 설정 복사
COPY nginx.conf /etc/nginx/nginx.conf

# 8. 컨테이너 실행 시 Nginx를 시작
CMD ["nginx", "-g", "daemon off;"]

# 9. Nginx의 기본 포트 공개
EXPOSE 80
