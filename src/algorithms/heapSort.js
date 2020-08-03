import {
    SET_ARRAY,
    SET_SWAPPERS,
    SET_DISABLED,
    SET_CURRENT_SORTED,
    SET_CURRENT_COMPARISON
} from '../store/actions/actionTypes.js';

function heapSort(stateArray, dispatch, speed) {
    let array = stateArray.slice(0),
        animations = [];
    buildMaxHeap(array, animations);
    let end = array.length - 1;
    while (end > 0) {
        animations.push({ type: SET_CURRENT_COMPARISON, payload: [0, end] }); // heaps
        let temp = array[end];
        array[end] = array[0];
        array[0] = temp;
        animations.push({ type: SET_SWAPPERS, payload: [0, end] }); // swap
        animations.push({ type: SET_ARRAY, payload: array.slice(0) }); // setArray
        animations.push({ type: SET_SWAPPERS, payload: [] }); // swap
        animations.push({ type: SET_CURRENT_SORTED, payload: [end] }); // sorted
        siftDown(array, 0, end, animations);
        end--;
    }
    animations.push({ type: SET_CURRENT_SORTED, payload: [end] }); // sorted
    handleAnimations(animations, dispatch, array, speed);
    return array;
}

function buildMaxHeap(array, animations) {
    let currentIndex = Math.floor(array.length / 2);
    while (currentIndex >= 0) {
        siftDown(array, currentIndex, array.length, animations);
        currentIndex--;
    }
}

function siftDown(array, start, end, animations) {
    if (start >= Math.floor(end / 2)) return;
    let left = start * 2 + 1,
        right = start * 2 + 2 < end ? start * 2 + 2 : null,
        swap;
    if (right) {
        animations.push({ type: SET_CURRENT_COMPARISON, payload: [start, left, right] }); // heaps
        swap = array[left] > array[right] ? left : right;
    } else {
        animations.push({ type: SET_CURRENT_COMPARISON, payload: [start, left] }); // heaps
        swap = left;
    }
    if (array[start] < array[swap]) {
        let temp = array[swap];
        array[swap] = array[start];
        array[start] = temp;
        animations.push({ type: SET_SWAPPERS, payload: [start, swap] }); // swap
        animations.push({ type: SET_ARRAY, payload: array.slice(0) }); // setArray
        animations.push({ type: SET_SWAPPERS, payload: [] }); // swap
        siftDown(array, swap, end, animations);
    }
}

function handleAnimations(animations, dispatch, array, speed) {
    if (!animations.length) {
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

export default heapSort;