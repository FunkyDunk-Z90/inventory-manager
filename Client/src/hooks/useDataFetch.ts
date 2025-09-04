import { useState } from 'react'
import { useAuthContext } from './auth/useAuthContext'
import axios from 'axios'
import type { AxiosError, AxiosResponse } from 'axios'

export const useDataFetch = () => {
    const { dispatchUserState, setIsLoading } = useAuthContext()
    const [error, setError] = useState(null)

    const dataFetch = async (data: tReqProps) => {
        const { dataToSend, url, credentials, requestType } = data
        setIsLoading(true)

        setError(null)
        try {
            let response: AxiosResponse

            switch (requestType) {
                case 'GET':
                    response = await axios.get(`/api/v1/${url}`, {
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        withCredentials: credentials,
                    })
                    break
                case 'POST':
                    response = await axios.post(`/api/v1/${url}`, dataToSend, {
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        withCredentials: credentials,
                    })
                    break
                case 'PATCH':
                    response = await axios.patch(`/api/v1/${url}`, dataToSend, {
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        withCredentials: credentials,
                    })
                    break
                case 'DELETE':
                    response = await axios.delete(`/api/v1/${url}`, {
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        withCredentials: credentials,
                    })
                    break
                default:
                    throw new Error('Invalid Request Type')
            }

            console.log(response)

            //---------- GET ----------
            if (response.status === 200) {
                const { data } = response
                const { user } = data

                dispatchUserState({
                    type: 'SET_STATE',
                    payload: user,
                })

                setIsLoading(false)
            } else {
                setIsLoading(false)
            }
        } catch (error) {
            if (
                axios.isAxiosError<AxiosError, Record<string, unknown>>(error)
            ) {
                if (error.response?.status === 500) {
                    dispatchUserState({ type: 'CLEAR_STATE' })
                    localStorage.clear()
                    console.log("Can't connect to Server")
                    setIsLoading(false)
                } else {
                    dispatchUserState({ type: 'CLEAR_STATE' })
                    localStorage.clear()
                    console.log('User not loggedd in')
                    setIsLoading(false)
                }
            } else {
                console.error(error)
                setIsLoading(false)
            }

            dispatchUserState({
                type: 'CLEAR_STATE',
            })
        }
    }

    return { dataFetch, error }
}
