import { useState } from "react";
import "../../styles/FormReview.css"
export default function ReviewWeb({ webId,reviewed }) {
    const [body, setBody] = useState({
        review: null,
        scoring: null
    })

    const handleChange = (event, field) => {
        let data = event.target.value
        if (field === "scoring"){
            data = Number(data)
        }
        setBody({
            ...body,
            [field]: data
        })
    }

    const handleClick = (event) => {
        try {
            const token = localStorage.getItem('token')
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