

import { createStore, combineReducers, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { devTools } from 'redux-devtools';

// TODO: fix webpack loader to allow import * from './reducers'
import session from './reducers/session';
import settings from './reducers/settings';
import nav from './reducers/nav';
import dashboard from './reducers/dashboard';


export default compose(
  applyMiddleware(thunk),
  devTools()
)(createStore)(combineReducers({session, nav, dashboard,settings}));
