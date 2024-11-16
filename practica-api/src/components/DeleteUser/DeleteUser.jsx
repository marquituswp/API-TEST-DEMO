import { useState } from "react";
import Message from "../Login/Message";
import '../../styles/FormDeleteUser.css'
export default function DeleteUser({ onClickDelete }) {
    const [id, setId] = useState("")
    const [data, setData] = useState("")


    const handleChange = (event) => {
        setId(event.target.value)
    }

    const handleClick = (event) => {
        try {
            const token = localStorage.getItem('token')
            event.preventDefault()
            fetch(`http://localhost:3000/users/${id}`, {
                method: "DELETE",
                headers: {
                    'Authorization': `Bearer ${token}`,
                    "Content-Type": "application/json",
                }
            })
                .then(response => response.json())
                .then(data => {
                    console.log(data)
                    // id ? console.log(data) : setData("ID is required")

                    data.message ? onClickDelete("deleted") : null

                })
                .catch(() => {
                   id ? setData("CAN'T DELETE OTHERS"): setData("ID is required")
                })
        } catch {
            setData("Invalid values")
        }
    }

    return (
        <>
            <h2>Remove Account</h2>
            <form onSubmit={handleClick} className="formDeleteUser">
                <div>
                    <input type="text" onChange={(event) => { handleChange(event, 'id') }} placeholder="ID of your user" />
                </div>
                <button onClick={handleClick}>Submit</button>
            </form>
            <Message loginMessage={data} />
        </>
    )
}