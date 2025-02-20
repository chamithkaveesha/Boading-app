import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
    const token = sessionStorage.getItem("token"); // Check if user is logged in

    return token ? <Outlet /> : <Navigate to="/login" />; // Redirect to login if no token
};

export default ProtectedRoute;
