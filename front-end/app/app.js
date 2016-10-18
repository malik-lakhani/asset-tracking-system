import React from 'react';
import ReactDOM from 'react-dom';
import { Route, Router, hashHistory}  from 'react-router';
import routes from './config/routes';
import { render } from 'react-dom'
import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import { Provider } from 'react-redux'
import reducer  from './reducers/reducers'
import thunk from 'redux-thunk';
import { routerMiddleware } from 'react-router-redux';
import createLogger from 'redux-logger';
/**
 * Logs all actions and states after they are dispatched.
 */

const logger = createLogger();
const createStoreWithMiddleware = applyMiddleware(thunk, logger)(createStore);
const store = createStoreWithMiddleware(reducer);


// const store = createStore(
//   reducer,
//   applyMiddleware(thunk)
// );


// const logger = store => next => action => {
// 	let result = next(action)
// 	return result
// }

// const store = compose(
//     applyMiddleware (
//         thunk,
//         logger
//     )
// )(createStore)(reducer);

// let store = createStore(reducer,
// 	applyMiddleware(
// 		thunk,
// 		logger,
// 	)
// )

render(
	<Provider store = { store } >
		<Router  history = { hashHistory } routes={ routes }/>
	</Provider>,
	document.getElementById('app')
)