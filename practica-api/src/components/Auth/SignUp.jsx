import { useState } from "react";
import Message from "./Message";

export default function SingUp(){
    const [data,setData] = useState("")
    const [condition,setCondition] = useState(false)
    const[interests,setIterests]=useState([])
    const [inputInterest, setInputInterest] = useState("")
    const [body,setBody]=useState({
        name: "",
        age: 0,
        email: "",
        password: "",
        city: "",
        interests: [],
        allowOffers: false
      })

    const handleInterestChange = (event) => {
        setInputInterest(event.target.value); // Actualiza el interés temporal
    }

    const handleChange=(event,field)=>{
        const data = field === "allowOffers" ? event.target.checked : event.target.value;
        setBody({
            ...body,
            [field]:data
        })
    }

    const addInterest= ()=>{
        console.log(inputInterest.trim())
        setIterests([...interests,inputInterest.trim()])
        setBody({
            ...body,
            "interests":[...interests,inputInterest.trim()]
        })
        setInputInterest("")
    }

    const handleClick=(event)=>{
        event.preventDefault()
        console.log(body)
        try{
            fetch("http://localhost:3000/auth/register",{
                method: "POST",
                headers:{
                    "Content-Type" : "application/json",
                },
                body:JSON.stringify(body)})
                .then(response => response.json())
                .then(data => {
                    console.log(data)
                    setData(`Welcome ${data.user.email}`)
                    const token = data.token
                    setCondition(true)
                    localStorage.setItem('token',token)
                })
                .catch(()=> {setData("Invalid Values") 
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
            <h1>SignUp</h1>
            <form onSubmit={handleClick}>
                <div>
                    <input type="text" onChange={(event)=>{handleChange(event,'name')}} placeholder="Name"/>
                </div>
                <div>
                    <input type="number" onChange={(event)=>{handleChange(event,'age')}} placeholder="Age"/>
                </div>
                <div>
                    <input type="email" onChange={(event)=>{handleChange(event,'email')}} placeholder="Email"/>
                </div>
                <div>
                    <input type="password" onChange={(event)=>{handleChange(event,'password')}} placeholder="Password"/>
                </div>
                <div>
                    <input type="text" onChange={(event)=>{handleChange(event,'city')}} placeholder="City"/>
                </div>
                
                <div>
                    <div>
                        <input
                            type="text"
                            value={inputInterest}
                            onChange={handleInterestChange}
                            placeholder="Interests"
                        />
                        <button type="button" onClick={addInterest}>Add Interest</button>
                    </div>
                </div>
                <div>
                    <label>AllowOffers </label>
                    <input 
                        type="checkbox" 
                        checked={body.allowOffers}
                        onChange={(event) => handleChange(event, 'allowOffers')}
                    />
                </div>
                <button onClick={handleClick}>Submit</button>
            </form>
            <Message loginMessage={data}/>
            {condition && <button onClick={handleToken}>GetToken</button>}
        </>
    )
}