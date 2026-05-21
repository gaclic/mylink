# MyLink (마이링크)

MyLink는 여러 곳에 흩어져 있는 링크(SNS, 블로그, 포트폴리오 등)를 하나의 페이지에서 관리하고 공유할 수 있는 무료 멀티링크 프로필 서비스입니다. 누구나 쉽고 직관적으로 개인 브랜드 페이지를 구축할 수 있습니다.

## ✨ 핵심 기능

* **인라인 에디터 (Seamless Inline Edit UX)**: 별도의 편집 페이지나 팝업 창 없이, 텍스트(이름, 소개글, 링크 등)를 클릭하는 즉시 그 자리에서 바로 수정할 수 있습니다.
* **실시간 파비콘 자동 추출**: 사용자가 링크된 URL을 입력하면, Google Favicon API를 통해 해당 도메인의 공식 아이콘을 자동으로 가져와 보여줍니다.
* **안전한 데이터 관리 (Undo)**: 링크를 삭제해도 즉시 사라지지 않고 하단에 실행 취소(Undo) 스낵바가 나타나 실수를 방지합니다.
* **모바일 퍼스트 및 모던 UX**: 깔끔한 디자인 및 반응형 레이아웃을 통해 언제 어디서든 보기 좋은 MyLink 페이지를 제공합니다.

## 🛠 주요 기술 스택

* **Frontend**: Next.js 16 (App Router, Turbopack), React 19
* **Styling**: Tailwind CSS 4, shadcn/ui
* **Backend**: Firebase (Auth, Firestore)
* **Assets**: Lucide React (아이콘), Google Favicon API
* **Tooling**: TypeScript, ESLint, Prettier

## 🚀 개발 환경 설정 및 터미널 명령어

로컬 개발 환경을 구축하고 프로젝트를 실행하기 위한 가이드입니다.

### 설치 및 환경 준비

프로젝트를 클론한 뒤 필수 패키지를 설치합니다:

```bash
npm install
```

### 필수 스크립트 명령어

* `npm run dev`: 개발 서버를 엽니다 (기본적으로 Turbopack 사용).
* `npm run build`: 운영 환경 배포를 위한 프로덕션 빌드를 수행합니다.
* `npm run lint`: 코딩 컨벤션 확인을 위한 린팅을 실행합니다.
* `npm run format`: `**/*.{ts,tsx}` 파일들을 Prettier 규칙에 맞게 자동 정렬합니다.
* `npm run typecheck`: TypeScript의 타입 검증 테스트를 진행합니다.

모든 명령어는 프로젝트 루트 디렉토리에서 실행하여 주시길 바랍니다.

## 📁 주요 프로젝트 구조 요약

* `/app` - Next.js App Router의 라우팅, 페이지, 레이아웃
* `/components` - 전역에서 사용되는 리액트 컴포넌트 모음 (shadcn/ui 포함)
* `/docs` - 서비스 기획/디자인 산출물 (PRD, 사용자 시나리오 등 유관문서)
* `/lib` - 유틸리티 함수나 공통 비즈니스 로직
* `/public` - 이미지나 폰트 같은 정적 리소스 모음
