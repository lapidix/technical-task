# Web3 - Vault App

> 배포 URL: https://task.lapidix.dev

## 1. 개요

Base Sepolia 테스트넷에서 작동하는 DeFi Vault 애플리케이션입니다. 사용자는 BTC, USDT, USDC 토큰을 ERC-4626 표준 Vault에 예치하고 수익을 얻을 수 있습니다.

### 1.1 주요 기능

- **실시간 Vault 가격 및 TVL 조회** - Coingecko API 연동
- **지갑 연결** - MetaMask, OKX Wallet, Backpack 지원
- **Supply/Withdraw** - ERC-4626 Vault
- **Faucet** - 테스트 토큰 받기 (Base Sepolia)

### 1.2 기술 스택

**Frontend**

- **Next.js**(15.x.x): App Router
- **React**(19.x.x)
- **TypeScript**(5.x.x)
- **Tailwind CSS**(3.x.x)
  **Web3**
- **Wagmi**(2.x.x)
- **Viem**(2.x.x)
- **RainbowKit**(2.x.x)

**State Management**

- **TanStack Query**(5.x.x)
- **Zustand**(5.x.x)

### 1.3 프로젝트 구조

```text
technical-task/
├── app/                   # Next.js App Router
│   ├── (wallet)/          # 지갑 연결 필요한 페이지
│   │   └── vault/[token]/ # Vault 상세 페이지
│   └── faucet/            # Faucet 페이지
├── pages/                 # FSD 구조를 위한 더미 디렉토리
├── src/
│   ├── app/               # 앱 레벨 (providers, layouts)
│   ├── pages/             # 페이지 컴포넌트
│   ├── widgets/           # 복합 UI 블록
│   │   ├── header/        # Header
│   │   ├── vault/         # Vault 관련 위젯
│   │   └── faucet/        # Faucet 위젯
│   ├── features/          # 비즈니스 로직
│   │   ├── vault/         # Vault hooks, services
│   │   ├── erc20/         # ERC20 hooks, services
│   │   └── wallet/        # 지갑 연결 로직
│   ├── entities/          # 도메인 엔티티
│   │   ├── vault/         # Vault types, constants
│   │   ├── erc20/         # ERC20 types, constants
│   │   └── wallet/        # Wallet types, constants
│   └── shared/            # 공통 코드
│       ├── ui/            # 공통 UI 컴포넌트
│       ├── hooks/         # 공통 hooks
```

## 2. 설계 결정 사항

### 2.1 API 오류 재시도 방식

TanStack Query의 retry를 사용하여 각 중요도 별로 재시도 횟수를 다르게 설정했습니다.

```typescript
// src/shared/config/tanstack.config.ts
defaultOptions: {
  queries: {
    staleTime: QUERY_STALE_TIME.MEDIUM,
    gcTime: 10 * 60 * 1000,
    refetchOnWindowFocus: false,
    retry: 1,
    staleTime: QUERY_STALE_TIME.MEDIUM, // 5분
    gcTime: 10 * 60 * 1000, // 10분간 캐시 유지
    refetchOnWindowFocus: false, // 불필요한 refetch 방지
    retry: 1, // 기본 1회 재시도
  },
}

// 중요 데이터는 3회 재시도
useSuspenseQuery({
  queryKey: VAULT_QUERY_KEYS.allVaultData,
  queryFn: VaultService.getAllVaultData,
  retry: 3,
});
```

**재시도 전략**

| 데이터 타입  | 재시도 | staleTime |
| ------------ | ------ | --------- |
| 가격 데이터  | 1회    | 30초      |
| 잔액 데이터  | 3회    | 10초      |
| Vault 데이터 | 3회    | 5분       |
| APR 데이터   | 1회    | 5분       |

---

### 2.2 상태 관리 방식

**설계 원칙**: 서버 데이터와 클라이언트 UI 상태를 분리했습니다.

**서버 상태 (TanStack Query)**
서버 데이터 특화 (캐싱, 재검증, 중복 요청 제거 내장), Suspense를 지원합니다.
Vault 데이터, 토큰 가격, 잔액 등 서버에서 가져오는 데이터를 관리합니다.

```typescript
// src/features/vault/hooks/useAllVaultData.ts
export const useAllVaultData = () => {
  const { data: allVaultData } = useSuspenseQuery({
    queryKey: VAULT_QUERY_KEYS.allVaultData,
    queryFn: VaultService.getAllVaultData,
    staleTime: QUERY_STALE_TIME.MEDIUM, // 5분
    retry: 3,
  });

  return { allVaultData };
};
```

