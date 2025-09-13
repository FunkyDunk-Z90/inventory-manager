import { Routes, Route } from 'react-router-dom'

import Login from '../components/auth/Login'
import ForgotPassword from '../components/auth/ForgotPassword'
import SignUp from '../components/auth/SignUp'
import ResetPassword from '../components/auth/ResetPassword'

function AuthRouter() {
    return (
        <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/sign-up" element={<SignUp />} />
            <Route path="/reset-password" element={<ResetPassword />} />
        </Routes>
    )
}

export default AuthRouter
