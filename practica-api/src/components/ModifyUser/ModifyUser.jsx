import { useState } from "react";
import Message from "../Login/Message";
import '../../styles/FormModifyUser.css'
export default function ModifyUser({onClickModify}) {
    const [id,setId]=useState("")
    const [data, setData] = useState("")
    const [interests, setIterests] = useState([])
    const [inputInterest, setInputInterest] = useState("")
    const [body, setBody] = useState({
    })

    const handleInterestChange = (event) => {
        setInputInterest(event.target.value); // Actualiza el interés temporal
    }

    const addInterest = () => {
        setIterests([...interests, inputInterest.trim()])
        setBody({
            ...body,
            "interests": [...interests, inputInterest.trim()]
        })
        setInputInterest("")
    }


    const handleChange = (event, field) => {
        let data = event.target.value
        if (field === "scoring") {
            data = Number(data)
            setBody({
                ...body,
                [field]: data
            })
        }else if(field === "id"){
            setId(data)
        }else{
            setBody({
                ...body,
                [field]: data
            })
        }
        
    }

    const handleClick = (event)=>{
        try{
            const token = localStorage.getItem('token')
            event.preventDefault()
            fetch(`http://localhost:3000/users/${id}`, {
                method: "PUT",
                headers: {
                    'Authorization': `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(body)
            })
                .then(response => response.json())
                .then(data => {
                    id ? console.log(data): null
                    
                    data.message ? onClickModify(""): null
                    
                })
                .catch(() => {
                    id ? setData("CAN'T_UPDATE_OTHERS"): setData("ID is required")
                })
        }catch{
            setData("Invalid values")
        }
    }

    return(
        <>
            <h2>Modify a User</h2>
            <form onSubmit={handleClick} className="formModifyUser">
                <div>
                    <input type="text" onChange={(event) => { handleChange(event, 'id') }} placeholder="ID of the user" />
                </div>
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

                <div className="interestsModifyUser">
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