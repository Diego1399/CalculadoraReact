import React from 'react';
import './button.css';

export default function Button({ name, variant = 'number', wide = false, active = false, handleClick }) {
    const classes = [
        'btn',
        `btn--${variant}`,
        wide ? 'btn--wide' : '',
        active ? 'btn--active' : '',
    ].filter(Boolean).join(' ');

    return (
        <button className={classes} onClick={() => handleClick(name)}>
            {name}
        </button>
    );
}
