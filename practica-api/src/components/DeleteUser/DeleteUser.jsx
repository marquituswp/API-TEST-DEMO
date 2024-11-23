import { useState } from "react";
import Message from "../Login/Message";
export default function DeleteUser({ onClickDelete }) {
    const [data, setData] = useState("")

    const handleClick = (event) => {
        try {
            const token = localStorage.getItem('token')
            event.preventDefault()
            fetch(`http://localhost:3000/users/`, {
                method: "DELETE",
                headers: {
                    'Authorization': `Bearer ${token}`,
                    "Content-Type": "application/json",
                }
            })
                .then(response => response.json())
                .then(data => {
                    data.message ? onClickDelete("deleted") : null

                })
                .catch(() => {
                })
        } catch {
            setData("Invalid values")
        }
    }

    return (
        <>
            <h2>Remove Account</h2>
            <form onSubmit={handleClick} className="formContainer">
                <button onClick={handleClick}>Delete Account</button>
            </form>
            <Message loginMessage={data} />
        </>
    )
}