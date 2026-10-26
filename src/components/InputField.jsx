import './Input.css';

const InputField = ({ label, icon: Icon, type = "text", placeholder, value, onChange }) => {
    return (
        <div className="input-group">
            <label>{label}</label>
            <div className="input-wrapper">
                {Icon && <Icon className="input-icon left" size={20} />}
                <input 
                    type={type} 
                    placeholder={placeholder}
                    value={value}         
                    onChange={onChange}   
                />
            </div>
        </div>
    );
};

export default InputField;