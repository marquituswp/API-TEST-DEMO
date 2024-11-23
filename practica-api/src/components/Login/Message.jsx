// Componente que muestra el mensaje de error o éxito 
export default function Message ({loginMessage}){
    
    return(
        <>
            <div className="messageResponse">
                {loginMessage}
            </div>
        </>
    )
}