let buttons = document.querySelector(".bottom_half");
let runningTotal = document.querySelector(".running_total");
let buttonOutput = document.querySelector(".button_output");
let firstNum = ''
let secondNum = '';
let 
let inputValue = 0;
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
        && firstNum != '') {
            operators[inputValue] = 1;
            console.log(firstNum);
            console.log(secondNum);
            console.log(operators);
            return;
    }
    
    /* Checks if input is not an operator, an operator has not already been entered,
        and that the first number is not empty. If these are all true, then the second
        number starts getting populated */
    if(firstNum != '' 
        && operatorAlreadyInput
        && !(inputtedOperator)) {
        secondNum += inputValue;
        console.log(firstNum);
        console.log(secondNum);
        console.log(operators);
        return;
    }

    /* Checks if input is an operator, an equal, or a negative after all the other if statements
     above are skipped, then appends the number input to the firstNum string. */
    if(!(inputtedOperator)
        && inputValue !='='
        && inputValue !='(-1)') {
        firstNum += inputValue;
        console.log(firstNum);
        console.log(secondNum);
        console.log(operators);
        return;
    }

    if(inputValue === '(-1)'
        && !(operatorAlreadyInput)
        && secondNum === '') {
            makeNegative();
            return;
        }

    if((inputValue === '='
        && firstNum != ''
        && !(operatorAlreadyInput))
        ||
        (inputValue === '='
        && firstNum != ''
        && secondNum!= '')) {
            evaulate();
            return;
        }
    return;
    /* console.log(e.target.value); */
}

function evaluate() {
    firstNum = Number(firstNum);
    secondNum = Number(secondNum);
    operatorUsed = Object.keys(operators).filter(key => operators[key] === 1)[0];
    switch(operatorUsed){
        case "+":
            addition();
            break;
        case "-":
            subtraction();
            break;
        case "*":
            multiplication();
            break;
        case "/":
            division();
            break;
    }
}
function addition(){

};
function subtraction(){};
function division(){};
function multiplication(){};