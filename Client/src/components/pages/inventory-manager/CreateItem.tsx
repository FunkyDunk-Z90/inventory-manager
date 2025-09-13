import { useState } from 'react'

// Hooks
import { useDataFetch } from '../../../hooks/useDataFetch'

// Utils
import Form from '../../utils/Form'

const formDataInit: iItem = {
    itemName: '',
    itemCategory: '',
    itemTags: [],
    itemDetails: '',
    itemPrice: 0,
    itemMacros: {
        calories: 0,
        carbs: 0,
        fats: 0,
        protein: 0,
    },
}

function CreateItem() {
    const { dataFetch } = useDataFetch()
    const [formData, setFormData] = useState<iItem>(formDataInit)

    const handleCreateItem = () => {
        dataFetch({
            requestType: 'POST',
            url: 'create-item',
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

    const handleSelectCategory = (option: string) => {
        console.log(option)

        setFormData((prev) => ({
            ...prev,
            ['itemCategory']: option,
        }))
    }

    const handleChangeTags = (values: string[]) => {
        setFormData((prev) => ({
            ...prev,
            itemTags: values,
        }))
    }

    console.log(formData)

    return (
        <div>
            <Form
                buttonText="Create Item"
                handleSubmit={handleCreateItem}
                formComponents={[
                    {
                        labelObj: {
                            label: 'Item Name',
                            htmlFor: 'itemName',
                        },
                        inputObj: {
                            id: 'itemName',
                            name: 'itemName',
                            type: 'text',
                            handleChange,
                        },
                    },
                    {
                        dropdownLabel: 'Item Category',
                        placeholder: 'Select Category',
                        options: ['Food', 'Drink', 'Product', 'Misc'],
                        onSelect: handleSelectCategory,
                    },
                    {
                        selectionPlaceholder: 'Choose Tags',
                        selections: formData.itemTags,
                        options: ['Fruit', 'Vegetable', 'Meat', 'Fish', 'Misc'],
                        onChange: handleChangeTags,
                    },
                ]}
            />
        </div>
    )
}

export default CreateItem
