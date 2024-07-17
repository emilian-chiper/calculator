// DOM Elements
const [previousOperandElement, currentOperandElement] = [
  ...document.querySelectorAll('.__display-element'),
];
const [clearBtn, deleteBtn, equalsBtn] = [
  ...document.querySelectorAll('.__action'),
];
const operands = [...document.querySelectorAll('.operand')];
const operators = [...document.querySelectorAll('.operator')];

// Object constructor
const Calculator = function (prev, curr) {
  this.prev = prev;
  this.curr = curr;
  this.state = {
    previousOperand: '',
    currentOperand: '',
    operation: undefined,
  };
};

// Method for clearing the display
Calculator.prototype.clear = function () {
  this.state.previousOperand = '';
  this.state.currentOperand = '';
  this.state.operation = undefined;
  this.prev.innerText = '';
  this.curr.innerText = '';
};

// Method for deleting the last character
Calculator.prototype.delete = function () {
  this.state.currentOperand = this.state.currentOperand.toString().slice(0, -1);
  this.curr.innerText = this.state.currentOperand;
};

// Handles functionality of the operand buttons
Calculator.prototype.append = function (number) {
  if (number === '.' && this.state.currentOperand.includes('.')) return;
  this.state.currentOperand += number;
  this.curr.innerText = this.state.currentOperand;
};

// Handles functionality of the operator buttons
Calculator.prototype.operate = function (op) {
  if (this.state.currentOperand === '') return;
  if (this.state.previousOperand !== '') this.compute();

  this.state.operation = op;
  this.state.previousOperand = this.state.currentOperand;
  this.state.currentOperand = '';
};

// Handles computation
Calculator.prototype.compute = function () {
  let computation;
  const prev = parseFloat(this.state.previousOperand);
  const curr = parseFloat(this.state.currentOperand);

  if (isNaN(prev) || isNaN(curr)) return;

  if (curr === 0 && this.state.operation === '÷') {
    alert('Cannot divide by 0.');
    this.clear();
    return;
  }

  switch (this.state.operation) {
    case '+':
      computation = prev + curr;
      break;
    case '-':
      computation = prev - curr;
      break;
    case '*':
      computation = prev * curr;
      break;
    case '÷':
      computation = prev / curr;
      break;
    default:
      return;
  }

  this.state.currentOperand = computation.toString();
  this.state.previousOperand = '';
  this.state.operation = undefined;
};

// Handles display update
Calculator.prototype.update = function () {
  this.curr.innerText = this.state.currentOperand;
  this.prev.innerText = this.state.operation
    ? `${this.state.previousOperand} ${this.state.operation}`
    : '';
};

// Instantiate object
const calculator = new Calculator(
  previousOperandElement,
  currentOperandElement
);

// Add event listeners for buttons
clearBtn.addEventListener('click', () => {
  calculator.clear();
  calculator.update();
});

deleteBtn.addEventListener('click', () => {
  calculator.delete();
  calculator.update();
});

operands.forEach(btn =>
  btn.addEventListener('click', () => {
    calculator.append(btn.innerText);
    calculator.update();
  })
);

operators.forEach(btn =>
  btn.addEventListener('click', () => {
    calculator.operate(btn.innerText);
    calculator.update();
  })
);

equalsBtn.addEventListener('click', () => {
  calculator.compute();
  calculator.update();
});
