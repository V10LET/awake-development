export const SET_LOG = 'SET_LOG'

export function setLog(log) {
    console.log('setLog ~>', log)
    return {
        type: SET_LOG,
        payload: { log }
    }
}
