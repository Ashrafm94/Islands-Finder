import { SET_DIMENSIONS, REMOVE_DIMENSIONS } from '../actions/types';

const initialState = {
    dimensions: null,
    isRandom: true
};

const boardReducer = (state = initialState, action) => {
    switch(action.type){
        case SET_DIMENSIONS:
            return {
                ...state,
                dimensions: action.data.dimensions,
                isRandom: action.data.isRandom
            };

        case REMOVE_DIMENSIONS:
            return {
                ...state,
                dimensions: null,
                isRandom: true
            };

        default:
            return state;
    }
}

export default boardReducer;
