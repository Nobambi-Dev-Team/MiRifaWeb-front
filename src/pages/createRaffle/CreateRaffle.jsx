import { useState } from 'react';
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
    const [currentStep, setCurrentStep] = useState(1);
    
    // El estado centralizado que se enviará al backend
    const [formData, setFormData] = useState({
        title: '',
        category: '',
        description: '',
        number_count: 100, // asumiendo que se carga en el paso 2
        unit_price: 0,     // asumiendo que se carga en el paso 2
        alias_cbu: '',     // asumiendo que se carga en el paso 2
        end_date: '',
        imagen_url: '',
        prizes: [] // El array de premios que usará el paso 3
    });

    const nextStep = () => setCurrentStep(prev => prev + 1);
    const prevStep = () => setCurrentStep(prev => prev - 1);

    // Función final que llama a tu endpoint POST /api/raffles
    const handleSubmitRaffle = async () => {
        try {
            const response = await api.post('/raffles', formData);
            if (response.status === 201) {
                // Redirigir al éxito o mostrar mensaje
                console.log("Rifa creada exitosamente", response.data);
            }
        } catch (error) {
            console.error("Error al crear la rifa:", error);
        }
    };

    return (
        <div className="create-raffle-layout">
            {/* Header omitido por brevedad */}
            <main className="main-content">
                <Stepper currentStep={currentStep} steps={steps} />

                {/* Renderizado condicional según el paso */}
                {currentStep === 1 && (
                    <Step1General 
                        formData={formData} 
                        setFormData={setFormData} 
                        onNext={nextStep} 
                    />
                )}
                
                {currentStep === 2 && (
                    <Step2Numbers 
                        formData={formData} 
                        setFormData={setFormData}
                        onNext={nextStep}
                        onPrev={prevStep}
                    />
                )}

                {currentStep === 3 && (
                    <Step3Prizes 
                        formData={formData} 
                        setFormData={setFormData}
                        onPrev={prevStep}
                        onSubmit={handleSubmitRaffle}
                    />
                )}
            </main>
        </div>
    );
};

export default CreateRaffle;