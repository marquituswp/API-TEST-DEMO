// Componente que muestra la lista de webs y permite seleccionar una de ellas para ver sus detalles
import { useEffect, useState, useCallback } from "react";
import WebDetails from "./WebDetails";
import CityInput from "./CityInput";
import InterestInput from "./InterestInput";
import ButtonOrder from "./ButtonOrder";
export default function WebPages({ islogged }) { // islogged es un booleano que indica si el usuario está logueado
    const [webs, setWebs] = useState([]) // Estado para guardar la lista de webs
    const [webSelected, setWebSelected] = useState(null) // Estado para guardar la web seleccionada
    const [error, setError] = useState(false) // Estado para manejar errores
    const [order, setButtonOrder] = useState(false) // Estado para ordenar la lista de webs
    const [cityInput, setCityInput] = useState(""); // Estado para guardar la ciudad ingresada
    const [interestInput, setInterestInput] = useState(""); // Estado para guardar el interés ingresado

    // Función para obtener la URL de la API según los filtros y el orden seleccionados
    const getUrl = useCallback(() => {
        if (cityInput && interestInput) {
            return order
                ? `http://localhost:3000/users/web/${cityInput}/${interestInput}?order=true`
                : `http://localhost:3000/users/web/${cityInput}/${interestInput}`;
        } else if (cityInput) {
            return order
                ? `http://localhost:3000/users/web/${cityInput}?order=true`
                : `http://localhost:3000/users/web/${cityInput}`;
        } else if (interestInput) {
            return order
                ? `http://localhost:3000/users/web/{city}/${interestInput}?order=true`
                : `http://localhost:3000/users/web/{city}/${interestInput}`;
        }
        return order
            ? "http://localhost:3000/users/web/{city}/?order=true"
            : "http://localhost:3000/web/?order=false";
    }, [cityInput, interestInput, order]);

    // Función para obtener la lista de webs
    useEffect(() => {
        setError(false);
        const url = getUrl();
        fetch(url)
            .then(response => response.json())
            .then(data => setWebs(data))
            .catch(error => {
                console.error("Error fetching data", error);
                setError(true);
            });
    }, [getUrl]);

    let selectWeb = null

    // Muestra la lista de webs si no hay errores
    if (error) {
        selectWeb = <p style={{ textAlign: "center" }}>Error al cargar la lista de Webs</p>
    } else {
        selectWeb = webs.map((web, index) => (
            <div key={index} className="listItem">
                <button className="itemSelect" onClick={() => setWebSelected(web)}>
                    {web.city}
                </button>
                <p className="itemTitle" onClick={() => setWebSelected(web)}>Title: {web.title}</p>
                <p className="itemDescript" onClick={() => setWebSelected(web)}>Activity: {web.activity}</p>
            </div>
        ))
    }

    // Función para manejar el evento de volver a la lista de webs
    const handleWebList = () => {
        setWebSelected(null)
    }

    return (
        <div className="itemsList">
            <h3 className="listTitle">Web Pages</h3>
            {/** Sección de filtros */}
            {!webSelected && <div className="searchSection">
                <CityInput setCityInput={setCityInput} />
                <InterestInput setInterestInput={setInterestInput} />
                <ButtonOrder setButtonOrder={setButtonOrder} type={"puntuación"}/>
            </div>}

            <div className="listContainer">
                {!webSelected && selectWeb}
            </div>

            {/** Sección de detalles de la web */}
            {webSelected && <WebDetails webSent={webSelected} handleWebList={handleWebList} islogged={islogged} urlUsed={getUrl()} />}
        </div>
    )
}