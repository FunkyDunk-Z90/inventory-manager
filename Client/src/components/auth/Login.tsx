import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

// Hooks
import { useAuthFetch } from '../../hooks/auth/useAuthFetch'

import Form from '../utils/Form'

const formDataInit: iLoginData = {
    email: '',
    password: '',
}

function Login() {
    const [formData, setFormData] = useState<iLoginData>(formDataInit)
    const { authFetch } = useAuthFetch()
    const navigate = useNavigate()

    const handleLogin = async (e: tFormEvent) => {
        e.preventDefault()

        await authFetch({
            requestType: 'POST',
            credentials: true,
            url: 'users/login',
            dataToSend: formData,
            authType: 'login',
        })

        setFormData(formDataInit)

        navigate('/dashboard', { replace: true })
    }

    const handleChange = (e: tInputEvent) => {
        const { name, value } = e.target

        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }))
    }

    // console.log(formData)

    return (
        <div className="wrapper login">
            <Form
                buttonText="Login"
                handleSubmit={handleLogin}
                formComponents={[
                    {
                        inputObj: {
                            id: 'email',
                            name: 'email',
                            type: 'text',
                            handleChange,
                            placeholder: 'your-email@mail.com',
                        },
                    },
                    {
                        inputObj: {
                            id: 'password',
                            name: 'password',
                            type: 'password',
                            handleChange,
                            placeholder: '***********',
                        },
                    },
                ]}
            />
            <Link to={'/forgot-password'} replace={true}>
                Forgot Password
            </Link>
            <Link to={'/sign-up'} replace={true}>
                Sign Up
            </Link>
        </div>
    )
}

export default Login
