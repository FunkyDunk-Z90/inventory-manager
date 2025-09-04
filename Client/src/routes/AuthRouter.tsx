import { Routes, Route } from 'react-router-dom'

import Login from '../components/auth/Login'
import ForgotPassword from '../components/auth/ForgotPassword'

function AuthRouter() {
    return (
        <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
        </Routes>
    )
}

export default AuthRouter
