import { Navigate, Outlet } from "react-router-dom";

export default function PrivateRoute({ token }) {
    const redirectTo = '/';

    if (token === null) {
        return <Navigate to={redirectTo} replace />;
    }
    return <Outlet />;
}