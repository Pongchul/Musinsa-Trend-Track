# 🎯 무신사 랭킹 트렌드 추적 서비스

> 무신사 랭킹 변동을 시간별로 추적하여 트렌드 분석 및 급상승/급하락 상품을 한눈에 파악할 수 있는 서비스

[![Java](https://img.shields.io/badge/Java-17-007396?style=flat&logo=java)](https://www.oracle.com/java/)
[![Spring Boot](https://img.shields.io/badge/Spring%20Boot-3.2-6DB33F?style=flat&logo=spring-boot)](https://spring.io/projects/spring-boot)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-15-336791?style=flat&logo=postgresql)](https://www.postgresql.org/)
[![Python](https://img.shields.io/badge/Python-3.11-3776AB?style=flat&logo=python)](https://www.python.org/)

---

## 📋 목차

- [프로젝트 소개](#-프로젝트-소개)
- [주요 기능](#-주요-기능)
- [기술 스택](#-기술-스택)
- [시스템 아키텍처](#-시스템-아키텍처)
- [프로젝트 구조](#-프로젝트-구조)
- [시작하기](#-시작하기)
- [API 문서](#-api-문서)
- [데이터베이스 스키마](#-데이터베이스-스키마)
- [개발 가이드](#-개발-가이드)
- [트러블슈팅](#-트러블슈팅)

---

## 🎯 프로젝트 소개

### 배경
무신사 랭킹은 실시간으로 변동하지만, 사용자는 특정 시점의 랭킹만 확인할 수 있습니다.  
**"어제 이 상품이 몇 위였지?"**, **"이 브랜드가 요즘 핫한가?"** 같은 궁금증을 해결하기 위해 시작했습니다.

### 핵심 가치
- ⏰ **시간별 랭킹 이력 추적**: 1시간마다 자동 수집
- 📈 **급상승/급하락 분석**: 트렌드 변화 즉시 파악
- 🔔 **찜 상품 알림**: 관심 상품 랭킹 변동 시 푸시 알림
- 📊 **브랜드 트렌드 분석**: 브랜드별 점유율 및 평균 랭킹

---

## ✨ 주요 기능

### 1️⃣ 랭킹 스냅샷
- 매 시간 무신사 랭킹 Top 100 자동 크롤링
- 순위, 가격, 할인율 이력 저장
- 시계열 데이터 기반 트렌드 분석

### 2️⃣ 급상승/급하락 상품
```
[오늘의 급상승 TOP 10]
🔥 1위: 무신사 스탠다드 오버핏 티셔츠 (25위 → 8위 ⬆17)
🔥 2위: 디스이즈네버댓 후디 (45위 → 12위 ⬆33)
...
```

### 3️⃣ 랭킹 변동 그래프
- 1일 / 7일 / 30일 단위 랭킹 추이
- 특정 시점 클릭 시 당시 가격/할인율 표시
- Recharts 기반 인터랙티브 차트

### 4️⃣ 브랜드 트렌드
- 브랜드별 Top 100 내 상품 개수 (점유율)
- 브랜드별 평균 랭킹
- 일별 브랜드 성과 변화

### 5️⃣ 찜 상품 알림
- 관심 상품 찜 기능
- 10계단 이상 변동 시 푸시 알림
- 알림 기준 커스터마이징 가능

---

## 🛠 기술 스택

### Backend
```
- Java 17
- Spring Boot 3.2
- Spring Data JPA
- PostgreSQL 15
- Redis (캐싱)
- Spring Scheduler
```

### Crawler
```
- Python 3.11
- Playwright (브라우저 자동화)
- Requests
```

### Frontend (Web)
```
- React 18 / Next.js 14
- Zustand (상태관리)
- React Query (서버 상태)
- Tailwind CSS
- Recharts (차트)
```

### Mobile (iOS)
```
- Swift 5.9
- UIKit + SnapKit
- MVVM Architecture
- RxSwift
- Alamofire
- Kingfisher
- Realm
```

### Infrastructure
```
- AWS EC2
- Docker
- GitHub Actions (CI/CD)
- Firebase Cloud Messaging
- Grafana + Prometheus
```

---

## 🏗 시스템 아키텍처

```
┌─────────────┐
│   무신사    │
└──────┬──────┘
       │ (크롤링)
       ↓
┌─────────────────────┐
│  Python Crawler     │
│  (Playwright)       │
└──────┬──────────────┘
       │ REST API
       ↓
┌─────────────────────┐      ┌──────────────┐
│  Spring Boot API    │ ←──→ │ PostgreSQL   │
│  (Scheduler 1시간)  │      │ (이력 저장)  │
└──────┬──────────────┘      └──────────────┘
       │
       ├─→ Redis Cache
       │
       └─→ FCM (푸시 알림)
       │
       ↓
┌──────────────┬──────────────┐
│  React Web   │   iOS App    │
└──────────────┴──────────────┘
```

---

## 📁 프로젝트 구조

```
musinsa-ranking-tracker/
├── src/main/java/com/musinsa/ranking/
│   ├── product/              # 상품 마스터 관리
│   │   ├── domain/
│   │   ├── repository/
│   │   ├── service/
│   │   ├── controller/
│   │   └── dto/
│   │
│   ├── ranking/              # 랭킹 시계열 데이터
│   │   ├── domain/
│   │   ├── repository/
│   │   ├── service/
│   │   ├── controller/
│   │   └── dto/
│   │
│   ├── brand/                # 브랜드 통계
│   ├── watchlist/            # 찜 목록
│   ├── crawler/              # 크롤링 모듈
│   ├── notification/         # 알림 모듈
│   └── common/               # 공통 (Config, Exception, Util)
│
├── src/main/resources/
│   ├── application.yml
│   └── db/migration/         # Flyway SQL
│
└── crawler/                  # Python 크롤러
    └── musinsa_crawler.py
```

**모듈별 상세 구조는 [디렉토리 구조 문서](./docs/DIRECTORY_STRUCTURE.md) 참고**

---

## 🚀 시작하기

### 사전 요구사항
- Java 17+
- PostgreSQL 15+
- Redis
- Python 3.11+
- Node.js 18+ (프론트엔드)

### 1. 저장소 클론
```bash
git clone https://github.com/your-username/musinsa-ranking-tracker.git
cd musinsa-ranking-tracker
```

### 2. 데이터베이스 설정
```bash
# PostgreSQL 접속
psql -U postgres

# 데이터베이스 생성
CREATE DATABASE musinsa_ranking;
```

### 3. 환경 변수 설정
```bash
# application-local.yml 생성
cp src/main/resources/application.yml src/main/resources/application-local.yml
```

```yaml
# application-local.yml
spring:
  datasource:
    url: jdbc:postgresql://localhost:5432/musinsa_ranking
    username: your_username
    password: your_password
  
  redis:
    host: localhost
    port: 6379
```

### 4. 백엔드 실행
```bash
# Gradle 빌드 및 실행
./gradlew bootRun --args='--spring.profiles.active=local'
```

### 5. Python 크롤러 설정
```bash
cd crawler
pip install -r requirements.txt
playwright install chromium
```

### 6. 크롤러 실행 (테스트)
```bash
python musinsa_crawler.py
```

### 7. API 확인
```
http://localhost:8080/swagger-ui.html
```

---

## 📡 API 문서

### 1. 현재 랭킹 조회
```http
GET /api/v1/rankings/current?category=TOP&limit=100
```

**Response:**
```json
{
  "category": "TOP",
  "snapshotDate": "2025-01-04T15:00:00",
  "rankings": [
    {
      "rank": 1,
      "productId": "1234567",
      "productName": "오버핏 반팔 티셔츠",
      "brandName": "무신사 스탠다드",
      "price": "29,900",
      "priceNumeric": 29900,
      "discountRate": "20%",
      "imageUrl": "https://...",
      "rankChange": -5,
      "previousRank": 6
    }
  ]
}
```

### 2. 급상승 상품
```http
GET /api/v1/rankings/rising?category=TOP&threshold=10
```

### 3. 상품 랭킹 히스토리
```http
GET /api/v1/rankings/history/{productId}?startDate=2025-01-01&endDate=2025-01-04
```

### 4. 브랜드 트렌드
```http
GET /api/v1/brands/trend?brandName=무신사스탠다드&period=30
```

### 5. 찜 목록 추가
```http
POST /api/v1/watchlist
Content-Type: application/json

{
  "productId": "1234567",
  "notificationEnabled": true,
  "notificationThreshold": 10
}
```

**전체 API 문서: [Swagger UI](http://localhost:8080/swagger-ui.html)**

---

## 💾 데이터베이스 스키마

### ERD
```
products (상품 마스터)
├─ id (PK)
├─ product_id (무신사 ID, UNIQUE)
├─ product_name
├─ brand_name
├─ image_url
└─ product_url

ranking_snapshots (시계열 랭킹)
├─ id (PK)
├─ product_id (FK → products)
├─ rank
├─ category
├─ snapshot_date (시간 단위)
├─ price
├─ discount_rate
├─ rank_change
└─ price_change

brand_trend_stats (브랜드 통계)
user_watchlist (찜 목록)
```

**상세 스키마: [DATABASE.md](./docs/DATABASE.md)**

---

## 🛠 개발 가이드

### 로컬 개발 환경
```bash
# PostgreSQL 실행
brew services start postgresql@15

# Redis 실행
brew services start redis

# 백엔드 실행
./gradlew bootRun

# 프론트엔드 실행 (별도 터미널)
cd frontend
npm run dev
```

### 테스트 실행
```bash
# 전체 테스트
./gradlew test

# 특정 모듈 테스트
./gradlew :product:test
./gradlew :ranking:test
```

### 코드 컨벤션
- **Java**: Google Java Style Guide
- **Python**: PEP 8
- **Commit**: Conventional Commits

```bash
# 커밋 메시지 예시
feat(ranking): 급상승 상품 조회 API 추가
fix(crawler): 스크롤 로직 개선으로 100위까지 수집
docs(readme): API 문서 업데이트
```

### 브랜치 전략
```
main          # 프로덕션
├─ develop    # 개발
   ├─ feature/ranking-api
   ├─ feature/brand-trend
   └─ fix/crawler-scroll
```

---

## 🐛 트러블슈팅

### 1. 크롤링 시 1~60위만 수집됨
**원인**: 스크롤 후 바로 수집하여 하단 데이터 미로딩

**해결**:
```python
# 페이지 끝까지 스크롤
page.evaluate("window.scrollTo(0, document.body.scrollHeight)")
page.wait_for_timeout(2000)

# 100위 요소 로딩 확인
page.wait_for_selector('a[data-item-list-index="100"]')
```

### 2. Product 테이블 매번 UPDATE로 성능 저하
**해결**: Product는 마스터 테이블로 유지, 가격/할인율은 RankingSnapshot에 저장

### 3. 중복 데이터 수집
**해결**: `seen_product_ids` Set으로 중복 제거
```python
seen_product_ids = set()
if product_id in seen_product_ids:
    continue
seen_product_ids.add(product_id)
```

---

## 📈 로드맵

### Phase 1: MVP (Week 1-4)
- [x] 크롤링 스크립트 개발
- [x] DB 설계 및 구현
- [ ] 랭킹 조회 API
- [ ] 급상승 상품 API

### Phase 2: 고도화 (Week 5-8)
- [ ] 브랜드 트렌드 분석
- [ ] 찜 기능 + 푸시 알림
- [ ] React Web 개발
- [ ] iOS 앱 개발

### Phase 3: 배포 (Week 9-10)
- [ ] AWS 배포
- [ ] CI/CD 구축
- [ ] 모니터링 (Grafana)

---


## 🙏 감사의 말

- [무신사](https://www.musinsa.com) - 데이터 제공
- [Playwright](https://playwright.dev) - 크롤링 도구
- [Spring Boot](https://spring.io/projects/spring-boot) - 백엔드 프레임워크

---

**⭐ 이 프로젝트가 도움이 되셨다면 Star를 눌러주세요!**