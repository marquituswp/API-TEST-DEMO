// Componente para modificar un comercio
import { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Message from "../Login/Message";

export default function ModifyCommerce({ handleBack }) { // Se recibe la función handleBack para volver a la página anterior
    const [data, setData] = useState(""); // Mensaje de respuesta del servidor
    const [cif, setCif] = useState(""); // CIF del comercio a modificar
    const [commerceSelected, setCommerceSelected] = useState(null); // Información del comercio seleccionado

    // Efecto que se ejecuta cuando cambia el CIF
    useEffect(() => {
        // Solo hacemos la solicitud si el CIF ha sido ingresado
        if (cif) {
            const token = localStorage.getItem("token");

            fetch(`http://localhost:3000/comercio/${cif}`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    "Content-Type": "application/json",
                }
            })
                .then(response => response.ok ? response.json():response.text())
                .then((data) => {
                    if (data._id) {
                        setCommerceSelected(data); // Seteamos los datos del comercio seleccionado
                        setData(""); // Limpiamos mensajes de error
                    } else if(data.startsWith("{")){
                        setData("CIF_INVALID"); // Mensaje si no se encuentra el comercio
                    } else{
                        setData(data)
                    }
                })
                .catch(() => {
                    setData("ERROR_FETCHING_DATA"); // Si hubo un error al hacer la petición
                });
        }
    }, [cif]); // Dependencia del CIF

    // Manejar el cambio del CIF
    const handleChange = (event) => {
        setCif(event.target.value);
    }

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

    // Función que se ejecuta al enviar el formulario
    const handleSubmit = (values, { setSubmitting }) => {
        const token = localStorage.getItem("token");

        fetch(`http://localhost:3000/comercio/${values.cif}`, {
            method: "PUT",
            headers: {
                'Authorization': `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(values),
        })
            .then(response => response.json())
            .then(data => {
                if (data.errors) {
                    setData("Invalid values");
                }
                if (data._id) {
                    setData("Commerce Updated");
                }
            })
            .catch(() => {
                setData("CIF is required");
            })
            .finally(() => {
                setSubmitting(false);
            });
    };

    return (
        <>
            <h2>Modify a Commerce</h2>
            <p className="resetButton" onClick={handleBack}>{"<- HandleCommerce"}</p>
            {/* Se debe ingresar el CIF del comercio a modificar y luego aparecerán los campos a modificar. */}
            <form className="formContainer">
                <div>
                    <input type="text" onChange={(event) => { handleChange(event, 'cif') }} placeholder="CIF of your Commerce" />
                </div>
            </form>

            {commerceSelected && (
                <Formik
                    initialValues={{
                        name: commerceSelected.name,
                        cif: cif, // El CIF se mantiene en el estado
                        email: commerceSelected.email,
                        phone: commerceSelected.phone,
                        page_id: commerceSelected.page_id,
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
            )}

            {/* Mostrar el mensaje de error o éxito */}
            <Message loginMessage={data} />
        </>
    );
}
