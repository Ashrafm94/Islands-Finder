import {SET_DIMENSIONS, REMOVE_DIMENSIONS} from './types';

export const setDimensions = (dimensions, isRandom) => (
    {
        type: SET_DIMENSIONS,
        data: {
            dimensions,
            isRandom
        }
    }
);

export const removeDimensions = () => (
    {
        type: REMOVE_DIMENSIONS
    }
);