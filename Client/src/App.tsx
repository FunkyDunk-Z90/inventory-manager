import { useEffect } from 'react'

import './scss/app.scss'

// Routers
import AppRouter from './routes/AppRouter'
import AuthRouter from './routes/AuthRouter'

// Context
import { useAuthContext } from './hooks/auth/useAuthContext'

// Hooks
import { useAuthFetch } from './hooks/auth/useAuthFetch'

// Auth
import LoadingComponent from './components/auth/LoadingComponent'

// Layout
import Header from './components/layout/Header'
import Footer from './components/layout/Footer'

function App() {
    const { user } = useAuthContext()
    const { authFetch } = useAuthFetch()
    const authorizedUrls = [
        '/login',
        '/forgot-password',
        '/reset-password',
        '/sign-up',
    ]
    const routerComponent = user ? <AppRouter /> : <AuthRouter />

    useEffect(
        () => {
            const setVh = () => {
                const vh = window.innerHeight * 0.01
                document.documentElement.style.setProperty('--vh', `${vh}px`)
            }

            setVh()

            window.addEventListener('resize', setVh)

            return () => window.removeEventListener('resize', setVh)
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        []
    )

    useEffect(() => {
        authFetch({
            url: 'users/is-logged-in',
            authType: 'isLoggedIn',
            requestType: 'POST',
        })
    }, [])

    return (
        <section className="wrapper body">
            <Header businessName="My Webpage" />
            <section className="wrapper content">
                <LoadingComponent
                    component={routerComponent}
                    authUrls={authorizedUrls}
                />
            </section>
            <Footer
                businessName="My Webpage"
                copyright="@realmsandbeyond 2025"
                links={[]}
            />
        </section>
    )
}

export default App
