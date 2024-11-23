// Componente que muestra las opciones para manejar los comercios
import { useState } from "react"
import Commerces from './SeeCommerce'
import DeleteCommerce from "./DeleteCommerce"
import ModifyCommerce from "./ModifyCommerce"
import CreateCommerce from "./CreateCommerce"
export default function HandleCommerces() {
    const [type, setType] = useState(null) // Variable para controlar el tipo de acción a realizar
    const [show, setShow] = useState(true) // Variable para controlar si se muestra el menú de opciones

    // Función que muestra el menú de opciones
    const handleShow = () => {
        setShow(true)
        setType(null)
    }

    // Función que controla el tipo de acción a realizar
    const handleClick = (value) => {
        setShow(false)
        setType(value)
    }

    return (
        <div>

            {show && <div className="dashboardInfo">
                <h2>HANDLE COMMERCE</h2>
                <div className="buttonOptions">
                    <button onClick={() => handleClick("see")} className="buttonOption">See Commerces</button>
                    <button onClick={() => handleClick("delete")} className="buttonOption">Delete Commerce</button>
                    <button onClick={() => handleClick("create")} className="buttonOption">Create Commerce</button>
                    <button onClick={() => handleClick("modify")} className="buttonOption">Modify Commerce</button>
                </div>
            </div>}
            {type === "see" && <Commerces handleBack={handleShow} />}
            {type === "delete" && <DeleteCommerce handleBack={handleShow} />}
            {type === "modify" && <ModifyCommerce handleBack={handleShow} />}
            {type === "create" && <CreateCommerce handleBack={handleShow} />}
        </div>
    )
}