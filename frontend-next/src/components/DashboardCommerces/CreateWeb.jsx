"use client";
import { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup"; // Importamos Yup
import { useCommerce } from "@/context/CommerceContext";

export default function CreateWeb() {
    const { tokenCommerce } = useCommerce();
    const [texts, setTexts] = useState([]); // Lista de textos a añadir
    const [inputText, setInputText] = useState("");  // Texto a añadir
    const [successMessage, setSuccessMessage] = useState(""); // Mensaje de respuesta

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
    const handleSubmit = (values, { setSubmitting,setErrors }) => {
        const body = { ...values, texts: texts };
        fetch(`http://localhost:3000/web/`, {
            method: "POST",
            headers: {
                'Authorization': `Bearer ${tokenCommerce}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(body),
        })
            .then((response) => response.ok ? response.json() : response.text())
            .then((data) => {
                if (data.city) {
                    setSuccessMessage("Web Created");
                } else if (data.startsWith("{")) {
                    setSuccessMessage("");
                    setErrors({ general: "Invalid values" });
                } else {
                    setSuccessMessage("");
                    setErrors({general: data});
                }
            })
            .catch(() => {
                setSuccessMessage("");
                setErrors({ general: "Can't create web" });
            })
            .finally(() => {
                setSubmitting(false);
            });
    };

    return (
        <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-8">
            <h2 className="text-3xl font-semibold text-center mb-6">Create a Web</h2>

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
                {({ isSubmitting,errors }) => (
                    <Form className="space-y-6">
                        {/* City Field */}
                        <div className="relative">
                            <Field
                                type="text"
                                name="city"
                                placeholder="City"
                                className="w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <ErrorMessage name="city" component="div" className="text-red-500 text-sm mt-1" />
                        </div>

                        {/* Activity Field */}
                        <div className="relative">
                            <Field
                                type="text"
                                name="activity"
                                placeholder="Activity"
                                className="w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <ErrorMessage name="activity" component="div" className="text-red-500 text-sm mt-1" />
                        </div>

                        {/* Title Field */}
                        <div className="relative">
                            <Field
                                type="text"
                                name="title"
                                placeholder="Title"
                                className="w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <ErrorMessage name="title" component="div" className="text-red-500 text-sm mt-1" />
                        </div>

                        {/* Summary Field */}
                        <div className="relative">
                            <Field
                                type="text"
                                name="summary"
                                placeholder="Summary"
                                className="w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <ErrorMessage name="summary" component="div" className="text-red-500 text-sm mt-1" />
                        </div>

                        {/* Add Text Section */}
                        <div className="flex space-x-4 items-center">
                            <input
                                type="text"
                                value={inputText}
                                onChange={(e) => setInputText(e.target.value)}
                                placeholder="Add Text"
                                className="w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <button
                                type="button"
                                onClick={addText}
                                className="px-6 py-3 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 focus:outline-none"
                            >
                                Add Text
                            </button>
                        </div>

                        {/* Text List */}
                        <ul className="space-y-2 mt-4">
                            {texts.map((text, index) => (
                                <li key={index} className="flex justify-between items-center bg-gray-100 p-2 rounded-md">
                                    <span>{text}</span>
                                    <button
                                        type="button"
                                        onClick={() => handleRemoveText(index)}
                                        className="text-red-600 hover:text-red-800"
                                    >
                                        Remove
                                    </button>
                                </li>
                            ))}
                        </ul>

                        {/* General Error Message */}
                        {errors.general && (
                            <div className="mb-4 text-red-700 text-2xl font-bold text-center">{errors.general}</div>
                        )}

                        {/* Response Message */}
                        {successMessage && (
                            <div className="mb-4 text-green-700 font-bold text-2xl text-center">
                                {successMessage}
                            </div>
                        )}

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full px-6 py-3 bg-green-500 text-white font-semibold rounded-md hover:bg-green-600 focus:outline-none"
                        >
                            {isSubmitting ? "Creating Web..." : "Submit"}
                        </button>

                        
                    </Form>
                )}
            </Formik>
        </div>
    );
}
