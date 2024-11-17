import './App.css'
import { jwtDecode } from "jwt-decode";
import WebPages from './components/WebList/Web'
import ModifyUser from './components/ModifyUser/ModifyUser'
import AppAuth from './components/Login/AppAuth'
import DeleteUser from './components/DeleteUser/DeleteUser'
import { useState,useEffect } from 'react'
function App() {
  const [logged, setLogged] = useState(false)
  const [name, setName] = useState("")
  const [token,setToken]=useState(null)
  const [clicked, setClicked] = useState(false)
  const [buttonPressed, setButtonPressed] = useState("")

  const handleClick = () => {
    setLogged(false)
  }

  useEffect(()=>{
    logged? setToken(jwtDecode(localStorage.getItem('token'))): null
  },[logged])


  const handleButton = (value) => {
    value==="deleted" ? setLogged(false): null
    setClicked(!clicked)
    setButtonPressed(value)
  }
  return (
    <>
      {!logged && <AppAuth setLoggedAuth={setLogged} setNameAuth={setName} />}
      {!logged && <div className='noLogged'>
        <WebPages />
      </div>}
      {logged && <div className='logged'>
        {!clicked && <div className='welcomeInfo'>
          <h2>Hello {token && token.role[0]} {name}</h2>
          <div className='buttonOptionsLogged'>
            {<button className='buttonOptionLogged' onClick={() => handleButton("modify")} >Modify Users Data</button>}
            <button className='buttonOptionLogged' onClick={() => handleButton("delete")} >Remove Account</button>
            <button className='buttonOptionLogged' onClick={() => handleButton("webs")} >See Webs</button>
          </div>
        </div>}
        {buttonPressed === "webs" && <WebPages islogged={logged}/>}
        {buttonPressed === "modify" &&  <ModifyUser onClickModify={handleButton}/>}
        {buttonPressed === "delete" &&  <DeleteUser onClickDelete={handleButton}/>}
        {buttonPressed && <button className='buttonPressedBack' onClick={() => handleButton("")}>HomePage</button>}
        {!buttonPressed && <button className='buttonOptionLogOut' onClick={handleClick}>Log Out</button>}
      </div>}



    </>
  )
}

export default App
