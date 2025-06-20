# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 개발 명령어

### 설치 및 설정
```bash
# 의존성 설치
pnpm install

# 데이터베이스 설정
npx prisma migrate dev
npx prisma generate
```

### 개발 서버
```bash
# 개발 모드로 시작 (watch 모드)
pnpm run start:dev

# 디버그 모드로 시작
pnpm run start:debug

# 프로덕션 빌드 및 시작
pnpm run build
pnpm run start:prod
```

### 테스트
```bash
# 단위 테스트 실행
pnpm run test

# 테스트 watch 모드
pnpm run test:watch

# E2E 테스트 실행
pnpm run test:e2e

# 테스트 커버리지
pnpm run test:cov
```

### 코드 품질
```bash
# 린트 및 수정
pnpm run lint

# 코드 포맷팅
pnpm run format
```

## 아키텍처 개요

Ansible Flow 관리 시스템을 위한 **NestJS 백엔드 애플리케이션**으로 다음과 같은 주요 아키텍처 패턴을 사용합니다:

### 핵심 아키텍처
- **프레임워크**: NestJS with TypeScript
- **데이터베이스**: SQLite with Prisma ORM
- **인증**: JWT with OAuth2 (Google, GitHub, Kakao)
- **API**: RESTful APIs with Swagger 문서화
- **로깅**: Pino logger를 통한 구조화된 로깅

### 도메인 구조
```
src/
├── auth/           # 인증 및 권한 관리 (JWT, OAuth)
├── user/           # 사용자 관리
├── project/        # 프로젝트 관리
├── flow/           # 워크플로우 관리
├── node/           # 플로우 노드 관리
├── edge/           # 플로우 엣지 관리
├── common/         # 공통 유틸리티 (필터, 인터셉터, 미들웨어)
├── config/         # 설정 모듈
└── prisma/         # 데이터베이스 서비스
```

### 주요 컴포넌트

#### 인증 시스템
- JWT access/refresh token 전략
- OAuth2 통합 (Google, GitHub, Kakao)
- 프로젝트 멤버십 가드를 통한 권한 관리
- 프론트엔드를 위한 쿠키 기반 인증

#### 데이터베이스 스키마
- **User**: OAuth 및 로컬 인증
- **Project**: 사용자 소유 프로젝트
- **Flow**: 프로젝트 내 워크플로우
- **Node**: 위치/스타일링을 포함한 시각적 플로우 컴포넌트
- **Edge**: 노드 간 연결
- **Token**: 리프레시 토큰 관리
- **OauthState**: OAuth 상태 관리

#### API 기능
- class-validator를 사용한 글로벌 검증 파이프라인
- 응답 포맷팅을 위한 Transform 인터셉터
- 에러 처리를 위한 HTTP 예외 필터
- 프론트엔드 통합을 위한 CORS 활성화
- `/api`에서 Swagger API 문서 제공

### 환경 설정
시작 시 검증되는 필수 환경 변수:
- `NODE_ENV`: development|production|test
- `DATABASE_URL`: SQLite 데이터베이스 경로
- JWT 시크릿 및 만료 시간
- 각 프로바이더의 OAuth 클라이언트 자격 증명
- `FRONTEND_URL`: CORS 설정

### 개발 패턴
- **모듈화 구조**: 각 도메인은 고유한 모듈을 가짐
- **DTO 검증**: class-validator를 사용한 입력 검증
- **깔끔한 분리**: 컨트롤러, 서비스, 리포지토리 분리
- **가드 기반 권한 관리**: JWT 및 프로젝트 멤버십 가드
- **구조화된 로깅**: Pino를 통한 요청/응답 로깅

## 중요 사항

### 데이터베이스
- 개발 환경에서 SQLite를 Prisma 마이그레이션과 함께 사용
- 생성된 Prisma 클라이언트는 `../generated/client`로 출력
- 스키마 변경 후 항상 `npx prisma generate` 실행

### 인증
- 로컬 및 OAuth 인증 모두 지원
- 웹 프론트엔드를 위한 쿠키 기반 세션
- 가드를 통한 프로젝트 레벨 권한 관리

### API 문서
- Swagger UI는 `http://localhost:3001/api`에서 제공
- API 접두사: `/api/v1`

### 테스트
- 단위 테스트는 Jest with TypeScript 사용
- E2E 테스트는 별도로 구성
- 테스트 환경은 별도의 데이터베이스 설정 사용