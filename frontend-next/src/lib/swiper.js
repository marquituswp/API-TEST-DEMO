"use client";
import React, { useState } from "react";

const Carousel = ({ images }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    // Manejo de la siguiente imagen
    const handleNext = () => {
        if (currentIndex === images.length - 1) {
            return setCurrentIndex(0);
        }
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    };

    // Manejo de la imagen anterior
    const handlePrev = () => {
        if (currentIndex === 0) {
            return setCurrentIndex(images.length - 1);
        }
        setCurrentIndex(
            (prevIndex) => (prevIndex - 1 + images.length) % images.length
        );
    };

    return (
        <div className="w-full overflow-hidden rounded-lg shadow-lg p-6">
            {/* Contenedor de la imagen con transición */}
            <div className="flex items-center justify-center">
                {images.length > 1 && <button
                    onClick={handlePrev}
                    className="btn transform text-white rounded-full p-3 z-10 shadow-lg"
                >
                    &lt;
                </button>}

                <div className="relative w-full flex items-center justify-center overflow-hidden " style={{ minHeight: "200px" }}>
                    {/* Contenedor para la imagen actual */}
                    <div className="h-64 w-64 overflow-hidden flex items-center justify-center">
                        <img
                            src={`http://localhost:3000${images[currentIndex]}`}
                            alt={`Image ${currentIndex + 1}`}
                            className="object-contain w-full h-full"
                            style={{ minHeight: "200px", maxHeight: "300px" }}
                        />
                    </div>

                    {/* Contenedor para la imagen siguiente (opcional) */}
                    {images.length > 1 && (
                        <div className="h-64 w-64 overflow-hidden flex items-center justify-center">
                            <img
                                src={`http://localhost:3000${images[(currentIndex + 1) % images.length]}`}
                                alt={`Image ${(currentIndex + 2) % images.length + 1}`}
                                className="object-contain w-full h-full"
                                style={{ minHeight: "200px", maxHeight: "300px" }}
                            />
                        </div>
                    )}
                </div>

                {images.length > 1 && <button
                    onClick={handleNext}
                    className="btn right-4 rounded-full p-3 z-10 shadow-lg"
                >
                    &gt;
                </button>}
            </div>

        </div>
    );
};

export default Carousel;
