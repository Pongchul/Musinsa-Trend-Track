# 🛍️ Musinsa Trend Track

> 무신사 실시간 패션 랭킹 데이터를 자동 수집하고, 트렌드를 시각화하는 풀스택 프로젝트

---

## 📌 프로젝트 개요

대용량 트래픽에 대한 경험이 부족하여 개인적인 취미와 크롤링을 이용하여 대규모 데이터를 생성 및 가공하여 만든 프로젝트 입니다.
혼자서 A ~ Z 까지 진행중이며, 이전 회사에서 사용했던 언어를 기반으로 새로운 라이브러리를 도입하여 구성하였습니다.
Python 크롤러로 무신사 랭킹 데이터를 자동 수집하고, Spring Boot API 서버를 통해 가공한 뒤, TypeScript 기반 프론트엔드로 시각화합니다.

---

## 🛠️ 기술 스택

| 영역 | 기술 |
|------|------|
| 크롤링 | Python, Playwright |
| 백엔드 | Java, Spring Boot |
| 프론트엔드 | TypeScript, HTML, CSS |

---

## 🗂️ 프로젝트 구조

```
Musinsa-Trend-Track/
├── backend/         # Spring Boot API 서버
├── frontend/        # TypeScript 기반 UI
└── crawler/         # Python 크롤러 (Playwright)
```

---

## ⚙️ 크롤러 동작 방식

무신사 랭킹 페이지는 **무한 스크롤** 구조로 되어 있어, 단순 HTTP 요청으로는 전체 데이터를 수집할 수 없습니다.  
이를 해결하기 위해 `Playwright`를 사용해 실제 브라우저를 제어하는 방식으로 구현했습니다.

**수집 흐름:**

1. Playwright로 브라우저를 실행하고 랭킹 페이지에 접근
2. 스크롤을 내리며 동적으로 로딩되는 상품 데이터를 순차 수집
3. 중복 상품 ID 필터링 및 1~100위 범위 검증
4. 수집 완료 후 누락 랭킹 검증 (1~100위 개별 확인)
5. Spring Boot 서버(`POST /api/crawler/rankings`)로 데이터 전송
6. 전송 실패 시 로컬 JSON 파일로 백업

**수집 데이터:**

- 상품 ID, 브랜드명, 상품명, 가격, 할인율, 이미지, 링크, 카테고리, 랭킹 순위

---

## 🚀 실행 방법

### 크롤러 (Python)

```bash
# 의존성 설치
pip install playwright requests
playwright install chromium

# 크롤러 실행 (백엔드 서버가 실행 중이어야 합니다)
python crawler.py
```

### 백엔드 (Spring Boot)

```bash
cd backend
./gradlew bootRun
```

### 프론트엔드

```bash
cd frontend
npm install
npm run dev
```

---

## 💡 기술적 고민 & 해결 과정

**문제:** 무신사 랭킹 페이지가 무한 스크롤 기반이라 정적 크롤링 불가  
**해결:** Playwright로 실제 브라우저를 자동 제어하여 스크롤 이벤트 발생 및 DOM 데이터 수집

---

## 📎 관련 링크

- GitHub: [https://github.com/Pongchul/Musinsa-Trend-Track](https://github.com/Pongchul/Musinsa-Trend-Track)# Musinsa-Trend-Track
