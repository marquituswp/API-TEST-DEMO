import { useState, useEffect } from 'react';
import "../../styles/WebDetails.css"
import ReviewWeb from '../ReviewWeb/Review';
export default function WebDetails({ webSent, handleWebList, islogged, urlUsed}) {
    const [web, setWeb] = useState(null);
    const [reviewInfo,setReviewInfo] = useState(null)
    const [review, setReview] = useState(false)

    useEffect(() => {
        setWeb(webSent);
        setReviewInfo(webSent)
        fetch(urlUsed)
            .then(response => response.json())
            .then(data => setReviewInfo(data.find(listItem=>listItem._id === webSent._id)))
            .catch(error => {
                console.error("Error fetching data", error)
            })        
    }, [webSent,urlUsed,review]);

    const handleReview = () => {
        setReview(!review)
    }    

    const handlePoints = (points) => {
        const fullStars = Math.floor(points);  // Full stars based on integer part
        const hasHalfStar = points % 1 >= 0.25 && points % 1 < 0.75;  // Half star condition
        const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0); // Remaining empty stars
        
        // Create an array with star components
        return (
            <span className="starRating">
                {" ★".repeat(fullStars)}  {/* Full Stars */}
                {hasHalfStar ? "☆" : ""}  {/* Half Star if needed */}
                {" ☆".repeat(emptyStars)} {/* Empty Stars */}
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
                {islogged && <button className='reviewButton' onClick={handleReview}>Leave a Review</button>}
                {review && <div className={`modalOverlay ${review ? "active" : ""}`}>
                    <div className='reviewFormContainer'>
                        
                        <ReviewWeb webId={web._id} reviewed={setReview}/>
                        <p className='closeButton' onClick={handleReview}>X</p>
                    </div>

                </div>}
            </div>
        );
    }

}