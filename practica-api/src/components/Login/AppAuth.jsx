import Login from './Login'
import SingUp from './SignUp'
import HomePage from './HomePage'
import { useState } from 'react'
import "../../styles/AppAuth.css"
function AppAuth({ setLoggedAuth,setNameAuth }) {
  const [link, setLink] = useState()
  const handleButton = (value) => {
    if (value === "SignUp") {
      setLink(<SingUp setLoggedSignUp={setLoggedAuth} setNameSignUp={setNameAuth} />)
    } else if (value === "Login") {
      setLink(<Login setLoggedLogin={setLoggedAuth} setNameLogin={setNameAuth} />)
    } else {
      setLink(<p>Error</p>)
    }
  }

  const handleBack = () => {
    setLink()
  }

  return (
    <>
      <header className={`headerAuth ${link ? "shadow" : ""}`}>
        <h1 className='Logo'>API-IMMUNE</h1>
        <div className='navAuth'>
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