**클라이언트 상태 (Zustand)**
Context API 대비 리렌더링이 최적화되어 있습니다.

Toast 알림, 모달 열림/닫힘 등 UI 상태를 관리합니다.

```typescript
// src/shared/store/toast.store.ts
export const useToastStore = create<ToastStore>((set) => ({
  toasts: [],
  addToast: (toast) =>
    set((state) => ({
      toasts: [...state.toasts, { ...toast, id: Date.now() }],
    })),
  removeToast: (id) =>
    set((state) => ({
      toasts: state.toasts.filter((t) => t.id !== id),
    })),
}));
```

**지갑 상태 (Wagmi)**

지갑 연결, 네트워크, 트랜잭션 등 Web3 관련 상태를 관리합니다.

```typescript
// Wagmi hooks 활용
const { address, isConnected } = useAccount();
const { connect } = useConnect();
const { switchChain } = useSwitchChain();
```

---

### 2.3 컴포넌트 구조

**Feature-Sliced Design 패턴**

> Feature-Sliced Design (FSD) 공식 문서 : https://feature-sliced.design/

```
src/
├── app/          # Next.js App Router (라우팅, providers)
├── pages/        # 페이지 컴포넌트 (조합 레이어)
├── widgets/      # 복합 UI 블록 (Header, VaultList)
├── features/     # 비즈니스 로직 (hooks, services)
├── entities/     # 도메인 엔티티 (types, constants)
└── shared/       # 공통 코드 (UI, hooks, libs)
```

**의존성 규칙**: `app → pages → widgets → features → entities → shared`

**Vault 기능 예시**

```
entities/vault/
├── types/           # VaultEntity, VaultBase 타입
├── constants/       # VAULT_ABI, SUPPORTED_VAULTS
└── ui/              # VaultListItem (순수 표시 컴포넌트)

features/vault/
├── hooks/           # useAllVaultData, useVaultBalance
├── services/        # VaultService (비즈니스 로직)
└── api/             # API 호출 로직

widgets/vault/
├── vault-list/      # VaultList (검색, 정렬 포함)
├── vault-form/      # VaultForm (Supply/Withdraw)
└── vault-overview/  # VaultOverview (통계 표시)

pages/vault/
└── VaultPage.tsx    # 페이지 레벨 조합
```

- 명확한 책임 분리 (entities → features → widgets → pages)
- 높은 재사용성 및 테스트 용이성

---

### 2.4 에러 처리 전략

**계층별 처리**: API → Service → Hook → UI (ErrorBoundary + Toast) 순서로 처리합니다.

**API**

```typescript
// src/entities/erc20/api/erc20.adapter.ts
try {
  const response = await fetch(url);
  if (!response.ok) throw new Error("API Error");
  return await response.json();
} catch (error) {
  throw error; // Service로 전달
}
```

**Service:**

```typescript
// src/features/vault/services/vault.service.ts
static async getAllVaultData(): Promise<VaultEntity[]> {
  try {
    const [aprData, totalAssetsData, tokenPrices] = await Promise.all([
      VaultService.getVaultAPRs(),
      VaultService.getVaultTotalAssets(),
      VaultService.getTokenPrices(),
    ]);
    return this.combineVaultData(aprData, totalAssetsData, tokenPrices);
  } catch (error) {
    console.error('Failed to fetch vault data:', error);
    throw error; // Hook으로 전달
  }
}
```

**UI:**

```typescript
// Toast로 사용자에게 알림
const { addToast } = useToastStore();

addToast({
  type: "error",
  title: "Failed to load data",
  message: "Please try again later",
});
```

각 계층에서 적절한 에러 처리로 사용자에게 Toast 알림을 제공하고, TanStack Query의 재시도로 일시적 오류를 해결하며, ErrorBoundary로 예상치 못한 오류를 처리합니다.

---

## 3. UX/UI 개선 사항

### 3.1 지갑 미연결 상태 UI 개선

지갑 미연결 상태에서는 "My Total Supply", "My Total APY" 등의 값들이 무의미하다고 생각되었습니다. 지갑이 연결되지 않은 상태에서는 모든 값이 "$0.00"으로 표시되어 의미 없는 정보를 보여주게 됩니다.

