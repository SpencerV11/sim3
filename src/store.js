import { createStore, applyMiddleware } from 'redux'
import promiseMiddleware from 'redux-promise-middleware'
import userReducer from './ducks/reducer'


export default createStore(userReducer, applyMiddleware(promiseMiddleware))