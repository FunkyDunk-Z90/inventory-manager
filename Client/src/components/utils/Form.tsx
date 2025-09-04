import type { FormEvent } from 'react'
import LabelAndInput from './LabelAndInput'
import MyButton from '../utils/MyButton'

interface I_FormProps {
    formComponents: iLabelAndInput[]
    handleSubmit: (e: FormEvent<HTMLFormElement>) => void
    error?: string
    buttonText: string
}

function Form({
    formComponents,
    handleSubmit,
    error,
    buttonText,
}: I_FormProps) {
    return (
        <form className="form" onSubmit={handleSubmit}>
            {formComponents.map((el, i) => {
                const { labelObj, inputObj } = el
                return (
                    <LabelAndInput
                        key={i}
                        labelObj={labelObj}
                        inputObj={inputObj}
                    />
                )
            })}
            {error && <p className="error">{error}</p>}
            <MyButton btnType="submit" handleClick={handleSubmit}>
                {buttonText}
            </MyButton>
        </form>
    )
}

export default Form
