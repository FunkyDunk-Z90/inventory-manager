import { useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'

import './scss/app.scss'

// Routers
import AppRouter from './routes/AppRouter'
import AuthRouter from './routes/AuthRouter'

// Context
import { useAuthContext } from './hooks/auth/useAuthContext'

// Hooks
import { useDataFetch } from './hooks/useDataFetch'

// Auth
import LoadingComponent from './components/auth/LoadingComponent'

// Layout
import Header from './components/layout/Header'
import Footer from './components/layout/Footer'

function App() {
    const { user } = useAuthContext()
    const { dataFetch } = useDataFetch()
    const authorizedUrls = ['/login', '/forgot-password', '/reset-password']
    const routerComponent = user ? <AppRouter /> : <AuthRouter />

    console.log(routerComponent)

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
        dataFetch({
            url: 'users/is-logged-in',
            authType: 'isLoggedIn',
            requestType: 'POST',
        })
    }, [])

    return (
        <section className="wrapper body">
            <Header businessName="My Webpage" />
            <section className="wrapper content">
                <Routes>
                    <Route
                        path="*"
                        element={
                            <LoadingComponent
                                component={routerComponent}
                                authUrls={authorizedUrls}
                            />
                        }
                    />
                </Routes>
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
