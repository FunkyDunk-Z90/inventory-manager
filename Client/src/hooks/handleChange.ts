export const handleChange = (e: tInputEvent, setFormData: any) => {
    const { name, value } = e.target

    setFormData((prevFormData: any) => ({
        ...prevFormData,
        [name]: value,
    }))
}
