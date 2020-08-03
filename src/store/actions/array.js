import {
    SET_ARRAY,
    SET_SPEED,
    SET_CURRENT_SORTED,
    SET_DISABLED,
    SET_SWAPPERS,
    SET_CURRENT_COMPARISON,
    SET_PIVOT
} from './actionTypes.js';

export const setArray = (array) => {
    return {
        type: SET_ARRAY,
        payload: array
    };
};

export const setSpeed = (speed) => {
    return {
        type: SET_SPEED,
        payload: speed
    };
};

export const setCurrentSorted = (sorted) => {
    return {
        type: SET_CURRENT_SORTED,
        payload: sorted
    };
};

export const setDisabled = (disabled) => {
    return {
        type: SET_DISABLED,
        payload: disabled
    };
};

export const setSwappers = (swappers) => {
    return {
        type: SET_SWAPPERS,
        payload: swappers
    };
};

export const setCurrentComparison = (currentComparison) => {
    return {
        type: SET_CURRENT_COMPARISON,
        payload: currentComparison
    };
};

export const setPivot = (pivot) => {
    return {
        type: SET_PIVOT,
        payload: pivot
    };
};