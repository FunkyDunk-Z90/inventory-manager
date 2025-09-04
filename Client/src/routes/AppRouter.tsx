import { Routes, Route } from 'react-router-dom'

import Home from '../components/pages/Home'
import Contact from '../components/pages/Contact'

function AppRouter() {
    return (
        <Routes>
            <Route index path="/" element={<Home />} />
            <Route path="/contact" element={<Contact />} />
        </Routes>
    )
}

export default AppRouter
