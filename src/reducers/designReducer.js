import { SET_DRAWER, SET_PATH } from '../actions/designAction'

const initialState = {
    drawerOpen: true,
    path: '',
}

export function designReducer(state = initialState, action) {
    switch (action.type) {
        case SET_DRAWER:
            return {
                ...state,
                drawerOpen: action.payload.status,
            }
        case SET_PATH:
        return {
            ...state,
            path: action.payload.path
        }
        default:
            return state
    }
}
