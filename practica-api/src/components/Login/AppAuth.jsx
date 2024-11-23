// Componente que contiene la estructura de la pagina de autenticacion
import Login from './Login'
import SingUp from './SignUp'
import HomePage from './HomePage'
import { useState } from 'react'
import "../../styles/AppAuth.css"
function AppAuth({ setLoggedAuth,setNameAuth }) { // setLoggedAuth es una función que se ejecuta cuando se inicia sesión
  const [link, setLink] = useState() // Link a la pagina de registro o login

  // Función que muestra la pagina de registro o login en función del botón pulsado
  const handleButton = (value) => {
    if (value === "SignUp") {
      setLink(<SingUp setLoggedSignUp={setLoggedAuth} setNameSignUp={setNameAuth} />)
    } else if (value === "Login") {
      setLink(<Login setLoggedLogin={setLoggedAuth} setNameLogin={setNameAuth} />)
    } else {
      setLink(<p>Error</p>)
    }
  }

  // Función que cierra la pagina de registro o login
  const handleBack = () => {
    setLink()
  }

  return (
    <>
      <header className={`headerAuth ${link ? "shadow" : ""}`}>
        <h1 className='Logo'>API-IMMUNE</h1>
        <div className='navAuth'>
          {/* Muestra los botones de registro o login (añade el link a la pagina de registro o login) */}
          <HomePage handleButton={handleButton} />

        </div>
      </header>

      <div className={`modalOverlay ${link ? "active" : ""}`}>
        <div className='form'>
          {link}
          {link && <p onClick={handleBack} className='buttonBack'>X</p>}
          
        </div>
      </div>
    </>

  )
}

export default AppAuth