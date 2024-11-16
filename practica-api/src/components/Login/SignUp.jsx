import { useState } from "react";
import Message from "./Message";
import "../../styles/FormAuth.css"
export default function SingUp({ setLoggedSignUp,setNameSignUp }) {
    const [data, setData] = useState("")
    const [interests, setIterests] = useState([])
    const [inputInterest, setInputInterest] = useState("")
    const [body, setBody] = useState({
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

    const handleChange = (event, field) => {
        const data = field === "allowOffers" ? event.target.checked : event.target.value;
        setBody({
            ...body,
            [field]: data
        })
    }

    const addInterest = () => {
        setIterests([...interests, inputInterest.trim()])
        setBody({
            ...body,
            "interests": [...interests, inputInterest.trim()]
        })
        setInputInterest("")
    }

    const handleClick = (event) => {
        event.preventDefault()
        try {
            fetch("http://localhost:3000/auth/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(body)
            })
                .then(response => response.json())
                .then(data => {
                    if (data.token){
                        setLoggedSignUp(true)
                        const token = data.token
                        localStorage.setItem('token', token)
                        setNameSignUp(data.user.name)
                    }else{
                        body.password.length <=9 ? setData("Insert Password lenght greather than 8"): setData("Invalid Values")
                    }
                })
                .catch(() => {
                    setData("Invalid Values")
                })
        } catch {
            setData("Internal Error")
        }
    }

    return (
        <>
            <h1>SignUp</h1>
            <form onSubmit={handleClick} className="formSignUp">
                <div>
                    <input type="text" onChange={(event) => { handleChange(event, 'name') }} placeholder="Name" />
                </div>
                <div>
                    <input type="number" onChange={(event) => { handleChange(event, 'age') }} placeholder="Age" />
                </div>
                <div>
                    <input type="email" onChange={(event) => { handleChange(event, 'email') }} placeholder="Email" />
                </div>
                <div>
                    <input type="password" onChange={(event) => { handleChange(event, 'password') }} placeholder="Password" />
                </div>
                <div>
                    <input type="text" onChange={(event) => { handleChange(event, 'city') }} placeholder="City" />
                </div>

                <div className="interestsSignUp">
                    <input
                        type="text"
                        value={inputInterest}
                        onChange={handleInterestChange}
                        placeholder="Interests"
                    />
                    <button type="button" onClick={addInterest}>Add Interest</button>
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
            <Message loginMessage={data} />
        </>
    )
}