import { useEffect, useState, useCallback } from "react";
import WebDetails from "./WebDetails";
import CityInput from "./CityInput";
import InterestInput from "./InterestInput";
import ButtonOrder from "./ButtonOrder";
export default function WebPages({ islogged }) {
    const [webs, setWebs] = useState([])
    const [webSelected, setWebSelected] = useState(null)
    const [error, setError] = useState(false)
    const [order, setButtonOrder] = useState(false)
    const [cityInput, setCityInput] = useState("");
    const [interestInput, setInterestInput] = useState("");

    const getUrl = useCallback(() => {
        if (cityInput && interestInput) {
            return order
                ? `http://localhost:3000/users/web/${cityInput}/${interestInput}?order=true`
                : `http://localhost:3000/users/web/${cityInput}/${interestInput}`;
        } else if (cityInput) {
            return order
                ? `http://localhost:3000/users/web/${cityInput}?order=true`
                : `http://localhost:3000/users/web/${cityInput}`;
        } else if (interestInput) {
            return order
                ? `http://localhost:3000/users/web/{city}/${interestInput}?order=true`
                : `http://localhost:3000/users/web/{city}/${interestInput}`;
        }
        return order
            ? `http://localhost:3000/web/?order=true`
            : "http://localhost:3000/web";
    }, [cityInput, interestInput, order]);

    useEffect(() => {
        const url = getUrl();
        fetch(url)
            .then(response => response.json())
            .then(data => setWebs(data))
            .catch(error => {
                console.error("Error fetching data", error);
                setError(true);
            });
    }, [getUrl]);

    let selectWeb = null

    if (error) {
        selectWeb = <p style={{ textAlign: "center" }}>Error al cargar la lista de Webs</p>
    } else {
        selectWeb = webs.map((web, index) => (
            <div key={index} className="listItem">
                <button className="itemSelect" onClick={() => setWebSelected(web)}>
                    {web.city}
                </button>
                <p className="itemTitle" onClick={() => setWebSelected(web)}>Title: {web.title}</p>
                <p className="itemDescript" onClick={() => setWebSelected(web)}>Activity: {web.activity}</p>
            </div>
        ))
    }

    const handleWebList = () => {
        setWebSelected(null)
    }

    return (
        <div className="itemsList">
            <h3 className="listTitle">Web Pages</h3>
            {!webSelected && <div className="searchSection">
                <CityInput setCityInput={setCityInput} />
                <InterestInput setInterestInput={setInterestInput} />
                <ButtonOrder setButtonOrder={setButtonOrder} type={"puntuación"}/>
            </div>}

            <div className="listContainer">
                {!webSelected && selectWeb}
            </div>

            {webSelected && <WebDetails webSent={webSelected} handleWebList={handleWebList} islogged={islogged} urlUsed={getUrl()} />}
        </div>
    )
}