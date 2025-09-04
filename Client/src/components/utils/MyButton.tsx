type tMyButtonTypes = 'button' | 'reset' | 'submit' | undefined
type tBtnTheme = 'cancel' | 'confirm' | 'submit' | 'clear' | undefined

interface IMyButton {
    children: React.ReactNode
    handleClick: (e?: tEventTypes | undefined) => void
    isDisabled?: boolean
    theme?: tBtnTheme
    btnType: tMyButtonTypes
    withRef?: tBtnRef
}

function MyButton({
    children,
    handleClick,
    isDisabled,
    theme,
    btnType,
    withRef,
}: IMyButton) {
    const defaultTheme = !theme ? '' : theme
    return (
        <button
            onClick={handleClick}
            disabled={isDisabled}
            className={`btn ${defaultTheme}`}
            type={btnType}
            ref={withRef}
            role="button"
        >
            {children}
        </button>
    )
}

export default MyButton
