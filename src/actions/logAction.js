export const SET_LOG = 'SET_LOG'
export const UPDATE_LOG = 'UPDATE_LOG'

export function setLog(log) {
    console.log('setLog ~>', log)
    return {
        type: SET_LOG,
        payload: { log }
    }
}

export function updateLog(log) {
    console.log('updateLog ~>', log)
    return {
        type: UPDATE_LOG,
        payload: { log }
    }
}
