import { Link } from 'react-router-dom'

interface iFooter {
    businessName: string
    logo?: string
    links: iLinks[]
    copyright: string
}

function Footer({ businessName, logo, links, copyright }: iFooter) {
    return (
        <section className="wrapper footer">
            <img className="logo small" src={logo} alt="Business Logo" />
            <h3 className="footer-title">{businessName}</h3>
            <p>{copyright}</p>
            <div className="gallery-container">
                <div className="gallery">
                    {links.map((el) => {
                        return (
                            <div className="footer link">
                                <img
                                    className="logo tiny"
                                    src={el.icon}
                                    alt="icon name"
                                />
                                <Link className="footer url" to={el.url} />
                                <p className="footer linkName">{el.linkName}</p>
                            </div>
                        )
                    })}
                </div>
            </div>
        </section>
    )
}

export default Footer
