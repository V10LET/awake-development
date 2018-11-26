import { initialState } from './userReducer'
import { SET_DRAWER } from '../actions/designAction'

export function designReducer(state = initialState, action) {
    switch (action.type) {
        case SET_DRAWER:
            return {
                ...state,
                drawerOpen: action.payload.status,
            }
        default:
            return state
    }
}
