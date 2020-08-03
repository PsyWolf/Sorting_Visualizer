import React from 'react';

import Button from '../UI/Button/Button.jsx';
import Range from '../UI/Range/Range.jsx';

import "./Toolbar.css";

const toolbar = (props) => (
    <div className="Toolbar">
        <Button disabled={props.disabled} onClick={props.newArray}>Generate a new array</Button>
        <Button disabled={props.disabled} onClick={props.mergeSort}>Merge Sort</Button>
        <Button disabled={props.disabled} onClick={props.quickSort}>Quick Sort</Button>
        <Button disabled={props.disabled} onClick={props.heapSort}>Heap Sort</Button>
        <Button disabled={props.disabled} onClick={props.bubbleSort}>Bubble Sort</Button>
        <Range disabled={props.disabled} handleChange={props.arraySizeChanged} label="Array Size: " min="4" max="100" value={props.length} step="1" />
        <Range disabled={props.disabled} handleChange={props.speedChanged} label="Animation time (ms): " min="1" max="50" step="1" value={props.speed} />
    </div>
);

export default toolbar;