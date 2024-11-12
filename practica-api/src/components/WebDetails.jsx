import { useState, useEffect } from 'react';

export default function WebDetails({ webSent, handleWebList }) {
    const [web, setWeb] = useState(null);
    useEffect(() => {
        setWeb(webSent);
    }, [webSent]);

    if (!web) {
        return <h2>Ninguna Web seleccionada</h2>;
    } else {
        return (
            <div>
                <h3>Cif: {web.cifCommerce}</h3>
                <p>City: {web.city}</p>
                <p>Activity: {web.activity}</p>
                <p>Title: {web.title}</p>
                <p>Summary: {web.summary}</p>
                <p>Texts: {web.texts}</p>
                <p>Images: {web.images}</p>
                <div>
                    <h4>Reviews:</h4>
                    {web.reviews.map((review, index) => (
                        <div key={index}>
                            <p>Scoring: {review.scoring}</p>
                            <p>Points: {review.points}</p>
                            <p>Review: {review.review}</p>
                        </div>
                    ))}
                </div>
                <button onClick={handleWebList}>Reset</button>
            </div>
        );
    }
}