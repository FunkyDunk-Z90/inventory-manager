import { useState } from 'react'
import { Link } from 'react-router-dom'

// Hooks
import { useDataFetch } from '../../hooks/useDataFetch'

import Form from '../utils/Form'

const formDataInit: iLoginData = {
    email: '',
    password: '',
}

function Login() {
    const [formData, setFormData] = useState<iLoginData>(formDataInit)
    const { dataFetch } = useDataFetch()

    const handleLogin = (e: tFormEvent) => {
        e.preventDefault()

        dataFetch({
            requestType: 'POST',
            credentials: true,
            url: 'users/login',
            dataToSend: formData,
        })

        setFormData(formDataInit)
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
        </div>
    )
}

export default Login
