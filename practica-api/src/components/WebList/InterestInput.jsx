import { useState } from 'react';

export default function InterestInput({setInterestInput}) {
    const [input, setInput] = useState("");

    const setInputValue = (e)=>{
        setInput(e.target.value)
        setInterestInput(e.target.value)
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