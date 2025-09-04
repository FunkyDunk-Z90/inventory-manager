import { useAuthContext } from '../../hooks/auth/useAuthContext'

import Navbar from './Navbar'

interface iHeader {
    businessName: string
    logo?: string
    icons?: string[]
    paras?: string[]
}

function Header({ businessName, logo, icons, paras }: iHeader) {
    const { user } = useAuthContext()
    return (
        <section className="wrapper header">
            {logo && (
                <img
                    className="logo small"
                    id="header-logo"
                    src={logo}
                    alt={`Logo of ${businessName}`}
                />
            )}
            <h1 className="businessName">{businessName}</h1>
            {user ? <Navbar /> : null}
            {icons && (
                <div className="wrapper icons">
                    {icons.map((el) => {
                        return <img className="logo small" src={el} />
                    })}
                </div>
            )}
            {paras && (
                <div className="wrapper paras">
                    {paras.map((el) => {
                        return <p>{el}</p>
                    })}
                </div>
            )}
        </section>
    )
}

export default Header
