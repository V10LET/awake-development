import { combineReducers } from 'redux'

import userReducer from './userReducer'
import logReducer from './logReducer'

const rootReducer = combineReducers({
    user: userReducer,
    log: logReducer,
})

export default rootReducer
