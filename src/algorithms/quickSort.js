import {
    SET_PIVOT,
    SET_ARRAY,
    SET_SWAPPERS,
    SET_DISABLED,
    SET_CURRENT_SORTED,
    SET_CURRENT_COMPARISON
} from '../store/actions/actionTypes.js';

function quickSort(stateArray, dispatch, speed) {
    let array = stateArray.slice(0),
        animations = [];
    quickSortHelper(array, 0, array.length - 1, animations);
    handleAnimations(animations, dispatch, array, speed);
    return array;
}

function quickSortHelper(array, start, end, animations) {
    if (start >= end) {
        animations.push({ type: SET_CURRENT_SORTED, payload: [start] });
        return;
    }
    let pivot = start,
        left = start + 1,
        right = end;
    animations.push({ type: SET_PIVOT, payload: pivot });
    animations.push({ type: SET_CURRENT_COMPARISON, payload: [left, right] });
    while (right >= left) {
        if (array[right] < array[pivot] && array[left] > array[pivot]) {
            animations.push({ type: SET_SWAPPERS, payload: [left, right] });
            let temp = array[right];
            array[right] = array[left];
            array[left] = temp;
            animations.push({ type: SET_ARRAY, payload: array.slice(0) });
            animations.push({ type: SET_SWAPPERS, payload: [] });
        }
        if (array[right] >= array[pivot]) right--;
        if (array[left] <= array[pivot]) left++;
        if (right >= left) animations.push({ type: SET_CURRENT_COMPARISON, payload: [left, right] });
    }
    animations.push({ type: SET_CURRENT_COMPARISON, payload: [pivot, right] });
    if (pivot !== right) {
        let temp = array[right];
        array[right] = array[pivot];
        array[pivot] = temp;
        animations.push({ type: SET_SWAPPERS, payload: [left, right] });
        animations.push({ type: SET_ARRAY, payload: array.slice(0) });
        animations.push({ type: SET_SWAPPERS, payload: [] });
        animations.push({ type: SET_CURRENT_SORTED, payload: [right] });
    }
    quickSortHelper(array, start, right - 1, animations);
    quickSortHelper(array, right + 1, end, animations);
}

function handleAnimations(animations, dispatch, array, speed) {
    if (!animations.length) {
        dispatch({ type: SET_PIVOT, payload: null });
        dispatch({ type: SET_CURRENT_COMPARISON, payload: array.map((num, index) => index) });
        setTimeout(() => {
            dispatch({ type: SET_CURRENT_COMPARISON, payload: [] });
            dispatch({ type: SET_DISABLED, payload: false });
        }, 900);
        return;
    }
    dispatch(animations.shift());
    setTimeout(() => {
        handleAnimations(animations, dispatch, array, speed);
    }, speed);
}

export default quickSort;