그러므로 지갑 미연결 상태에서는 의미 없는 "$0.00" 통계 대신, 지갑 연결을 유도하는 버튼을 표시하도록 변경했습니다. 이를 통해 사용자에게 명확한 행동 지침을 제공하고, 지갑 연결을 유도할 수 있습니다.

---

### 3.2 Toast 알림 시스템

Web3 트랜잭션은 네트워크 오류, 가스비 부족, 컨트랙트 실행 실패 등 다양한 이유로 실패할 수 있습니다. 하지만 사용자는 트랜잭션이 실패했는지, 성공했는지 명확하게 알 수 없다고 생각되어서 4가지 타입(SUCCESS, ERROR, WARNING, INFO)의 Toast 알림 시스템을 구현했습니다. 트랜잭션 성공/실패 시 즉각적인 피드백을 제공하며, 기본적으로 5초 동안 유지되며 수동 닫기 버튼 역시 지원합니다. 오류 발생 시 Retry 버튼을 표시하여 재시도도 가능하도록 구현했습니다.

---

### 3.3 Supply/Withdraw 통합 인터페이스, Approve, Deposit, 통합 버튼 및 Clear 버튼 추가

기존에 Supply와 Withdraw를 별도 페이지로 분리하면 사용자가 페이지를 이동해야 하므로 컨텍스트 전환 비용이 발생한다고 판단했습니다. 그래서 단일 페이지에서 탭 기반 전환을 통해 Supply와 Withdraw를 페이지 이동 없이 빠른 전환이 가능하도록 개선했습니다.

최대 금액 원클릭 입력을 위한 Max 버튼은 존재하지만, 넘버패드를 통해 여러 숫자를 하나씩 지우는 것은 사용자에게 불편함을 줄 수 있다고 판단하여, 빠른 초기화를 위한 Clear 버튼을 추가했습니다.

Approve와 Deposit을 한번에 처리도 가능하지만 각 기능을 별도로도 사용 가능하면 사용자에게 다양한 선택권이 제공될 수 있다고 생각되어 각 기능을 별도로 사용가능 하도록 개선했습니다.

### 3.4 지갑이 연결되지 않았을 경우 각 볼트의 상세 페이지로 이동 불가능

지갑이 연결되지 않았을 경우 상세페이지에서 예치 혹은 출금이 불가능하기 때문에 접근을 못하게 막고 Toast 알림을 표시하도록 개선했습니다.

## 4. 시작하기

### 4.1 사전 요구사항

- Node.js 20+
- npm
- MetaMask 등 Web3 지갑

### 4.2 설치

```bash
# 레포지토리 클론
git clone <repository-url>
cd technical-task

# 의존성 설치
npm install
```

### 4.3 환경 변수 설정

```bash
# .env.local 파일 생성
cp .env.local.example .env.local
```

### 4.4 개발 서버 실행

```bash
npm run dev
```

브라우저에서 http://localhost:3000 접속

## 5. 배포

> 배포 URL: https://task.lapidix.dev

### 5.1 배포 아키텍처

**AWS Lambda + S3 + CloudFront Serverless 구조**

Next.js 애플리케이션을 AWS Lambda, S3, CloudFront를 활용한 Serverless 환경에 배포했습니다. CloudFront CDN을 통해 전 세계 사용자에게 빠른 콘텐츠 전송을 제공하고, 서버 관리 부담 없이 자동 확장이 가능하며, 사용한 만큼만 비용을 지불하는 비용 효율적인 구조를 구현했습니다.

### Infrastructure Architecture Flow

<img width="1100" height="1820" alt="dapp-infrastructure" src="https://github.com/user-attachments/assets/2284abbd-b465-4f20-90ac-3b1103ce7c7c" />


### 5.2 요청 흐름

1. **User** → HTTPS 요청 (`task.lapidix.dev`)
2. **Gabia DNS** → DNS 검증 및 라우팅
3. **CloudFront (Global Edge Locations)** → 요청 분석 및 라우팅
   - **이미지 요청** (`/_next/image*`) → API Gateway → Lambda ImageOptimization
   - **SSR/API 요청** (동적 페이지) → API Gateway → Lambda NextServer
   - **정적 에셋** (`/_next/static/*`, `favicon.ico` 등) → S3 Bucket
4. **Lambda Functions** → 필요시 S3에서 에셋 읽기
5. **S3 Bucket** → 정적 리소스 제공

### 5.3 주요 구성 요소

**1. Gabia DNS**

- 도메인: `task.lapidix.dev`
- 역할: DNS 검증 및 CloudFront로 라우팅
- Gabia에서 도메인 관리 및 CNAME 레코드 설정

