import { Navigate, useLocation } from 'react-router-dom'

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
    const location = useLocation()
    const pathname = location.pathname

    const isAllowed = authUrls.some((url) => pathname.startsWith(url))

    if (isLoading) {
        return <Spinner />
    }

    if (user && isAllowed) {
        return <Navigate to="/dashboard" replace={true} />
    }

    if (!user && !isAllowed) {
        return <Navigate to="/login" replace={true} />
    }

    return component
}

export default LoadingComponent
