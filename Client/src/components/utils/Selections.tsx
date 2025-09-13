import { useState, useRef, useEffect } from 'react'

import MyButton from './MyButton'

function Selections({
    selectionPlaceholder = 'Select...',
    selections,
    options,
    onChange,
}: iSelections) {
    const [isOpen, setIsOpen] = useState(false)
    const dropdownRef = useRef<HTMLDivElement>(null)

    const toggleDropdown = () => setIsOpen(!isOpen)

    const handleSelect = (option: string) => {
        if (!selections.includes(option)) {
            onChange([...selections, option])
        }
        setIsOpen(false)
    }

    const handleRemove = (item: string) => {
        const updated = selections.filter((el) => el !== item)
        onChange(updated)
    }

    // Close dropdown on outside click
    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(e.target as Node)
            ) {
                setIsOpen(false)
            }
        }
        document.addEventListener('mousedown', handleClickOutside)
        return () =>
            document.removeEventListener('mousedown', handleClickOutside)
    }, [])

    return (
        <div
            className="wrapper multi-select"
            ref={dropdownRef}
            onClick={toggleDropdown}
        >
            <div className="selected-tags">
                {selections.length > 0 ? (
                    selections.map((el, i) => (
                        <span className="tag" key={i}>
                            {el}
                            <MyButton
                                btnType="button"
                                theme="clear"
                                handleClick={(e) => {
                                    e.stopPropagation()
                                    handleRemove(el)
                                }}
                                children={'X'}
                            />
                        </span>
                    ))
                ) : (
                    <span className="placeholder">{selectionPlaceholder}</span>
                )}
            </div>
            <div className={`dropdown-toggle ${isOpen ? 'open' : ''}`}>▼</div>
            {isOpen && (
                <ul className="dropdown-list">
                    {options
                        .filter((el) => !selections.includes(el))
                        .map((el, i) => (
                            <li
                                key={i}
                                className="dropdown-item"
                                onClick={() => handleSelect(el)}
                            >
                                {el}
                            </li>
                        ))}
                    {options.filter((el) => !selections.includes(el)).length ===
                        0 && (
                        <li className="dropdown-empty">No more options</li>
                    )}
                </ul>
            )}
        </div>
    )
}

export default Selections
