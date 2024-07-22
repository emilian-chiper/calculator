# CALCULATOR APPLICATION

This repository contains the code for a simple calculator application implemented using vanilla JavaScript. The calculator supports basic arithmetic operations, including addition, subtraction, multiplication, and division, along with other functionalities such as clearing the display, deleting the last input, and toggling the sign of the current operand.

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Code Overview](#code-overview)
  - [DOM Elements](#dom-elements)
  - [Calculator Object](#calculator-object)
  - [Methods](#methods)
  - [Event Listeners](#event-listeners)
- [License](#license)

## FEATURES

- Basic arithmetic operations: addition (`+`), subtraction (`-`), multiplication (`*`), and division (`÷`).
- Clear the display and reset the calculator state.
- Delete the last entered digit.
- Toggle the sign of the current operand (positive/negative).
- Real-time display updates with formatted numbers.
- Responsive font size adjustment for display elements.

## INSTALLATION

To use this calculator application, simply clone the repository and open the `index.html` file in your web browser.

```sh
git clone https://github.com/emilian-chiper/calculator
cd calculator
```

Open `index.html` in your preferred web browser.

## USAGE

Once you have opened the index.html file in your browser, you can interact with the calculator using your mouse:

1. Click on the number buttons to enter digits.
2. Click on the operator buttons (+, -, \*, ÷) to perform arithmetic operations.
3. Click the = button to compute the result of the current operation.
4. Click the C button to clear the display and reset the calculator.
5. Click the ← button to delete the last entered digit.
6. Click the ± button to toggle the sign of the current operand.

## CODE OVERVIEW

### DOM Elements

The following DOM elements are selected and used in the script:

- `previousOperandElement`: Displays the previous operand and the current operation.
- `currentOperandElement`: Displays the current operand.
- Action buttons: Clear, delete, toggle sign, and equals buttons.
- Operand buttons: Number buttons (0-9 and `.`).
- Operator buttons: Arithmetic operation buttons (`+`, `-`, `*`, `÷`).

### Calculator Object

The `Calculator` function is a constructor that initializes the calculator's state and methods for performing operations and updating the display.

**Methods**

- `clear()`: Clears the calculator display and state.
- `delete()`: Deletes the last entered digit of the current operand.
- `toggleSign()`: Toggles the sign of the current operand.
- `append(number)`: Appends a number to the current operand.
- `operate(op)`: Sets the operation and moves the current operand to the previous operand.
- `compute()`: Computes the result of the operation.
- `round(number)`: Rounds a number to the three decimal places.
- `separate(number)`: Formats a number with commas for better readability.
- `update()`: updates the display elements.

### EVENT LISTENERS

Event listeners are added to the buttons to handle user interactions:

- `clearBtn`: Clears the display and resets the calculator.
- `deleteBtn`: Deletes the last entered digit.
- `signBtn`: Toggles the sign of the current operand.
- `equalsBtn`: Computes the result of the current operation.
- Operand buttons: Appends the clicked number to the current operand.
- Operator buttons: Sets the operation and updates the display.

### LICENSE

This project is licensed under the MIT License. See the [LICENSE](./LICENSE) file for more details.
