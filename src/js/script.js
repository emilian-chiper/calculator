window.addEventListener('DOMContentLoaded', function () {
  const main = function () {
    // DOM Elements
    const [previousOperandElement, currentOperandElement] = [
      ...document.querySelectorAll('.__display-element'),
    ];
    const [clearBtn, deleteBtn, signBtn, equalsBtn] = [
      ...document.querySelectorAll('.__action'),
    ];
    console.log(clearBtn, deleteBtn, signBtn, equalsBtn);

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
      this.update();
    };

    // Method for deleting the last character
    Calculator.prototype.delete = function () {
      this.state.currentOperand = this.state.currentOperand
        .toString()
        .slice(0, -1);
      this.curr.innerText = this.state.currentOperand;
      this.update();
    };

    // Toggle the sign of the current operand
    Calculator.prototype.toggleSign = function () {
      if (this.state.currentOperand === '') return;
      this.state.currentOperand = (
        parseFloat(this.state.currentOperand) * -1
      ).toString();
      this.update();
    };

    // Handles functionality of the operand buttons
    Calculator.prototype.append = function (number) {
      if (number === '.' && this.state.currentOperand.includes('.')) return;
      this.state.currentOperand += number;
      this.curr.innerText = this.state.currentOperand;
      this.update();
    };

    // Handles functionality of the operator buttons
    Calculator.prototype.operate = function (op) {
      if (this.state.currentOperand === '') return;
      if (this.state.previousOperand !== '') this.compute();

      this.state.operation = op;
      this.state.previousOperand = this.state.currentOperand;
      this.state.currentOperand = '';
      this.update();
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

      this.state.currentOperand = this.round(computation);
      this.state.previousOperand = '';
      this.state.operation = undefined;
      this.update();
    };

    // Rounds decimals
    Calculator.prototype.round = function (number) {
      return Math.round(number * 1000) / 1000;
    };

    // Splices numbers every 3 digits
    Calculator.prototype.separate = function (number) {
      const stringNumber = number.toString();
      const integerDigits = parseFloat(stringNumber.split('.')[0]);
      const decimalDigits = stringNumber.split('.')[1];

      let integerDisplay = isNaN(integerDigits)
        ? ''
        : integerDigits.toLocaleString('en', { maximumFractionDigits: 0 });

      if (decimalDigits !== undefined)
        return `${integerDisplay}.${decimalDigits}`;
      else return integerDisplay;
    };

    // Handles display update
    Calculator.prototype.update = function () {
      this.curr.innerText = this.separate(this.state.currentOperand);
      this.prev.innerText = this.state.operation
        ? `${this.separate(this.state.previousOperand)} ${this.state.operation}`
        : '';

      adjustFontSize(this.curr);
      adjustFontSize(this.prev);
    };

    // Instantiate object
    const calculator = new Calculator(
      previousOperandElement,
      currentOperandElement
    );

    // Add event listeners for buttons
    const attachEventListeners = function () {
      clearBtn.addEventListener('click', () => calculator.clear());
      deleteBtn.addEventListener('click', () => calculator.delete());
      signBtn.addEventListener('click', () => calculator.toggleSign());
      equalsBtn.addEventListener('click', () => calculator.compute());

      operands.forEach(btn =>
        btn.addEventListener('click', () => calculator.append(btn.innerText))
      );

      operators.forEach(btn =>
        btn.addEventListener('click', () => calculator.operate(btn.innerText))
      );
    };

    const adjustFontSize = function (element) {
      const maxFontSize = 2;
      const minFontSize = 0.5;
      const widthThreshold = element.offsetWidth;

      element.style.fontSize = `${maxFontSize}rem`;

      while (
        element.scrollWidth > widthThreshold &&
        parseFloat(element.style.fontSize) > minFontSize
      ) {
        element.style.fontSize = `${
          parseFloat(element.style.fontSize) - 0.1
        }rem`;
      }
    };

    attachEventListeners();
  };

  main();
});
