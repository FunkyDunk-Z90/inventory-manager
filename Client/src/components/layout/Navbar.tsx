import { useEffect, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

// Hooks
import { useDataFetch } from '../../hooks/useDataFetch'

// Utils
import MyButton from '../utils/MyButton'

function Navbar() {
    const mobile = window.innerWidth < 768
    const [isMobile, setIsMobile] = useState(mobile)
    const [isActive, setIsActive] = useState(false)
    const [openStatus, setOpenStatus] = useState('')
    const navbarRef = useRef<HTMLDivElement>(null)
    const { dataFetch } = useDataFetch()
    const navigate = useNavigate()

    useEffect(() => {
        function handleResize() {
            if (window.innerWidth >= 768) {
                setIsActive(false)
                setOpenStatus('')
                setIsMobile(false)
            } else {
                setIsMobile(true)
            }
        }

        window.addEventListener('resize', handleResize)

        return () => {
            window.removeEventListener('resize', handleResize)
        }
    }, [])

    useEffect(() => {
        function handleClickOutside(e: MouseEvent) {
            if (
                navbarRef.current &&
                !navbarRef.current.contains(e.target as Node)
            ) {
                setIsActive(false)
                if (openStatus === 'opened') {
                    setOpenStatus('closed')
                }
            }
        }
        document.addEventListener('click', handleClickOutside)
        return () => {
            document.removeEventListener('click', handleClickOutside)
        }
    }, [openStatus, isActive])

    const toggleNav = () => {
        setIsActive(!isActive)

        if (isMobile) {
            if (!openStatus || openStatus === 'closed') {
                setOpenStatus('opened')
            } else {
                setOpenStatus('closed')
            }
        }
    }

    const handleLogout = () => {
        dataFetch({
            requestType: 'POST',
            url: 'users/logout',
        })

        navigate('/login', { replace: true })
    }

    return (
        <>
            <div
                ref={navbarRef}
                className={`burgerIcon ${isActive ? 'active' : ''}`}
                onClick={toggleNav}
            >
                <span className="line"></span>
                <span className="line"></span>
                <span className="line"></span>
            </div>
            <div className={`wrapper navbar ${openStatus}`}>
                <Link to={'/'} onClick={toggleNav}>
                    Home
                </Link>
                <Link to={'/contact'} onClick={toggleNav}>
                    Contact
                </Link>
                <MyButton btnType="button" handleClick={handleLogout}>
                    Logout
                </MyButton>
            </div>
        </>
    )
}

export default Navbar
