import { Link } from 'react-router-dom'

function InventoryDashboard() {
    return (
        <section className="wrapper inventoryDashboard">
            <h1>Inventory Dashboard</h1>
            <Link to="create-item">Create Item</Link>
        </section>
    )
}

export default InventoryDashboard
