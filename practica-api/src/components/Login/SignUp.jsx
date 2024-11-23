// Componente SignUp
import { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Message from "./Message";

export default function SignUpFormik({ setLoggedSignUp, setNameSignUp }) { // setLoggedSignUp es una función que se ejecuta cuando se registra un usuario
    const [data, setData] = useState(""); // Estado que guarda el mensaje de error o éxito
    const [interests, setInterests] = useState([]); // Estado que guarda los intereses del usuario
    const [inputInterest, setInputInterest] = useState(""); // Estado que guarda el valor del input de intereses

    // Esquema de validación de los campos del formulario
    const validationSchema = Yup.object({
        name: Yup.string()
            .min(3, "Name must be at least 3 characters")
            .max(99, "Name must be at most 99 characters")
            .required("Name is required"),
        email: Yup.string().email("Invalid email").required("Email is required"),
        password: Yup.string()
            .min(8, "At least 8 characters")
            .max(16, "At most 16 characters")
            .required("Password is required"),
        age: Yup.number()
            .min(1, "Age must be greater than 0")
            .required("Age is required"),
        city: Yup.string().required("City is required"),
        allowOffers: Yup.boolean(),
    });

    // Función que añade un interés al array de intereses
    const handleAddInterest = () => {
        if (inputInterest.trim() !== "") {
            setInterests([...interests, inputInterest.trim()]);
            setInputInterest("");
        }
    };

    // Función que elimina un interés del array de intereses
    const handleRemoveInterest = (index) => {
        setInterests(interests.filter((_, i) => i !== index));
    };

    // Función que envía los datos del formulario al servidor
    const handleSubmit = (values, { setSubmitting }) => {
        const body = { ...values, interests };
        fetch("http://localhost:3000/auth/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(body),
        })
            .then((response) => response.ok ? response.json():response.text())
            .then((data) => {
                setSubmitting(false);
                if (data.token) {
                    setLoggedSignUp(true); // Ejecuta la función setLoggedSignUp
                    const token = data.token;
                    localStorage.setItem("token", token); // Guarda el token en el localStorage
                    setNameSignUp(data.user.name); // Asigna el nombre del usuario al estado
                } else {
                    setData(data);
                }
            })
            .catch(() => {
                setData("Invalid Values");
                setSubmitting(false);
            });
    };

    return (
        <>
            <h1>Sign Up</h1>
            <Formik
                initialValues={{
                    name: "",
                    email: "",
                    password: "",
                    age: "",
                    city: "",
                    allowOffers: false,
                }}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >
                {({ isSubmitting, values }) => (
                    <Form className="formContainer">
                        <div style={{ "position": "relative" }}>
                            <Field type="text" name="name" placeholder="Name" />
                            <ErrorMessage name="name" component="div" className="errorMessage" />
                        </div>

                        <div style={{ "position": "relative" }}>
                            <Field type="number" name="age" placeholder="Age" />
                            <ErrorMessage name="age" component="div" className="errorMessage" />
                        </div>

                        <div style={{ "position": "relative" }}>
                            <Field type="email" name="email" placeholder="Email" />
                            <ErrorMessage name="email" component="div" className="errorMessage" />
                        </div>

                        <div style={{ "position": "relative" }}>
                            <Field type="password" name="password" placeholder="Password" />
                            <ErrorMessage name="password" component="div" className="errorMessage" />
                        </div>

                        <div style={{ "position": "relative" }}>
                            <Field type="text" name="city" placeholder="City" />
                            <ErrorMessage name="city" component="div" className="errorMessage" />
                        </div>

                        <div className="arrayInputContainer">
                            <input
                                type="text"
                                value={inputInterest}
                                onChange={(e) => setInputInterest(e.target.value)}
                                placeholder="Add Interest"
                            />
                            <button type="button" onClick={handleAddInterest}>
                                Add Interest
                            </button>
                        </div>
                        <ul>
                            {interests.map((interest, index) => (
                                <li key={index} style={{ display: "flex", alignItems: "center" }}>
                                    {interest}
                                    <button
                                        type="button"
                                        onClick={() => handleRemoveInterest(index)} // Llama a removeInterest
                                        style={{ marginLeft: "10px", color: "red", cursor: "pointer" }}
                                    >
                                        Remove
                                    </button>
                                </li>
                            ))}
                        </ul>


                        <div>
                            <label>Allow Offers</label>
                            <Field type="checkbox" name="allowOffers" />
                        </div>

                        <button type="submit" disabled={isSubmitting}>
                            Submit
                        </button>
                    </Form>
                )}
            </Formik>
            <Message loginMessage={data} />
        </>
    );
}
