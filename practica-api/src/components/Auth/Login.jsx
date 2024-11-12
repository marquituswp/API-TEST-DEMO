import { useState } from "react";
import Message from "./Message";

export default function Login(){
    const [body,setBody]=useState({
        email: "",
        password: "",
      })
    const [data,setData] = useState("")
    const [condition,setCondition] = useState(false)

    const handleChange=(event,field)=>{
        const data = event.target.value
       
        setBody({
            ...body,
            [field]:data
        })
    }
    


    const handleClick=(event)=>{
        try{
            event.preventDefault()
            fetch("http://localhost:3000/auth/login",{
                method: "POST",
                headers:{
                    "Content-Type" : "application/json",
                },
                body:JSON.stringify(body)})
                .then(response => response.json())
                .then(data => {
                    setData(`Welcome ${data.user.email}`)
                    const token = data.token
                    setCondition(true)
                    localStorage.setItem('token',token)
                })
                .catch(()=> {setData("Invalid User or Password")
                            setCondition(false)})
        }catch{
            setData("Internal Error")
        }
        
        
    }

    const handleToken= ()=>{
        console.log(localStorage.getItem("token"))
    }

    return(
        <>
            <h1>Login</h1>
            <form onSubmit={handleClick}>
                <div>
                    <input type="email" onChange={(event)=>{handleChange(event,'email')}} placeholder="Email"/>
                </div>
                <div>
                    <input type="password" onChange={(event)=>{handleChange(event,'password')}} placeholder="Password" />
                </div>
                <button onClick={handleClick}>Submit</button>
            </form>
            <Message loginMessage={data}/>
            {condition && <button onClick={handleToken}>GetToken</button>}
        </>
    )
}