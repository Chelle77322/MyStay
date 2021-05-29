import {FETCH_ACCOMMODATION_INIT, FETCH_ACCOMMODATION_SUCCESS, FETCH_ACCOMMODATION_FAIL} from '../actions/types';

const INITIAL_STATE = {
    data: [],
    errors: [],
    isFetching: false
}
export const userAccommodationReducer = (state = INITIAL_STATE,action) => {
    switch(action.type){
        case FETCH_ACCOMMODATION_INIT:
            return {...state, data:[], errors:[], isFetching: true};
        
            case FETCH_ACCOMMODATION_SUCCESS:
                return {...state, data: action.userFeedback, errors:[], isFetching:false};

        case FETCH_ACCOMMODATION_FAIL:
            return {...state, errors:[], data: [], isFetching: false};
            default: return state;
    }
}