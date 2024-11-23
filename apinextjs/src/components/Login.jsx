"user client"
import Link from "next/link"
import { useState } from "react"
import { useRouter } from "next/navigation"
export default function Login(){
    const router = useRouter()
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
            fetch("http://localhost:3001/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(body)
            })
                .then(response => response.json())
                .then(data => {
                    if (data.token){
                        console.log(data)
                        const token = data.token
                        localStorage.setItem('token', token)
                        if(data.user.role[0] === "admin"){
                            // router.push("/dashboard/admin")
                            router.push(`/dashboard/${data.user.name}`)
                        }else{
                            router.push("/dashboard")
                        }
                        
                    }else{
                        body.password.length <=9 ? setData("Insert Password lenght greather than 8"): setData("Invalid Values")
                    }
                    
                })
                .catch(() => { setData("USER_DON'T_EXISTS") })
        } catch {
            setData("Internal Error")
        }


    }

    return(
        <>
            <h1>Login</h1>
            <form onSubmit={handleClick} className="formContainer">
                <div>
                    <input type="email" onChange={(event) => { handleChange(event, 'email') }} placeholder="Email" />
                </div>
                <div>
                    <input type="password" onChange={(event) => { handleChange(event, 'password') }} placeholder="Password" />
                </div>
                <button onClick={handleClick}>Submit</button>
            </form>
            
        </>
    )
}