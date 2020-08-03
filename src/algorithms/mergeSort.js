import {
    SET_ARRAY,
    SET_SWAPPERS,
    SET_DISABLED,
    SET_CURRENT_SORTED,
    SET_CURRENT_COMPARISON
} from '../store/actions/actionTypes.js';

function mergeSort(stateArray, dispatch, speed) {
    let array = stateArray.slice(0),
        animations = [];
    let finalArray = mergeSortHelper(array.map((num, idx) => [num, idx]), animations, 0, array.length - 1, { array: array.slice(0) });
    handleAnimations(animations, dispatch, finalArray, speed);
}

function mergeSortHelper(array, animations, start, end, obj) {
    if (array.length === 1) return array;
    let half = Math.floor(array.length / 2),
        first = array.slice(0, half),
        second = array.slice(half),
        indexHalf = Math.floor((end + 1 + start) / 2),
        actualFirst = mergeSortHelper(first, animations, start, indexHalf - 1, obj),
        actualSecond = mergeSortHelper(second, animations, indexHalf, end, obj);
    const isFinalMerge = actualFirst.length + actualSecond.length === array.length;
    return actualSort(actualFirst, actualSecond, animations, obj, start, end, isFinalMerge);
}

function actualSort(first, second, animations, obj, start, end, isFinalMerge) {
    let sortedArray = [];
    let indexToPush = start;
    while (first.length && second.length) {
        animations.push({ type: SET_CURRENT_COMPARISON, payload: [first[0][1], second[0][1]] });
        if (first[0][0] <= second[0][0]) {
            indexToPush++;
            sortedArray.push(first.shift());
        } else {
            animations.push({ type: SET_SWAPPERS, payload: [first[0][1], second[0][1]] });
            second[0][1] = indexToPush++;
            sortedArray.push(second.shift());
            first.forEach(subArr => subArr[1]++);
            if (start === 0) {
                obj.array = sortedArray.map(subArr => subArr[0]).concat(first.map(subArr => subArr[0])).concat(second.map(subArr => subArr[0])).concat(obj.array.slice(end + 1));
            } else {
                obj.array = obj.array.slice(0, start).concat(sortedArray.map(subArr => subArr[0])).concat(first.map(subArr => subArr[0])).concat(second.map(subArr => subArr[0])).concat(obj.array.slice(end + 1));
            }
            animations.push({ type: SET_ARRAY, payload: obj.array });
            animations.push({ type: SET_SWAPPERS, payload: [] });
            animations.push({ type: SET_CURRENT_COMPARISON, payload: [] });
            animations.push({ type: SET_SWAPPERS, payload: [indexToPush - 1, indexToPush] });
            animations.push({ type: SET_CURRENT_COMPARISON, payload: [indexToPush - 1, indexToPush] });
            animations.push({ type: SET_SWAPPERS, payload: [] });
        }
        if (isFinalMerge) animations.push({ type: SET_CURRENT_SORTED, payload: [indexToPush - 1] });
    }
    return sortedArray.concat(first).concat(second);
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

export default mergeSort;