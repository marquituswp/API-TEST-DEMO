// Componente para actualizar una web
import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup"; // Importamos Yup
import Message from "../Login/Message";

export default function UpdateWeb({ token, handleBack }) {
    const [data, setData] = useState(""); // Mensaje de respuesta
    const [webUpdate, setWebUpdate] = useState(null)  // Web a actualizar (para mostrar los valores actuales)

    // Esquema de validación 
    const validationSchema = Yup.object({
        city: Yup.string().required("City is required"),
        activity: Yup.string().required("Activity is required"),
        title: Yup.string().required("Title is required"),
        summary: Yup.string().required("Summary is required"),
    });

    // Obtener la web a actualizar
    useEffect(() => {
        const cif = jwtDecode(token).cif

        fetch(`http://localhost:3000/web/`, {
        })
            .then(response => response.ok ? response.json() : response.text())
            .then((data) => {
                data.map((web) => {
                    if (web.cifCommerce === cif) {
                        setWebUpdate(web)
                    }
                })
            })
            .catch(() => {
                setData("ERROR_FETCHING_DATA"); // Si hubo un error al hacer la petición
            });
    }, [token]);

    // Función para enviar el formulario
    const handleSubmit = (values, { setSubmitting }) => {
        fetch(`http://localhost:3000/web/`, {
            method: "PUT",
            headers: {
                'Authorization': `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(values),
        })
            .then((response) =>
                response.ok ? response.json() : response.text()
            )
            .then((data) => {
                if (data._id) {
                    setData("Web Updated");
                } else if (data.startsWith("{")) {
                    setData("Invalid values");
                } else {
                    setData(data);
                }
            })
            .catch(() => {
                setData("Can't update");
            })
            .finally(() => {
                setSubmitting(false);
            });
    };

    return (
        <>
            <h2>Update a Web</h2>
            <p className="resetButton" onClick={handleBack}>{"<- HandleCommerce"}</p>

            {/* Formulario para actualizar la web (se muestra cuando haya cargado la web a actualizar) */}
            {webUpdate && <Formik
                initialValues={{
                    city: webUpdate.city,
                    activity: webUpdate.activity,
                    title: webUpdate.title,
                    summary: webUpdate.summary,
                }}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >
                {({ isSubmitting }) => (
                    <Form className="formContainer">
                        <div>
                            <Field
                                type="text"
                                name="city"
                                placeholder="City"
                            />
                            <ErrorMessage name="city" component="div" className="errorMessage" />
                        </div>
                        <div>
                            <Field
                                type="text"
                                name="activity"
                                placeholder="Activity"
                            />
                            <ErrorMessage name="activity" component="div" className="errorMessage" />
                        </div>
                        <div>
                            <Field
                                type="text"
                                name="title"
                                placeholder="Title"
                            />
                            <ErrorMessage name="title" component="div" className="errorMessage" />
                        </div>
                        <div>
                            <Field
                                type="text"
                                name="summary"
                                placeholder="Summary"
                            />
                            <ErrorMessage name="summary" component="div" className="errorMessage" />
                        </div>

                        <button type="submit" disabled={isSubmitting}>
                            {isSubmitting ? "Updating Web..." : "Submit"}
                        </button>
                    </Form>
                )}
            </Formik>}
            {!webUpdate && <Message loginMessage={"NO_WEB"} />}
            <Message loginMessage={data} />
        </>
    );
}
