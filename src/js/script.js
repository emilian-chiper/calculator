window.addEventListener('DOMContentLoaded', function () {
  const main = function () {
    /**
     * DOM Elements
     * @type {HTMLElement[]}
     */
    const [previousOperandElement, currentOperandElement] = [
      ...document.querySelectorAll('.__display-element'),
    ];

    /**
     * Action buttons
     * @type {HTMLElement[]}
     */
    const [clearBtn, deleteBtn, signBtn, equalsBtn] = [
      ...document.querySelectorAll('.__action'),
    ];

    /**
     * Operand buttons
     * @type {HTMLElement[]}
     */
    const operands = [...document.querySelectorAll('.operand')];

    /**
     * Operator buttons
     * @type {HTMLElement[]}
     */
    const operators = [...document.querySelectorAll('.operator')];

    /**
     * Calculator object constructor
     * @constructor
     * @param {HTMLElement} prev - Previous operand element
     * @param {HTMLElement} curr - Current operand element
     */
    const Calculator = function (prev, curr) {
      this.prev = prev;
      this.curr = curr;
      this.state = {
        previousOperand: '',
        currentOperand: '',
        operation: undefined,
      };
    };

    /**
     * Clears the calculator display and state
     */
    Calculator.prototype.clear = function () {
      this.state.previousOperand = '';
      this.state.currentOperand = '';
      this.state.operation = undefined;
      this.prev.innerText = '';
      this.curr.innerText = '';
      this.update();
    };

    /**
     * Toggles the sign of the current operand
     */
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

    /**
     * Appends a number to the current operand
     * @param {string} number - The number to append
     */
    Calculator.prototype.append = function (number) {
      if (number === '.' && this.state.currentOperand.includes('.')) return;
      this.state.currentOperand += number;
      this.curr.innerText = this.state.currentOperand;
      this.update();
    };

    /**
     * Sets the operation and moves the current operand to previous operand
     * @param {string} op - The operator
     */
    Calculator.prototype.operate = function (op) {
      if (this.state.currentOperand === '') return;
      if (this.state.previousOperand !== '') this.compute();

      this.state.operation = op;
      this.state.previousOperand = this.state.currentOperand;
      this.state.currentOperand = '';
      this.update();
    };

    /**
     * Computes the result of the operation
     */
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

    /**
     * Rounds a number to three decimal places
     * @param {number} number - The number to round
     * @returns {number} - The rounded number
     */
    Calculator.prototype.round = function (number) {
      return Math.round(number * 1000) / 1000;
    };

    /**
     * Formats a number with commas
     * @param {number} number - The number to format
     * @returns {string} - The formatted number
     */
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

    /**
     * Adjusts the font size based on the width of the element
     * @param {HTMLElement} element - The element to adjust font size for
     */
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

    /**
     * Updates the display elements
     */
    Calculator.prototype.update = function () {
      this.curr.innerText = this.separate(this.state.currentOperand);
      this.prev.innerText = this.state.operation
        ? `${this.separate(this.state.previousOperand)} ${this.state.operation}`
        : '';

      adjustFontSize(this.curr);
      adjustFontSize(this.prev);
    };

    /**
     * Instantiates a Calculator object
     */
    const calculator = new Calculator(
      previousOperandElement,
      currentOperandElement
    );

    /**
     * Adds event listeners to buttons
     */
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

    attachEventListeners();
  };

  main();
});