**2. CloudFront CDN**

- 커스텀 도메인: `task.lapidix.dev`
- SSL/TLS: ACM 인증서 (`*.lapidix.dev`)
- 프로토콜: HTTP/2 and HTTP/3 지원
- 역할:
  - 모든 HTTP 요청의 진입점
  - 전 세계 엣지 로케이션에서 콘텐츠 캐싱
  - Origin Shield로 오리진 부하 감소
  - 요청 타입에 따라 적절한 Origin으로 라우팅
- 캐싱 전략:
  - `/_next/static/*`: 1년 캐싱 (빌드 해시 포함, 불변 파일)
  - `/_next/data/*`: SSG/ISR 데이터 캐싱
  - `/_next/image*`: 이미지 최적화 캐싱 (1일)
  - `/favicon.ico`: 정적 에셋 캐싱 (7일)
  - 동적 페이지: 캐싱 없음 (TTL 0)

**3. AWS Certificate Manager (ACM)**

- SSL/TLS 인증서 관리
- 와일드카드 인증서: `*.lapidix.dev`
- CloudFront에 연결되어 HTTPS 통신 보안 제공

**4. API Gateway (HTTP API)**

- 타입: HTTP API (REST API 대비 저렴하고 빠름)
- 역할:
  - CloudFront로부터 요청 수신
  - Lambda 함수로 요청 라우팅
  - 이미지 요청 → ImageOptimization Lambda
  - SSR/API 요청 → NextServer Lambda

**5. Lambda Functions**

- **Lambda NextServer**: Next.js SSR 및 API 라우트 처리
  - 동적 페이지 렌더링 (SSR)
  - API 엔드포인트 처리
  - 메모리: 1024MB
  - 타임아웃: 30초
  - S3에서 에셋 읽기 권한 보유
- **Lambda ImageOptimization**: Next.js Image Optimization
  - 이미지 리사이징 및 최적화
  - WebP 포맷 변환
  - 메모리: 1536MB
  - S3에서 원본 이미지 읽기

**6. S3 Bucket (Private)**

- 버킷명: `nextjs-lambda-app-assets-dev`
- 용도: 정적 파일 저장 (JS, CSS, 이미지)
- 보안:
  - **Private 버킷** (Public 접근 차단)
  - CloudFront OAC를 통해서만 접근 가능
  - S3 버킷 정책으로 CloudFront Distribution만 허용

---

### 5.4 보안 및 최적화

**보안**

- **Private S3 Bucket**: CloudFront OAC를 통해서만 접근 가능
- **HTTPS 강제**: 모든 HTTP 요청은 HTTPS로 리다이렉트
- **TLS 1.2+**: 최신 보안 프로토콜 사용
- **IAM 역할**: Lambda 함수는 S3 읽기 권한만 보유

**성능 최적화**

- **CloudFront 캐싱**: 정적 파일 장기 캐싱으로 응답 속도 향상
- **Origin Shield**: 오리진 서버 부하 감소
- **HTTP/2 & HTTP/3**: 최신 프로토콜로 성능 개선
- **Gzip/Brotli 압축**: 자동 콘텐츠 압축으로 전송 속도 향상
- **Lambda 메모리 최적화**: 이미지 최적화는 1536MB, SSR은 1024MB

---

### 5.5 배포 프로세스

**Serverless Framework + OpenNext 사용**

`serverless.yml` 파일을 통해 인프라를 코드로 관리하고, OpenNext를 사용하여 Next.js를 Lambda 호환 형식으로 변환합니다.

