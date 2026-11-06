import { useState } from 'react';
import RaffleBoard from '../components/RaffleBoard';

const ParticipantView = () => {
    // Simulamos los datos que llegaron del backend (reemplazar por Axios aquí)
    const totalCapacity = 350;
    const backendOccupiedNumbers = [
        { number: 11, status: 'PENDING_PAYMENT' },
        { number: 12, status: 'RESERVED' },
        { number: 15, status: 'RESERVED' }
    ];

    // Estado local para guardar los números que el usuario va tocando
    const [selectedNumbers, setSelectedNumbers] = useState([]);

    // Función para alternar (seleccionar/deseleccionar) un número
    const handleNumberClick = (numberClicked) => {
        setSelectedNumbers((prevSelected) => {
            // Si el número ya estaba seleccionado, lo quitamos del array
            if (prevSelected.includes(numberClicked)) {
                return prevSelected.filter(n => n !== numberClicked);
            }
            // Si no estaba, lo agregamos (aquí también podrías poner un límite, ej. máximo 5 números)
            return [...prevSelected, numberClicked];
        });
    };

    // Mezclamos los datos del backend con la selección local
    // Mapeamos los seleccionados para darles el formato { number, status: 'SELECTED' }
    const combinedNumbers = [
        ...backendOccupiedNumbers,
        ...selectedNumbers.map(num => ({ number: num, status: 'SELECTED' }))
    ];

    return (
        <div style={{ maxWidth: '400px', margin: '0 auto', padding: '20px' }}>
            <h2>Gran Rifa de Moto Onda</h2>
            
            
            {/* importar el tablero, pasar el array combinado y la función para escuchar los clics.  */}
            <RaffleBoard 
                mode="participant"
                totalCapacity={totalCapacity}
                occupiedNumbers={combinedNumbers}
                onNumberClick={handleNumberClick}
            />

            {/* Mostramos un resumen dinámico */}
            <div style={{ marginTop: '20px', textAlign: 'center' }}>
                <p>Números elegidos: {selectedNumbers.length}</p>
                <button 
                    disabled={selectedNumbers.length === 0}
                    style={{ padding: '10px 20px', backgroundColor: '#4f46e5', color: 'white', border: 'none', borderRadius: '8px' }}
                >
                    Confirmar Reserva
                </button>
            </div>
        </div>
    );
};

export default ParticipantView;