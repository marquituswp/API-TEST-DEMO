// Componente para crear una web
import { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup"; // Importamos Yup
import Message from "../Login/Message";

export default function CreateWeb({ token, handleBack }) {
    const [texts, setTexts] = useState([]); // Lista de textos a añadir
    const [inputText, setInputText] = useState("");  // Texto a añadir
    const [data, setData] = useState(""); // Mensaje de respuesta

    // Validación de los campos del formulario
    const validationSchema = Yup.object({
        city: Yup.string().required("City is required"),
        activity: Yup.string().required("Activity is required"),
        title: Yup.string().required("Title is required"),
        summary: Yup.string().required("Summary is required"),
        texts: Yup.array().of(Yup.string().required("Each text is required")),
    });

    // Añadir un texto a la lista
    const addText = () => {
        if (inputText.trim() !== "") {
            setTexts([...texts, inputText.trim()]);
            setInputText("");
        }
    };

    // Eliminar un texto de la lista
    const handleRemoveText = (index) => {
        setTexts(texts.filter((_, i) => i !== index));
    };

    // Función para enviar el formulario
    const handleSubmit = (values, { setSubmitting }) => {
        const body = { ...values, texts: texts };
        fetch(`http://localhost:3000/web/`, {
            method: "POST",
            headers: {
                'Authorization': `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(body),
        })
            .then((response) => response.ok ? response.json(): response.text())
            .then((data) => {
                if (data.city) {
                    setData("Web Created");
                } else if(data.startsWith("{")){
                    setData("Invalid Values")   
                }else{
                    setData(data)
                }
            })
            .catch((error) => {
                console.log(error)
                setData("An error occurred");
            })
            .finally(() => {
                setSubmitting(false);
            });
    };

    return (
        <>
            <h2>Create a Web</h2>
            <p className="resetButton" onClick={handleBack}>{"<- HandleCommerce"}</p>

            <Formik
                initialValues={{
                    city: "",
                    activity: "",
                    title: "",
                    summary: "",
                    texts: [],
                }}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >
                {({ isSubmitting }) => (
                    <Form className="formContainer">
                        <div style={{position:"relative"}}>
                            <Field
                                type="text"
                                name="city"
                                placeholder="City"
                            />
                            <ErrorMessage name="city" component="div" className="errorMessage" />
                        </div>
                        <div style={{position:"relative"}}>
                            <Field
                                type="text"
                                name="activity"
                                placeholder="Activity"
                            />
                            <ErrorMessage name="activity" component="div" className="errorMessage" />
                        </div>
                        <div style={{position:"relative"}}>
                            <Field
                                type="text"
                                name="title"
                                placeholder="Title"
                            />
                            <ErrorMessage name="title" component="div" className="errorMessage" />
                        </div>
                        <div style={{position:"relative"}}>
                            <Field
                                type="text"
                                name="summary"
                                placeholder="Summary"
                            />
                            <ErrorMessage name="summary" component="div" className="errorMessage" />
                        </div>

                        {/* Añadir textos */}
                        <div className="arrayInputContainer">
                            <input
                                type="text"
                                value={inputText}
                                onChange={(e) => setInputText(e.target.value)}
                                placeholder="Add Text"
                            />
                            <button type="button" onClick={addText}>Add Text</button>
                        </div>

                        <ul>
                            {texts.map((text, index) => (
                                <li key={index} style={{ display: "flex", alignItems: "center" }}>
                                    {text}
                                    <button
                                        type="button"
                                        onClick={() => handleRemoveText(index)}
                                        style={{ marginLeft: "10px", color: "red", cursor: "pointer" }}
                                    >
                                        Remove
                                    </button>
                                </li>
                            ))}
                        </ul>

                        <button type="submit" disabled={isSubmitting}>
                            {isSubmitting ? "Creating Web..." : "Submit"}
                        </button>
                    </Form>
                )}
            </Formik>

            <Message loginMessage={data} />
        </>
    );
}
