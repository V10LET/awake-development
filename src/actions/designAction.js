export const SET_DRAWER = 'SET_DRAWER'

export function setDrawer(status) {
    return {
        type: SET_DRAWER,
        payload: { status }
    }
}
