import { SET_LOG } from '../actions/logAction'
import initialState from '../reducers/userReducer'

export default function log(state = initialState, action) {

    switch (action.type) {
        case SET_LOG:
            const { log } = action.payload
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
