let buttons = document.querySelector(".bottom_half");
let runningTotal = document.querySelector(".running_total");
let buttonOutput = document.querySelector(".button_output");
let firstNum = ''
let secondNum = '';
let internalTotal = '';
let inputValue = 0;
let operatorUsed = '';
let operatorAlreadyInput = false;
let inputtedOperator = false;
const operators = {
    "+" : 0,
    "-" : 0,
    "*" : 0,
    "/" : 0,
};
runningTotal.textContent = 0;

buttons.addEventListener('click', input);

function input(e) {
    
    /* Assigns true or false to whether or not an operator button was pressed and
        whether or not an operator button was already pressed before */
    inputValue = e.target.value;
    operatorAlreadyInput = Object.values(operators).some(i => i === 1);
    inputtedOperator = inputValue in operators; 

    /* Checks if the button pressed was an operator against the operators object and that
    no other operator button was pressed. Assigns a value of 1 to the key in the operators
    object to represent that operation */
    if ((inputtedOperator) 
        && !(operatorAlreadyInput)
        && firstNum != ''
        && inputValue != '=') {
            operators[inputValue] = 1;
            buttonOutput.textContent += inputValue;
            return;
    }
    
    /* Checks if input is not an operator, an operator has not already been entered,
        is not a decimal, negative, equal, clear and that the first number is not empty. 
        If these are all true, then the second number starts getting populated */
    if(firstNum != '' 
        && operatorAlreadyInput
        && !(inputtedOperator)
        && inputValue != '='
        && inputValue != '(-1)'
        && inputValue != '.'
        && inputValue != 'C'
        && inputValue != 'AC'
        /* && firstNum.toString().includes('.') */) {
            secondNum += inputValue;
            buttonOutput.textContent += inputValue;
        return;
    }

    /* Checks if input is an operator, an equal, or a negative after all the other if statements
     above are skipped, then appends the number input to the firstNum string. */
    if(!(inputtedOperator)
        && inputValue !='='
        && inputValue !='(-1)'
        && inputValue != '.'
        && inputValue != 'C'
        && inputValue != 'AC'
        && !(operatorAlreadyInput)
        && !(internalTotal)) {
            firstNum += inputValue;
            buttonOutput.textContent += inputValue;
        return;
    }
    /* makes the number negative if you inputted the operator or the second number yet */
    if(inputValue === '(-1)'
        && !(operatorAlreadyInput)
        && secondNum === '') {
            firstNum = Number(firstNum) * -1
            buttonOutput.textContent = firstNum;
            printAndInitialization;
            return;
        }
    /* supposed to add a decimal to the first number if not already inputted to it */
    if(!(firstNum.toString().includes('.'))
        && !(operatorAlreadyInput)
        && inputValue != '='
        && inputValue != '(-1)'
        && inputValue != 'C'
        && inputValue != 'AC'
        && !(operatorAlreadyInput)
        && !(internalTotal)) {
            firstNum += inputValue;
            buttonOutput.textContent += inputValue;
        return;
    }

    /* supposed to add a decimal if not already inputted to the second number */
    if(!(secondNum.toString().includes('.'))
        && !(inputtedOperator)
        && inputValue != '='
        && inputValue != '(-1)'
        && inputValue != 'C'
        && inputValue != 'AC'
        && operatorAlreadyInput) {
            secondNum += inputValue;
            buttonOutput.textContent += inputValue;
        }
    
    /* Clears the button output line and resets everything except for the first num to 0 */    
    if(inputValue === 'C') {
            operators[operatorUsed] = 0;
            operatorAlreadyInput = false;
            operatorUsed = '';
            firstNum = internalTotal;
            secondNum = ''
            buttonOutput.textContent = firstNum;
            return;
    }

    /* Clears all output fields, sets all variables back to their initial states */
    if(inputValue ==='AC') {
            operators[operatorUsed] = 0;
            operatorAlreadyInput = false;
            operatorUsed = '';
            firstNum = '';
            secondNum = ''
            internalTotal = '';
            buttonOutput.textContent = '';
            runningTotal.textContent = '0';
            return;
    }
    /* checks if either the first number is present and the operator hasn't been pressed yet
        or if both numbers are present before evaluating the function */
    if((inputValue === '='
        && firstNum != ''
        && !(operatorAlreadyInput))
        ||
        (inputValue === '='
        && firstNum != ''
        && secondNum!= ''
        && operatorAlreadyInput)) {
            evaluate();
            return;
        }
    return;
}

function evaluate() {
    /* Converts the numbers from string to number for the math to work right */
    firstNum = Number(firstNum);
    secondNum = Number(secondNum);
    /* Stores the inputted operator into the variable */
    if (operatorAlreadyInput) {
            operatorUsed = Object.keys(operators).filter(key => operators[key] === 1)[0];
    }
    switch(operatorUsed){
        case "+":
            internalTotal = (Math.round((firstNum + secondNum) * 10000) / 10000);
            printAndInitialization();
            break;
        case "-":
            internalTotal = (Math.round((firstNum - secondNum) * 10000) / 10000);
            printAndInitialization();
            break;
        case "*":
            internalTotal = (Math.round((firstNum * secondNum) * 10000) / 10000);
            printAndInitialization();
            break;
        case "/":
            internalTotal = (Math.round((firstNum / secondNum) * 10000) / 10000);
            printAndInitialization();
            break;
        default:
            internalTotal = (Math.round(firstNum * 10000) / 10000);
            printAndInitialization;
            break;
    }
}
/* Prints the total rounded to three decimals to the output fields, also resets variables
    so that only the firstNum is already filled */
function printAndInitialization() {
    runningTotal.textContent = Math.round(internalTotal*1000) / 1000;
    buttonOutput.textContent = Math.round(internalTotal*1000) / 1000;
    firstNum = internalTotal.toString();
    secondNum = '';
    operators[operatorUsed] = 0;
    operatorAlreadyInput = false;
    operatorUsed = '';
    }