import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ProtectedRoute } from './routes/ProtectedRoute';
import './App.css';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Rutas Públicas (las que coinciden con requestMatchers.permitAll() en el backend) */}
          <Route path="/login" element={<h2>Login</h2>} />
          <Route path="/register" element={<h2>Registro</h2>} />
          <Route path="/" element={<h2>Home</h2>} />

          {/* Rutas Privadas (requieren autenticación) */}
          <Route element={<ProtectedRoute />}>
            <Route path="/raffles/:id" element={<h2>Raffles metrics</h2>} />
          </Route>

          {/* Ruta por defecto (404 o fallback) */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;