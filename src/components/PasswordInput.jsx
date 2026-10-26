import { useState } from 'react';
import { Lock, Eye, EyeOff } from 'lucide-react';
import './Input.css';

// Agregamos value y onChange
const PasswordInput = ({ label, placeholder, value, onChange }) => {
    const [showPassword, setShowPassword] = useState(false);

    const togglePassword = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div className="input-group">
            <label>{label}</label>
            <div className="input-wrapper">
                <Lock className="input-icon left" size={20} />
                <input
                    type={showPassword ? "text" : "password"}
                    placeholder={placeholder}
                    value={value}
                    onChange={onChange}
                />
                <button type="button" className="toggle-btn right" onClick={togglePassword}>
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
            </div>
        </div>
    );
};

export default PasswordInput;