```yaml
service: nextjs-lambda-app

provider:
  name: aws
  runtime: nodejs20.x # Node.js 20 런타임
  region: ap-northeast-2 # 서울 리전
  stage: ${opt:stage, 'dev'} # 기본 dev 스테이지
  memorySize: 1024 # Lambda 함수 메모리 1GB
  timeout: 30 # 최대 실행 시간 30초
  environment:
    NODE_ENV: production
    BUCKET_NAME: ${self:custom.assetsBucketName}
    BUCKET_KEY_PREFIX: _assets
  iam:
    role:
      statements:
        - Effect: Allow
          Action:
            - s3:GetObject
          Resource: "arn:aws:s3:::${self:custom.assetsBucketName}/*"

custom:
  assetsBucketName: ${self:service}-assets-${self:provider.stage}

functions:
  nextServer:
    handler: .open-next/server-functions/default/index.handler
    events:
      - httpApi: "*" # 모든 HTTP 요청 처리 (SSR, API 라우트)

  imageOptimization:
    handler: .open-next/image-optimization-function/index.handler
    memorySize: 1536 # 이미지 최적화는 더 많은 메모리 필요
    events:
      - httpApi:
          path: /_next/image # Next.js 이미지 최적화 요청 처리
          method: GET

resources:
  Resources:
    # S3 버킷 - 정적 파일용 (Private)
    AssetsBucket:
      Type: AWS::S3::Bucket
      Properties:
        BucketName: ${self:custom.assetsBucketName}
        PublicAccessBlockConfiguration:
          BlockPublicAcls: true # Private 버킷
          BlockPublicPolicy: true
          IgnorePublicAcls: true
          RestrictPublicBuckets: true

    # CloudFront Origin Access Control (OAC)
    CloudFrontOriginAccessControl:
      Type: AWS::CloudFront::OriginAccessControl
      Properties:
        OriginAccessControlConfig:
          Name: ${self:service}-oac-${self:provider.stage}
          OriginAccessControlOriginType: s3
          SigningBehavior: always
          SigningProtocol: sigv4

    # S3 버킷 정책 - CloudFront OAC에서만 접근 허용
    AssetsBucketPolicy:
      Type: AWS::S3::BucketPolicy
      Properties:
        Bucket: !Ref AssetsBucket
        PolicyDocument:
          Statement:
            - Effect: Allow
              Principal:
                Service: cloudfront.amazonaws.com
              Action: "s3:GetObject"
              Resource: !Sub "${AssetsBucket.Arn}/*"
              Condition:
                StringEquals:
                  AWS:SourceArn: !Sub "arn:aws:cloudfront::${AWS::AccountId}:distribution/${CloudFrontDistribution}"

    # CloudFront Distribution
    CloudFrontDistribution:
      Type: AWS::CloudFront::Distribution
      Properties:
        DistributionConfig:
          Enabled: true
          Comment: "NextJS App Distribution"
          HttpVersion: http2and3 # HTTP/2 and HTTP/3 지원
          Aliases:
            - ${env:CUSTOM_DOMAIN}
          ViewerCertificate:
            AcmCertificateArn: ${env:ACM_CERTIFICATE_ARN}
            SslSupportMethod: sni-only
            MinimumProtocolVersion: TLSv1.2_2021
          DefaultCacheBehavior:
            TargetOriginId: api-gateway
            ViewerProtocolPolicy: redirect-to-https
            AllowedMethods:
              - GET
              - HEAD
              - OPTIONS
              - PUT
              - POST
              - PATCH
              - DELETE
            CachedMethods:
              - GET
              - HEAD
            ForwardedValues:
              QueryString: true
              Headers:
                - Authorization
                - Accept
                - Accept-Language
                - CloudFront-Forwarded-Proto
                - Host
                - x-forwarded-host
              Cookies:
                Forward: whitelist
                WhitelistedNames:
                  - __Secure-next-auth.session-token
                  - next-auth.session-token
            MinTTL: 0
            DefaultTTL: 0
            MaxTTL: 0
            Compress: true
          CacheBehaviors:
            # 정적 파일 캐싱 (_next/static/*) - 빌드 해시 포함, 영구 캐싱
            - PathPattern: "/_next/static/*"
              TargetOriginId: s3-assets
              ViewerProtocolPolicy: redirect-to-https
              AllowedMethods:
                - GET
                - HEAD
              CachedMethods:
                - GET
                - HEAD
              ForwardedValues:
                QueryString: false
                Cookies:
                  Forward: none
              MinTTL: 31536000
              DefaultTTL: 31536000
              MaxTTL: 31536000
              Compress: true
            # _next/data/* - SSG/ISR 데이터
            - PathPattern: "/_next/data/*"
              TargetOriginId: api-gateway
              ViewerProtocolPolicy: redirect-to-https
              AllowedMethods:
                - GET
                - HEAD
              CachedMethods:
                - GET
                - HEAD
              ForwardedValues:
                QueryString: true
                Cookies:
                  Forward: none
              MinTTL: 0
              DefaultTTL: 0
              MaxTTL: 31536000
              Compress: true
            # 이미지 최적화
            - PathPattern: "/_next/image*"
              TargetOriginId: api-gateway
              ViewerProtocolPolicy: redirect-to-https
              AllowedMethods:
                - GET
                - HEAD
              CachedMethods:
                - GET
                - HEAD
              ForwardedValues:
                QueryString: true
                Headers:
                  - Accept
              MinTTL: 60
              DefaultTTL: 86400
              MaxTTL: 31536000
              Compress: true
            # 파비콘 및 정적 에셋
            - PathPattern: "/favicon.ico"
              TargetOriginId: s3-assets
              ViewerProtocolPolicy: redirect-to-https
              AllowedMethods:
                - GET
                - HEAD
              CachedMethods:
                - GET
                - HEAD
              ForwardedValues:
                QueryString: false
                Cookies:
                  Forward: none
              MinTTL: 86400
              DefaultTTL: 604800
              MaxTTL: 31536000
              Compress: true
          Origins:
            # API Gateway Origin
            - Id: api-gateway
              DomainName: !Sub "${HttpApi}.execute-api.${AWS::Region}.amazonaws.com"
              CustomOriginConfig:
                HTTPSPort: 443
                OriginProtocolPolicy: https-only
                OriginSSLProtocols:
                  - TLSv1.2
              OriginShield:
                Enabled: true
                OriginShieldRegion: ${self:provider.region}
            # S3 Origin (OAC 사용)
            - Id: s3-assets
              DomainName: !GetAtt AssetsBucket.RegionalDomainName
              S3OriginConfig:
                OriginAccessIdentity: ""
              OriginAccessControlId: !GetAtt CloudFrontOriginAccessControl.Id

  Outputs:
    CloudFrontDistributionId:
      Value: !Ref CloudFrontDistribution
      Description: CloudFront Distribution ID
    CloudFrontDomainName:
      Value: !GetAtt CloudFrontDistribution.DomainName
      Description: CloudFront Domain Name
```

