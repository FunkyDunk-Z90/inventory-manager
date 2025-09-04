import { useAuthContext } from '../../hooks/auth/useAuthContext'

function Home() {
    const { user } = useAuthContext()
    return (
        <section className="wrapper home">
            {user ? <h1>{`Welcome ${user.username}`}</h1> : null}
        </section>
    )
}

export default Home
