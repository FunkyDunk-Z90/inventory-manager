import { useState } from 'react'
import { Link } from 'react-router-dom'

import { useDataFetch } from '../../hooks/useDataFetch'

import Form from '../utils/Form'

const formDataInit: iPasswordReset = {
    newPassword: '',
    passwordConfirm: '',
}

function ResetPassword() {
    const [formData, setFormData] = useState<iPasswordReset>(formDataInit)
    const { dataFetch } = useDataFetch()

    const handleResetPassword = (e: tFormEvent) => {
        e.preventDefault()

        dataFetch({
            requestType: 'POST',
            credentials: true,
            url: 'users/reset-password',
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
            <Form
                buttonText="Reset Password"
                handleSubmit={handleResetPassword}
                formComponents={[
                    {
                        inputObj: {
                            id: 'newPassword',
                            name: 'newPassword',
                            type: 'password',
                            handleChange,
                            placeholder: '**********',
                        },
                        labelObj: {
                            label: 'New Password',
                            htmlFor: 'newPassword',
                        },
                    },
                    {
                        inputObj: {
                            id: 'passwordConfirm',
                            name: 'passwordConfirm',
                            type: 'password',
                            handleChange,
                            placeholder: '***********',
                        },
                        labelObj: {
                            label: 'Confirm Password',
                            htmlFor: 'passwordConfirm',
                        },
                    },
                ]}
            />
            <Link to={'/login'}>Back to Login</Link>
        </div>
    )
}

export default ResetPassword
