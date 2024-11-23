import { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup"; // Importamos Yup
import Message from "../Login/Message";

export default function DeleteCommerce({ handleBack }) {
    const [data, setData] = useState(""); // Mensaje de estado

    // Validación con Yup
    const validationSchema = Yup.object({
        cif: Yup.string()
            .length(9, "CIF must be 9 characters")
            .required("CIF is required"),
        hard: Yup.boolean()
            .required("Please select hard delete option"), // Aunque el valor es booleano, siempre es bueno tenerlo en cuenta
    });

    const handleSubmit = (values, { setSubmitting }) => {
        const token = localStorage.getItem('token');
        const url = values.hard ? 
            `http://localhost:3000/comercio/${values.cif}?hard=true` : 
            `http://localhost:3000/comercio/${values.cif}?hard=false`;

        fetch(url, {
            method: "DELETE",
            headers: {
                'Authorization': `Bearer ${token}`,
                "Content-Type": "application/json",
            }
        })
        .then(response => response.ok ? response.json():response.text())
        .then(data => {
            if (data.message) {
                setData(values.hard ? "Commerce Deleted Physically" : "Commerce Deleted Logically");
            }else{
                setData(data)
            }
        })
        .catch(() => {
            setData(values.cif ? "CIF not found" : "CIF is required");
        })
        .finally(() => {
            setSubmitting(false);
        });
    };

    return (
        <>
            <h2>Remove Commerce</h2>
            <p className="resetButton" onClick={handleBack}>{"<- HandleCommerce"}</p>

            <Formik
                initialValues={{
                    cif: "",
                    hard: false,
                }}
                validationSchema={validationSchema} // Añadimos el esquema de validación
                onSubmit={handleSubmit}
            >
                {({ isSubmitting }) => (
                    <Form className="formContainer">
                        <div style={{ "position": "relative" }}>
                            <Field
                                type="text"
                                name="cif"
                                placeholder="CIF of your Commerce"
                            />
                            <ErrorMessage name="cif" component="div" className="errorMessage" />
                        </div>

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
    );
}
