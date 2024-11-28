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
                <button
                    onClick={handlePrev}
                    className="btn transform text-white rounded-full p-3 z-10 shadow-lg"
                >
                    &lt;
                </button>

                <div className=" relative w-full flex items-center justify-center overflow-hidden " style={{minHeight:"200px"}}>
                    {/* Contenedor para la imagen actual */}
                    <div className="w-[300px] h-[400px] overflow-hidden">
                        <img
                            src={`http://localhost:3000${images[currentIndex]}`}
                            alt={`Image ${currentIndex + 1}`}
                            className="w-full h-full object-cover transition-all duration-500 ease-in-out"
                        />
                    </div>

                    {/* Contenedor para la imagen siguiente (opcional) */}
                    <div className=" w-[300px] h-[400px] overflow-hidden">
                        <img
                            src={`http://localhost:3000${images[(currentIndex + 1) % images.length]}`}
                            alt={`Image ${(currentIndex + 2) % images.length + 1}`}
                            className="w-full h-full object-cover transition-all duration-500 ease-in-out"
                        />
                    </div>
                </div>

                <button
                    onClick={handleNext}
                    className="btn right-4 rounded-full p-3 z-10 shadow-lg"
                >
                    &gt;
                </button>
            </div>

        </div>
    );
};

export default Carousel;
