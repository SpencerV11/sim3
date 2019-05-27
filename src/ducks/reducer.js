import axios from 'axios'

const initalState = {
    user: {}
}

const GET_DATA = 'GET_DATA'
const LOGOUT_USER = 'LOGOUT_USER'

export function logout() {
    axios.get('/auth/logout')
    return {
        type: LOGOUT_USER,
        payload: {}
    }
}

export function getData() {
    let data = axios.get(`/auth/user-data`).then(res => res.data).catch(error => {
        return {}
    })
    return {
        type: GET_DATA,
        payload: data
    }
}

export default function reducer (state=initalState, action) {
    switch(action.type) {
        case GET_DATA + '_FULFILLED':
        return {...state, user: action.payload}
        case LOGOUT_USER + '_FULFILLED':
        return {...state, user: action.payload}
        default: return state
    }
}