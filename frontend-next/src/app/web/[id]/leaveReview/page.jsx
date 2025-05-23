import React from 'react';
import ReviewForm from '@/components/webs/ReviewForm';

// Pagina para dejar una review
export default async function LeaveReviewPage({params}) {
    const { id } = await params; // Obtenemos el id de los parametros
    return (
        <div>
            <ReviewForm webId={id}/> {/* Pasamos el id de la web como prop */}
        </div>
    );
}