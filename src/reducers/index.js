import { combineReducers } from 'redux'

import { userReducer } from './userReducer'
import { designReducer } from './designReducer'

const rootReducer = combineReducers({
    user: userReducer,
    design: designReducer,
})

export default rootReducer
