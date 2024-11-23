// Componente para crear un comercio
import { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Message from "../Login/Message";
import '../../styles/FormCreateCommerce.css'

export default function CreateCommerce({ handleBack }) { // Se recibe la función handleBack para volver a la página anterior
    const [data, setData] = useState("");
    const [tokenCommerce, setTokenCommerce] = useState(null);

    // Validación de los campos del formulario
    const validationSchema = Yup.object({
        name: Yup.string().required("Name is required"),
        cif: Yup.string()
            .length(9, "CIF of 9 characters")
            .required("CIF is required"),
        email: Yup.string()
            .email("Invalid email address")
            .required("Email is required"),
        phone: Yup.string()
            .matches(/^\d{9}$/, "Phone number of 9 digits")
            .required("Phone number is required"),
        page_id: Yup.string().required("Page ID is required"),
    });

    // Función que envía los datos del formulario al servidor
    const handleSubmit = (values, { setSubmitting }) => {
        const token = localStorage.getItem("token");
        
        fetch(`http://localhost:3000/comercio/`, {
            method: "POST",
            headers: {
                'Authorization': `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(values),
        })
            .then(response => response.ok ? response.json():response.text())
            .then(data => {
                if (data.errors) {
                    setData("Invalid values");
                }
                if (data.token) {
                    localStorage.setItem('token_commerce', data.token);
                    setTokenCommerce(data.token);
                    setData("Commerce Created");
                }else{
                    setData(data)
                }
            })
            .catch(() => {
                setData("CIF is required");
            })
            .finally(() => {
                setSubmitting(false);
            });
    };

    // Función que copia el token del comercio al portapapeles
    const handleToken = () => {
        navigator.clipboard.writeText(tokenCommerce)
            .then(() => {
                console.log("Texto copiado al portapapeles:", tokenCommerce);
            })
            .catch((error) => {
                console.error("Error al copiar al portapapeles:", error);
            });
    };

    return (
        <>
            <h2>Create a Commerce</h2>
            <p className="resetButton" onClick={handleBack}>{"<- HandleCommerce"}</p>

            <Formik
                initialValues={{
                    name: "",
                    cif: "",
                    email: "",
                    phone: "",
                    page_id: "",
                }}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >
                {({ isSubmitting }) => (
                    <Form className="formContainer">
                        <div style={{ "position": "relative" }}>
                            <Field
                                type="text"
                                name="name"
                                placeholder="Name"
                            />
                            <ErrorMessage name="name" component="div" className="errorMessage" />
                        </div>
                        <div style={{ "position": "relative" }}>
                            <Field
                                type="text"
                                name="cif"
                                placeholder="CIF of the Commerce"
                            />
                            <ErrorMessage name="cif" component="div" className="errorMessage" />
                        </div>
                        <div style={{ "position": "relative" }}>
                            <Field
                                type="email"
                                name="email"
                                placeholder="Email"
                            />
                            <ErrorMessage name="email" component="div" className="errorMessage" />
                        </div>
                        <div style={{ "position": "relative" }}>
                            <Field
                                type="text"
                                name="phone"
                                placeholder="Phone"
                            />
                            <ErrorMessage name="phone" component="div" className="errorMessage" />
                        </div>
                        <div style={{ "position": "relative" }}>
                            <Field
                                type="text"
                                name="page_id"
                                placeholder="Page ID"
                            />
                            <ErrorMessage name="page_id" component="div" className="errorMessage" />
                        </div>

                        <button type="submit" disabled={isSubmitting}>
                            Submit
                        </button>
                    </Form>
                )}
            </Formik>

            <Message loginMessage={data} />

            {tokenCommerce && (
                <button className="tokenCommerce" onClick={handleToken}>
                    TOKEN <span>📋</span>
                </button>
            )}
        </>
    );
}
