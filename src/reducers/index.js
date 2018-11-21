import { combineReducers } from 'redux'

import user from './userReducer'
import log from './logReducer'

const rootReducer = combineReducers({
    user,
    log
})

export default rootReducer
