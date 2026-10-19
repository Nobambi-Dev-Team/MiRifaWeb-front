import { Navigate, Outlet } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

export const ProtectedRoute = () => {
    const { isAuthenticated } = useContext(AuthContext);

    // Si no está autenticado, lo envia al login. Si lo está, renderiza el componente hijo.
    return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
};