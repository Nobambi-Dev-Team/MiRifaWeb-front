import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ProtectedRoute } from './routes/ProtectedRoute';
import Home from './pages/Home';
import Login from './pages/Login';
import './App.css';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Rutas Públicas (las que coinciden con requestMatchers.permitAll() en el backend) */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<h2>Registro</h2>} />

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