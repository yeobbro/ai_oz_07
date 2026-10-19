// DOM 요소 가져오기: querySelector로 필요한 요소를 선택합니다.
const currentOperandElement = document.querySelector("#current-operand");
const previousOperandElement = document.querySelector("#previous-operand");
const messageElement = document.querySelector("#message");
const keysElement = document.querySelector(".keys");

let currentOperand = "0";
let previousOperand = "";
let operator = null;
let shouldResetScreen = false;

function updateDisplay() {
  currentOperandElement.textContent = currentOperand;
  previousOperandElement.textContent = operator
    ? `${previousOperand} ${operator}`
    : "";
}

function showMessage(message = "") {
  messageElement.textContent = message;
}

function inputNumber(number) {
  showMessage();

  if (shouldResetScreen) {
    currentOperand = number;
    shouldResetScreen = false;
    updateDisplay();
    return;
  }

  if (currentOperand === "0") {
    currentOperand = number;
  } else if (currentOperand.length < 14) {
    currentOperand += number;
  }

  updateDisplay();
}

function inputDecimal() {
  showMessage();

  if (shouldResetScreen) {
    currentOperand = "0";
    shouldResetScreen = false;
  }

  if (!currentOperand.includes(".")) {
    currentOperand += ".";
  }

  updateDisplay();
}

function chooseOperator(nextOperator) {
  showMessage();

  if (operator && !shouldResetScreen) {
    calculate();
  }

  previousOperand = currentOperand;
  operator = nextOperator;
  shouldResetScreen = true;
  updateDisplay();
}

function calculate() {
  if (!operator || previousOperand === "") return;

  const first = Number(previousOperand);
  const second = Number(currentOperand);
  let result;

  switch (operator) {
    case "+":
      result = first + second;
      break;
    case "-":
      result = first - second;
      break;
    case "×":
      result = first * second;
      break;
    case "÷":
      if (second === 0) {
        showMessage("0으로 나눌 수 없습니다.");
        currentOperand = "0";
        previousOperand = "";
        operator = null;
        shouldResetScreen = true;
        updateDisplay();
        return;
      }
      result = first / second;
      break;
    default:
      return;
  }

  // 부동소수점 계산 결과의 불필요한 자릿수를 줄입니다.
  currentOperand = String(Number(result.toPrecision(10)));
  previousOperand = "";
  operator = null;
  shouldResetScreen = true;
  updateDisplay();
}

function clearCalculator() {
  currentOperand = "0";
  previousOperand = "";
  operator = null;
  shouldResetScreen = false;
  showMessage();
  updateDisplay();
}

function deleteLastDigit() {
  showMessage();

  if (shouldResetScreen) {
    currentOperand = "0";
    shouldResetScreen = false;
  } else {
    currentOperand = currentOperand.length > 1
      ? currentOperand.slice(0, -1)
      : "0";

    if (currentOperand === "-") currentOperand = "0";
  }

  updateDisplay();
}

// 이벤트 위임: 버튼마다 리스너를 붙이지 않고 버튼 영역에서 클릭을 처리합니다.
keysElement.addEventListener("click", (event) => {
  const button = event.target.closest("button");
  if (!button) return;

  if (button.dataset.number !== undefined) {
    inputNumber(button.dataset.number);
    return;
  }

  if (button.dataset.operator) {
    chooseOperator(button.dataset.operator);
    return;
  }

  switch (button.dataset.action) {
    case "clear":
      clearCalculator();
      break;
    case "delete":
      deleteLastDigit();
      break;
    case "decimal":
      inputDecimal();
      break;
    case "equals":
      calculate();
      break;
  }
});

// 키보드로도 숫자와 연산자를 입력할 수 있도록 합니다.
document.addEventListener("keydown", (event) => {
  if (/^[0-9]$/.test(event.key)) inputNumber(event.key);
  else if (event.key === ".") inputDecimal();
  else if (event.key === "+") chooseOperator("+");
  else if (event.key === "-") chooseOperator("-");
  else if (event.key === "*") chooseOperator("×");
  else if (event.key === "/") {
    event.preventDefault();
    chooseOperator("÷");
  } else if (event.key === "Enter" || event.key === "=") calculate();
  else if (event.key === "Backspace") deleteLastDigit();
  else if (event.key === "Escape") clearCalculator();
});

updateDisplay();
