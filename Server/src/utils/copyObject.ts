export const copyObj = (
    obj: { [key: string]: any },
    ...allowedFields: string[]
) => {
    const newObj: { [key: string]: any } = {}
    Object.keys(obj).forEach((el) => {
        if (allowedFields.includes(el)) newObj[el] = obj[el]
    })
    return newObj
}
