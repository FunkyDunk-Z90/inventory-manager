import { createContext, useReducer, useState } from 'react'

import type { Dispatch, SetStateAction } from 'react'

import { userReducer } from '../reducers/userReducer'

const userInit: tUserState = null

type AuthContextType = {
    user: tUserState
    dispatchUserState: Dispatch<tUserReducer>
    isLoading: boolean
    setIsLoading: Dispatch<SetStateAction<boolean>>
}

export const AuthContext = createContext<AuthContextType | null>(null)

export const AuthContextProvider = ({ children }: tReactProps) => {
    const [user, dispatchUserState] = useReducer(userReducer, userInit)
    const [isLoading, setIsLoading] = useState(true)

    const contextValues = {
        user,
        dispatchUserState,
        isLoading,
        setIsLoading,
    }

    return (
        <AuthContext.Provider value={contextValues}>
            {children}
        </AuthContext.Provider>
    )
}
