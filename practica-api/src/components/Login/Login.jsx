import { useState } from "react";
import Message from "./Message";
import "../../styles/FormAuth.css"
export default function Login({ setLoggedLogin,setNameLogin }) {
    const [data, setData] = useState("")
    const [body, setBody] = useState({
        email: "",
        password: "",
    })

    const handleChange = (event, field) => {
        const data = event.target.value

        setBody({
            ...body,
            [field]: data
        })
    }



    const handleClick = (event) => {
        try {
            event.preventDefault()
            fetch("http://localhost:3000/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(body)
            })
                .then(response => response.json())
                .then(data => {
                    if (data.token){
                        setLoggedLogin(true)
                        const token = data.token
                        localStorage.setItem('token', token)
                        setNameLogin(data.user.name)
                    }else{
                        body.password.length <=9 ? setData("Insert Password lenght greather than 8"): setData("Invalid Values")
                    }
                    
                })
                .catch(() => { setData("USER_DON'T_EXISTS") })
        } catch {
            setData("Internal Error")
        }


    }

    return (
        <>
            <h1>Login</h1>
            <form onSubmit={handleClick} className="formLogin">
                <div>
                    <input type="email" onChange={(event) => { handleChange(event, 'email') }} placeholder="Email" />
                </div>
                <div>
                    <input type="password" onChange={(event) => { handleChange(event, 'password') }} placeholder="Password" />
                </div>
                <button onClick={handleClick}>Submit</button>
            </form>
            <Message loginMessage={data} />
        </>
    )
}