import { useState } from 'react'
import { useAuthContext } from './useAuthContext'
import axios from 'axios'
import type { AxiosError, AxiosResponse } from 'axios'

export const useAuthFetch = () => {
    const { dispatchUserState, setIsLoading } = useAuthContext()
    const [error, setError] = useState(null)
    const [message, setMessage] = useState('')

    const authFetch = async (data: tReqProps) => {
        const { dataToSend, url, credentials, authType, requestType } = data

        setError(null)
        try {
            let response: AxiosResponse

            switch (requestType) {
                case 'GET':
                    response = await axios.get(`/api/v2/${url}`, {
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        withCredentials: credentials,
                    })
                    break
                case 'POST':
                    response = await axios.post(`/api/v2/${url}`, dataToSend, {
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        withCredentials: credentials,
                    })
                    break
                case 'PATCH':
                    response = await axios.patch(`/api/v2/${url}`, dataToSend, {
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        withCredentials: credentials,
                    })
                    break
                case 'DELETE':
                    response = await axios.delete(`/api/v2/${url}`, {
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        withCredentials: credentials,
                    })
                    break
                default:
                    throw new Error('Invalid Request Type')
            }

            //If login/isloggedin/update user is a success
            if (response.status === 200) {
                const { data } = response

                if (
                    authType === 'login' ||
                    authType === 'isLoggedIn' ||
                    authType === 'update'
                ) {
                    const { user } = data
                    dispatchUserState({ type: 'SET_STATE', payload: user })
                    setIsLoading(false)
                } else if (authType === 'forgotPassword') {
                    const { message } = data
                    setMessage(message)
                    setIsLoading(false)
                } else {
                    dispatchUserState({ type: 'CLEAR_STATE' })
                    setIsLoading(false)
                }
            }

            // If signUp is a success
            if (response.status === 201) {
                const { user } = response.data
                dispatchUserState({ type: 'SET_STATE', payload: user })
                setIsLoading(false)
            } else {
                setError(response.data.error)
                setIsLoading(false)
            }

            // If delete user is a success
            if (response.status === 204) {
                setIsLoading(true)
            } else {
                setError(response.data.error)
                setIsLoading(false)
            }
        } catch (error) {
            if (
                axios.isAxiosError<AxiosError, Record<string, unknown>>(error)
            ) {
                if (error.response?.status === 500) {
                    dispatchUserState({ type: 'CLEAR_STATE' })
                    console.log("Can't connect to Server")
                    setIsLoading(false)
                } else {
                    dispatchUserState({ type: 'CLEAR_STATE' })
                    console.log('User not loggedd in')
                    setIsLoading(false)
                }
            } else {
                console.error(error)
                setIsLoading(false)
            }
        }
    }

    return { authFetch, message, error }
}
