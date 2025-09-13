import { Router } from 'express'

import {
    createItem,
    deleteItem,
    getAllItems,
    getItem,
    updateAllItems,
    updateItem,
} from '../controllers/inventoryController'

const router = Router()

router.post('/create-item', createItem)
router.post('/delete-item', createItem)
router.post('/get-item', createItem)
router.post('/get-all-items', createItem)
router.post('/update-item', createItem)
router.post('/update-all-items', createItem)

export default router
