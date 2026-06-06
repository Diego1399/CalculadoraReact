export default function calculate(operator, firstOperand, secondOperand) {
    switch (operator) {
        case '÷': return secondOperand !== 0 ? firstOperand / secondOperand : 'Error';
        case '×': return firstOperand * secondOperand;
        case '-': return firstOperand - secondOperand;
        case '+': return firstOperand + secondOperand;
        default: return secondOperand;
    }
}
