import React, { useState } from 'react';
import Button from './buttons/button';
import calculate from '../logic/calculate';
import formatDisplay from '../logic/display';
import './classic.css';

const OPERATORS = ['÷', '×', '-', '+'];

function getFontSize(value) {
    const len = value.length;
    if (len > 12) return '36px';
    if (len > 9)  return '52px';
    if (len > 6)  return '64px';
    return 'var(--display-font-size)';
}

export default function Classic() {
    const [displayValue, setDisplayValue] = useState('0');
    const [firstOperand, setFirstOperand] = useState(null);
    const [operator, setOperator] = useState(null);
    const [waitingForSecond, setWaitingForSecond] = useState(false);

    const handleNumber = (digit) => {
        if (digit === '.' && displayValue.includes('.') && !waitingForSecond) return;
        if (waitingForSecond) {
            setDisplayValue(digit === '.' ? '0.' : digit);
            setWaitingForSecond(false);
        } else {
            const next = displayValue === '0' && digit !== '.' ? digit : displayValue + digit;
            setDisplayValue(next);
        }
    };

    const handleClear = (label) => {
        if (label === 'C') {
            setDisplayValue('0');
        } else {
            setDisplayValue('0');
            setFirstOperand(null);
            setOperator(null);
            setWaitingForSecond(false);
        }
    };

    const handleToggleSign = () => {
        if (displayValue === '0' || displayValue === 'Error') return;
        setDisplayValue(
            displayValue.startsWith('-') ? displayValue.slice(1) : '-' + displayValue
        );
    };

    const handlePercent = () => {
        if (displayValue === 'Error') return;
        const result = parseFloat(displayValue) / 100;
        setDisplayValue(formatDisplay(result));
    };

    const handleOperator = (nextOperator) => {
        if (displayValue === 'Error') return;
        const current = parseFloat(displayValue);
        if (operator && !waitingForSecond) {
            const result = calculate(operator, firstOperand, current);
            const formatted = typeof result === 'string' ? result : formatDisplay(result);
            setDisplayValue(formatted);
            setFirstOperand(typeof result === 'string' ? 0 : result);
        } else {
            setFirstOperand(current);
        }
        setOperator(nextOperator);
        setWaitingForSecond(true);
    };

    const handleEquals = () => {
        if (!operator || firstOperand === null || displayValue === 'Error') return;
        const result = calculate(operator, firstOperand, parseFloat(displayValue));
        const formatted = typeof result === 'string' ? result : formatDisplay(result);
        setDisplayValue(formatted);
        setFirstOperand(null);
        setOperator(null);
        setWaitingForSecond(true);
    };

    const handleClick = (button) => {
        if (/[0-9]/.test(button) || button === '.') {
            handleNumber(button);
        } else if (button === 'AC' || button === 'C') {
            handleClear(button);
        } else if (button === '±') {
            handleToggleSign();
        } else if (button === '%') {
            handlePercent();
        } else if (button === '=') {
            handleEquals();
        } else if (OPERATORS.includes(button)) {
            handleOperator(button);
        }
    };

    const acLabel = displayValue !== '0' ? 'C' : 'AC';

    const buttons = [
        { name: acLabel, variant: 'special' },
        { name: '±',     variant: 'special' },
        { name: '%',     variant: 'special' },
        { name: '÷',     variant: 'operator' },
        { name: '7',     variant: 'number' },
        { name: '8',     variant: 'number' },
        { name: '9',     variant: 'number' },
        { name: '×',     variant: 'operator' },
        { name: '4',     variant: 'number' },
        { name: '5',     variant: 'number' },
        { name: '6',     variant: 'number' },
        { name: '-',     variant: 'operator' },
        { name: '1',     variant: 'number' },
        { name: '2',     variant: 'number' },
        { name: '3',     variant: 'number' },
        { name: '+',     variant: 'operator' },
        { name: '0',     variant: 'number',   wide: true },
        { name: '.',     variant: 'number' },
        { name: '=',     variant: 'operator' },
    ];

    return (
        <div className="calculator">
            <div className="calculator__display">
                <span
                    className="calculator__display-value"
                    style={{ fontSize: getFontSize(displayValue) }}
                >
                    {displayValue}
                </span>
            </div>
            <div className="calculator__grid">
                {buttons.map((btn, i) => (
                    <Button
                        key={i}
                        name={btn.name}
                        variant={btn.variant}
                        wide={btn.wide || false}
                        active={btn.name === operator && waitingForSecond}
                        handleClick={handleClick}
                    />
                ))}
            </div>
        </div>
    );
}
