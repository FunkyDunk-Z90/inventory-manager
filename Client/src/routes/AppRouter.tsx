import { Routes, Route } from 'react-router-dom'

import Home from '../components/pages/Home'
import Contact from '../components/pages/Contact'

import InventoryManagerRouter from './InventoryManagerRouter'

import NotFound from '../components/pages/NotFound'

function AppRouter() {
    return (
        <Routes>
            <Route path="/dashboard" element={<Home />} />
            <Route path="/contact" element={<Contact />} />
            <Route
                path="/inventory-management/*"
                element={<InventoryManagerRouter />}
            />
            <Route path="*" element={<NotFound />} />
        </Routes>
    )
}

export default AppRouter
