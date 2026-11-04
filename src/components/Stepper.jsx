import './Stepper.css';

const Stepper = ({ currentStep, steps }) => {
    return (
        <div className="stepper-container">
            {steps.map((step, index) => {
                const stepNumber = index + 1;
                const isActive = currentStep === stepNumber;
                const isCompleted = currentStep > stepNumber;

                return (
                    <div key={stepNumber} className={`step-item ${isActive ? 'active' : ''} ${isCompleted ? 'completed' : ''}`}>
                        <div className="step-indicator">
                            <span className="step-number">{stepNumber}</span>
                        </div>
                        <span className="step-label">{step.label}</span>
                        {index < steps.length - 1 && <div className="step-connector"></div>}
                    </div>
                );
            })}
        </div>
    );
};

export default Stepper;