# 오늘 배운 HTML 태그 정리

## 1. `<head>`

HTML 문서의 제목, 문자 인코딩 등 문서 정보를 작성하는 영역이다. 일반적으로 웹 페이지 화면에 직접 표시되지 않는다.

```html
<head>
    <meta charset="UTF-8">
    <title>자기소개서</title>
</head>
```

## 2. `<body>`

웹 브라우저 화면에 실제로 표시되는 콘텐츠를 작성하는 영역이다.

```html
<body>
    <p>안녕하세요. 김도엽입니다.</p>
</body>
```

## 3. `<p>`

문단(Paragraph)을 나타내는 태그이다. 글이나 문장을 하나의 문단으로 묶을 때 사용한다.

```html
<p>안녕하세요.</p>
<p>HTML을 공부하고 있습니다.</p>
```

## 4. `<ul>`

순서가 중요하지 않은 목록(Unordered List)을 만드는 태그이다. 기본적으로 항목 앞에 글머리 기호가 표시된다.

```html
<ul>
    <li>HTML</li>
    <li>CSS</li>
    <li>JavaScript</li>
</ul>
```

## 5. `<ol>`

순서가 있는 목록(Ordered List)을 만드는 태그이다. 기본적으로 숫자를 사용해 항목의 순서를 표시한다.

```html
<ol>
    <li>HTML 공부하기</li>
    <li>CSS 공부하기</li>
    <li>JavaScript 공부하기</li>
</ol>
```

## 6. `<input>`

사용자가 정보를 입력하거나 선택할 수 있는 입력 요소를 만드는 태그이다. `type` 속성에 따라 입력 방식이 달라진다.

```html
<input type="text" placeholder="이름을 입력하세요">
<input type="email" placeholder="이메일을 입력하세요">
<input type="password" placeholder="비밀번호를 입력하세요">
```

- `type="text"`: 일반 텍스트 입력
- `type="email"`: 이메일 입력
- `type="password"`: 비밀번호 입력
- `placeholder`: 입력창에 안내 문구 표시

## 7. `<img>`

웹 페이지에 이미지를 표시하는 태그이다. 별도의 닫는 태그가 없는 빈 요소이다.

```html
<img src="profile.png" alt="프로필 사진">
```

- `src`: 표시할 이미지 파일의 경로
- `alt`: 이미지가 표시되지 않을 때 대체할 텍스트

## 8. `src` 속성

`src`는 태그가 아니라 속성이다. 이미지와 같은 외부 리소스의 위치를 지정할 때 사용한다.

```html
<img src="DY_profile.png" alt="내 프로필 사진">
```

HTML 파일과 이미지 파일이 같은 폴더에 있다면 파일명만 지정할 수 있다. 다른 폴더에 있다면 상대 경로를 지정해야 한다.

## 학습 정리

- `<head>`: 문서 정보 영역
- `<body>`: 화면에 표시되는 콘텐츠 영역
- `<p>`: 문단
- `<ul>`: 순서 없는 목록
- `<ol>`: 순서 있는 목록
- `<input>`: 사용자 입력 요소
- `<img>`: 이미지 표시
- `src`: 이미지 등의 리소스 경로를 지정하는 속성
