// Componente que muestra el mensaje de error o éxito 
export default function Message ({message}){
    
    return(
        <>
            <div className="text-red-700 text-xl mt-2">
                {message}
            </div>
        </>
    )
}