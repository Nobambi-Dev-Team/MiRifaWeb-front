import { useState } from 'react';
import { Trophy, Edit2, Trash2, Plus, Sparkles } from 'lucide-react';
import Button from '../../../components/Button';
import './Step3Prizes.css';

const Step3Prizes = ({ formData, setFormData, onPrev, onSubmit }) => {
    // Estado local solo para el input del nuevo premio que se está escribiendo
    const [newPrizeDescription, setNewPrizeDescription] = useState('');

    const handleAddPrize = () => {
        if (!newPrizeDescription.trim()) return;

        const nextPosition = formData.prizes.length + 1;
        
        setFormData(prev => ({
            ...prev,
            prizes: [
                ...prev.prizes,
                { position: nextPosition, description: newPrizeDescription }
            ]
        }));
        
        setNewPrizeDescription(''); // Limpiamos el input
    };

    const handleRemovePrize = (indexToRemove) => {
        setFormData(prev => {
            const updatedPrizes = prev.prizes.filter((_, index) => index !== indexToRemove);
            // Re-calcular las posiciones (1º, 2º, 3º...) para mantener el orden secuencial
            const reorderedPrizes = updatedPrizes.map((prize, idx) => ({
                ...prize,
                position: idx + 1
            }));
            return { ...prev, prizes: reorderedPrizes };
        });
    };

    return (
        <div className="form-card">
            <div className="card-header">
                <Trophy size={24} color="#4F46E5" />
                <h2>Paso 3: Premios del Sorteo</h2>
            </div>

            {/* Lista de premios agregados[cite: 2] */}
            <div className="prizes-list">
                {formData.prizes.map((prize, index) => (
                    <div key={index} className="prize-item">
                        <div className="prize-position-badge">
                            {prize.position}º
                        </div>
                        <div className="prize-content">
                            <h3 className="prize-title">{prize.description}</h3>
                        </div>
                        <div className="prize-actions">
                            <button className="icon-btn"><Edit2 size={16} /></button>
                            <button 
                                className="icon-btn delete" 
                                onClick={() => handleRemovePrize(index)}
                            >
                                <Trash2 size={16} />
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Formulario para agregar nuevo premio[cite: 2] */}
            <div className="add-prize-container">
                <div className="add-prize-header">
                    <span className="add-title"><Plus size={16} /> Agregar premio</span>
                    <span className="add-position">
                        Posición: <strong>{formData.prizes.length + 1}º Premio</strong>
                    </span>
                </div>
                
                <input 
                    type="text" 
                    className="form-control"
                    placeholder="Descripción del premio (ej: Auriculares Inalámbricos Pro)"
                    value={newPrizeDescription}
                    onChange={(e) => setNewPrizeDescription(e.target.value)}
                />
                
                <button className="btn-add-inline" onClick={handleAddPrize}>
                    <Plus size={18} /> Agregar
                </button>
            </div>

            {/* Botones de navegación del Wizard[cite: 2] */}
            <div className="form-actions">
                <Button variant="secondary" onClick={onPrev}>
                    Paso anterior
                </Button>
                <Button variant="primary" onClick={onSubmit}>
                    Finalizar y crear <Sparkles size={20} />
                </Button>
            </div>
        </div>
    );
};

export default Step3Prizes;