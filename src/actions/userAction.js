export const SET_TOKEN = 'SET_TOKEN'
export const SET_USER = 'SET_USER'

export function setToken(t) {
    return {
        type: SET_TOKEN,
        payload: { token: t }
    }
}

export function setUser(user) {
    return {
        type: SET_USER,
        payload: { user }
    }
}
