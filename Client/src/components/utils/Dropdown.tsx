import { useState, useRef, useEffect } from 'react'

interface DropdownProps {
    options: string[]
    placeholder?: string
    onSelect: (value: string) => void
}

function Dropdown({
    options,
    placeholder = 'Select...',
    onSelect,
}: DropdownProps) {
    const [isOpen, setIsOpen] = useState(false)
    const [selected, setSelected] = useState<string | null>(null)
    const dropdownRef = useRef<HTMLDivElement>(null)

    const handleSelect = (option: string) => {
        setSelected(option)
        onSelect(option)
        setIsOpen(false)
    }

    // Close when clicking outside
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

    const toggleDropdown = () => {
        setIsOpen(!isOpen)
    }

    return (
        <div className="dropdown" ref={dropdownRef}>
            <div className="dropdown-header">
                <span>{selected || placeholder}</span>
                <div
                    className={`dropdown-toggle ${isOpen ? 'open' : ''}`}
                    onClick={toggleDropdown}
                >
                    ▼
                </div>
            </div>
            {isOpen && (
                <ul className="dropdown-list">
                    {options.map((option, idx) => (
                        <li
                            key={idx}
                            className={`dropdown-item ${
                                selected === option ? 'selected' : ''
                            }`}
                            onClick={() => handleSelect(option)}
                        >
                            {option}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    )
}

export default Dropdown
