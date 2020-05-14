import React from 'react';
import ReactDOM from 'react-dom';

import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'

import reducer from './Reducers'

import Converter from './Converter/Converter'

const store = createStore(reducer, applyMiddleware(thunk))
/* store.subscribe(() => console.log(store.getState()) ) */

ReactDOM.render(
    <Provider store={store}>
        <Converter />
    </Provider>,
document.getElementById("root"));

