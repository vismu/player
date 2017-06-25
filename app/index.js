import React from 'react';
import {combineReducers, createStore, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';
import {render} from 'react-dom';
import Player from 'app/reducers/Player';
import 'app/index.css';

render(
	<Provider store={createStore(combineReducers({Player}), {}, applyMiddleware(thunk))}>
		<div />
	</Provider>,
	document.getElementById('root')
);
