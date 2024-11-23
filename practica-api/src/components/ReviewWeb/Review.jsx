// Componente para dejar una reseña a una web
import { useState } from "react";
import "../../styles/FormReview.css"
export default function ReviewWeb({ webId,reviewed }) { // reviewed es una función que se pasa como prop para cambiar el estado de la variable reviewed
    // webId es el id de la web a la que se le va a dejar la reseña
    const [body, setBody] = useState({ // Variable para guardar los datos de la reseña
        review: null,
        scoring: null
    })

    // Función para cambiar el estado de la variable body
    const handleChange = (event, field) => {
        let data = event.target.value
        if (field === "scoring"){ // Si el campo es scoring, se convierte a número
            data = Number(data)
        }
        setBody({
            ...body,
            [field]: data
        })
    }

    // Función para enviar la reseña
    const handleClick = (event) => {
        try {
            const token = localStorage.getItem('token') // Se obtiene el token del usuario del localStorage
            event.preventDefault()
            fetch(`http://localhost:3000/users/reviewWeb/${webId}`, {
                method: "PUT",
                headers: {
                    'Authorization': `Bearer ${token}`,
                    "Content-Type": "application/json",
                    
                },
                body: JSON.stringify(body)
            })
                .then(response => response.json())
                .then(data => {
                    console.log(data)
                    reviewed(false)
                })
                .catch((error) => { console.log(error) })
        } catch {
            console.log("Internal Error")
        }


    }

    return (
        <>
            <form className="reviewForm">
                <div className="inputContainer">
                    <label className="labelReview">Comment</label>
                    <textarea className="inputFieldComment" placeholder="Deja una reseña" onChange={(e)=>handleChange(e,'review')}></textarea>
                </div>
                <div className="inputContainer">
                    <label className="labelReview">Scoring</label>
                    <input type="number" className="inputField" placeholder="Scoring" min="1" max="5" step="0.25" onChange={(e)=>handleChange(e,'scoring')}/>
                </div>
                <button type="submit" className="submitButton" onClick={handleClick}>Submit Review</button>
            </form>
        </>
    )

}