export const ADD_GUN = 'ADD_GUN'
export const REMOVE_GUN = 'REMOVE_GUN'

export function addGun() {
    return {
        type: ADD_GUN
    }
}

export function removeGun() {
    return {
        type: REMOVE_GUN
    }
}
export function addGunAsync() {
    return dispatch => {
        setTimeout(() => {
            dispatch(addGun())
        },2000)
    }
}