// DOM Elements
const [previousOperandElement, currentOperandElement] = [
  ...document.querySelectorAll('.__display-element'),
];
const [clearBtn, deleteBtn, equalsBtn] = [
  ...document.querySelectorAll('.__action'),
];
const operands = [...document.querySelectorAll('.operand')];
const operators = [...document.querySelectorAll('.operators')];

// Object constructor
const Calculator = function (prev, curr) {
  this.prev = prev;
  this.curr = curr;
  this.state = {
    previousOperand: '',
    currentOperand: '',
    operations: undefined,
  };
  console.log(this);
};

// Instantiate object
const calculator = new Calculator(
  previousOperandElement,
  currentOperandElement
);
