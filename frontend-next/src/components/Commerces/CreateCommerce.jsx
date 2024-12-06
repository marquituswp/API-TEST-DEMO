"use client";
// Componente para crear un comercio
import { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useAuth } from "@/context/AuthContext";
export default function CreateCommerce() {
    const [successMessage, setSuccessMessage] = useState("");
    const { token } = useAuth();
    const [tokenCommerce, setTokenCommerce] = useState(null);
    const [copied, setCopied] = useState(false);

    const validationSchema = Yup.object({
        name: Yup.string().required("Name is required"),
        cif: Yup.string()
            .length(9, "CIF must be 9 characters")
            .required("CIF is required"),
        email: Yup.string()
            .email("Invalid email address")
            .required("Email is required"),
        phone: Yup.string()
            .matches(/^\d{9}$/, "Phone number must be 9 digits")
            .required("Phone number is required"),
        page_id: Yup.string().required("Page ID is required"),
    });

    const handleSubmit = (values, { setSubmitting, setErrors }) => {

        fetch(`http://localhost:3000/comercio/`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(values),
        })
            .then((response) => (response.ok ? response.json() : response.text()))
            .then((data) => {
                if (data.errors) {
                    setSuccessMessage("");
                    setErrors({ general: "Invalid Values" });
                }
                if (data.token) {
                    setTokenCommerce(data.token);
                    setSuccessMessage("Commerce Created");
                } else {
                    setSuccessMessage("");
                    setErrors({ general: data });
                }
            })
            .catch(() => {
                setSuccessMessage("");
                setErrors({ general: "CIF is required" });
            })
            .finally(() => {
                setSubmitting(false);
            });
    };

    const handleToken = () => {
        
        navigator.clipboard.writeText(tokenCommerce).then(() => {
            handleToken(); // Llama a la función para manejar el token
            setCopied(true); // Cambia el estado a "copiado"
        });
    };

    return (
        <div className="bg-gray-50 p-6 rounded-lg shadow-md max-w-md mx-auto mt-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Create a Commerce</h2>

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
                {({ isSubmitting, errors }) => (
                    <Form className="space-y-4">
                        <div>
                            <Field
                                type="text"
                                name="name"
                                placeholder="Name"
                                className="w-full p-2 border border-gray-300 rounded focus:ring focus:ring-blue-300"
                            />
                            <ErrorMessage
                                name="name"
                                component="div"
                                className="text-red-500 text-sm mt-1"
                            />
                        </div>
                        <div>
                            <Field
                                type="text"
                                name="cif"
                                placeholder="CIF of the Commerce"
                                className="w-full p-2 border border-gray-300 rounded focus:ring focus:ring-blue-300"
                            />
                            <ErrorMessage
                                name="cif"
                                component="div"
                                className="text-red-500 text-sm mt-1"
                            />
                        </div>
                        <div>
                            <Field
                                type="email"
                                name="email"
                                placeholder="Email"
                                className="w-full p-2 border border-gray-300 rounded focus:ring focus:ring-blue-300"
                            />
                            <ErrorMessage
                                name="email"
                                component="div"
                                className="text-red-500 text-sm mt-1"
                            />
                        </div>
                        <div>
                            <Field
                                type="text"
                                name="phone"
                                placeholder="Phone"
                                className="w-full p-2 border border-gray-300 rounded focus:ring focus:ring-blue-300"
                            />
                            <ErrorMessage
                                name="phone"
                                component="div"
                                className="text-red-500 text-sm mt-1"
                            />
                        </div>
                        <div>
                            <Field
                                type="text"
                                name="page_id"
                                placeholder="Page ID"
                                className="w-full p-2 border border-gray-300 rounded focus:ring focus:ring-blue-300"
                            />
                            <ErrorMessage
                                name="page_id"
                                component="div"
                                className="text-red-500 text-sm mt-1"
                            />
                        </div>

                        {errors.general && (
                            <div className="mb-4 text-red-700 text-2xl font-bold text-center">
                                {errors.general}
                            </div>
                        )}

                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className={`btn w-full ${isSubmitting
                                ? "bg-gray-400 hover:bg-gray-500 cursor-not-allowed"
                                : ""
                                }`}
                        >
                            Submit
                        </button>
                    </Form>
                )}
            </Formik>

            {successMessage && (
                <div className="mb-4 text-green-700 font-bold text-2xl text-center">
                    {successMessage}
                </div>
            )}

            {tokenCommerce && (
                <button
                    className="btn w-full flex justify-center mt-4 bg-green-500 hover:bg-green-600"
                    onClick={handleToken}
                >
                    {copied ? 'Token copiado 🎉' : 'Copiar Token 📋'}
                </button>
            )}
        </div>
    );
}
