import { SET_TOKEN, SET_USER } from '../actions/userAction'
import { SET_LOG, UPDATE_LOG, SET_CHART_DATA, SET_TIMED_LOG } from '../actions/logAction'

export const initialState = {
    drawerOpen: true,
    token: null,
    user: {
        name: null,
        email: null,
        birthday: null,
        avatar: null,
        logs: [],
        timed_logs: []
    },
    chartData: {
        day: [],
        mentalRating: [],
        emotionalRating: [],
        physicalRating: [],
        spiritualRating: []
    }
}

function changeLogKeys(log) {
    if (log === undefined || log === null) {
        return {}
    } else {
        return {
            id: log.id,
            mentalRating: log.mental_rating,
            mentalNote: log.mental_note,
            emotionalRating: log.emotional_rating,
            emotionalNote: log.emotional_note,
            physicalRating: log.physical_rating,
            physicalNote: log.physical_note,
            spiritualRating: log.spiritual_rating,
            spiritualNote: log.spiritual_note,
            created_at: log.created_at
        }
    }
}

export function userReducer(state = initialState, action) {

    switch (action.type) {

        case SET_TOKEN:
            return {
                ...state,
                token: action.payload.token
            }

        case SET_USER:
            const { user } = action.payload
            if (user.logs === undefined || user.timed_logs === undefined) {
                return {
                    ...state,
                    user: {
                        ...state.user,
                        id: user.id,
                        name: user.name,
                        email: user.email,
                        birthday: user.birthday,
                        avatar: user.avatar
                    }
                }
            } else {
                return {
                    ...state,
                    user: {
                        id: user.id,
                        name: user.name,
                        email: user.email,
                        birthday: user.birthday,
                        avatar: user.avatar,
                        logs: user.logs.map(changeLogKeys),
                        timed_logs: user.timed_logs
                    }
                }
            }

        case SET_LOG:
            const { log } = action.payload
            return {
                ...state,
                user: {
                    ...state.user,
                    logs: [
                        ...state.user.logs,
                        changeLogKeys(log)
                    ]
                }
            }

        case UPDATE_LOG: {
            const { log } = action.payload
            let newLogs = state.user.logs.map(l=> {
                if (l.id !== log.id) {
                    return l
                } else {
                    return changeLogKeys(log)
                }
            })

            return {
                ...state,
                user: {
                    ...state.user,
                    logs: newLogs
                }
            }
        }

        case SET_TIMED_LOG:{
            const { log } = action.payload
            return {
                ...state,
                user: {
                    ...state.user,
                    timed_logs: [...state.user.timed_logs, log]
                }
            }
        }

        case SET_CHART_DATA: {
            const { logs } = action.payload
            console.log(logs, logs === {})
            if (logs === null) {
                return {
                    ...state,
                    chartData: {
                        ...state.chartData,
                        day: [],
                        mentalRating: [],
                        emotionalRating: [],
                        physicalRating: [],
                        spiritualRating: [],
                    },
                }
            }

            const days = (logs || []).map(log => log.created_at)
            const newMentalRatings = (logs || []).map(log => log.mental_rating)
            const newEmotionalRatings = (logs || []).map(log => log.emotional_rating)
            const newPhysicalRatings = (logs || []).map(log => log.physical_rating)
            const newSpiritualRatings = (logs || []).map(log => log.spiritual_rating)

            return {
                ...state,
                chartData: {
                    ...state.chartData,
                    day:             [...state.chartData.day, ...days],
                    mentalRating:    [...state.chartData.mentalRating, ...newMentalRatings],
                    emotionalRating: [...state.chartData.emotionalRating, ...newEmotionalRatings],
                    physicalRating:  [...state.chartData.physicalRating, ...newPhysicalRatings],
                    spiritualRating: [...state.chartData.spiritualRating, ...newSpiritualRatings],
                },
            }
        }
        default:
            return state
    }
}
