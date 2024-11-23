// Componente que muestra los detalles de un comercio seleccionado
import { useState, useEffect } from 'react';
export default function CommerceDetails({ commerceSent, handlecommerceList}) {
    const [commerce, setCommerce] = useState(null);

    // Actualiza el estado del comercio seleccionado cuando se recibe un nuevo comercio
    useEffect(() => {
        setCommerce(commerceSent);     
    }, [commerceSent]);

    // Si no hay comercio seleccionado, se muestra un mensaje
    if (!commerce) {
        return <h2 className="noItemSelected">Ninguna Commerce seleccionada</h2>;
    } else {
        // Si hay comercio seleccionado, se muestran sus detalles
        return (
            <div className="detailContainer">
                <div>
                    <p className="resetButton" onClick={handlecommerceList}>{"<- Commerces"}</p>
                    <div className="commerceInfo">
                        <div className="detailItem">
                            <span className="itemLabel">Name:</span>
                            <span className="itemValue">{commerce.name}</span>
                        </div>
                        <div className="detailItem">
                            <span className="itemLabel">CIF:</span>
                            <span className="itemValue">{commerce.cif}</span>
                        </div>
                        <div className="detailItem">
                            <span className="itemLabel">Email:</span>
                            <span className="itemValue">{commerce.email}</span>
                        </div>
                        <div className="detailItem">
                            <span className="itemLabel">Phone:</span>
                            <span className="itemValue">{commerce.phone}</span>
                        </div>
                        <div className="detailItem">
                            <span className="itemLabel">Page_id:</span>
                            <span className="itemValue">{commerce.page_id}</span>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

}