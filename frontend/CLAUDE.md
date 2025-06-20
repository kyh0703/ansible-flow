# CLAUDE.md

이 파일은 Claude Code (claude.ai/code)가 이 저장소에서 작업할 때 가이드를 제공합니다.

## 개발 명령어

### 빌드 및 개발

- `npm run dev` - HMR이 포함된 개발 서버 시작 (<http://localhost:5173>)
- `npm run build` - 프로덕션 빌드 생성
- `npm run start` - 프로덕션 빌드 서빙
- `npm run typecheck` - TypeScript 타입 체크 실행 (react-router typegen 포함)
- `npm run lint` - ESLint 자동 수정 실행
- `npm run format` - Prettier로 코드 포맷팅

### 테스트

현재 package.json에 테스트 명령어가 구성되어 있지 않습니다.

## 아키텍처 개요

### 프레임워크 및 스택

- **React Router v7** - SSR 비활성화된 풀스택 React 프레임워크 (SPA 모드)
- **TypeScript** - 엄격한 타입 체크를 포함한 주요 언어
- **TailwindCSS v4** - 커스텀 구성을 포함한 스타일링
- **Vite** - 빌드 도구 및 개발 서버
- **Tanstack Query** - 서버 상태 관리 및 캐싱
- **Zustand** - Immer, devtools, persistence를 포함한 클라이언트 상태 관리
- **React Hook Form + Zod** - 폼 처리 및 검증
- **Radix UI** - 접근성이 있는 컴포넌트 프리미티브

### 도메인 기반 구조

앱은 `/app/domain/`에서 도메인 기반 아키텍처를 따릅니다:

- **auth/** - 인증 (로그인, 회원가입, OAuth, 비밀번호 찾기)
- **dashboard/** - 랜딩 페이지 및 마케팅 콘텐츠
- **flow/** - XYFlow와 Yjs를 사용한 실시간 협업 플로우 에디터
- **project/** - 프로젝트 및 플로우 관리
- **subscription/** - 구독/결제 페이지

### 주요 아키텍처 패턴

#### 상태 관리

- **Zustand 스토어** - `/app/shared/store/` 및 도메인별 스토어
- **커스텀 스토어 팩토리** - `app/shared/lib/store.ts`에서 Immer, devtools, subscription 미들웨어 포함
- **Tanstack Query** - 재시도 및 에러 처리가 구성된 서버 상태 관리

#### 실시간 협업

- **Yjs** - 플로우 에디터에서 협업 편집을 위한 통합
- **WebSocket 프로바이더** - 실시간 동기화
- **YjsContext** - `app/domain/flow/contexts/yjs-context.tsx`에서 문서 동기화 상태 관리

#### API 레이어

- **도메인별 API 서비스** - 각 도메인의 `/services/api/` 폴더
- **중앙화된 fetch 구성** - 인증 헤더 및 에러 처리 포함
- **쿼리 및 뮤테이션 훅** - 도메인별로 구성

#### React Query 사용 패턴

- **Suspense와 함께 사용** - 모든 쿼리는 Suspense로 감싸서 로딩 상태 표시
- **로딩 바 표시** - 데이터 페칭 중에는 스피너나 스켈레톤 UI 사용
- **에러 바운더리** - 쿼리 에러는 적절한 에러 UI로 처리

#### UI 컴포넌트

- **Radix UI 프리미티브** - `/app/shared/ui/`에서 확장
- **커스텀 폼 컴포넌트** - React Hook Form 통합
- **테마 시스템** - CSS 변수 및 Tailwind 통합

### 라우트 구조

라우트는 `app/routes.ts`에서 React Router의 라우트 구성을 사용하여 정의됩니다:

- `shared/providers/index.tsx`의 루트 레이아웃과 프로바이더
- 프로젝트 섹션을 위한 중첩 레이아웃
- `/auth` 접두사 하위의 인증 라우트
- 동적 세그먼트를 포함한 `/projects` 접두사 하위의 프로젝트 라우트

### 플로우 에디터 세부사항

플로우 에디터(`/app/domain/flow/`)는 다음과 같은 복잡한 도메인입니다:

- **XYFlow** - 노드 기반 시각적 편집
- **실시간 협업** - Yjs WebSocket 프로바이더를 통한
- **커스텀 노드 타입** - 연결 로직 포함
- **툴바 및 사이드바** - 편집 도구용 컴포넌트
- **상태 동기화** - 로컬 및 협업 상태 간

### 포맷터

- 항상 소스를 작업한 후 포맷터를 꼭 적용해줘

## Import Aliases

- `@/`는 코드베이스 전체에서 절대 임포트를 위해 `/app/` 디렉터리에 매핑됩니다
