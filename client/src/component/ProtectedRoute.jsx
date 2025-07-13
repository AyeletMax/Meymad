import { Navigate } from "react-router-dom";
import { useUser } from "./UserContext";

function ProtectedRoute({ children, adminOnly = false }) {
    const { currentUser, loading } = useUser();

    if (loading) {
        return <div>טוען משתמש...</div>;
    }

    if (currentUser.username === "") {
        return <Navigate to="/login" replace />;
    }

   
    if (adminOnly && currentUser.role !== "admin") {
        return <Navigate to="/" replace />;
    }

    return children;
}
export default ProtectedRoute;