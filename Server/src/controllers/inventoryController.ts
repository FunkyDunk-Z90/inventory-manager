import {
    createOne,
    deleteOne,
    updateOne,
    updateMany,
    getOne,
    getAll,
} from '../utils/crudOps'

import Item from '../models/itemModel'

export const createItem = createOne(Item)
export const deleteItem = deleteOne(Item)
export const updateItem = updateOne(Item)
export const updateAllItems = updateMany(Item)
export const getItem = getOne(Item)
export const getAllItems = getAll(Item)
