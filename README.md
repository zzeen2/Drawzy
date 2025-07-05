# 🎲 Drawzy - LuckyDraw Token (LDT)

## 📖 목차
- [✨ 프로젝트 소개](#-프로젝트-소개)
- [📝 프로젝트 개요](#-프로젝트-개요)
- [🚀 배포 정보](#-배포-정보)
- [💡 주요 기능](#-주요-기능)
- [🧑‍💻 개발자 정보](#-개발자-정보)
- [📱 화면 구성 및 기능](#-화면-구성-및-기능)
  - [🏠 메인 페이지](#-메인-페이지)
  - [🎲 상품권 뽑기](#-상품권-뽑기)
  - [🎁 내 상품권](#-내-상품권)
  - [📊 대시보드](#-대시보드)
  - [🎫 상품권 등록](#-상품권-등록)
- [🛠 기술 스택](#-기술-스택)
- [🌟 3일간 개발 과정](#-3일간-개발-과정)
- [💭 프로젝트 회고](#-프로젝트-회고)

---

## ✨ 프로젝트 소개

Drawzy는 Web3 기술을 활용한 혁신적인 랜덤뽑기 마켓플레이스입니다. 기존의 불투명한 뽑기 시스템과 달리, 블록체인 기반의 투명하고 공정한 시스템을 제공합니다. 사용자들은 LuckyDraw Token(LDT)을 사용하여 가격대별로 분류된 상품권을 랜덤으로 획득할 수 있으며, 모든 거래는 스마트 컨트랙트를 통해 투명하게 처리됩니다.

---

## 📝 프로젝트 개요
- **프로젝트명**: Drawzy - LuckyDraw Token (LDT)
- **목적**: 블록체인 기반 투명한 랜덤뽑기 마켓플레이스 개발
- **개발 기간**: 2025.07.02 ~ 2025.07.04 (3일간)
- **참여 인원**: 개인 프로젝트 (1명)

---

## 🚀 배포 정보

### 🌐 테스트 환경
- **네트워크**: Sepolia Testnet
- **컨트랙트 주소**: `0xB9Cb016db7dAd372f104440166D90baBe44EA0DD`
- **프론트엔드**: React 기반 웹 애플리케이션
- **지갑 연결**: MetaMask

### 🔧 로컬 실행 방법
```bash
# 프론트엔드 실행 (컨트랙트는 이미 배포됨)
cd frontend
npm install
npm start
```

### 📸 이미지 파일 준비
프로젝트 루트에 `images` 폴더를 생성하고 다음 이미지들을 추가하세요:
- `main-page.png` - 메인 페이지 스크린샷
- `draw-page-1.png` - 뽑기 페이지 카테고리 선택 화면
- `draw-page-2.png` - 뽑기 결과 모달 화면
- `my-items-page.png` - 내 상품권 페이지 스크린샷
- `dashboard-page.png` - 대시보드 페이지 스크린샷
- `register-step1.png` - 상품권 등록 1단계 화면
- `register-step2.png` - 상품권 등록 2단계 화면
---

## 💡 주요 기능
* **가격대별 카테고리 시스템**: 1-6 LDT 카테고리로 상품 자동 분류
* **투명한 랜덤뽑기**: 블록체인 기반 검증 가능한 랜덤 시스템
* **상품권 등록/관리**: 사용자가 직접 상품권을 등록하고 관리
* **실시간 대시보드**: 플랫폼 전체 통계 및 활동 현황
* **지갑 연동**: MetaMask를 통한 안전한 Web3 연결
* **토큰 경제**: 가입 보너스 및 등록 보상 시스템

---

## 🧑‍💻 개발자 정보

| 역할 | 담당 업무 |
|------|----------|
|[@zzeen2](https://github.com/zzeen2)</br>**Full-Stack Developer** | • 스마트 컨트랙트 설계 및 개발<br>• React 기반 프론트엔드 개발<br>• Web3 연동 및 사용자 경험 최적화<br>• 전체 시스템 아키텍처 설계 |

---

## 📱 화면 구성 및 기능

### 🏠 메인 페이지

<!-- 메인 페이지 이미지 -->
<div align="center">
  <img src="./images/main-page.png" width="800" alt="메인 페이지"/>
  <br/><b>메인 페이지 - 지갑 연결 및 프로세스 안내</b>
</div>

**주요 기능**:
- **지갑 연결 상태 표시**: MetaMask 연결 여부 및 네트워크 확인
- **시작하기 버튼**: 지갑 미연결 시 연결 유도, 연결 시 뽑기 페이지 이동
- **4단계 프로세스 안내**: 토큰 받기 → 뽑기 → 상품권 획득 → 상품 등록
- **카테고리별 뽑기 섹션**: 6개 가격대별 카테고리 소개

### 🎲 상품권 뽑기

<!-- 상품권 뽑기 이미지 -->
<div align="center">
  <table>
    <tr>
      <td align="center">
        <img src="./images/draw-page-1.png" width="400" alt="뽑기 페이지 - 카테고리 선택"/>
        <br/><b>카테고리 선택 화면</b>
      </td>
      <td align="center">
        <img src="./images/draw-page-2.png" width="400" alt="뽑기 페이지 - 뽑기 결과"/>
        <br/><b>뽑기 결과 모달</b>
      </td>
    </tr>
  </table>
</div>

**주요 기능**:
- **카테고리 선택**: 1-6 LDT 가격대별 선택
- **실시간 재고 확인**: 각 카테고리별 남은 상품권 수 표시
- **뽑기 애니메이션**: 스피닝 애니메이션으로 긴장감 연출
- **결과 모달**: 획득한 상품권 정보를 모달로 표시
- **토큰 잔액 확인**: 현재 보유 LDT 토큰 실시간 표시

### 🎁 내 상품권

<!-- 내 상품권 이미지 -->
<div align="center">
  <img src="./images/my-items-page.png" width="800" alt="내 상품권 페이지"/>
  <br/><b>내 상품권 - 획득한 상품권 목록 및 관리</b>
</div>

**주요 기능**:
- **획득 상품권 목록**: 뽑기로 획득한 모든 상품권 표시
- **카테고리별 필터링**: 전체/1-6 LDT 카테고리별 필터
- **쿠폰 코드 복사**: 원클릭으로 쿠폰 코드 클립보드 복사
- **사용 상태 관리**: 사용완료/사용됨 토글 기능
- **카드 레이아웃**: 한 줄에 3개씩 배치되는 반응형 그리드

### 📊 대시보드

<!-- 대시보드 이미지 -->
<div align="center">
  <img src="./images/dashboard-page.png" width="800" alt="대시보드 페이지"/>
  <br/><b>대시보드 - 플랫폼 전체 통계 및 실시간 활동</b>
</div>

**주요 기능**:
- **전체 플랫폼 통계**: 총 쿠폰 수, 총 가치, 잔여 통계
- **가격별 분포**: 각 카테고리별 등록/잔여 쿠폰 수
- **실시간 활동**: 최근 등록 및 뽑기 활동 피드
- **최근 추가 쿠폰**: 최신 등록된 상품권 목록
- **품절 표시**: 잔여 쿠폰이 0개인 카테고리 빨간색 표시

### 🎫 상품권 등록

<!-- 상품권 등록 이미지 -->
<div align="center">
  <table>
    <tr>
      <td align="center">
        <img src="./images/register-step1.png" width="400" alt="상품권 등록 - 1단계"/>
        <br/><b>1단계: 카테고리 선택</b>
      </td>
      <td align="center">
        <img src="./images/register-step2.png" width="400" alt="상품권 등록 - 2단계"/>
        <br/><b>2단계: 상품권 정보 입력</b>
      </td>
    </tr>
  </table>
</div>

**주요 기능**:
- **2단계 등록 프로세스**: 카테고리 선택 → 상품권 정보 입력
- **가격대별 카테고리**: 실제 가격에 따른 자동 분류
- **등록 보상**: 카테고리별 LDT 토큰 보상 지급
- **입력 폼 검증**: 필수 정보 입력 확인 및 유효성 검사


---

## 🛠 기술 스택

### 🔗 블록체인
<img src="https://img.shields.io/badge/Solidity-363636?style=for-the-badge&logo=solidity&logoColor=white">
<img src="https://img.shields.io/badge/Hardhat-FFF04D?style=for-the-badge&logo=hardhat&logoColor=black">
<img src="https://img.shields.io/badge/OpenZeppelin-4E5EE4?style=for-the-badge&logo=openzeppelin&logoColor=white">
<img src="https://img.shields.io/badge/Ethereum-3C3C3D?style=for-the-badge&logo=ethereum&logoColor=white">

### 🎨 프론트엔드
<img src="https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black">
<img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black">
<img src="https://img.shields.io/badge/Styled_Components-DB7093?style=for-the-badge&logo=styled-components&logoColor=white">
<img src="https://img.shields.io/badge/ethers.js-2535A0?style=for-the-badge&logo=ethereum&logoColor=white">

---

## 🌟 3일간 개발 과정

### 📅 Day 1: 기초 설계 및 스마트 컨트랙트 개발
#### 🎯 목표
- 프로젝트 기본 구조 설계
- 스마트 컨트랙트 핵심 기능 구현
- 로컬 테스트 환경 구축

#### ✅ 완료 사항
- **프로젝트 초기 설정**
  - Hardhat 프로젝트 초기화
  - OpenZeppelin ERC20 토큰 기반 구조 설계
  - Sepolia 테스트넷 연결 설정

- **스마트 컨트랙트 핵심 기능**
  - `LuckyDrawToken.sol` 메인 컨트랙트 구현
  - 가입 보너스 시스템 (`claimDefaultToken`)
  - 상품권 등록 시스템 (`addCoupon`)
  - 랜덤 뽑기 시스템 (`drawCoupon`)
  - 가격대별 자동 분류 로직

- **테스트 코드 작성**
  - 토큰 발행 및 전송 테스트
  - 상품권 등록 및 뽑기 테스트
  - 랜덤성 및 공정성 검증

### 📅 Day 2: 프론트엔드 개발 및 Web3 연동
#### 🎯 목표
- React 기반 프론트엔드 구축
- MetaMask 지갑 연동 구현
- 기본 UI/UX 디자인 적용

#### ✅ 완료 사항
- **React 프로젝트 설정**
  - Create React App 기반 프로젝트 생성
  - React Router를 활용한 SPA 구조
  - Styled Components를 이용한 CSS-in-JS 스타일링

- **Web3 연동 구현**
  - `useWallet` 훅을 통한 MetaMask 연결
  - `useToken` 훅을 통한 토큰 잔액 관리
  - `useLuckyDraw` 훅을 통한 뽑기 기능
  - `useCoupon` 훅을 통한 상품권 관리

- **핵심 페이지 구현**
  - 메인 페이지: 지갑 연결 및 프로세스 안내
  - 뽑기 페이지: 카테고리 선택 및 뽑기 기능
  - 내 상품권 페이지: 획득한 상품권 목록
  - 상품권 등록 페이지: 2단계 등록 프로세스

### 📅 Day 3: 고급 기능 구현 및 최적화
#### 🎯 목표
- 대시보드 통계 시스템 구현
- 스마트 컨트랙트 고도화

#### ✅ 완료 사항
- **대시보드 시스템**
  - 전체 플랫폼 통계 (총 쿠폰 수, 총 가치)
  - 가격별 분포 (등록/잔여 쿠폰 수)
  - 실시간 활동 피드
  - 최근 등록 상품권 목록

- **스마트 컨트랙트 개선**
  - `allRegisteredCoupons` 배열 추가로 전체 통계 추적
  - `timestamp` 필드 추가로 시간 정보 기록
  - `getTotalStats()`, `getRecentCoupons()` 함수 추가
  - 남은 쿠폰 통계 계산 기능

- **최종 배포 및 테스트**
  - Sepolia 테스트넷 배포
  - 전체 기능 통합 테스트

---

## 💭 프로젝트 회고

### 🎯 **성과**
- 3일간 Web3 기술을 활용한 기본적인 DApp 구현 
- 블록체인 개발 전반적인 흐름 경험 (설계 → 개발 → 배포)
- ethers.js를 활용한 Web3 연동 및 사용자 친화적 UI/UX 설계 및 구현

### 🔧 **개선할 점**
- 보안 감사 및 랜덤성 강화 (Chainlink VRF 도입 검토)
- 테스트 커버리지 확대 (엣지 케이스, 동시성 문제 등)
- 확장성 고려한 데이터 구조 재설계

### 🚀 **이후 프로젝트 목표**
이번 프로젝트는 스마트 컨트랙트와 Web3 개발을 처음 학습하는 단계에서 기초적인 지식을 바탕으로 구현한 첫 번째 DApp입니다. 아직 초보 단계이지만 전체적인 개발 흐름을 경험할 수 있었으며, 향후에는 현재 부족한 부분들을 보완하며 단계적으로 발전시켜 나가고 싶습니다. Solidity 심화 학습과 보안 패턴 숙지를 통해 기초를 다진 후, DeFi 기본 기능 구현을 거쳐 최종적으로는 크로스체인 기술과 Layer 2 솔루션을 활용한 실제 사용자가 있는 프로덕션 레벨의 블록체인 서비스 개발을 목표로 하고 있습니다.

---
