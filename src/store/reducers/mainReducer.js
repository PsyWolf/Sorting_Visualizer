import {
    SET_ARRAY,
    SET_SPEED,
    SET_SWAPPERS,
    SET_CURRENT_SORTED,
    SET_DISABLED,
    SET_PIVOT,
    SET_CURRENT_COMPARISON
} from '../actions/actionTypes';

const initialState = {
    array: [],
    disabled: false,
    speed: 50,
    currentSwappers: [],
    currentSorted: [],
    currentComparison: [],
    pivot: null
};

export default function (state = initialState, action) {
    switch (action.type) {
        case SET_ARRAY:
            return {
                ...state,
                array: action.payload
            };
        case SET_SPEED:
            return { ...state, speed: action.payload };
        case SET_SWAPPERS:
            return {
                ...state,
                currentSwappers: action.payload.length ? state.currentSwappers.concat(action.payload) : []
            };
        case SET_CURRENT_SORTED:
            return {
                ...state,
                currentSorted: action.payload.length ? state.currentSorted.concat(action.payload) : []
            };
        case SET_DISABLED:
            return {
                ...state,
                disabled: action.payload
            };
        case SET_PIVOT:
            return {
                ...state,
                pivot: action.payload
            };
        case SET_CURRENT_COMPARISON:
            return {
                ...state,
                currentComparison: action.payload
            };
        default:
            return state;
    }
}