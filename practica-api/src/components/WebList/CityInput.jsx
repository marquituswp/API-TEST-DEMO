import { useState } from 'react';

export default function CityInput({setCityInput}) {
    const [input, setInput] = useState("");

    const setInputValue = (e)=>{
        setInput(e.target.value)
        setCityInput(e.target.value)
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