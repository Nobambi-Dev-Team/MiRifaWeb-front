import { useState, useMemo } from 'react';
import RaffleNumber from './RaffleNumber';
import { generateRaffleBoardPage } from '../utils/RaffleBoardUtils';
import './RaffleBoard.css';

const RaffleBoard = ({ 
    totalCapacity, 
    occupiedNumbers = [], 
    itemsPerPage = 50, 
    mode = 'participant',
    onNumberClick 
}) => {
    // 1. Estado local: el tablero controla internamente en qué página está
    const [currentPage, setCurrentPage] = useState(1);

    // 2. Cálculo de datos basado en la página actual
    const boardPageNumbers = useMemo(() => {
        return generateRaffleBoardPage(totalCapacity, occupiedNumbers, currentPage, itemsPerPage);
    }, [totalCapacity, occupiedNumbers, currentPage, itemsPerPage]);

    // 3. Funciones de navegación
    const totalPages = Math.ceil(totalCapacity / itemsPerPage);

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage((prev) => prev + 1);
        }
    };

    const handlePrevPage = () => {
        if (currentPage > 1) {
            setCurrentPage((prev) => prev - 1);
        }
    };

    // Textos informativos de los rangos (para mostrar "Números 1 - 50")
    const currentFirstNum = boardPageNumbers[0]?.number || 0;
    const currentLastNum = boardPageNumbers[boardPageNumbers.length - 1]?.number || 0;

    return (
        <div className="raffle-board-container">
            
            <div className="raffle-grid">
                {boardPageNumbers.map((item) => (
                    <RaffleNumber
                        key={item.number}
                        number={item.number}
                        status={item.status}
                        mode={mode}
                        onClick={onNumberClick}
                    />
                ))}
            </div>

            <div className="raffle-board-footer">
                {/* LADO IZQUIERDO: Botón para volver O texto de la página actual */}
                {currentPage > 1 ? (
                    <button type="button" className="btn-page" onClick={handlePrevPage}>
                        &lt; Ver {(currentPage - 2) * itemsPerPage + 1} - {(currentPage - 1) * itemsPerPage}
                    </button>
                ) : (
                    <span className="numbers-range">Números {currentFirstNum} - {currentLastNum}</span>
                )}

                {/* LADO DERECHO: Botón para avanzar O texto de la página actual (si es la última) */}
                {currentPage < totalPages ? (
                    <button type="button" className="btn-page" onClick={handleNextPage}>
                        Ver {currentPage * itemsPerPage + 1} - {Math.min((currentPage + 1) * itemsPerPage, totalCapacity)} &gt;
                    </button>
                ) : (
                    // Si estamos en la última página y hay más de 1 página, mostramos el rango a la derecha para equilibrar
                    currentPage > 1 && <span className="numbers-range">Números {currentFirstNum} - {currentLastNum}</span>
                )}
            </div>
            
        </div>
    );
};

export default RaffleBoard;