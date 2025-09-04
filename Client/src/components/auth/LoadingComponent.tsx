import { Navigate } from 'react-router-dom'

//Context
import { useAuthContext } from '../../hooks/auth/useAuthContext'

// Utils
import Spinner from '../utils/Spinner'

interface iLodaingComponent {
    component: React.JSX.Element
    authUrls: string[]
}

function LoadingComponent({ component, authUrls }: iLodaingComponent) {
    const { isLoading, user } = useAuthContext()
    const pathname = window.location.pathname

    const authorized = authUrls.map((url) => {
        return url === pathname
    })

    const isAllowed = authorized.includes(true)

    if (isLoading) {
        return <Spinner />
    }

    if (user && isAllowed) {
        return <Navigate to="/" replace={true} />
    }

    if (!user && !isAllowed) {
        return <Navigate to="/login" replace={true} />
    }

    return component
}

export default LoadingComponent
