import { createStore, applyMiddleware, combineReducers } from 'redux'
import logger from 'redux-logger'
import thunk from 'redux-thunk'

import { counterReducer } from './count.redux.js'
import { userReducer } from './user.redux.js'

const store = createStore(
  combineReducers({ counter: counterReducer, user: userReducer }),
  applyMiddleware(logger, thunk)
)

export default store
