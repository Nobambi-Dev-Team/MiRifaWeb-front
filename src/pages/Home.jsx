import { Link } from 'react-router-dom';
import './Home.css'; // Crearemos este archivo a continuación

// Componente Header / Navbar
const Navbar = () => {
    return (
        <header className="navbar">
            <div className="navbar-logo">
                <span className="logo-icon">🎟️</span> {/* Puedes reemplazar con un SVG real */}
                <span className="logo-text">Mi Rifa Web</span>
            </div>
            <nav className="navbar-links">
                <Link to="/login" className="nav-link">Iniciar sesión</Link>
                <Link to="/register" className="nav-link">Registrarse</Link>
            </nav>
        </header>
    );
};

// Componente Footer
const Footer = () => {
    return (
        <footer className="footer">
            <p className="footer-text">
                <span className="footer-icon">👥</span> {/* Reemplazar con logo del equipo si lo tienen */}
                NobambiDevTeam
            </p>
        </footer>
    );
};

// Componente Principal
const Home = () => {
    return (
        <div className="home-layout">
            <Navbar />
            
            <main className="home-main">
                <div className="hero-card">
                    <h1 className="hero-title">
                        Organiza y participa <br />
                        en rifas de forma <br />
                        <span className="highlight-text">fácil, transparente</span> y <br />
                        segura.
                    </h1>
                    
                    <div className="hero-actions">
                        {/* Asumo que esta ruta llevará al panel de creación una vez logueado */}
                        <Link to="/register" className="btn btn-primary">
                            <span className="btn-icon">🚀</span> Crear mi propia rifa
                        </Link>
                        
                        {/* Asumo que esta ruta llevará a un buscador público de rifas */}
                        <Link to="/search" className="btn btn-secondary">
                            <span className="btn-icon">🎫</span> Participar en una rifa
                        </Link>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default Home;