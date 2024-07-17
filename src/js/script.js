// DOM Elements
const [previousOperandElement, currentOperandElement] = [
  ...document.querySelectorAll('.__display-element'),
];
const [clearBtn, deleteBtn, equalsBtn] = [
  ...document.querySelectorAll('.__action'),
];
const operands = [...document.querySelectorAll('.operand')];
const operators = [...document.querySelectorAll('.operators')];
