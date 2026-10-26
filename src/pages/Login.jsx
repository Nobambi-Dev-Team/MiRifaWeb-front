import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AtSign, ArrowRight } from 'lucide-react';
import InputField from '../components/InputField';
import PasswordInput from '../components/PasswordInput';
import Button from '../components/Button';
import { AuthContext } from '../context/AuthContext';
import api from '../services/api';
import './Login.css';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const { login } = useContext(AuthContext); // Traemos la función global para guardar el token
    const navigate = useNavigate(); // Herramienta para cambiar de ruta

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        try {
            const response = await api.post('/auth/login', {
                username: email, 
                password: password
            });

            const tokenJwt = response.data.jwt; 
            
            login(tokenJwt);
            navigate('/');

        } catch (err) {
            console.error("Error al iniciar sesión:", err);
            setError('Correo electrónico o contraseña incorrectos.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="login-wrapper">
            <div className="login-header">
                <h1>¡Hola de nuevo! 👋</h1>
                <p>Para crear y gestionar tus rifas es necesario que inicies sesión.</p>
            </div>

            <div className="login-card">
                <form className="login-form" onSubmit={handleSubmit}>
                    
                    {/* Renderizado condicional: si hay error, mostramos este bloque */}
                    {error && <div className="error-message">{error}</div>}

                    <InputField 
                        label="CORREO ELECTRÓNICO" 
                        icon={AtSign} 
                        type="email" 
                        placeholder="ejemplo@correo.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />

                    <PasswordInput 
                        label="CONTRASEÑA" 
                        placeholder="••••••••"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    <a href="#" className="forgot-password">¿Olvidaste tu contraseña?</a>

                    <Button variant="primary" type="submit" disabled={isLoading}>
                        {isLoading ? 'Iniciando...' : (
                            <>Iniciar Sesión <ArrowRight size={20} /></>
                        )}
                    </Button>

                    <div className="divider">
                        <span>O CONTINÚA CON</span>
                    </div>

                    <Button variant="secondary" type="button">
                        <span style={{ fontWeight: 900, color: '#4285F4', fontSize: '18px' }}>G</span> 
                        Google
                    </Button>
                </form>
            </div>
        </div>
    );
};

export default Login;