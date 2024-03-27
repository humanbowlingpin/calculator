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
  if (last == "") {
    return "unprompted last field";
  }
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
        return "you cant divide by zero you fool!?";
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
const numberButtons = document.querySelectorAll(".numbers button");
const equalButton = document.querySelector("#equal");
const calculationButtons = document.querySelectorAll(".calculation .typed");

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

clearButton.addEventListener("click", () => {
  displayedString = "";
  display.textContent = "0";
  resetValue();
});

for (const number of numberButtons) {
  number.addEventListener("click", () => {
    displayedString += number.textContent;
    displayString();
    if (!haveOperator) {
      first += number.textContent;
    } else {
      last += number.textContent;
    }
  });
}

for (const operator of calculationButtons) {
  operator.addEventListener("click", () => {
    if (last !== "") {
      operateAndReset();
    }
    operation = operator.id;
    haveOperator = true;
    resetDisplay();
  });
}

equalButton.addEventListener("click", operateAndReset);

function operateAndReset() {
  displayedString = operate(first, operation, last);
  console.log(+displayedString);
  displayString();
  first = +displayedString;
  last = "";
  operation = "";
  haveOperator = false;
}
