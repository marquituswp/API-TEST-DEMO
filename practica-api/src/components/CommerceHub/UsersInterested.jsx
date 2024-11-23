// Componente que muestra los usuarios interesados en la web
import { useEffect, useState } from "react";
import Message from "../Login/Message";
export default function UsersInterested({token, handleBack}) {
    const [data, setData] = useState("") // Mensaje de error 
    const [users, setUsers] = useState(null) // Usuarios interesados en la web

    // Petición GET a la API para obtener los usuarios interesados en la web
    useEffect(() => {
        try {
            fetch(`http://localhost:3000/web/users`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                }
            })
                .then(response => response.json())
                .then(data => {
                    if(data.message==="USERS_INTERESTED:"){
                        setUsers(data.emails)
                    }else{
                        setData("NO_USERS")
                    }
                })
                .catch(()=> setData("NO_USERS"))
        } catch {
            setUsers(null)
        }
    }, [token])

    return (
        <>
            <div className="searchSection">
            <p className="resetButton" onClick={handleBack}>{"<- HandleCommerce"}</p>
                <h2>Emails:</h2>
                <ul>
                    {/* Muestra los usuarios interesados en la web */}
                    {users ?

                        users.map((user, index) => {
                            return (
                                <li key={index}>
                                    {user}
                                </li>
                            )
                        })

                        :
                        <Message loginMessage={data}/>
                    }

                </ul>
            </div>

        </>
    )
}