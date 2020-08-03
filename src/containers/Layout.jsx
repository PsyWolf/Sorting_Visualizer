import React, { Component } from 'react';
import { connect } from 'react-redux';

import './Layout.css';

import Toolbar from '../components/Toolbar/Toolbar.jsx';
import SortingBars from '../components/SortingBars/SortingBars.jsx';

import { setArray, setDisabled, setCurrentSorted, setSpeed } from '../store/actions/array';

import mergeSort from '../algorithms/mergeSort.js';
import quickSort from '../algorithms/quickSort.js';
import heapSort from '../algorithms/heapSort.js';
import bubbleSort from '../algorithms/bubbleSort.js';

class Layout extends Component {

    componentDidMount() {
        this.resetArray(50);
        this.props.setSpeed(10);
    }

    resetArray(size) {
        const maxWidth = document.getElementById("barsContainer").offsetWidth;
        const array = [];
        for (let i = 0; i < size; i++) {
            array.push(randomIntFromRange(20, maxWidth - 10));
        }
        this.props.setArray(array);
        this.props.setCurrentSorted([]);
    }

    arraySizeChanged(event) {
        this.resetArray(Math.floor((parseInt(event.target.value))));
    }

    speedChanged(event) {
        this.props.setSpeed(event.target.value);
    }

    render() {
        const { array, speed, disabled } = this.props;
        return (
            <div className="Layout">
                <Toolbar
                    length={array.length}
                    speed={speed}
                    disabled={disabled}
                    arraySizeChanged={(event) => this.arraySizeChanged(event)}
                    speedChanged={(event) => this.speedChanged(event)}
                    newArray={() => this.resetArray(array.length)}
                    mergeSort={() => this.props.mergeSort(array, speed)}
                    quickSort={() => this.props.quickSort(array, speed)}
                    heapSort={() => this.props.heapSort(array, speed)}
                    bubbleSort={() => this.props.bubbleSort(array, speed)} />
                <SortingBars />
            </div>
        );
    }
}

function randomIntFromRange(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

const mapStateToProps = ({ array, speed, disabled }) => ({
    array, speed, disabled
});

const mapDispatchToProps = () => dispatch => ({
    setCurrentSorted: (sorted) => dispatch(setCurrentSorted(sorted)),
    setArray: (array) => dispatch(setArray(array)),
    setSpeed: (speed) => dispatch(setSpeed(speed)),
    mergeSort: (array, speed) => startSorting(mergeSort, array, dispatch, speed),
    quickSort: (array, speed) => startSorting(quickSort, array, dispatch, speed),
    heapSort: (array, speed) => startSorting(heapSort, array, dispatch, speed),
    bubbleSort: (array, speed) => startSorting(bubbleSort, array, dispatch, speed)
});

function startSorting(doSort, array, dispatch, speed) {
    dispatch(setCurrentSorted([]));
    dispatch(setDisabled(true));
    doSort(array, dispatch, speed);
}

export default connect(mapStateToProps, mapDispatchToProps)(Layout);