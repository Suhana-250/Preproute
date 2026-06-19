import { Navigate } from "react-router-dom";
import { getToken } from "../services/authService";

function ProtectedRoute({ children }: { children: React.ReactNode }) {
    const token = getToken();
    return token ? <>{children}</> : <Navigate to="/" replace />;
}

export default ProtectedRoute;