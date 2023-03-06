let buttons = document.querySelector(".bottom_half");
let runningTotal = document.querySelector(".running_total");
let buttonOutput = document.querySelector(".button_output");
let firstNum = ''
let secondNum = '';
let internalTotal = 0;
let inputValue = 0;
let operatorUsed = '';
let outputText = '';
let operatorAlreadyInput = false;
let inputtedOperator = false;
const operators = {
    "+" : 0,
    "-" : 0,
    "*" : 0,
    "/" : 0,
};

const specialKeys = {
    "=" : 0,
    "(-1)" : 0
}

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
            outputText = inputValue;
            buttonOutput.textContent += outputText;
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
        /* && firstNum.toString().includes('.') */) {
        secondNum += inputValue;
        outputText = inputValue;
        buttonOutput.textContent += outputText;
        return;
    }

    /* Checks if input is an operator, an equal, or a negative after all the other if statements
     above are skipped, then appends the number input to the firstNum string. */
    if(!(inputtedOperator)
        && inputValue !='='
        && inputValue !='(-1)'
        && inputValue != '.'
        && inputValue != 'C'
        && !(operatorAlreadyInput)) {
        firstNum += inputValue;
        outputText = inputValue;
        buttonOutput.textContent += outputText;
        return;
    }
    /* makes the number negative if you inputted the operator or the second number yet */
    if(inputValue === '(-1)'
        && !(operatorAlreadyInput)
        && secondNum === '') {
            makeNegative();
            return;
        }
    /* supposed to add a decimal to the first number if not already inputted to it */
    if(!(firstNum.toString().includes('.'))
        && !(operatorAlreadyInput)
        && inputValue != '='
        && inputValue != '(-1)'
        && inputValue != 'C'
        && !(operatorAlreadyInput)
        && !(internalTotal)) {
        firstNum += inputValue;
        outputText = inputValue;
        buttonOutput.textContent += outputText;
        return;
    }

    /* supposed to add a decimal if not already inputted to the second number */
    if(!(secondNum.toString().includes('.'))
        && !(inputtedOperator)
        && inputValue != '='
        && inputValue != '(-1)'
        && inputValue != 'C'
        && operatorAlreadyInput) {
            secondNum += inputValue;
            outputText = inputValue;
            buttonOutput.textContent += outputText;
        }

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
    firstNum = Number(firstNum);
    secondNum = Number(secondNum);
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

function printAndInitialization() {
    runningTotal.textContent = Math.round(internalTotal*1000) / 1000;
    buttonOutput.textContent = Math.round(internalTotal*1000) / 1000;
    firstNum = internalTotal.toString();
    secondNum = '';
    operators[operatorUsed] = 0;
    operatorAlreadyInput = false;
    operatorUsed = '';
    }