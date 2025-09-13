import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { useAuthFetch } from '../../hooks/auth/useAuthFetch'

import Form from '../utils/Form'

const formDataInit: iUser = {
    id: '',
    firstNames: [],
    lastName: '',
    username: '',
    email: '',
    password: '',
    passwordConfirm: '',
    avatarURL: '',
}

function SignUp() {
    const [formData, setFormData] = useState<iUser>(formDataInit)
    const { authFetch } = useAuthFetch()
    const navigate = useNavigate()

    const handleSignUp = (e: tFormEvent) => {
        e.preventDefault()

        authFetch({
            requestType: 'POST',
            url: 'users/sign-up',
            dataToSend: formData,
        })

        setFormData(formData)

        navigate('/', { replace: true })
    }

    const handleChange = (e: tInputEvent) => {
        const { name, value } = e.target

        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }))
    }

    console.log('DATA', formData)

    return (
        <>
            <Form
                buttonText="Sign Up"
                handleSubmit={handleSignUp}
                formComponents={[
                    {
                        labelObj: {
                            htmlFor: 'firstNames',
                            label: 'First Name',
                        },
                        inputObj: {
                            id: 'firstNames',
                            name: 'firstNames',
                            handleChange,
                            type: 'text',
                        },
                    },
                    {
                        labelObj: {
                            htmlFor: 'lastName',
                            label: 'Last Name',
                        },
                        inputObj: {
                            id: 'lastName',
                            name: 'lastName',
                            handleChange,
                            type: 'text',
                        },
                    },
                    {
                        labelObj: {
                            htmlFor: 'username',
                            label: 'Username',
                        },
                        inputObj: {
                            id: 'username',
                            name: 'username',
                            handleChange,
                            type: 'text',
                        },
                    },
                    {
                        labelObj: {
                            htmlFor: 'email',
                            label: 'Email',
                        },
                        inputObj: {
                            id: 'email',
                            name: 'email',
                            handleChange,
                            type: 'text',
                        },
                    },
                    // {
                    //     labelObj: {
                    //         htmlFor: 'emailConfirm',
                    //         label: 'Confirm Email',
                    //     },
                    //     inputObj: {
                    //         id: 'emailConfirm',
                    //         name: 'emailConfirm',
                    //         handleChange,
                    //         type: 'text',
                    //     },
                    // },
                    {
                        labelObj: {
                            htmlFor: 'password',
                            label: 'Password',
                        },
                        inputObj: {
                            id: 'password',
                            name: 'password',
                            handleChange,
                            type: 'password',
                        },
                    },
                    {
                        labelObj: {
                            htmlFor: 'Confirm Password',
                            label: 'passwordConfirm',
                        },
                        inputObj: {
                            id: 'passwordConfirm',
                            name: 'passwordConfirm',
                            handleChange,
                            type: 'password',
                        },
                    },
                ]}
            />
        </>
    )
}

export default SignUp
