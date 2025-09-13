import { Routes, Route } from 'react-router-dom'

import InventoryDashboard from '../components/pages/inventory-manager/InventoryDashboard'
import CreateItem from '../components/pages/inventory-manager/CreateItem'

function InventoryManagerRouter() {
    return (
        <Routes>
            <Route index element={<InventoryDashboard />} />
            <Route path="create-item" element={<CreateItem />} />
        </Routes>
    )
}

export default InventoryManagerRouter
