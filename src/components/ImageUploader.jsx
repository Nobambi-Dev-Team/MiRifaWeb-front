import { CheckCircle } from 'lucide-react';
import './ImageUploader.css';

const ImageUploader = ({ previewUrl, onImageChange }) => {
    // Simula el click en un input file oculto
    const handleClick = () => {
        document.getElementById('raffle-image-upload').click();
    };

    return (
        <div className="image-uploader-container" onClick={handleClick}>
            <input 
                type="file" 
                id="raffle-image-upload" 
                accept="image/jpeg, image/png, image/webp" 
                style={{ display: 'none' }} 
                onChange={onImageChange}
            />
            
            {previewUrl ? (
                <div className="image-preview-wrapper">
                    <img src={previewUrl} alt="Portada de la rifa" className="image-preview" />
                    <div className="status-badge">
                        <CheckCircle size={14} /> Cargada
                    </div>
                    <div className="upload-overlay">
                        <span>Arrastra o toca para cambiar imagen</span>
                    </div>
                </div>
            ) : (
                <div className="upload-placeholder">
                    <span className="upload-action-text">Arrastra o toca para subir imagen</span>
                    <span className="upload-hint">Formatos JPG, PNG o WEBP (Máx. 5MB)</span>
                </div>
            )}
        </div>
    );
};

export default ImageUploader;