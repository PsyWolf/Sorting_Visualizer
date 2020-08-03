import React from 'react';

import './Range.css';

const range = (props) => {
    const { disabled, handleChange, min, max, label, value, step } = props;
    const opacity = disabled ? 0.6 : 1;
    return (
        <div className="Range" disabled={disabled}>
            <label style={{ opacity }}>{label}</label>
            <input
                type="range"
                min={min}
                max={max}
                disabled={disabled}
                onChange={handleChange}
                value={value}
                step={step ? step : 1}
            />
        </div>
    );
};

export default range;