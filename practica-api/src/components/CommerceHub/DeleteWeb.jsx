// Componente para eliminar una web
import { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup"; // Importamos Yup
import Message from "../Login/Message";
export default function DeleteWeb({ token, handleBack }) {
    const [data, setData] = useState("") // Mensaje de respuesta

    // Esquema de validación 
    const validationSchema = Yup.object({
        hard: Yup.boolean()
            .required("Please select hard delete option"), // Aunque el valor es booleano, siempre es bueno tenerlo en cuenta
    });

    // Función para enviar el formulario
    const handleSubmit = (values, { setSubmitting }) => {
        try {
            fetch(`http://localhost:3000/web/?hard=${values.hard}`, {
                method: "DELETE",
                headers: {
                    'Authorization': `Bearer ${token}`,
                    "Content-Type": "application/json",
                }
            })
                .then(response => response.json())
                .then(data => {
                    console.log(data)
                    setData("WEB DELETED")

                })
                .catch((error) => {
                    console.log(error)
                    setData("CAN'T DELETE")
                })
            .finally(() => {
                setSubmitting(false);
            });
        } catch {
            setData("Invalid values")
        }
    }

    return (
        <>
           <h2>Remove Web</h2>
            <p className="resetButton" onClick={handleBack}>{"<- HandleCommerce"}</p>

            <Formik
                initialValues={{
                    hard: false,
                }}
                validationSchema={validationSchema} // Añadimos el esquema de validación
                onSubmit={handleSubmit}
            >
                {({ isSubmitting }) => (
                    <Form className="formContainer">
                        <div style={{ "position": "relative" }}>
                            <label>Hard</label>
                            <Field
                                type="checkbox"
                                name="hard"
                                className="checkbox"
                            />
                            <ErrorMessage name="hard" component="div" className="errorMessage" />
                        </div>

                        <button type="submit" disabled={isSubmitting}>
                            {isSubmitting ? "DELETING..." : "DELETE"}
                        </button>
                    </Form>
                )}
            </Formik>

            <Message loginMessage={data} />

        </>
    )
}