import {
    FETCH_USERFEEDBACK_FAIL, FETCH_USERFEEDBACK_INIT, FETCH_USERFEEDBACK_SUCCESS} from '../actions/types';

const INITIAL_STATE = {
    feedback: {
        data: [],
        errors: []
    },
    feedback: {
        data: {},
    }
}

export const feedbackReducer = (state = INITIAL_STATE.feedback, action) => {
    switch(action.type){
        case FETCH_USERFEEDBACK_INIT:
            return {...state, data: [], errors: []};
    case FETCH_USERFEEDBACK_FAIL:
        return Object.assign({}, state, {errors: action.errors, data: []});

    case FETCH_USERFEEDBACK_SUCCESS:
        return {...state, data: action.feedback};
        default: return state;
    }
}
export const selectedUserFeedback = (state = INITIAL_STATE.feedback, action) => {
    switch(action.type){
        case FETCH_USERFEEDBACK_INIT:
            return {...state, data:{}};
        case FETCH_USERFEEDBACK_SUCCESS:
            return Object.assign({}, state, {data: action.feedback});
            default: return state;
    }
}