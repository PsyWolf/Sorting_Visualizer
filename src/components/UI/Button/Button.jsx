
import React from 'react';

import './Button.css';

const button = (props) => {
    return (
        <button
            disabled={props.disabled}
            className="Button"
            onClick={props.onClick}>
            {props.children}
        </button>
    );
};

export default button;