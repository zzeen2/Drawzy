# 🎲 Drawzy - LuckyDraw Token (LDT) 프로젝트
---

<p align="center">
  <img src="https://img.shields.io/badge/Web3-Blockchain-blue?style=for-the-badge&logo=ethereum" alt="Web3 Badge"/>
  <img src="https://img.shields.io/badge/React-Frontend-61DAFB?style=for-the-badge&logo=react" alt="React Badge"/>
  <img src="https://img.shields.io/badge/Solidity-Smart_Contract-363636?style=for-the-badge&logo=solidity" alt="Solidity Badge"/>
</p>

<h1 align="center">Drawzy - LuckyDraw Token</h1>
<p align="center">
"가격대별 랜덤뽑기로 상품을 획득하는 Web3 마켓플레이스입니다. 블록체인 기반의 투명하고 공정한 뽑기 시스템을 통해 사용자들이 다양한 상품권을 재미있게 획득할 수 있습니다."
</p>

---

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
- [🔧 스마트 컨트랙트 주요 기능](#-스마트-컨트랙트-주요-기능)
- [🛠 기술 스택 및 협업 도구](#-기술-스택-및-협업-도구)
- [📁 프로젝트 폴더 구조](#-프로젝트-폴더-구조)
- [🌟 3일간 개발 과정](#-3일간-개발-과정)
- [💭 프로젝트 회고 (4L)](#-프로젝트-회고-4l)

---

## ✨ 프로젝트 소개

Drawzy는 Web3 기술을 활용한 혁신적인 랜덤뽑기 마켓플레이스입니다. 기존의 불투명한 뽑기 시스템과 달리, 블록체인 기반의 투명하고 공정한 시스템을 제공합니다. 사용자들은 LuckyDraw Token(LDT)을 사용하여 가격대별로 분류된 상품권을 랜덤으로 획득할 수 있으며, 모든 거래는 스마트 컨트랙트를 통해 투명하게 처리됩니다.

---

## 📝 프로젝트 개요
- **프로젝트명**: Drawzy - LuckyDraw Token (LDT)
- **목적**: 블록체인 기반 투명하고 공정한 랜덤뽑기 마켓플레이스 개발
- **개발 기간**: 2025.01.20 ~ 2025.01.22 (3일간)
- **참여 인원**: 개인 프로젝트 (1명)

---

## 🚀 배포 정보

### 🌐 테스트 환경
- **네트워크**: Sepolia Testnet
- **컨트랙트 주소**: `0xB9Cb016db7dAd372f104440166D90baBe44EA0DD`
- **프론트엔드**: React 기반 웹 애플리케이션
- **지갑 연결**: MetaMask 필수

### 🔧 로컬 실행 방법
```bash
# 백엔드 (스마트 컨트랙트)
npm install
npx hardhat compile
npx hardhat run scripts/deploy.js --network sepolia

# 프론트엔드
cd frontend
npm install
npm start
```

---

## 💡 주요 기능
* **가격대별 카테고리 시스템**: 1-6 LDT 카테고리로 상품 자동 분류
* **투명한 랜덤뽑기**: 블록체인 기반 검증 가능한 랜덤 시스템
* **상품권 등록/관리**: 사용자가 직접 상품권을 등록하고 관리
* **실시간 대시보드**: 플랫폼 전체 통계 및 활동 현황
* **지갑 연동**: MetaMask를 통한 안전한 Web3 연결
* **토큰 경제**: 가입 보너스 및 등록 보상 시스템
* **사용자 친화적 UI**: 네온 테마의 현대적인 디자인

---

## 🧑‍💻 개발자 정보

| 역할 | 담당 업무 |
|------|----------|
| **Full-Stack Developer** | • 스마트 컨트랙트 설계 및 개발<br>• React 기반 프론트엔드 개발<br>• Web3 연동 및 사용자 경험 최적화<br>• 전체 시스템 아키텍처 설계 |

---

## 📱 화면 구성 및 기능

### 🏠 메인 페이지
**주요 기능**:
- **지갑 연결 상태 표시**: MetaMask 연결 여부 및 네트워크 확인
- **시작하기 버튼**: 지갑 미연결 시 연결 유도, 연결 시 뽑기 페이지 이동
- **4단계 프로세스 안내**: 토큰 받기 → 뽑기 → 상품권 획득 → 상품 등록
- **카테고리별 뽑기 섹션**: 6개 가격대별 카테고리 소개
- **네온 테마 디자인**: 미래지향적이고 게임적인 UI/UX

### 🎲 상품권 뽑기
**주요 기능**:
- **카테고리 선택**: 1-6 LDT 가격대별 선택
- **실시간 재고 확인**: 각 카테고리별 남은 상품권 수 표시
- **뽑기 애니메이션**: 3초간 스피닝 애니메이션으로 긴장감 연출
- **결과 모달**: 획득한 상품권 정보를 모달로 표시
- **토큰 잔액 확인**: 현재 보유 LDT 토큰 실시간 표시

### 🎁 내 상품권
**주요 기능**:
- **획득 상품권 목록**: 뽑기로 획득한 모든 상품권 표시
- **카테고리별 필터링**: 전체/1-6 LDT 카테고리별 필터
- **쿠폰 코드 복사**: 원클릭으로 쿠폰 코드 클립보드 복사
- **사용 상태 관리**: 사용완료/사용됨 토글 기능
- **카드 레이아웃**: 한 줄에 3개씩 배치되는 반응형 그리드

### 📊 대시보드
**주요 기능**:
- **전체 플랫폼 통계**: 총 쿠폰 수, 총 가치, 잔여 통계
- **가격별 분포**: 각 카테고리별 등록/잔여 쿠폰 수
- **실시간 활동**: 최근 등록 및 뽑기 활동 피드
- **최근 추가 쿠폰**: 최신 등록된 상품권 목록
- **품절 표시**: 잔여 쿠폰이 0개인 카테고리 빨간색 표시

### 🎫 상품권 등록
**주요 기능**:
- **2단계 등록 프로세스**: 카테고리 선택 → 상품권 정보 입력
- **가격대별 카테고리**: 실제 가격에 따른 자동 분류
- **등록 보상**: 카테고리별 LDT 토큰 보상 지급
- **입력 폼 검증**: 필수 정보 입력 확인 및 유효성 검사

---

## 🔧 스마트 컨트랙트 주요 기능

### 📋 주요 함수 목록

#### 🎯 토큰 관리
```solidity
// 가입 보너스 (3 LDT)
function claimDefaultToken() external

// 토큰 잔액 조회
function balanceOf(address account) external view returns (uint256)
```

#### 🎁 상품권 관리
```solidity
// 상품권 등록 (카테고리별 보상 지급)
function addCoupon(string memory name, string memory couponCode, 
                  string memory description, uint256 realPrice) external

// 랜덤 뽑기 (토큰 소각)
function drawCoupon(uint256 category) external

// 내 상품권 조회
function getMyCoupons() external view returns(Coupon[] memory)
```

#### 📊 통계 및 조회
```solidity
// 카테고리별 상품권 수 조회
function getAllCategoryCount() external view returns(uint256, uint256, uint256, uint256, uint256, uint256)

// 전체 통계 조회
function getTotalStats() external view returns(uint256, uint256)

// 최근 등록 상품권 조회
function getRecentCoupons(uint256 limit) external view returns(Coupon[] memory)
```

### 🎲 랜덤 시스템
```solidity
function _random() internal view returns(uint256) {
    return uint256(keccak256(abi.encodePacked(
        block.timestamp, 
        block.prevrandao, 
        msg.sender, 
        block.number
    )));
}
```

### 🏷️ 가격대별 자동 분류
```solidity
function _getCategory(uint256 realPrice) internal pure returns(uint256) {
    if (realPrice <= 5000) return 1;      // 1~5,000원
    else if (realPrice <= 10000) return 2; // 5,001~10,000원
    else if (realPrice <= 15000) return 3; // 10,001~15,000원
    else if (realPrice <= 20000) return 4; // 15,001~20,000원
    else if (realPrice <= 25000) return 5; // 20,001~25,000원
    else return 6;                         // 25,001원 이상
}
```

---

## 🛠 기술 스택 및 협업 도구

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

### 🛠 개발 도구
<img src="https://img.shields.io/badge/VS_Code-007ACC?style=for-the-badge&logo=visual-studio-code&logoColor=white">
<img src="https://img.shields.io/badge/Git-F05032?style=for-the-badge&logo=git&logoColor=white">
<img src="https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white">
<img src="https://img.shields.io/badge/MetaMask-F6851B?style=for-the-badge&logo=metamask&logoColor=white">

---

## 📁 프로젝트 폴더 구조
```
📦 LuckyDraw-Token (LDT)
┣ 📂 contracts/
┃ ┗ 📜 LuckyDrawToken.sol          # 메인 스마트 컨트랙트
┣ 📂 frontend/
┃ ┣ 📂 public/
┃ ┃ ┗ 📜 index.html
┃ ┣ 📂 src/
┃ ┃ ┣ 📂 abi/                     # 컨트랙트 ABI 파일
┃ ┃ ┃ ┗ 📜 LuckyDrawToken.json
┃ ┃ ┣ 📂 components/               # React 컴포넌트
┃ ┃ ┃ ┣ 📂 Admin/
┃ ┃ ┃ ┃ ┗ 📜 RegisterCouponPage.js
┃ ┃ ┃ ┣ 📂 Draw/
┃ ┃ ┃ ┃ ┣ 📜 DrawPage.js
┃ ┃ ┃ ┃ ┗ 📜 DrawResultModal.js
┃ ┃ ┃ ┣ 📂 Home/
┃ ┃ ┃ ┃ ┣ 📜 HeroSection.js
┃ ┃ ┃ ┃ ┗ 📜 FeaturedCategories.js
┃ ┃ ┃ ┣ 📂 Layout/
┃ ┃ ┃ ┃ ┣ 📜 MainLayout.js
┃ ┃ ┃ ┃ ┗ 📜 Sidebar.js
┃ ┃ ┃ ┣ 📂 MyItems/
┃ ┃ ┃ ┃ ┗ 📜 MyItemsPage.js
┃ ┃ ┃ ┗ 📂 Stats/
┃ ┃ ┃   ┗ 📜 StatsPage.js
┃ ┃ ┣ 📂 hooks/                   # Custom Hooks
┃ ┃ ┃ ┣ 📂 contract/
┃ ┃ ┃ ┃ ┣ 📜 useCoupon.js
┃ ┃ ┃ ┃ ┣ 📜 useLuckyDraw.js
┃ ┃ ┃ ┃ ┗ 📜 useToken.js
┃ ┃ ┃ ┣ 📂 wallet/
┃ ┃ ┃ ┃ ┗ 📜 useWallet.js
┃ ┃ ┃ ┗ 📜 index.js
┃ ┃ ┣ 📂 pages/
┃ ┃ ┃ ┗ 📜 HomePage.js
┃ ┃ ┣ 📜 App.js                   # 메인 App 컴포넌트
┃ ┃ ┣ 📜 index.css
┃ ┃ ┗ 📜 index.js
┃ ┣ 📜 package.json
┃ ┗ 📜 README.md
┣ 📂 ignition/
┃ ┣ 📂 deployments/
┃ ┃ ┗ 📂 chain-11155111/          # Sepolia 배포 정보
┃ ┃   ┗ 📜 deployed_addresses.json
┃ ┗ 📂 modules/
┃   ┗ 📜 LuckyDrawTokenModule.js  # 배포 스크립트
┣ 📂 test/
┃ ┗ 📜 Lock.js                    # 테스트 코드
┣ 📜 hardhat.config.js            # Hardhat 설정
┣ 📜 package.json
┗ 📜 README.md
```

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

#### 🔧 기술적 도전
- **랜덤성 구현**: `block.timestamp`, `block.prevrandao`, `msg.sender`를 조합한 의사랜덤 생성
- **가스 최적화**: 배열 삭제 시 마지막 요소와 교체하는 방식으로 가스비 절약
- **카테고리 분류**: 실제 가격에 따른 자동 카테고리 분류 알고리즘

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

- **네온 테마 디자인**
  - 다크 모드 기반 미래지향적 디자인
  - 그라데이션 및 글로우 효과 적용
  - 반응형 레이아웃 구현

#### 🔧 기술적 도전
- **비동기 상태 관리**: 블록체인 트랜잭션의 비동기 처리 및 상태 동기화
- **사용자 경험 최적화**: 트랜잭션 대기 시간 동안의 로딩 상태 관리
- **에러 핸들링**: 네트워크 오류, 가스 부족 등 다양한 예외 상황 처리

### 📅 Day 3: 고급 기능 구현 및 최적화
#### 🎯 목표
- 대시보드 통계 시스템 구현
- 스마트 컨트랙트 고도화
- 사용자 경험 개선

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

- **사용자 경험 향상**
  - 지갑 전환 감지 및 알림 시스템
  - 카테고리별 품절 상태 표시
  - 상품권 사용 상태 토글 기능
  - 쿠폰 코드 원클릭 복사 기능

- **최종 배포 및 테스트**
  - Sepolia 테스트넷 배포
  - 컨트랙트 주소: `0xB9Cb016db7dAd372f104440166D90baBe44EA0DD`
  - 전체 기능 통합 테스트

#### 🔧 기술적 도전
- **데이터 정합성**: 뽑힌 상품권과 전체 통계 간의 데이터 일관성 유지
- **실시간 업데이트**: 블록체인 이벤트 기반 실시간 데이터 동기화
- **성능 최적화**: 대량 데이터 조회 시 가스비 최적화 및 로딩 성능 개선

---

## 💭 프로젝트 회고 (4L)

### 👍 좋았던 점 (Liked)

#### 🎯 명확한 컨셉과 차별화
기존의 불투명한 뽑기 시스템과 달리, 가격대별 분류를 통해 공정한 기대값을 보장하는 시스템을 구현한 점이 매우 만족스러웠습니다. 사용자가 투자하는 토큰만큼의 가치를 보장받을 수 있어 신뢰성 있는 서비스를 제공할 수 있었습니다.

#### 🔗 Web3 기술 스택 완전 활용
Solidity 스마트 컨트랙트부터 React 프론트엔드까지 전체 Web3 스택을 혼자서 구현하면서, 블록체인 개발의 전반적인 흐름을 깊이 있게 이해할 수 있었습니다. 특히 ethers.js를 활용한 프론트엔드-블록체인 연동 부분에서 많은 학습이 있었습니다.

#### 🎨 사용자 경험 중심 설계
네온 테마의 게임적 UI/UX 디자인과 직관적인 사용자 플로우를 통해 Web3 서비스임에도 불구하고 접근성이 높은 인터페이스를 구현할 수 있었습니다. 특히 뽑기 애니메이션과 실시간 피드백 시스템이 사용자 몰입도를 높였습니다.

#### ⚡ 빠른 개발 속도
3일이라는 짧은 기간 동안 기획부터 배포까지 완료할 수 있었던 것은 사전 계획과 우선순위 설정이 효과적이었기 때문입니다. 핵심 기능에 집중하고 점진적으로 기능을 확장하는 방식이 효율적이었습니다.

### 📚 새롭게 배운 점 (Learned)

#### 🔐 블록체인 랜덤성 구현
완전한 랜덤성을 블록체인에서 구현하는 것의 어려움을 깨달았습니다. `block.timestamp`, `block.prevrandao`, `msg.sender` 등을 조합한 의사랜덤 생성 방식을 학습했고, 향후 Chainlink VRF 같은 외부 랜덤성 오라클의 필요성을 이해하게 되었습니다.

#### 💰 가스 최적화 기법
배열에서 요소 삭제 시 마지막 요소와 교체하는 방식, 불필요한 상태 변수 최소화, 함수 호출 횟수 줄이기 등 실용적인 가스 최적화 기법들을 습득했습니다. 특히 사용자 경험과 가스비 사이의 균형을 맞추는 것이 중요함을 배웠습니다.

#### 🔄 비동기 상태 관리
블록체인 트랜잭션의 비동기적 특성으로 인한 상태 관리의 복잡성을 경험했습니다. 트랜잭션 대기, 확인, 실패 등 다양한 상태를 효과적으로 관리하는 방법을 학습했습니다.

#### 🎭 Web3 UX 패턴
일반적인 웹 서비스와 다른 Web3 서비스만의 UX 패턴들을 이해했습니다. 지갑 연결, 네트워크 확인, 트랜잭션 승인 등의 단계별 사용자 가이드의 중요성을 깨달았습니다.

### 🧩 부족했던 점 (Lacked)

#### 🔒 보안 고려사항 미흡
3일이라는 짧은 개발 기간으로 인해 보안 감사나 심화적인 보안 검토가 부족했습니다. 특히 랜덤성 조작 가능성, 프론트러닝 공격, 재진입 공격 등에 대한 방어 메커니즘이 충분하지 않았습니다.

#### 📊 데이터 구조 설계 미흡
초기 설계에서 통계 데이터 추적을 충분히 고려하지 않아, 나중에 `allRegisteredCoupons` 배열을 추가하는 등 구조적 변경이 필요했습니다. 더 체계적인 데이터 모델링이 필요했습니다.

#### 🧪 테스트 커버리지 부족
스마트 컨트랙트의 기본 기능 테스트는 작성했지만, 엣지 케이스나 복잡한 시나리오에 대한 테스트가 부족했습니다. 특히 동시성 문제나 가스 한도 초과 상황 등에 대한 테스트가 미흡했습니다.

#### 🌐 확장성 고려 부족
현재 구조는 소규모 사용자를 대상으로 설계되어 있어, 대규모 사용자나 높은 트래픽 상황에서의 확장성을 충분히 고려하지 못했습니다. 특히 이벤트 로그 조회나 대량 데이터 처리 부분에서 성능 이슈가 예상됩니다.

### 🌠 구현하고 싶었지만 구현하지 못한 점 (Longed for)

#### 🎰 고급 랜덤성 시스템
Chainlink VRF를 활용한 검증 가능한 완전 랜덤성 구현을 계획했지만, 시간 관계상 기본적인 의사랜덤 생성으로 대체했습니다. 향후 업데이트에서는 외부 랜덤성 오라클을 도입하여 더욱 공정한 시스템을 구축하고 싶습니다.

#### 🎮 게임화 요소 확장
NFT 기반 업적 시스템, 레벨 시스템, 리더보드 등 게임화 요소들을 추가하여 사용자 참여도를 높이고 싶었습니다. 특히 연속 뽑기 보너스나 특별 이벤트 등을 통해 더욱 흥미로운 경험을 제공하고 싶었습니다.

#### 💱 다중 토큰 지원
ETH, USDC 등 다양한 토큰으로 뽑기에 참여할 수 있는 시스템을 구현하고 싶었습니다. 이를 통해 사용자 접근성을 높이고 더 넓은 사용자층을 확보할 수 있을 것으로 예상됩니다.

#### 🤝 소셜 기능
친구 초대 시스템, 뽑기 결과 공유, 그룹 뽑기 등 소셜 기능을 통해 커뮤니티 형성을 도모하고 싶었습니다. Web3 서비스의 특성상 커뮤니티 참여가 중요한데, 이 부분이 아쉬웠습니다.

#### 📱 모바일 최적화
현재는 데스크톱 위주의 반응형 디자인으로 구현되어 있지만, 모바일 전용 인터페이스나 PWA(Progressive Web App) 형태로 발전시키고 싶었습니다. 특히 모바일에서의 Web3 지갑 연동 경험을 개선하고 싶습니다.

#### 🔍 고급 분석 도구
사용자 행동 분석, 뽑기 패턴 분석, 수익성 분석 등 데이터 기반의 인사이트를 제공하는 대시보드를 구현하고 싶었습니다. 이를 통해 플랫폼 운영자와 사용자 모두에게 가치 있는 정보를 제공할 수 있을 것입니다.

---

### 💭 총평 및 향후 계획

#### 🎯 프로젝트 성과
3일이라는 짧은 기간 동안 Web3 기술을 활용한 완전한 DApp을 구현할 수 있었던 것은 큰 성과였습니다. 특히 스마트 컨트랙트 설계부터 프론트엔드 개발, 배포까지 전체 개발 사이클을 경험하면서 블록체인 개발자로서의 역량을 크게 향상시킬 수 있었습니다.

#### 🔮 향후 발전 방향
1. **보안 강화**: 전문적인 보안 감사를 통한 취약점 점검 및 보완
2. **확장성 개선**: Layer 2 솔루션 도입을 통한 가스비 절감 및 성능 향상
3. **기능 확장**: 고급 랜덤성, 게임화 요소, 소셜 기능 추가
4. **사용자 경험 개선**: 모바일 최적화 및 직관적인 UI/UX 개선
5. **커뮤니티 구축**: 사용자 커뮤니티 형성을 통한 생태계 확장

#### 📈 학습 목표
이번 프로젝트를 통해 Web3 개발의 전반적인 이해도를 높일 수 있었으며, 향후에는 더욱 복잡하고 규모가 큰 DeFi 프로젝트나 NFT 마켓플레이스 등에 도전해보고 싶습니다. 특히 크로스체인 기술이나 Layer 2 솔루션에 대한 심화 학습을 통해 더욱 발전된 블록체인 서비스를 구현하는 것이 목표입니다.

---

**🎲 "3일간의 집중 개발로 완성한 Web3 랜덤뽑기 마켓플레이스 - 투명하고 공정한 블록체인 기반 뽑기 시스템을 경험해보세요!"** 