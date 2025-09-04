import { useState } from 'react'
import { Link } from 'react-router-dom'

import { useDataFetch } from '../../hooks/useDataFetch'

import Form from '../utils/Form'

const formDataInit = {
    email: '',
}

function ForgotPassword() {
    const [formData, setFormData] = useState(formDataInit)
    const { dataFetch } = useDataFetch()

    const handleForgotPassword = (e: tFormEvent) => {
        e.preventDefault()

        dataFetch({
            requestType: 'POST',
            credentials: true,
            url: 'users/forgot-password',
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

    return (
        <div className="wrapper login">
            <p>We will send a link to your email to reset you password.</p>
            <Form
                buttonText="Forgot Password"
                handleSubmit={handleForgotPassword}
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
                ]}
            />
            <Link to={'/login'}>Back to Login</Link>
        </div>
    )
}

export default ForgotPassword
