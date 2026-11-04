import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FileText, ArrowRight, Calendar } from 'lucide-react';
import ImageUploader from '../../../components/ImageUploader';
import Button from '../../../components/Button';
import './Step1General.css'; // Puedes mover los estilos específicos aquí

const Step1General = ({ formData, setFormData, onNext }) => {
    const navigate = useNavigate();
    
    // Estado local solo para la previsualización visual de la imagen en este paso
    const [previewUrl, setPreviewUrl] = useState(
        formData.imagen_url || 'https://images.unsplash.com/photo-1606813907291-d86efa9b94db?q=80&w=1000&auto=format&fit=crop'
    );

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const currentPreview = URL.createObjectURL(file);
            setPreviewUrl(currentPreview);
            
            // Aquí guardarías el archivo real en tu estado si necesitas subirlo luego
            // setFormData(prev => ({ ...prev, imageFile: file }));
        }
    };

    return (
        <div className="form-card">
            <div className="card-header">
                <FileText size={24} color="#4F46E5" />
                <h2>Ingrese la información básica de su Rifa</h2>
            </div>

            <div className="form-group">
                <div className="label-row">
                    <label>Título de la Rifa</label>
                    <span className="char-count">{formData.title?.length || 0}/150 caracteres</span>
                </div>
                <input 
                    type="text" 
                    name="title"
                    value={formData.title} 
                    onChange={handleInputChange} 
                    maxLength={150}
                    className="form-control"
                    placeholder="Ej: Gran Sorteo Tech 2026"
                />
            </div>

            <div className="form-group">
                <label>Categoría</label>
                <select 
                    name="category"
                    value={formData.category} 
                    onChange={handleInputChange}
                    className="form-control select-control"
                >
                    <option value="">Seleccione una categoría</option>
                    <option value="TECNOLOGIA">Tecnología</option>
                    <option value="VIAJES">Viajes</option>
                    <option value="VEHICULOS">Vehículos</option>
                    <option value="BENEFICENCIA">Beneficencia</option>
                </select>
            </div>

            <div className="form-group">
                <div className="label-row">
                    <label>Descripción del Evento</label>
                    <span className="char-count">{formData.description?.length || 0}/500 caracteres</span>
                </div>
                <textarea 
                    name="description"
                    value={formData.description} 
                    onChange={handleInputChange}
                    maxLength={500}
                    className="form-control textarea-control"
                    rows={4}
                    placeholder="Describe los detalles de tu sorteo..."
                />
            </div>

            <div className="form-group">
                <label>Imagen de Portada</label>
                <ImageUploader 
                    previewUrl={previewUrl} 
                    onImageChange={handleImageChange} 
                />
            </div>

            <div className="form-group">
                <label>Fecha y Hora de Cierre del Sorteo</label>
                <div className="input-with-icon">
                    <Calendar size={20} className="input-icon" />
                    <input 
                        type="datetime-local" 
                        name="end_date"
                        value={formData.end_date} 
                        onChange={handleInputChange}
                        className="form-control"
                    />
                </div>
                <p className="helper-text">
                    La Rifa se bloqueará automáticamente a las 21:00 hs seleccionando a los ganadores.
                </p>
            </div>

            <div className="checkbox-group">
                <input 
                    type="checkbox" 
                    id="manualEnd" 
                    name="manualEnd"
                    checked={formData.manualEnd || false}
                    onChange={handleInputChange}
                />
                <label htmlFor="manualEnd">Permitirme decidir el fin de la rifa manualmente</label>
            </div>

            <div className="form-actions">
                <Button 
                    variant="cancel" 
                    onClick={() => navigate(-1)}
                >
                    Cancelar
                </Button>
                
                <Button 
                    variant="primary" 
                    onClick={onNext}
                >
                    <>Siguiente paso <ArrowRight size={20} /></>
                </Button>
            </div>
        </div>
    );
};

export default Step1General;