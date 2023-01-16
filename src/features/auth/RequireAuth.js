import { useLocation, Navigate, Outlet } from "react-router-dom"
import useAuth from "../../hooks/useAuth"

const RequireAuth = ({ allowedRoles }) => {
    const location = useLocation()
    const { roles } = useAuth()

	//roles = what the user has
	//allowedRoles = what the webpage will allow
	//go through each of the user's roles and check if it is one of the allowed roles.
	//i think using .some is a way to test if authenticated, everyone will at least be a employee role. so if they have at least one of the allowed roles, let them in
    const content = (
        roles.some(role => allowedRoles.includes(role))
            ? <Outlet />
            : <Navigate to="/login" state={{ from: location }} replace />
    )

    return content
}
export default RequireAuth