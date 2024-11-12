import { useEffect, useState } from "react";
import WebDetails from "./WebDetails";
import CityInput from "./CityInput";
import InterestInput from "./InterestInput";
import ButtonOrder from "./ButtonOrder";

export default function WebPages (){
    const [webs,setWebs] = useState([])
    const [webSelected, setWebSelected] = useState(null)
    const [error,setError] = useState(false)
    const [order,setButtonOrder] = useState(false)
    const [cityInput, setCityInput] = useState("");
    const [interestInput, setInterestInput] = useState("");

    useEffect(()=>{
        let url =  "http://localhost:3000/web"
        
        if (cityInput && interestInput){
            url = order ? `http://localhost:3000/users/web/${cityInput}/${interestInput}?order=true`:`http://localhost:3000/users/web/${cityInput}/${interestInput}`
        }else if(cityInput){
            url = order ? `http://localhost:3000/users/web/${cityInput}?order=true`:`http://localhost:3000/users/web/${cityInput}/${interestInput}`
        }else{
            url = order ? `http://localhost:3000/web/?order=true`:"http://localhost:3000/web"
        }
        
        
        fetch(url)
            .then(response => response.json())
            .then(data => setWebs(data))
            .catch(error => {
                console.error("Error fetching data", error)
                setError(true)
            })
    },[cityInput, interestInput, order])

    let selectWeb = null

    if (error){
        selectWeb = <p style={{textAlign:"center"}}>Error al cargar la lista de Webs</p>
    }else{
        selectWeb = webs.map((web,index) =>(
            <div key={index}>
                <button onClick={()=> setWebSelected(webs[index])}>{web.city}  </button>
                <p>Title: {web.title}</p>
                <p>Activity: {web.activity}</p>
                
            </div>
        ))
    }

    const handleWebList = ()=>{
        setWebSelected(null)
    }

    return(
        <div>
            <h3 id="h3Title">Web Pages </h3>
            <div id="Search">
            {!webSelected && <CityInput setCityInput={setCityInput} />}
            {!webSelected && <InterestInput setInterestInput={setInterestInput} />}
            {!webSelected && <ButtonOrder setButtonOrder={setButtonOrder} />}
            </div>
            
            <div id="WebList">
                {!webSelected && selectWeb}
            </div>
            <div id="WebInfo">
                {webSelected && <WebDetails webSent={webSelected} handleWebList={handleWebList}/>}
            </div>
        </div>
    )
}