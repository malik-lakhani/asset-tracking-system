import React from 'react';
import ReactDOM from 'react-dom';
import { Route, Router, hashHistory}  from 'react-router';
import { render } from 'react-dom'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import rootReducer  from './reducers/rootReducer'
import routes from './config/routes';
import thunk from 'redux-thunk';
import createLogger from 'redux-logger';

const logger = createLogger();
const createStoreWithMiddleware = applyMiddleware(thunk, logger)(createStore);
const store = createStoreWithMiddleware(rootReducer);

render(
	<Provider store = { store } >
		<Router  history = { hashHistory }  routes = { routes }/>
	</Provider>,
	document.getElementById('app')
)
