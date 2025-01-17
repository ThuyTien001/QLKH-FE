import { Link } from "react-router-dom"

export const Page404 = () => {
    return(
        <div className="flex items-center justify-center min-h-screen">
        <div>
            <p className="mb-4 text-3xl font-bold">404</p>
            <Link to="/">Go Home</Link>
        </div>
    </div>
    )
}