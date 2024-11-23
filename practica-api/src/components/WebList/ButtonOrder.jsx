// Componente que muestra un botón que permite ordenar la lista de elementos por un atributo específico
import { useState } from 'react';

export default function ButtonOrder({setButtonOrder, type}) { // setButtonOrder es una función que se pasa como prop para cambiar el estado de la variable order
    // type es el atributo por el que se va a ordenar la lista
    const [order,setOrder] = useState(false) // Estado interno del botón
    
    // Función para cambiar el estado del botón
    const toggleOrderValue = () => {
        const newOrder = !order; // Alterna el estado
        setOrder(newOrder); // Cambia el estado interno del botón
        setButtonOrder(newOrder); // Cambia el estado en el componente principal
    };

    return (
        <div>
            <button onClick={toggleOrderValue}>
                {order ? "Desorganizar" : `Ordenar por ${type}`}
            </button>
        </div>
    );
}