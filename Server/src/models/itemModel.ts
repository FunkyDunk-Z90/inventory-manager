import { Schema, model, Document } from 'mongoose'

export interface iItem extends Document {
    itemName: string
    itemCategory: iCategories
    itemPrice: number
    itemDetails: string
    itemMacros?: iMacros
    toClient(): void
}

export interface iCategories {
    categoryName: string
    categoryType: 'food' | 'drink' | 'product' | 'misc'
}

export interface iMacros {
    calories: number
    protein: number
    carbs: number
    fats: number
}

const categorySchema = new Schema<iCategories>({
    categoryName: {
        type: String,
        required: true,
    },
    categoryType: {
        type: String,
        enum: ['food', 'drink', 'product', 'misc'],
        required: true,
        default: 'misc',
    },
})

const macroSchema = new Schema<iMacros>({
    calories: Number,
    protein: Number,
    carbs: Number,
    fats: Number,
})

const itemSchema = new Schema<iItem>({
    itemName: {
        type: String,
        required: true,
    },
    itemCategory: {
        type: categorySchema,
        required: true,
        _id: false,
    },
    itemPrice: {
        type: Number,
        required: true,
        default: 0,
    },
    itemDetails: {
        type: String,
        required: true,
    },
    itemMacros: {
        type: macroSchema,
        _id: false,
    },
})

itemSchema.methods.toClient = function () {
    const { _id, itemName, itemCategory, itemPrice, itemDetails, itemMacros } =
        this

    return {
        id: _id,
        itemName,
        itemCategory,
        itemPrice,
        itemDetails,
        itemMacros,
    }
}

const Item = model<iItem>('Item', itemSchema)

export default Item
