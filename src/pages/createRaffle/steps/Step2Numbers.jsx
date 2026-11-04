import { Ticket, Hash, DollarSign, Landmark, CheckCircle2, ShieldCheck, ArrowRight } from 'lucide-react';
import Button from '../../../components/Button';
import './Step2Numbers.css';

const Step2Numbers = ({ formData, setFormData, onNext, onPrev }) => {

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    // Calculamos la recaudación total en tiempo real
    const totalRevenue = (Number(formData.number_count) || 0) * (Number(formData.unit_price) || 0);

    return (
        <div className="form-card">
            <div className="card-header">
                <Ticket size={24} color="#4F46E5" />
                <h2>Paso 2: Números y Recaudación</h2>
            </div>

            <div className="grid-2-cols">
                {/* Cantidad de Boletos[cite: 3] */}
                <div className="form-group">
                    <label>Cantidad Boletos</label>
                    <div className="input-with-icon">
                        <Hash size={20} className="input-icon" />
                        <input 
                            type="number" 
                            name="number_count"
                            value={formData.number_count} 
                            onChange={handleInputChange} 
                            min="1"
                            className="form-control font-semibold"
                        />
                    </div>
                    <p className="helper-text">Mínimo 1 número</p>
                </div>

                {/* Precio por número[cite: 3] */}
                <div className="form-group">
                    <label>Precio por número</label>
                    <div className="input-with-icon right-suffix">
                        <DollarSign size={20} className="input-icon" />
                        <input 
                            type="number" 
                            name="unit_price"
                            value={formData.unit_price} 
                            onChange={handleInputChange} 
                            min="0"
                            step="0.01"
                            className="form-control font-semibold"
                        />
                        <span className="input-suffix">ARS</span>
                    </div>
                    <p className="revenue-text">
                        Recaudación: ${totalRevenue.toLocaleString('es-AR')}
                    </p>
                </div>
            </div>

            {/* Alias o CBU[cite: 3] */}
            <div className="form-group alias-group">
                <label>Alias o CBU para Acreditación</label>
                <div className="input-with-icon right-icon">
                    <Landmark size={20} className="input-icon" />
                    <input 
                        type="text" 
                        name="alias_cbu"
                        value={formData.alias_cbu} 
                        onChange={handleInputChange} 
                        className="form-control font-semibold uppercase-input"
                        placeholder="ej: MI.ALIAS.MP"
                    />
                    {formData.alias_cbu?.length > 5 && (
                        <CheckCircle2 size={20} className="validation-icon" color="#10B981" />
                    )}
                </div>
                
                <div className="info-banner">
                    <ShieldCheck size={20} className="info-icon" />
                    <p>
                        Los fondos de las ventas con tarjeta o transferencia se enviarán directamente a esta cuenta bancaria verificada sin comisiones ocultas.
                    </p>
                </div>
            </div>

            <div className="form-actions">
                <Button variant="secondary" onClick={onPrev}>
                    Paso anterior
                </Button>
                
                <Button variant="primary" onClick={onNext}>
                    <>Siguiente paso <ArrowRight size={20} /></>
                </Button>
            </div>
        </div>
    );
};

export default Step2Numbers;