import { useState } from 'react';

export default function ButtonOrder({setButtonOrder, type}) {
    const [order,setOrder] = useState(false)
    
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