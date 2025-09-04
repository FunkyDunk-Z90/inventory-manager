import MyButton from './MyButton'

function LabelAndInput({ inputObj, labelObj }: iLabelAndInput) {
    const { id, name, type, value, placeholder, handleChange, handleReset } =
        inputObj
    return (
        <div className="wrapper label-input">
            {labelObj ? (
                <label className="input-label" htmlFor={labelObj.htmlFor}>
                    {`${labelObj.label}:`}
                </label>
            ) : null}
            <input
                className="input-content"
                type={type}
                id={id}
                name={name}
                placeholder={placeholder}
                onChange={handleChange}
                value={value}
                required
                autoComplete="off"
            />
            {handleReset ? (
                <div className="wrapper btn-input">
                    <MyButton
                        handleClick={handleReset}
                        theme="clear"
                        btnType="reset"
                    >
                        X
                    </MyButton>
                </div>
            ) : null}
        </div>
    )
}

export default LabelAndInput
