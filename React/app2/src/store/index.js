/* eslint-disable no-unused-vars */
import { createStore, applyMiddleware, combineReducers } from 'redux'
import logger from 'redux-logger'
import thunk from 'redux-thunk'

import { counterReducer } from './count.redux.js'
// import { userReducer } from './user.redux.js'
import { userReducer } from './user.redux.saga.js'

// 1、引入saga
import createSagaMiddleware from 'redux-saga'
import mySaga from './sagas'

// 2、创建saga中间件并注册
const sagaMiddleware = createSagaMiddleware()
const store = createStore(
  combineReducers({ counter: counterReducer, user: userReducer }),
  applyMiddleware(logger, sagaMiddleware)
)
// 3、中间件运行saga
sagaMiddleware.run(mySaga)

// redux-thunk
// const store = createStore(
//   combineReducers({ counter: counterReducer, user: userReducer }),
//   applyMiddleware(logger, thunk)
// )

export default store
