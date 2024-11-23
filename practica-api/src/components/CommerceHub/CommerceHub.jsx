// Componente que se encarga de mostrar la interfaz de usuario de un comercio logueado.
import { useState } from "react"
import UsersInterested from "./UsersInterested"
import { jwtDecode } from "jwt-decode";
import CreateWeb from "./CreateWeb"
import DeleteWeb from "./DeleteWeb"
import UpdateWeb from "./UpdateWeb"
import UploadImageText from "./UploadImageText"
export default function CommerceHub({ loggedCommerce,tokenOfCommerce,homepage }) { //Recibe la función loggedCommerce, el token del comercio y la función homepage.
    const [clicked, setClicked] = useState(false) //Estado que controla si se ha pulsado un botón.
    const [buttonPressed, setButtonPressed] = useState("") //Estado que controla qué botón se ha pulsado.
    
    //Función que se encarga de cambiar el estado de clicked y buttonPressed.
    const handleButton = (value) => {
        setClicked(!clicked)
        setButtonPressed(value)
    }

    //Función que se encarga de cerrar la sesión del comercio.
    const handleClick = () => {
        homepage("logOutCommerce")
        loggedCommerce(false)
    }

    //Función que se encarga de cambiar el estado de clicked y buttonPressed.
    const handleShow=()=>{
        setButtonPressed("")
        setClicked(!clicked)
    }
    return (
        <>
            {<div className='logged'>
                {/* Si no se ha pulsado ningún botón, se muestra la interfaz de usuario del comercio. */}
                {!clicked && <div className='dashboardInfo'>
                    <h2>Hello Commerce {jwtDecode(tokenOfCommerce).cif}</h2>
                    <div className='buttonOptions'>
                        <button className='buttonOption' onClick={() => handleButton("createWeb")} >Create Web</button>
                        <button className='buttonOption' onClick={() => handleButton("deleteWeb")} >Delete Web</button>
                        <button className='buttonOption' onClick={() => handleButton("updateWeb")} >Update Web</button>
                        <button className='buttonOption' onClick={() => handleButton("usersIntersted")} >See Users Interested</button>
                        <button className='buttonOption' onClick={() => handleButton("upload")} >Upload Image or Texts</button>
                    </div>
                </div>}
                {/* Si se ha pulsado un botón, se muestra el componente correspondiente. */}
                {buttonPressed === "usersIntersted" && <UsersInterested token={tokenOfCommerce} handleBack={handleShow}/>}
                {buttonPressed === "createWeb" && <CreateWeb token={tokenOfCommerce} handleBack={handleShow}/>}
                {buttonPressed === "deleteWeb" && <DeleteWeb token={tokenOfCommerce} handleBack={handleShow}/>}
                {buttonPressed === "updateWeb" && <UpdateWeb token={tokenOfCommerce} handleBack={handleShow}/>}
                {buttonPressed === "upload" && <UploadImageText token={tokenOfCommerce} handleBack={handleShow}/>}
                {!buttonPressed && <button className='buttonOptionLogOut' onClick={handleClick}>Log Out</button>}
            </div>}
        </>
    )
}