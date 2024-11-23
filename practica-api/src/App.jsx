// Componente principal de la aplicación
import './App.css';
import './styles/Common.css';
import { jwtDecode } from "jwt-decode";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import WebPages from './components/WebList/Web';
import ModifyUser from './components/ModifyUser/ModifyUser';
import AppAuth from './components/Login/AppAuth';
import DeleteUser from './components/DeleteUser/DeleteUser';
import HandleCommerces from './components/Commerce/HandleCommerces';
import CommerceHub from './components/CommerceHub/CommerceHub';
import { useState, useEffect } from 'react';
import Message from './components/Login/Message';

function App() {
  const [logged, setLogged] = useState(false); // Estado para saber si el usuario está logueado
  const [data, setData] = useState(""); // Estado para guardar los mensajes de error
  const [commerceLogged, setCommerceLogged] = useState(false); // Estado para saber si el comercio está logueado
  const [name, setName] = useState(""); // Estado para guardar el nombre del usuario
  const [token, setToken] = useState(null); // Estado para guardar el token del usuario
  const [tokenCommerce, setTokenCommerce] = useState(null); // Estado para guardar el token del comercio
  const [clicked, setClicked] = useState(false); // Estado para saber si se ha pulsado un botón
  const [buttonPressed, setButtonPressed] = useState(null); // Estado para guardar el botón pulsado
  const [prevButtonPressed, setPrevButtonPressed] = useState(""); // Estado para guardar el botón pulsado anteriormente

  // Esquema de validación para el formulario de token de comercio
  const validationSchema = Yup.object({
    token: Yup.string().required('Token is required'),
  });

  // Función para cerrar la sesión
  const handleClick = () => {
    setLogged(false);
  };

  // Función para obtener el token del usuario logueado
  useEffect(() => {
    if (logged) {
      setToken(jwtDecode(localStorage.getItem('token')));
    }
  }, [logged]); // Se ejecuta cada vez que cambia el estado de logged

  // Función para manejar los botones de la aplicación
  const handleButton = (value) => {
    if (value === "deleted") setLogged(false); // Si se ha eliminado la cuenta, se cierra la sesión
    if (value === "commerceHub") setPrevButtonPressed(buttonPressed); // Si se ha pulsado el botón de comercio, se guarda el botón pulsado anteriormente

    // Si se ha pulsado el botón de vuelta atras desde el hub de comercio
    if (value === "commerceBack") {
      // Si se ha pulsado un botón anteriormente, se muestra el botón pulsado anteriormente
      if (prevButtonPressed) {
        setClicked(true);
        setButtonPressed(prevButtonPressed);
      } else { // Si no se ha pulsado ningún botón anteriormente, se cierra el hub de comercio y se muestra la página principal
        setClicked(false);
        setButtonPressed("");
      }
    } else if (value === "logOutCommerce") { // Si se ha cerrado la sesión del comercio, se cierra el hub de comercio y se muestra la página principal
      setClicked(false);
      setButtonPressed("");
    } else { // Si se ha pulsado un botón, se muestra el contenido del botón pulsado
      setClicked(!clicked);
      setButtonPressed(value);
    }
  };

  // Función para manejar el token de comercio
  const handleTokenCommerceClick = async (commerceToken) => {
    try {
      const cif = jwtDecode(commerceToken).cif; // Se obtiene el CIF del comercio a partir del token
      const tokenUser = localStorage.getItem('token'); // Se obtiene el token del usuario

      const response = await fetch(`http://localhost:3000/comercio/${cif}`, {
        headers: {
          'Authorization': `Bearer ${tokenUser}`,
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const result = await response.json();
        if (result._id) {
          setCommerceLogged(true); // Se loguea el comercio
          setTokenCommerce(commerceToken); // Se guarda el token del comercio
        } else {
          setData("COMMERCE_DON'T_EXISTS");
        }
      } else {
        const errorText = await response.text();
        setData(errorText || "COMMERCE_DON'T_EXISTS");
      }
    } catch (error) {
      console.error(error);
      setData("TOKEN_NOT_VALID");
    }
  };

  return (
    <>
      {/** Cabecera de la aplicación */}
      {/** Si el usuario está logueado, se muestra la cabecera de la aplicación de usuario */}
      {logged && (
        <header className="headerAuth">
          <h1 className="Logo">API-IMMUNE</h1>
          <div className="navAuth">
            {/** Si el usuario es administrador, se muestra el botón de comercio */}
            {token && token.role[0] === "admin" && !commerceLogged && (
              <button onClick={() => handleButton("commerceHub")}>Commerce</button>
            )}
          </div>
        </header>
      )}
      {/** Si el usuario no está logueado, se muestra la cabecera de la aplicación de usuario no logueado */}
      {!logged && <AppAuth setLoggedAuth={setLogged} setNameAuth={setName} />}
      {!logged && (
        <div className="noLogged">
          <WebPages /> {/** Se muestra la lista de webs */}
        </div>
      )}
      {/** Si el usuario está logueado y no ha pulsado el botón de comercio, se muestra el contenido de la aplicación */}
      {logged && buttonPressed !== "commerceHub" && (
        <div className="logged">
          {/** Si no se ha pulsado ningún botón, se muestra la información del usuario */}
          {!clicked && (
            <div className="dashboardInfo">
              <h2>
                Hello {token && token.role[0]} {name}
              </h2>
              <div className="buttonOptions">
                <button className="buttonOption" onClick={() => handleButton("modify")}>
                  Modify Users Data
                </button>
                <button className="buttonOption" onClick={() => handleButton("delete")}>
                  Remove Account
                </button>
                <button className="buttonOption" onClick={() => handleButton("webs")}>
                  See Webs
                </button>
                {token && token.role[0] === "admin" && (
                  <button className="buttonOption" onClick={() => handleButton("commerce")}>
                    Handle Commerces
                  </button>
                )}
              </div>
            </div>
          )}
          {/** Si se ha pulsado un botón, se muestra el contenido del botón pulsado */}
          {buttonPressed === "webs" && <WebPages islogged={logged} />}
          {buttonPressed === "modify" && <ModifyUser onClickModify={handleButton} />}
          {buttonPressed === "delete" && <DeleteUser onClickDelete={handleButton} />}
          {buttonPressed === "commerce" && <HandleCommerces onClickCommerce={handleButton} />}
          {buttonPressed && (
            <button className="buttonPressedBack" onClick={() => handleButton(null)}> {/* Botón para volver al home page */}
              HomePage
            </button>
          )}
          {!buttonPressed && (
            <button className="buttonOptionLogOut" onClick={handleClick}> {/* Botón para cerrar la sesión */}
              Log Out
            </button>
          )}
        </div>
      )}
      {/** Si el usuario está logueado y ha pulsado el botón de comercio, se muestra el contenido del hub de comercio */}
      {logged && buttonPressed === "commerceHub" && (
        <div>
          {/** Si el comercio no está logueado, se muestra el formulario para introducir el token */}
          {!commerceLogged && (
            <div className={`modalOverlay ${buttonPressed === "commerceHub" ? "active" : ""}`}>
              <div className="form">
                <Formik
                  initialValues={{ token: "" }}
                  validationSchema={validationSchema}
                  onSubmit={(values) => handleTokenCommerceClick(values.token)}
                >
                  {({ isSubmitting }) => (
                    <Form>
                      <div>
                        <Field
                          name="token"
                          placeholder="Insert your Commerce TOKEN"
                          className="inputCommerce"
                        />
                        <ErrorMessage name="token" component="div" className="errorMessage" />
                      </div>

                      <p onClick={() => handleButton("commerceBack")} className="buttonBack">
                        X
                      </p>

                      <button type="submit" className="buttonTokenCommerce" disabled={isSubmitting}>
                        Submit
                      </button>

                      <Message loginMessage={data} />
                    </Form>
                  )}
                </Formik>
              </div>
            </div>
          )}
          {/** Si el comercio está logueado, se muestra el hub de comercio */}
          {commerceLogged && (
            <CommerceHub
              loggedCommerce={setCommerceLogged}
              tokenOfCommerce={tokenCommerce}
              homepage={handleButton}
            />
          )}
        </div>
      )}
    </>
  );
}

export default App;
