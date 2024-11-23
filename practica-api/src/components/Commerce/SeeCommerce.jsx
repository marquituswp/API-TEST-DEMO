import { useEffect, useState, useCallback } from "react";
import ButtonOrder from "../WebList/ButtonOrder";
import CommerceDetails from "./CommerceDetails";
export default function Commerces({handleBack}) {
    const [commerces, setCommerces] = useState([])
    const [commerceSelected, setCommerceSelected] = useState(null)
    const [error, setError] = useState(false)
    const [order, setButtonOrder] = useState(false)

    const getUrl = useCallback(() => {
        
        return order
            ? `http://localhost:3000/comercio/?order=true`
            : "http://localhost:3000/comercio";
    }, [order]);

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

    if (error) {
        selectcommerce = <p style={{ textAlign: "center" }}>Error al cargar la lista de Comercios</p>
    } else {
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
            
            {!commerceSelected && <div className="searchSection">
                <p className="resetButton" onClick={handleBack}>{"<- HandleCommerce"}</p>
                <ButtonOrder setButtonOrder={setButtonOrder} type={"CIF"} />
                
            </div>}
            
            <div className="listContainer">
                {!commerceSelected && selectcommerce}
            </div>

            {commerceSelected && <CommerceDetails commerceSent={commerceSelected} handlecommerceList={handlecommerceList} />}
        </div>
    )
}