**배포 명령어**

```bash
# 전체 배포 (빌드 + Lambda + S3 동기화)
npm run deploy:full

# 개발 환경 배포 (S3 동기화 제외)
npm run deploy

# 프로덕션 배포
npm run deploy:prod

# S3 정적 파일만 동기화
npm run sync:s3
```

**실제 package.json 스크립트**

```json
{
  "scripts": {
    "deploy": "source .env.deploy && export $(cat .env.deploy | xargs) && npm run build && npx open-next@latest build && serverless deploy",
    "deploy:prod": "source .env.deploy && export $(cat .env.deploy | xargs) && npm run build && npx open-next@latest build && serverless deploy --stage prod",
    "deploy:full": "source .env.deploy && export $(cat .env.deploy | xargs) && npm run build && npx open-next@latest build && serverless deploy && aws s3 sync .open-next/assets s3://nextjs-lambda-app-assets-dev --delete",
    "sync:s3": "aws s3 sync .open-next/assets s3://nextjs-lambda-app-assets-dev --delete"
  }
}
```

**배포 흐름**

1. **환경 변수 로드** (`.env.deploy`)

   - `ACM_CERTIFICATE_ARN`: SSL/TLS 인증서 ARN
   - `CUSTOM_DOMAIN`: 커스텀 도메인 (task.lapidix.dev)
   - AWS 자격 증명 (aws configure로 설정 가능)

2. **Next.js 빌드** (`npm run build`)

   - 프로덕션 최적화 빌드 생성
   - `.next` 디렉토리에 빌드 결과물 생성

3. **OpenNext 변환** (`npx open-next@latest build`)

   - Next.js 빌드를 Lambda 호환 형식으로 변환
   - `.open-next` 디렉토리 생성:
     - `server-functions/default/`: nextServer Lambda 함수
     - `image-optimization-function/`: 이미지 최적화 Lambda 함수
     - `assets/`: S3에 업로드할 정적 파일

4. **Serverless 배포** (`serverless deploy`)

   - Lambda 함수 2개 생성 (nextServer, imageOptimization)
   - API Gateway HTTP API 생성 및 라우팅 설정
   - S3 버킷 생성 (`nextjs-lambda-app-assets-dev`)
   - S3 버킷 정책 설정 (Public 읽기 허용)
   - IAM 역할 자동 생성
   - 커스텀 도메인 연결 (serverless-domain-manager 플러그인)

5. **정적 파일 업로드** (`aws s3 sync`, deploy:full만 포함)
   - `.open-next/assets` → `s3://nextjs-lambda-app-assets-dev`
   - `--delete` 플래그로 기존 파일 삭제 후 새 파일 업로드
   - JS, CSS, 이미지, 폰트 등 모든 정적 자산
