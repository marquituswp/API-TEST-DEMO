// Componente para ver los comercios
import { useEffect, useState, useCallback } from "react";
import ButtonOrder from "../WebList/ButtonOrder";
import CommerceDetails from "./CommerceDetails";
export default function Commerces({handleBack}) { // Se recibe la función handleBack para volver a la página anterior
    const [commerces, setCommerces] = useState([]) // Lista de comercios
    const [commerceSelected, setCommerceSelected] = useState(null) // Comercio seleccionado
    const [error, setError] = useState(false) // Variable para controlar errores
    const [order, setButtonOrder] = useState(false)

    // Función para obtener la URL de la API
    const getUrl = useCallback(() => {
        
        return order
            ? `http://localhost:3000/comercio/?order=true`
            : "http://localhost:3000/comercio";
    }, [order]);

    // Se obtienen los comercios
    useEffect(() => {
        try{
            const token = localStorage.getItem("token")
            const url = getUrl();
            fetch(url,{
                headers: {
                    'Authorization': `Bearer ${token}`,
                    "Content-Type": "application/json",
                }
            })
                .then(response => response.json())
                .then(data => setCommerces(data))
                .catch(error => {
                    console.error("Error fetching data", error);
                    setError(true);
                });
        }catch{
            setError("ERROR_FETCHING_DATA")
        }
        
    }, [getUrl]);

    let selectcommerce = null

    // Se muestra un mensaje de error si no se pueden cargar los comercios
    if (error) {
        selectcommerce = <p style={{ textAlign: "center" }}>Error al cargar la lista de Comercios</p>
    } else {
        // Se muestra la lista de comercios
        selectcommerce = commerces.map((commerce, index) => (
            <div key={index} className="listItem">
                <button className="itemSelect" onClick={() => setCommerceSelected(commerce)}>
                    {commerce.city}
                </button>
                <p className="itemTitle" onClick={() => setCommerceSelected(commerce)}>Name: {commerce.name}</p>
                <p className="itemDescript" onClick={() => setCommerceSelected(commerce)}>CIF: {commerce.cif}</p>
            </div>
        ))
    }

    const handlecommerceList = () => {
        setCommerceSelected(null)
    }

    return (
        <div className="itemsList">
            
            <h3 className="listTitle">Commerces</h3>
            {/* Mostramos los comercios disponibles si no ha seleccionado uno */}
            {!commerceSelected && <div className="searchSection">
                <p className="resetButton" onClick={handleBack}>{"<- HandleCommerce"}</p>
                <ButtonOrder setButtonOrder={setButtonOrder} type={"CIF"} />
                
            </div>}
            
            <div className="listContainer">
                {!commerceSelected && selectcommerce}
            </div>

            {/* Mostramos los detalles del comercio seleccionado */}
            {commerceSelected && <CommerceDetails commerceSent={commerceSelected} handlecommerceList={handlecommerceList} />}
        </div>
    )
}