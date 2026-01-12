import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function ProtectedRoute() {
    const { user } = useAuth();
    const location = useLocation();
    
    if (!user) {
        return <Navigate to="/login" replace />;
    }

    if (
        user.role === "admin" &&
        (location.pathname.startsWith("/cart") ||
        location.pathname.startsWith("/product")||
        location.pathname.startsWith("/categories"))
    ){
       
        return <Navigate to="/dashboard" replace />;
    }

    return(
        <Outlet />
    );    
}

export default ProtectedRoute;