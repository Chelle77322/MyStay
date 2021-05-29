import {userAccommodationReducer} from './accommodation-reducer';
import thunk from 'redux-thunk';
import { createStore , applyMiddleware, compose, combineReducers} from 'redux';
import {reducer as formReducer} from 'redux-form';
import {authReducer} from './auth-reducer';
import {feedbackReducer} from './feedback-reducer';


export const init = () => {
    const reducer = combineReducers({
        accommodations: userAccommodationReducer,
        feedback: feedbackReducer,
        form: formReducer,
        auth: authReducer,
        userBookings: userAccommodationReducer
    })

    const composeEnhancers = window._REDUX_DEVTOOLS_EXTENSION_COMPOSE_|| compose;
    
    const store = createStore(reducer,composeEnhancers(applyMiddleware(thunk)));
    return store;
}