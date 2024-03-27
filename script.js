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

let first = '';
let operation;
let last = '';
let haveOperator = false;

function operate(first, operation, last) {
  if (first == '') {first = 0;}
  if (last == '') {last = 0;}
  console.log("calculating!");
  switch (operation) {
    case "plus":
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
        return 'you cant divide by zero you fool!?';
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
const buttons = document.querySelectorAll(".typed");
const numberButtons = document.querySelectorAll(".numbers button");
const equalButton = document.querySelector("#equal");
const calculationButtons = document.querySelectorAll(".calculation .typed");

let displayedString = "";
function displayString() {
  display.textContent = displayedString;
}

for (const button of buttons) {
  button.addEventListener("click", () => {
    displayedString += button.textContent;
    displayString();
  });
}

clearButton.addEventListener("click", () => {
  displayedString = "";
  display.textContent = '0';
  resetValue();
});

function resetValue() {
  first = '';
  last = '';
  operation = "";
  haveOperator = false;
}

for (const number of numberButtons) {
  number.addEventListener("click", () => {
    if (!haveOperator) {
      first += number.textContent;
    } else {
      last += number.textContent;
    }
  });
}

for (const operator of calculationButtons) {
  operator.addEventListener("click", () => {
    operation = operator.id;
    haveOperator = true;
  });
}

equalButton.addEventListener("click", () => {
  displayedString = operate(first, operation, last);
  displayString();
  first = displayedString;
  last = '';
  operation = '';
});
