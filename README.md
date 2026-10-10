# 지닥스 웹사이트

젊은 의사 그룹 지닥스의 소개 사이트입니다. Next.js(App Router), TypeScript, Tailwind CSS로 만들었고, 모든 페이지는 빌드 시 정적으로 생성됩니다.

## 로컬 실행

```bash
npm install
npm run dev      # http://localhost:3000
npm run lint     # 린트
npm run build    # 프로덕션 빌드
npm run start    # 빌드 결과 실행
```

Node.js 20 이상이 필요합니다.

## 데이터 수정

코드를 건드리지 않고 아래 파일만 수정하면 됩니다.

| 대상 | 파일 | 비고 |
|---|---|---|
| 멤버 | `data/members.json` | 배열 순서대로 표시됩니다. |
| 프로젝트 | `data/projects.json` | 항목을 추가하면 목록에 바로 반영됩니다. 홈에는 앞의 3개가 나옵니다. |
| 미션 | `content/mission.md` | 본문은 마크다운, 상단 `summary`(홈 요약)와 `steps`(우리가 하는 일 4단계)는 frontmatter입니다. |
| 면책 안내 | `content/disclaimer.md` | 푸터의 "프로젝트 면책 안내" 페이지입니다. |
| 사이트 이름, 메뉴 | `data/site.ts` | |

### 멤버 항목

`name`, `role`, `field`, `focus`, `bio`를 씁니다. 프로필 사진은 `public/members/`에 넣고 `"photo": "/members/파일명.jpg"`를 추가하면 됩니다. 사진이 없으면 이니셜이 표시됩니다.

### 프로젝트 항목

`name`, `description`, `status`(`운영 중` 또는 `개발 중`), `owner`, `url`을 씁니다. `url`이 빈 문자열이면 링크가 표시되지 않습니다.

### 아직 정해지지 않은 값

값이 `TODO`이거나 빈 문자열이면 해당 항목만 화면에서 숨겨지고, 카드는 그대로 표시됩니다. 내용이 정해지면 `TODO`를 실제 값으로 바꾸세요. `bio` 끝에 붙은 `TODO`는 문장만 남기고 제거되어 표시됩니다.

## 문의 이메일 설정

문의는 [FormSubmit](https://formsubmit.co) 서비스를 통해 `data/site.ts`의 `contactEmail`로 전달됩니다. 별도 서버나 가입은 필요 없습니다.

**최초 1회 활성화가 필요합니다.** 사이트를 배포한 뒤 문의 폼으로 테스트 메시지를 한 번 보내면, 수신 메일함으로 FormSubmit의 확인 메일이 옵니다. 그 안의 "Activate" 버튼을 눌러야 이후 문의가 정상적으로 도착합니다. 스팸함도 확인하세요.

수신 주소를 바꾸려면 `contactEmail` 값만 수정하고 같은 활성화를 다시 하면 됩니다. 전송 로직은 `lib/submit-inquiry.ts`의 `submitInquiry` 한 곳에만 있어서, 다른 서비스나 자체 API로 바꿀 때 이 함수만 교체하면 됩니다.

## 배포

정적으로 생성되므로 Vercel, Netlify 등 대부분의 호스팅에서 동작합니다. 도메인과 배포 방식은 아직 정해지지 않았습니다.

- Vercel: GitHub 저장소를 연결하면 `npm run build`로 자동 배포됩니다.
- 그 외 호스팅: `npm run build` 후 Node.js 서버(`npm run start`)로 실행하거나, 호스팅 업체의 Next.js 지원 방식을 따르세요.

## 구조

```
app/           페이지와 레이아웃
components/    공통 UI, 멤버·프로젝트 카드, 문의 폼
content/       마크다운 콘텐츠(미션, 면책 안내)
data/          멤버, 프로젝트, 사이트 설정
lib/           데이터 로더, 문의 전송 지점
```
