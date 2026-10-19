# JavaScript의 DOM 조작법 정리

## 1. DOM(Document Object Model)이란?

DOM은 브라우저가 HTML 문서를 객체 형태로 표현한 모델입니다. HTML 요소, 속성, 텍스트 등이 객체와 트리 구조로 표현됩니다. JavaScript는 DOM을 통해 웹 페이지의 내용을 읽고 변경하거나 요소를 추가·삭제할 수 있습니다.

예시:

```html
<p id="greeting">안녕하세요!</p>
```

```javascript
const greeting = document.querySelector("#greeting");
greeting.textContent = "반갑습니다!";
```

## 2. Selector(선택자)로 DOM 요소 가져오기

선택자는 HTML 문서에서 원하는 요소를 찾는 방법입니다.

### `querySelector()`

CSS 선택자와 일치하는 **첫 번째 요소 하나**를 반환합니다.

```javascript
const title = document.querySelector("h1");
const submitButton = document.querySelector(".submit-button");
const username = document.querySelector("#username");
```

- 태그 선택자: `"h1"`
- 클래스 선택자: `".submit-button"`
- 아이디 선택자: `"#username"`

### `querySelectorAll()`

선택자와 일치하는 모든 요소를 `NodeList`로 반환합니다.

```javascript
const buttons = document.querySelectorAll("button");

buttons.forEach((button) => {
  console.log(button.textContent);
});
```

## 3. Event(이벤트)란?

이벤트는 웹 페이지에서 발생하는 동작이나 사건입니다. 예를 들면 마우스 클릭, 키보드 입력, 마우스 이동, 입력값 변경, 페이지 로딩 등이 있습니다. JavaScript는 이벤트를 감지해 필요한 코드를 실행할 수 있습니다.

대표적인 이벤트:

- `click`: 요소를 클릭했을 때
- `mouseover`: 포인터가 요소 위로 들어왔을 때
- `mouseout`: 포인터가 요소 밖으로 나갔을 때
- `keydown`: 키보드를 눌렀을 때
- `input`: 입력값이 바뀔 때
- `submit`: 폼을 제출할 때

## 4. EventListener(이벤트 리스너)

### 4-1. 이벤트 리스너란?

`addEventListener()`는 지정한 요소에서 특정 이벤트가 발생했을 때 실행할 함수를 등록하는 메서드입니다.

### 4-2. 사용하는 목적과 이유

- 사용자의 동작에 반응하는 웹 페이지를 만들 수 있습니다.
- HTML과 JavaScript의 역할을 분리해 코드를 관리하기 쉽습니다.
- 하나의 요소에 여러 이벤트 리스너를 등록할 수 있습니다.
- HTML에 `onclick` 같은 이벤트 속성을 직접 작성하는 방식보다 유지보수하기 편리합니다.

### 4-3. 이벤트 리스너 정의하기

```javascript
const button = document.querySelector("#my-button");

button.addEventListener("click", () => {
  console.log("버튼을 클릭했습니다!");
});
```

첫 번째 인수는 이벤트 이름이고, 두 번째 인수는 이벤트가 발생했을 때 실행할 함수입니다.

### 4-4. 이벤트 리스너 응용: 이벤트 위임

여러 자식 요소에 각각 이벤트를 등록하는 대신, 공통 부모 요소에 이벤트를 등록하고 이벤트가 전달되는 특성을 활용할 수 있습니다.

```javascript
const list = document.querySelector("#list");

list.addEventListener("click", (event) => {
  const item = event.target.closest("button");

  if (item) {
    console.log(item.textContent);
  }
});
```

이 방식은 버튼이 많거나 나중에 버튼이 추가되는 경우에도 유용합니다. `event.target`은 실제 이벤트가 발생한 요소를 가리킵니다.

## 5. 마우스 감지란?

마우스 감지는 마우스 포인터의 클릭, 진입, 이탈, 이동 등의 이벤트를 감지해 동작을 실행하는 것입니다.

### 마우스 감지 사용 예시

```javascript
const box = document.querySelector(".box");

box.addEventListener("mouseover", () => {
  box.textContent = "마우스가 들어왔습니다.";
});

box.addEventListener("mouseout", () => {
  box.textContent = "마우스가 나갔습니다.";
});

box.addEventListener("click", () => {
  console.log("상자를 클릭했습니다.");
});
```

- `mouseover`: 포인터가 요소 위로 들어올 때
- `mouseout`: 포인터가 요소 밖으로 나갈 때
- `mousemove`: 요소 안에서 포인터가 움직일 때
- `click`: 요소를 클릭할 때

## 6. 화살표 함수란?

화살표 함수(`=>`)는 함수를 간결하게 표현하는 문법입니다. 콜백 함수나 이벤트 리스너를 작성할 때 자주 사용합니다.

기본 함수:

```javascript
function add(a, b) {
  return a + b;
}
```

같은 기능의 화살표 함수:

```javascript
const add = (a, b) => {
  return a + b;
};
```

한 줄로 값을 반환할 때는 중괄호와 `return`을 생략할 수 있습니다.

```javascript
const add = (a, b) => a + b;
```

매개변수가 하나라면 괄호를 생략할 수도 있습니다.

```javascript
const double = number => number * 2;
```

주의할 점: 화살표 함수는 일반 함수와 `this`를 다루는 방식이 다릅니다. 객체 메서드 등에서 `this`가 필요한 경우에는 차이를 이해하고 사용해야 합니다.

## 7. 계산기 과제에서 사용한 개념

- `document.querySelector()`: 계산기 화면과 버튼 영역을 선택합니다.
- `addEventListener("click", ...)`: 버튼 클릭 이벤트를 처리합니다.
- `event.target`: 실제로 클릭된 요소를 확인합니다.
- `dataset`: `data-number`, `data-operator`, `data-action` 속성의 값을 읽습니다.
- 화살표 함수: 이벤트 리스너의 콜백 함수를 작성합니다.
- `textContent`: 계산기 화면에 숫자와 안내 문구를 표시합니다.
- 이벤트 위임: 버튼마다 리스너를 붙이지 않고 `.keys` 영역에서 클릭을 처리합니다.

## 8. 실행 및 확인 방법

1. `calculator.html`, `calculator_style.css`, `calculator.js`를 같은 폴더에 둡니다.
2. `calculator.html`을 브라우저에서 엽니다.
3. 사칙연산, 소수점, `AC`, `DEL`, 0으로 나누기 처리를 확인합니다.
4. 숫자와 연산자를 키보드로 입력해도 동작하는지 확인합니다.
