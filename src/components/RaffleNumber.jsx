import { Check } from 'lucide-react';
import './RaffleNumber.css';

const RaffleNumber = ({ number, status, mode = 'participant', onClick }) => {
    
    // Evaluamos qué clase CSS aplicar combinando el modo y el estado
    const getStatusClass = () => {
        if (status === 'FREE') return 'number-free';
        if (status === 'SELECTED') return 'number-selected';

        if (mode === 'participant') {
            // En vista participante, tanto pendientes como pagados se ven igual (gris y tachado)
            if (status === 'RESERVED' || status === 'PENDING_PAYMENT') {
                return 'number-occupied-participant';
            }
        } else if (mode === 'organizer') {
            // En vista organizador, distinguimos los colores financieros
            if (status === 'PENDING_PAYMENT') return 'number-pending-organizer';
            if (status === 'RESERVED') return 'number-paid-organizer';
        }
        
        return 'number-free'; // Fallback por defecto
    };

    // Determinamos si el número debe ser clickeable
    const isClickable = () => {
        if (mode === 'organizer') return false; // El organizador solo audita, no selecciona
        return status === 'FREE' || status === 'SELECTED';
    };

    const handleClick = () => {
        if (isClickable() && onClick) {
            onClick(number); // Emitimos el número hacia arriba (al padre)
        }
    };

    // Formateamos el número para que siempre tenga dos dígitos (ej. "01", "09")
    const formattedNumber = number.toString().padStart(2, '0');

    return (
        <button 
            type="button"
            className={`raffle-number ${getStatusClass()} ${isClickable() ? 'clickable' : ''}`}
            onClick={handleClick}
            disabled={!isClickable()}
        >
            {/* Si está seleccionado en modo participante, mostramos el check de Lucide */}
            {status === 'SELECTED' && <Check size={14} strokeWidth={3} />}
            <span>{formattedNumber}</span>
        </button>
    );
};

export default RaffleNumber;