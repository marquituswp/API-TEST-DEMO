import Login from './Login'
import SingUp from './SignUp'
import HomePage from './HomePage'
import { useState } from 'react'

function AppAuth() {
  const[link,setLink]=useState()
  const handleButton = (value)=>{
    if(value === "SignUp"){
      setLink(<SingUp/>)
    }else if (value === "Login"){
      setLink(<Login/>)
    }else{
      setLink(<p>Error</p>)
    }
  }

  const handleBack = ()=>{
    setLink()
  }

  return (
    <div className='App'>
      {!link && <h1>Access</h1>}
      {!link && <HomePage handleButton={handleButton}/>}
      {link}
      {link && <button onClick={handleBack}>Back</button>}
    </div>
  )
}

export default AppAuth