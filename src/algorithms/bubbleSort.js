import {
    SET_ARRAY,
    SET_SWAPPERS,
    SET_DISABLED,
    SET_CURRENT_SORTED,
    SET_CURRENT_COMPARISON
} from '../store/actions/actionTypes.js';

function bubbleSort(stateArray, dispatch, speed) {
    let array = stateArray.slice(0),
        animations = [],
        sorted = false,
        round = 0;
    while (!sorted) {
        sorted = true;
        for (let i = 0; i < array.length - 1 - round; i++) {
            animations.push({ type: SET_CURRENT_COMPARISON, payload: [i, i + 1] }); // heaps
            if (array[i] > array[i + 1]) {
                animations.push({ type: SET_SWAPPERS, payload: [i, i + 1] }); // swap
                let temp = array[i];
                array[i] = array[i + 1];
                array[i + 1] = temp;
                sorted = false;
                animations.push({ type: SET_ARRAY, payload: array.slice(0) }); // setArray
                animations.push({ type: SET_SWAPPERS, payload: [] }); // swap
            }
        }
        animations.push({ type: SET_CURRENT_SORTED, payload: [array.length - 1 - round] }); // sorted
        round++;
    }
    handleAnimations(animations, dispatch, array, speed);
    return array;
}

function handleAnimations(animations, dispatch, array, speed) {
    if (!animations.length) {
        dispatch({ type: SET_CURRENT_COMPARISON, payload: array.map((num, index) => index) });
        setTimeout(() => {
            dispatch({ type: SET_CURRENT_COMPARISON, payload: [] });
            dispatch({ type: SET_CURRENT_SORTED, payload: array.map((num, index) => index) });
            dispatch({ type: SET_DISABLED, payload: false });
        }, 900);
        return;
    }
    dispatch(animations.shift());
    setTimeout(() => {
        handleAnimations(animations, dispatch, array, speed);
    }, speed);
}

export default bubbleSort;