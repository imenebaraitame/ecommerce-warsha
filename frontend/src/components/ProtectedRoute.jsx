import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function ProtectedRoute() {
    const { user } = useAuth();
    
    if (!user) {
        return <Navigate to="/login" replace />;
    }

    return(
         user.role === "admin"?<Outlet />:<Navigate to ="login" replace/>
    );    
}

export default ProtectedRoute;