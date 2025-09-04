import type { Reducer } from 'react'

export const userReducer: Reducer<tUserState, tUserReducer> = (
    state,
    action
) => {
    switch (action.type) {
        case 'SET_STATE': {
            return action.payload
        }
        case 'CLEAR_STATE': {
            return null
        }
        default:
            throw new Error(`No action: ${action} ${state}`)
    }
}
