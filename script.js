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

let first;
let operation;
let last;

function operate(first, operation, last) {
  switch (operation) {
    case "add":
      add(first, last);
      break;
    case "subtract":
      subtract(first, last);
      break;
    case "multiply":
      multiply(first, last);
      break;
    case "divide":
      divide(first, last);
      break;
    default:
      return "error";
  }
}

const display = document.querySelector('#display');
