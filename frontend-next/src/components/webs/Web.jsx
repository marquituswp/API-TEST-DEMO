"use client"
// Componente que muestra la lista de webs y permite seleccionar una de ellas para ver sus detalles
import { useEffect, useState, useCallback } from "react";
import { useFilters } from "@/hook/useFilters";
import HandlePoints from "./Rating";
import Link from "next/link";
export default function WebPages() {
    const [webs, setWebs] = useState([]) // Estado para guardar la lista de webs
    const [city, setCity] = useState("") // Estado para guardar la ciudad seleccionada
    const [activity, setActivity] = useState("") // Estado para guardar la actividad seleccionada
    const [order, setOrder] = useState(false) // Estado para guardar el orden seleccionado
    const [error, setError] = useState(false) // Estado para guardar si hubo un error al obtener los datos
    const { filterByCity, filterByActivity } = useFilters({ webs }) // Filtros para la búsqueda
    // Función para obtener la URL de la API según los filtros y el orden seleccionados
    const getUrl = useCallback(() => {
        if (city && activity) {
            return order
                ? `http://localhost:3000/users/web/${city}/${activity}?order=true`
                : `http://localhost:3000/users/web/${city}/${activity}`;
        } else if (city) {
            return order
                ? `http://localhost:3000/users/web/${city}?order=true`
                : `http://localhost:3000/users/web/${city}`;
        } else if (activity) {
            return order
                ? `http://localhost:3000/users/web/{city}/${activity}?order=true`
                : `http://localhost:3000/users/web/{city}/${activity}`;
        }
        return order
            ? `http://localhost:3000/web/?order=true`
            : "http://localhost:3000/web";
    }, [city, activity, order]);

    // Función para obtener la lista de webs
    useEffect(() => {
        try{
            const url = getUrl();
            fetch(url)
                .then(response => response.json())
                .then((data) =>{
                    setWebs(data);
                    setError(false);
                })
                .catch(error => {
                    console.error("Error fetching data", error);
                    setError(true);
                });
        }catch{
            setError(true);
        }
        
    }, [getUrl]);


    // Si hay un error al obtener los datos, se muestra un mensaje de error
    if (error) {
        return <div className="text-center">Error fetching data</div>
    }

    // Si no hay webs, se muestra un mensaje de que no hay webs
    if (webs.length === 0) {
        return <div className="text-center">No webs available</div>
    }

    // Si hay webs, se muestra la lista de webs
    return (
        <>
            <div className="w-full h-screen">
                <div>
                    <h3 className="text-3xl font-bold mb-8">Filter by City</h3>
                    <div className="flex flex-wrap gap-5 mb-8">
                        <button onClick={() => setCity("")} className="btn">All Cities</button>
                        {filterByCity.map((city, index) => (
                            <button key={index} onClick={() => setCity(city)} className="btn">
                                {city}
                            </button>
                        ))}
                    </div>

                </div>
                <div>
                    <h3 className="text-3xl font-bold mb-8">Filter by Activity</h3>
                    <div className="flex flex-wrap gap-5 mb-8">
                        <button onClick={() => setActivity("")} className="btn">All Activities</button>
                        {filterByActivity.map((activity, index) => (
                            <button key={index} onClick={() => setActivity(activity)} className="btn">
                                {activity}
                            </button>
                        ))}
                    </div>
                </div>
                <div>
                    <h3 className="text-3xl font-bold mb-8">Order by</h3>
                    <div className="flex flex-wrap gap-5 mb-8">
                        <button onClick={() => setOrder(false)} className="btn">Most Recent</button>
                        <button onClick={() => setOrder(true)} className="btn">Most Popular</button>
                    </div>
                </div>
            </div>

            <div className="col-span-2">
                <h2 className="text-3xl font-bold">Web pages</h2>
                <ul className="mt-5">

                    {/* Mapeo de la lista de webs */}
                    {webs.map((web, index) => (

                        // Enlace a la página de detalles de la web
                        <Link key={index} href={`/web/${web._id}`}>
                            <li className="cursor-pointer flex items-center px-4 py-8 border-b border-gray-200 hover:bg-gray-200 transition duration-300 fade-in hover:shadow-inner rounded-lg">
                                <div className="flex items-center justify-center w-32 h-20 overflow-hidden">
                                    <img
                                        src={`http://localhost:3000${web.images[0]}`}
                                        alt={web.title}
                                        className="w-full h-full object-contain"
                                    />
                                </div>
                                <div className="flex flex-col flex-grow ml-4">

                                    <h2 className="text-lg font-bold">{web.title}</h2>

                                    <p className="text-sm text-gray-500">{web.activity}</p>
                                </div>
                                <div className="flex ml-4">
                                    <HandlePoints points={web.points} />
                                </div>
                            </li>
                        </Link>
                    ))}

                </ul>

            </div>

        </>
    )
}