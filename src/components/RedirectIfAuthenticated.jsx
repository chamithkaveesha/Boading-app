import { Navigate, Outlet } from "react-router-dom";

const RedirectIfAuthenticated = () => {
    const token = sessionStorage.getItem("token"); // Check if user is logged in

    return token ? <Navigate to="/" replace /> : <Outlet />;
};

export default RedirectIfAuthenticated;
