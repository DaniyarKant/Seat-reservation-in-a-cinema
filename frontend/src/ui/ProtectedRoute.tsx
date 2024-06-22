import { useEffect } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import { useUser } from "../features/authentication/useUser";

function ProtectedRoute({ children }) {
    const { user, isLoading } = useUser();
    const navigate = useNavigate();

    useEffect(() => {
        if (!isLoading && !user) {
            navigate("/login");
        }
    }, [user, isLoading, navigate]);

    if (isLoading) return <div>Loading...</div>;

    return user ? children : <Navigate to="/login" />;
}

export default ProtectedRoute;
