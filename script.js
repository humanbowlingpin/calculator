function add(a, b) {
  return a + b;
}

function subtract(a, b) {
  return a - b;
}

function multiply(a, b) {
  return a * b;
}

function divide(a, b) {
  return a / b;
}

let first = "";
let operation;
let last = "";
let haveOperator = false;

function operate(first, operation, last) {
  if (first == "") {
    return "unprompted first field";
  }
  if (operation == "" || !operation) {
    return first;
  }
  if (last == "") {
    return "unprompted last field";
  }
  console.log("calculating!");
  switch (operation) {
    case "add":
      return add(+first, +last);
      break;
    case "subtract":
      return subtract(+first, +last);
      break;
    case "multiply":
      return multiply(+first, +last);
      break;
    case "divide":
      if (last == 0) {
        return "bruh";
        break;
      }
      return divide(+first, +last);
      break;
    default:
      return first;
  }
}

const display = document.querySelector("#display");
const clearButton = document.querySelector("#clear");
const equalButton = document.querySelector("#equal");
const backspaceButton = document.querySelector("#backspace");
const numberButtons = document.querySelectorAll(".numbers button");
const calculationButtons = document.querySelectorAll(".calculation");

let displayedString = "";
function displayString() {
  display.textContent = displayedString;
}

function resetValue() {
  first = "";
  last = "";
  operation = "";
  haveOperator = false;
}

function resetDisplay() {
  displayedString = "";
}

function clear() {
  display.textContent = "0";
  resetValue();
  resetDisplay();
}

clearButton.addEventListener("click", () => clear());

function addNumber(pressed) {
  if (pressed == "." && checkRepeatedFloat(displayedString)) {
    return;
  }
  displayedString += pressed;
  displayString();
  if (!haveOperator) {
    first = displayedString;
  } else {
    last = displayedString;
  }
}

for (const number of numberButtons) {
  number.addEventListener("click", () =>
    addNumber(number.textContent)
  );
}

function addOperator(operator) {
  console.log(operator);
  if (last !== "") {
    console.log("already have last");
    operateAndReset();
  } else if (haveOperator == true) {
    last = first;
  }
  operation = operator;
  haveOperator = true;
  resetDisplay();
}

for (const operator of calculationButtons) {
  operator.addEventListener("click", () => addOperator(operator.id));
}

function deleteLastNumber() {
  if (displayedString.toString().length == 1) {
    display.innerText = 0;
    return;
  }
  if (last == "" && haveOperator) {
    operation = "";
    haveOperator = false;
    return;
  }
  displayedString = displayedString.slice(0, -1);
  displayString();
  if (!haveOperator) {
    first = displayedString;
  } else {
    last = displayedString;
  }
}

backspaceButton.addEventListener("click", deleteLastNumber);

equalButton.addEventListener("click", operateAndReset);

function operateAndReset() {
  displayedString = operate(first, operation, last);
  if (isNumber(+displayedString)) {
    displayedString = (+(+displayedString).toFixed(10)).toString();
  }
  displayString();
  first = +displayedString;
  last = "";
  operation = "";
  haveOperator = false;
}

function isNumber(value) {
  return typeof value === "number" && isFinite(value);
}

function checkRepeatedFloat(str) {
  return str.includes(".");
}

window.addEventListener(
  "keydown",
  function (e) {
    if ((e.key >= "0" && e.key <= "9") || e.key === ".") {
      addNumber(e.key);
    }
    if (e.key == "Backspace") {
      deleteLastNumber();
    }
    if (e.key == "Enter") {
      operateAndReset();
    }
    if (e.code == "KeyC") {
      clear();
    }
    if (e.key == "+") {
      addOperator('add');
    }
    if (e.key == "-") {
      addOperator('subtract');
    }
    if (e.key == "*") {
      addOperator('multiply');
    }
    if (e.key == "/") {
      addOperator('divide');
    }
  },
  false
);
