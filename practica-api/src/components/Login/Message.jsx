import "../../styles/FormAuth.css"
export default function Message ({loginMessage}){
    
    return(
        <>
            <div className="messageAuth">
                {loginMessage}
            </div>
        </>
    )
}