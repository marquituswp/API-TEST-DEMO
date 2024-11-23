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
  const [logged, setLogged] = useState(false);
  const [data, setData] = useState("");
  const [commerceLogged, setCommerceLogged] = useState(false);
  const [name, setName] = useState("");
  const [token, setToken] = useState(null);
  const [tokenCommerce, setTokenCommerce] = useState(null);
  const [clicked, setClicked] = useState(false);
  const [buttonPressed, setButtonPressed] = useState(null);
  const [prevButtonPressed, setPrevButtonPressed] = useState("");

  const validationSchema = Yup.object({
    token: Yup.string().required('Token is required'),
  });

  const handleClick = () => {
    setLogged(false);
  };

  useEffect(() => {
    if (logged) {
      setToken(jwtDecode(localStorage.getItem('token')));
    }
  }, [logged]);

  const handleButton = (value) => {
    if (value === "deleted") setLogged(false);
    if (value === "commerceHub") setPrevButtonPressed(buttonPressed);

    if (value === "commerceBack") {
      if (prevButtonPressed) {
        setClicked(true);
        setButtonPressed(prevButtonPressed);
      } else {
        setClicked(false);
        setButtonPressed("");
      }
    } else if (value === "logOutCommerce") {
      setClicked(false);
      setButtonPressed("");
    } else {
      setClicked(!clicked);
      setButtonPressed(value);
    }
  };

  const handleTokenCommerceClick = async (commerceToken) => {
    try {
      const cif = jwtDecode(commerceToken).cif;
      const tokenUser = localStorage.getItem('token');

      const response = await fetch(`http://localhost:3000/comercio/${cif}`, {
        headers: {
          'Authorization': `Bearer ${tokenUser}`,
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const result = await response.json();
        if (result._id) {
          setCommerceLogged(true);
          setTokenCommerce(commerceToken);
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
      {logged && (
        <header className="headerAuth">
          <h1 className="Logo">API-IMMUNE</h1>
          <div className="navAuth">
            {token && token.role[0] === "admin" && !commerceLogged && (
              <button onClick={() => handleButton("commerceHub")}>Commerce</button>
            )}
          </div>
        </header>
      )}
      {!logged && <AppAuth setLoggedAuth={setLogged} setNameAuth={setName} />}
      {!logged && (
        <div className="noLogged">
          <WebPages />
        </div>
      )}
      {logged && buttonPressed !== "commerceHub" && (
        <div className="logged">
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
          {buttonPressed === "webs" && <WebPages islogged={logged} />}
          {buttonPressed === "modify" && <ModifyUser onClickModify={handleButton} />}
          {buttonPressed === "delete" && <DeleteUser onClickDelete={handleButton} />}
          {buttonPressed === "commerce" && <HandleCommerces onClickCommerce={handleButton} />}
          {buttonPressed && (
            <button className="buttonPressedBack" onClick={() => handleButton(null)}>
              HomePage
            </button>
          )}
          {!buttonPressed && (
            <button className="buttonOptionLogOut" onClick={handleClick}>
              Log Out
            </button>
          )}
        </div>
      )}
      {logged && buttonPressed === "commerceHub" && (
        <div>
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
