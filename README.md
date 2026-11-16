# Joonheui Bae 홈페이지 파일 안내

## 폴더 구성

| 파일·폴더 | 내용 | 수정할 일 |
|---|---|---|
| `index.html` | 페이지 뼈대 (약력, 연구 주제, 연락처 등 고정 문장) | 가끔 |
| `js/data.js` | **논문, 뉴스, 수상, 강의, 연구비, 공동연구자 목록** | **자주** |
| `css/style.css` | 색, 글꼴, 배치 | 거의 없음 |
| `js/main.js` | 화면을 그리는 코드 | 수정하지 않음 |
| `images/` | 사진 | 사진 추가 시 |
| `images/brand/` | 로고, 탭 아이콘, 링크 미리보기 이미지 | 거의 없음 |

## 자주 하는 수정 (`js/data.js`)

새 항목은 각 목록의 **맨 위**에 넣으면 됩니다. 쉼표(,)와 따옴표(")는 예시와 똑같이 지켜 주세요.

### 논문 추가 (`const pubs = [` 바로 아래)

```js
 {y:2027,a:"Bae, J.*, & Kim, K. H.",t:"Paper title here",j:"Journal of Marketing",v:"91(2), 1–20",f:["ai"],doi:"10.1177/00222429xxxxxx"},
```

- `y` 연도 (아직 출간 전이면 `"Forthcoming"`)
- `a` 저자 (교수님 이름은 자동으로 굵게 표시됩니다)
- `f` 주제 분류: `"platform"`, `"ai"`, `"fashion"` 중 하나 이상
- `doi`가 있으면 DOI 버튼이 생기고, 없으면 버튼이 나오지 않습니다.

### 뉴스 추가 (`const news = [` 바로 아래)

```js
 {d:"Dec 2026",k:"Paper",isNew:true,x:"Short description of the news."},
```

- `k` 분류: Paper, Award, Talk, Event 등
- `isNew:true`를 붙인 항목에 NEW 표시가 붙습니다. 새 소식을 넣으면 이전 항목의 `isNew:true`는 지워 주세요.
- 사진 1장: `img:["images/파일명.jpg","사진 설명"]`
- 사진 여러 장: `pics:[["images/a.jpg","설명"],["images/b.jpg","설명"]]`

### 수상 추가 (`const awards = [` 바로 아래)

```js
 ["2027","Award name","Conference or organization"],
```

## 사진 넣기

1. 사진을 가로 또는 세로 1,400px 이하로 줄여서 `images/` 폴더에 올립니다.
2. 파일 이름은 영문 소문자와 하이픈만 씁니다. 예: `award-2027-ama.jpg`
3. `data.js`에서 그 경로를 적습니다.

## GitHub에서 수정하는 방법

1. 저장소에서 `js/data.js` 파일을 엽니다.
2. 오른쪽 위 연필 아이콘(Edit)을 누릅니다.
3. 수정한 뒤 **Commit changes**를 누릅니다.
4. 1~2분 뒤 사이트에 반영됩니다.

수정 후 사이트가 하얗게 나오면 쉼표나 따옴표가 빠졌을 가능성이 큽니다. 저장소의 History에서 이전 버전으로 되돌리면 됩니다.
