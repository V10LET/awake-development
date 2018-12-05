export const SET_DRAWER = 'SET_DRAWER'
export const SET_PATH = 'SET_PATH'

export function setDrawer(status) {
    return {
        type: SET_DRAWER,
        payload: { status }
    }
}

export function setPath(path) {
    return {
        type: SET_PATH,
        payload: { path }
    }
}
