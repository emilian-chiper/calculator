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
  console.log(
    this,
    typeof this.state.previousOperand,
    typeof this.state.currentOperand
  );
};

// Method for clearing the display
Calculator.prototype.clear = function () {
  this.state.previousOperand = '';
  this.state.currentOperand = '';
  this.state.operations = undefined;
  this.prev.innerText = '';
  this.curr.innerText = '';
};

// Handles functionality of the operand buttons
Calculator.prototype.append = function (number) {
  if (number === '.' && this.state.currentOperand.includes('.')) return;
  this.state.currentOperand += number;
  console.log(this.state.currentOperand, typeof this.state.currentOperand);
};

// Instantiate object
const calculator = new Calculator(
  previousOperandElement,
  currentOperandElement
);

// calculator.clear();
operands.forEach(btn =>
  btn.addEventListener('click', () => {
    calculator.append(btn.innerText);
  })
);
