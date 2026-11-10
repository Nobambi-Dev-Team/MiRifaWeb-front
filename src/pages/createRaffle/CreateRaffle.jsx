import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Stepper from '../../components/Stepper';
import Step1General from './steps/Step1General';
import Step2Numbers from './steps/Step2Numbers';
// import Step2Numbers from './steps/Step2Numbers';
import Step3Prizes from './steps/Step3Prizes';
import api from '../../services/api';

const steps = [
    { label: 'Información General' },
    { label: 'Números' },
    { label: 'Premios' }
];

const CreateRaffle = () => {
    const navigate = useNavigate();
    const [currentStep, setCurrentStep] = useState(1);
    
    // Estados para la petición
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const [formData, setFormData] = useState({
        title: '',
        category: '',
        description: '',
        number_count: 100, 
        unit_price: 0,     
        alias_cbu: '',     
        end_date: '',
        imagen_url: '',
        prizes: [] 
    });

    // Validaciones en tiempo real por cada paso
    const isStep1Valid = formData.title.trim() !== '' && formData.category !== '';
    const isStep2Valid = Number(formData.number_count) > 0 && Number(formData.unit_price) > 0 && formData.alias_cbu.trim() !== '';
    const isStep3Valid = formData.prizes.length > 0;

    const nextStep = () => {
        setError(''); // Limpiamos errores al cambiar de paso
        setCurrentStep(prev => prev + 1);
    };
    
    const prevStep = () => {
        setError('');
        setCurrentStep(prev => prev - 1);
    };

    const handleSubmitRaffle = async () => {
        // Validaciones finales rápidas antes de enviar
        if (formData.prizes.length === 0) {
            setError('Debes agregar al menos un premio.');
            return;
        }

        setError('');
        setIsLoading(true);

        try {
            // Formateamos la fecha para que Spring Boot (LocalDateTime) la acepte correctamente
            // El input datetime-local devuelve YYYY-MM-DDTHH:mm, Spring suele requerir los segundos
            const formattedDate = formData.end_date ? `${formData.end_date}:00` : null;

            // Armamos el payload respetando el snake_case que mapeamos en Spring Boot
            const payload = {
                title: formData.title,
                description: formData.description,
                number_count: Number(formData.number_count),
                unit_price: Number(formData.unit_price),
                alias_cbu: formData.alias_cbu,
                end_date: formattedDate,
                category: formData.category,
                imagen_url: formData.imagen_url || "url_pendiente", // Hasta que implementes la subida real
                prizes: formData.prizes.map(p => ({
                    position: p.position,
                    description: p.description
                }))
            };

            // Hacemos el POST al endpoint protegido
            const response = await api.post('/api/raffles', payload);

            if (response.status === 201) {
                // Rifa creada con éxito. Redirigimos al inicio o a un panel de control
                navigate('/');
            }

        } catch (err) {
            console.error("Error al crear la rifa:", err);
            // Capturamos el error de validación de Spring Boot (GlobalExceptionHandler)
            if (err.response && err.response.data && err.response.data.detail) {
                setError(err.response.data.detail);
            } else {
                setError('Ocurrió un error al crear la rifa. Verifica los datos e intenta nuevamente.');
            }
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="create-raffle-layout">
            {/* Header omitido por brevedad */}
            <main className="main-content">
                <Stepper currentStep={currentStep} steps={steps} />

                {/* Mostrar mensaje de error global si existe */}
                {error && <div className="error-message" style={{ marginBottom: '1rem', color: '#E11D48', backgroundColor: '#FFE4E6', padding: '1rem', borderRadius: '8px', fontWeight: '500' }}>{error}</div>}

                {/* Renderizado condicional según el paso */}
                {currentStep === 1 && (
                    <Step1General 
                        formData={formData} 
                        setFormData={setFormData} 
                        onNext={nextStep} 
                        isNextDisabled={!isStep1Valid}
                    />
                )}
                
                {currentStep === 2 && (
                    <Step2Numbers 
                        formData={formData} 
                        setFormData={setFormData}
                        onNext={nextStep}
                        onPrev={prevStep}
                        isNextDisabled={!isStep2Valid}
                    />
                )}

                {currentStep === 3 && (
                    <Step3Prizes 
                        formData={formData} 
                        setFormData={setFormData}
                        onPrev={prevStep}
                        onSubmit={handleSubmitRaffle}
                        isSubmitDisabled={isLoading || !isStep3Valid} 
                        isLoading={isLoading}
                    />
                )}
            </main>
        </div>
    );
};

export default CreateRaffle;