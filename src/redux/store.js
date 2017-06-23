import {createStore,applyMiddleware} from 'redux'
import Reducer from './reducer'
import {composeWithDevTools} from 'redux-devtools-extension'

export default createStore(Reducer,composeWithDevTools(applyMiddleware()))