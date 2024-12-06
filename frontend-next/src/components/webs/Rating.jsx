// Componente para manejar los puntos de una valoración
export default function HandlePoints({points}) {
    const fullStars = Math.floor(points);
    const hasHalfStar = points % 1 >= 0.25 && points % 1 < 0.75;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

    // Devuelve un array con los iconos de las estrellas
    return (
        <>
            {[...Array(fullStars)].map((_, index) => (
                <svg key={index} className="w-5 h-5 fill-current text-yellow-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path d="M12 2l2.121 6.485h6.879l-5.598 4.112 2.121 6.485-5.522-4.009-5.522 4.009 2.121-6.485-5.598-4.112h6.879z" />
                </svg>
            ))}
            {hasHalfStar && (
                <svg className="w-5 h-5 fill-current text-yellow-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path d="M12 2l2.121 6.485h6.879l-5.598 4.112 2.121 6.485-5.522-4.009-5.522 4.009 2.121-6.485-5.598-4.112h6.879z" />
                </svg>
            )}
            {[...Array(emptyStars)].map((_, index) => (
                <svg key={index} className="w-5 h-5 fill-current text-gray-300" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path d="M12 2l2.121 6.485h6.879l-5.598 4.112 2.121 6.485-5.522-4.009-5.522 4.009 2.121-6.485-5.598-4.112h6.879z" />
                </svg>
            ))}
        </>
    );
};