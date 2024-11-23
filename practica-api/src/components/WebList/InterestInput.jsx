// Componente que recibe una función para setear el estado de intereses y un input para filtrar por intereses
import { useState } from 'react';

export default function InterestInput({setInterestInput}) {
    const [input, setInput] = useState("");

    // Función para cambiar el estado de los intereses
    const setInputValue = (e)=>{
        setInput(e.target.value)
        setInterestInput(e.target.value) // Cambia el estado de los intereses en el componente principal
    }

    return (
        <div>
            <input 
                type="text"
                value={input} // Controla el valor del input con el estado
                onChange={setInputValue} 
                placeholder='Filtrar por intereses'
            />
        </div>
    );
}