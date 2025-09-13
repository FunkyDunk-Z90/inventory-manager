// Components
import LabelAndInput from './LabelAndInput'
import MyButton from '../utils/MyButton'
import Dropdown from './Dropdown'
import Selections from './Selections'

// Hooks
import { objKeyChecker } from '../../hooks/objKeyChecker'

function Form({ formComponents, handleSubmit, error, buttonText }: iFormProps) {
    return (
        <form className="form" onSubmit={handleSubmit}>
            {formComponents.map((el, i) => {
                if (objKeyChecker(el, 'selections')) {
                    const {
                        selectionPlaceholder,
                        selections,
                        options,
                        onChange,
                    } = el as iSelections
                    return (
                        <Selections
                            key={i}
                            selectionPlaceholder={selectionPlaceholder}
                            selections={selections}
                            options={options}
                            onChange={onChange}
                        />
                    )
                } else if (objKeyChecker(el, 'options')) {
                    const { options, placeholder, onSelect } = el as iDropdown
                    return (
                        <Dropdown
                            key={i}
                            options={options}
                            placeholder={placeholder}
                            onSelect={onSelect}
                        />
                    )
                } else {
                    const { labelObj, inputObj } = el as iLabelAndInput
                    return (
                        <LabelAndInput
                            key={i}
                            labelObj={labelObj}
                            inputObj={inputObj}
                        />
                    )
                }
            })}

            {error && <p className="error">{error}</p>}
            <MyButton btnType="submit" handleClick={handleSubmit}>
                {buttonText}
            </MyButton>
        </form>
    )
}

export default Form
