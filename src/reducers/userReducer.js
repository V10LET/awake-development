import { SET_TOKEN, SET_USER } from '../actions/userAction'

export const initialState = {
    token: null,
    user: {
        name: null,
        email: null,
        birthday: null,
        avatar: null,
        logs: [
            {
                mentalRating: null,
                mentalNote: null,
                emotionalRating: null,
                emotionalNote: null,
                physicalRating: null,
                physicalNote: null,
                spiritualRating: null,
                spiritualNote: null
            }
        ]
    }
}



export default function userReducer(state = initialState, action) {

    switch (action.type) {
        case SET_TOKEN:
            return {
                ...state,
                token: action.payload.token
            }
        case SET_USER:
            const { user } = action.payload
            return {
                ...state,
                user: {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    birthday: user.birthday,
                    avatar: user.avatar,
                    logs: []
                }
            }
        default:
            return state
    }
}
