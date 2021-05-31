/* eslint-disable react/no-deprecated */
import React from 'react';
import {Provider} from 'react-redux';
import Route from '../routes';
//import routes from '../routes';
import {ReduxRouter} from 'redux-router';

// eslint-disable-next-line 
export default class Root extends React.Component {
    
    static propTypes = {
        store: React.PropTypes.object.isRequired
    };
    render (){
        return (
            <div>
                <Provider store = {this.props.store}>
                    <div>
                        <ReduxRouter>
                           {Route}
                        </ReduxRouter>
                    </div>
                </Provider>
            </div>
        );
    }
}