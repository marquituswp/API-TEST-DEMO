// Componente que muestra los detalles de una web seleccionada
import { useState, useEffect } from 'react';
import "../../styles/WebDetails.css"
import ReviewWeb from '../ReviewWeb/Review';
export default function WebDetails({ webSent, handleWebList, islogged, urlUsed}) { // webSent es la web seleccionada, handleWebList es una función para volver a la lista de webs, islogged es un booleano que indica si el usuario está logueado
    const [web, setWeb] = useState(null); // Estado para guardar la web seleccionada
    const [reviewInfo,setReviewInfo] = useState(null) // Estado para guardar la información de la review
    const [review, setReview] = useState(false) // Estado para mostrar el formulario de review

    // Función para obtener la información de la web seleccionada
    useEffect(() => {
        setWeb(webSent);
        setReviewInfo(webSent)
        fetch(urlUsed)
            .then(response => response.json())
            .then(data => setReviewInfo(data.find(listItem=>listItem._id === webSent._id)))
            .catch(error => {
                console.error("Error fetching data", error)
            })        
    }, [webSent,urlUsed,review]); // Se ejecuta cada vez que cambia la web seleccionada o el estado de review

    // Función para mostrar el formulario de review
    const handleReview = () => {
        setReview(!review)
    }    

    // Función para mostrar las estrellas de la review
    const handlePoints = (points) => {
        const fullStars = Math.floor(points);  
        const hasHalfStar = points % 1 >= 0.25 && points % 1 < 0.75;  
        const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0); 
        
        
        return (
            <span className="starRating">
                {" ★".repeat(fullStars)}  
                {hasHalfStar ? "☆" : ""}  
                {" ☆".repeat(emptyStars)} 
            </span>
        );
    };

    if (!web) {
        return <h2 className="noItemSelected">Ninguna Web seleccionada</h2>;
    } else {
        return (
            <div className="detailContainer">
                <div>
                    <p className="resetButton" onClick={handleWebList}>{"<- Webs"}</p>
                    <div className="webInfo">
                        <div className="detailItem">
                            <span className="itemLabel">CIF:</span>
                            <span className="itemValue">{web.cifCommerce}</span>
                        </div>
                        <div className="detailItem">
                            <span className="itemLabel">City:</span>
                            <span className="itemValue">{web.city}</span>
                        </div>
                        <div className="detailItem">
                            <span className="itemLabel">Activity:</span>
                            <span className="itemValue">{web.activity}</span>
                        </div>
                        <div className="detailItem">
                            <span className="itemLabel">Title:</span>
                            <span className="itemValue">{web.title}</span>
                        </div>
                        <div className="detailItem">
                            <span className="itemLabel">Summary:</span>
                            <span className="itemValue">{web.summary}</span>
                        </div>
                        <div className="detailItem">
                            <span className="itemLabel">Texts:</span>
                            <div className="textContainer">
                            {web.texts.map((text, index) => (
                                <span key={index} className="itemValue">{text}</span>
                            ))}
                        </div>
                        </div>
                    </div>
                    <div className="detailItem">
                        <span className="itemLabelImage">Images:</span>
                    </div>
                    <div className="webImages">
                        <div className="imageContainer">
                            {web.images.map((image, index) => (
                                <img key={index} src={`http://localhost:3000${image}`} className="webImage" />
                            ))}
                        </div>
                    </div>

                    <div className="webReviews">
                        <h4 className="sectionLabel">Reviews: {handlePoints(reviewInfo.points)}</h4>
                        <div className='reviewsContainer'>
                            {reviewInfo.reviews.map((review, index) => (
                                <div key={index} className="reviewItem">
                                    <div className="reviewDetail">
                                        <span className="itemLabel">Scoring:</span>
                                        <span className="itemValue">{review.scoring}</span>
                                    </div>
                                    <div className="reviewDetail">
                                        <span className="itemLabel">Review:</span>
                                        <span className="itemValue">{review.review}</span>
                                    </div>
                                </div>
                            ))}
                        </div>

                    </div>
                </div>
                {/** Botón para dejar una review (solo si el usuario está logueado) */}
                {islogged && <button className='reviewButton' onClick={handleReview}>Leave a Review</button>}
                {/** Modal para dejar una review */}
                {review && <div className={`modalOverlay ${review ? "active" : ""}`}>
                    <div className='reviewFormContainer'>
                        
                        {/** Componente para dejar una review */}
                        <ReviewWeb webId={web._id} reviewed={setReview}/>
                        <p className='closeButton' onClick={handleReview}>X</p>
                    </div>

                </div>}
            </div>
        );
    }

}