import { SET_TOKEN, SET_USER } from '../actions/userAction'
import { SET_LOG } from '../actions/logAction'

export const initialState = {
    token: null,
    user: {
        name: null,
        email: null,
        birthday: null,
        avatar: null,
        logs: []
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
                    logs: user.logs
                }
            }
        case SET_LOG:
            const { log } = action.payload
            console.log('log', log)
            return {
                ...state,
                user: {
                    ...state.user,
                    logs: [
                        ...state.user.logs,
                        {
                            mentalRating: log.mental_rating,
                            mentalNote: log.mental_note,
                            emotionalRating: log.emotional_rating,
                            emotionalNote: log.emotional_note,
                            physicalRating: log.physical_rating,
                            physicalNote: log.physical_note,
                            spiritualRating: log.spiritual_rating,
                            spiritualNote: log.spiritual_note
                        }
                    ]
                }
            }
        default:
            return state
    }
}
