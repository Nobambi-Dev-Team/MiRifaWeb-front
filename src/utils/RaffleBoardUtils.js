/**
 * Genera el array de números para una página específica del talonario,
 * fusionando los números libres con los ocupados reportados por el backend.
 * 
 * @param {number} totalCapacity - Capacidad total de la rifa (ej. 100, o 30)
 * @param {Array} occupiedNumbers - Array de objetos { number, status } del backend
 * @param {number} currentPage - Página actual a renderizar (inicia en 1)
 * @param {number} itemsPerPage - Cantidad de números por página (por defecto 50)
 * @returns {Array} Array de objetos { number, status } pre-calculados
 */
export const generateRaffleBoardPage = (
    totalCapacity, 
    occupiedNumbers = [], 
    currentPage = 1, 
    itemsPerPage = 50
) => {
    // Calcular el rango matemático de la página actual
    const startNumber = (currentPage - 1) * itemsPerPage + 1;
    
    // Limitar el número final para que no supere la capacidad total de la rifa
    const endNumber = Math.min(startNumber + itemsPerPage - 1, totalCapacity);

    // Optimización: Convertir el array del backend en un diccionario (búsqueda O(1))
    // Ejemplo resultante: { 15: "RESERVED", 22: "PENDING_PAYMENT" }
    const occupiedMap = {};
    occupiedNumbers.forEach(item => {
        occupiedMap[item.number] = item.status;
    });

    const boardPage = [];

    // Construir la cuadrícula fusionando el estado
    for (let i = startNumber; i <= endNumber; i++) {
        boardPage.push({
            number: i,
            // Si el número existe en el mapa, toma su estado del backend. Si no, le asigna 'libre' (FREE).
            status: occupiedMap[i] || 'FREE'
        });
    }

    return boardPage;
};