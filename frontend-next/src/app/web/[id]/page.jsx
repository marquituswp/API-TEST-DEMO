import React from 'react';
import Carousel from '@/lib/swiper';
import HandlePoints from '@/components/webs/Rating';
const getWeb = async (id) => {
  const response = await fetch(`http://localhost:3000/web/${id}`);
  const web = await response.json();
  return web;
};

export default async function WebPages({ params }) {
  const { id } = await params;
  const web = await getWeb(id);
  return (
    <div className="bg-gray-100 min-h-screen py-8 px-4">
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-lg p-6">
        
        {/* Carrusel */}
        <div className=" mb-6">
          <Carousel images={web.images} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Información de la ciudad y actividad */}
          <div className="">
            <h1 className="text-3xl font-bold text-gray-800 mb-8">{web.city}</h1>
            <p className="text-lg text-gray-600 mb-12">Activity: {web.activity}</p>
            <div className="text-lg text-gray-500 flex items-center mt-12">
              <HandlePoints points={web.points} />
            </div>
          </div>

          {/* Reseñas */}
          <div className="space-y-4 h-96 overflow-y-auto">
            <h2 className="text-2xl font-semibold text-gray-800">Reviews</h2>
            <ul className="space-y-4">
              {web.reviews.map((review, index) => (
                <li key={index} className="bg-gray-50 p-4 rounded-lg shadow-sm">
                  <h3 className="text-lg font-bold text-gray-800">{review.review}</h3>
                  <p className="text-gray-600 mt-2">{review.scoring}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
