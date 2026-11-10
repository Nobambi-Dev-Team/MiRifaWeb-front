import './Button.css';

const Button = ({ children, variant = 'primary', type = 'button', onClick, disabled = false}) => {
    return (
        <button 
            type={type} 
            className={`btn btn-${variant}`} 
            onClick={onClick}
            disabled={disabled}
            style={{ opacity: disabled ? 0.6 : 1, cursor: disabled ? 'not-allowed' : 'pointer' }}
        >
            {children}
        </button>
    );
};

export default Button;