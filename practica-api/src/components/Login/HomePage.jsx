export default function HomePage({handleButton}){
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