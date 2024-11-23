// Componente que recibe una función para setear el estado de la ciudad y un input para filtrar por ciudad
import { useState } from 'react';

export default function CityInput({setCityInput}) {
    const [input, setInput] = useState("");

    // Función para cambiar el estado de la ciudad
    const setInputValue = (e)=>{
        setInput(e.target.value)
        setCityInput(e.target.value) // Cambia el estado de la ciudad en el componente principal
    }

    return (
        <div>
            <input 
                type="text"
                value={input} // Controla el valor del input con el estado
                onChange={setInputValue} 
                placeholder='Filtrar por ciudad'
            />
        </div>
    );
}