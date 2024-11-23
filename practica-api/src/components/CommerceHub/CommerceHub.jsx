import { useState } from "react"
import UsersInterested from "./UsersInterested"
import { jwtDecode } from "jwt-decode";
import CreateWeb from "./CreateWeb"
import DeleteWeb from "./DeleteWeb"
import UpdateWeb from "./UpdateWeb"
import UploadImageText from "./UploadImageText"
export default function CommerceHub({ loggedCommerce,tokenOfCommerce,homepage }) {
    const [clicked, setClicked] = useState(false)
    const [buttonPressed, setButtonPressed] = useState("")
    const handleButton = (value) => {
        // value==="deleted" ? setLogged(false): null
        setClicked(!clicked)
        setButtonPressed(value)
    }
    const handleClick = () => {
        homepage("logOutCommerce")
        loggedCommerce(false)
    }

    const handleShow=()=>{
        setButtonPressed("")
        setClicked(!clicked)
    }
    return (
        <>
            {<div className='logged'>
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