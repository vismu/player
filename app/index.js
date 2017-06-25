import React from 'react';
import {createStore, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import {render} from 'react-dom';
import reducers from 'app/reducers';
import Player from 'app/containers/Player';
import 'app/index.css';

render(
	<Provider store={createStore(reducers, {}, applyMiddleware(thunk, logger))}>
		<Player />
	</Provider>,
	document.getElementById('root')
);
