// Componente que muestra los botones de Login y SignUp
export default function HomePage({handleButton}){

    // Función que ejecuta la función handleButton en función del botón pulsado
    const handleClick=(event)=>{
        handleButton(event.target.textContent)

    }

    return(
        <>
            <button onClick={(event)=>handleClick(event)}>Login</button>
            <button onClick={(event)=>handleClick(event)}>SignUp</button>
        </>
    )
}