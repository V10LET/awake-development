export const SET_LOG = 'SET_LOG'
export const UPDATE_LOG = 'UPDATE_LOG'
export const SET_CHART_DATA = 'SET_CHART_DATA'

export function setLog(log) {
    return {
        type: SET_LOG,
        payload: { log }
    }
}

export function updateLog(log) {
    return {
        type: UPDATE_LOG,
        payload: { log }
    }
}

export function setChartData(logs) {
    return {
        type: SET_CHART_DATA,
        payload: { logs }
    }
}
