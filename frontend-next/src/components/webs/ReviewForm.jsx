"use client";
// Componente para el formulario de reseña de una web
import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

export default function ReviewWeb({ webId }) {
    const router = useRouter(); // Hook para manejar la navegación
    const { token } = useAuth(); // Hook para obtener el token de autenticación
    const [successMessage, setSuccessMessage] = useState(""); // Estado para el mensaje de éxito

    // Valores iniciales
    const initialValues = {
        review: "",
        scoring: "",
    };

    // Esquema de validación del formulario
    const validationSchema = Yup.object({
        review: Yup.string()
            .required("Comment is required")
            .max(500, "Comment at most 500 characters"),
        scoring: Yup.number()
            .required("Points are required")
            .min(1, "Points at least 1")
            .max(5, "Points at most 5"),
    });

    const handleSubmit = async (values, { setSubmitting,setErrors }) => {
        try {
            const response = await fetch(`http://localhost:3000/users/reviewWeb/${webId}`, {
                method: "PUT",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(values),
            });

            if (response.ok) {
                const data = await response.json();

                if (data.message) {
                    setSuccessMessage(data.message); // Muestra mensaje de éxito

                    // Redirige a la página de la web después de 1 segundo
                    setTimeout(() => {
                        router.push(`/web/${webId}`);
                    }, 1000);
                } else {
                    setErrors({ general: "Unexpected response from the server." });
                }
            } else {
                setErrors({ general: "Invalid values" });
            }
        } catch (error) {
            console.error("Login Error:", error);
            setErrors({ general: "An unexpected error occurred. Please try again." });
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md">
                <Link href={`/web/${webId}`}>
                    <p className="text-indigo-500 font-medium text-lg mb-4 block">
                        Volver a la Web
                    </p>
                </Link>
                <h2 className="text-2xl font-bold text-gray-800 text-center">
                    Deja tu Reseña
                </h2>
                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                >
                    {({ isSubmitting, errors }) => (
                        <Form className="space-y-6">
                            <div className="space-y-2">
                                <label
                                    htmlFor="review"
                                    className="block text-sm font-medium text-gray-700"
                                >
                                    Comment
                                </label>
                                <Field
                                    as="textarea"
                                    name="review"
                                    id="review"
                                    rows="4"
                                    className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent"
                                    placeholder="Escribe tu reseña aquí"
                                />
                                <ErrorMessage
                                    name="review"
                                    component="div"
                                    className="text-red-500 text-sm"
                                />
                            </div>
                            <div className="space-y-2">
                                <label
                                    htmlFor="scoring"
                                    className="block text-sm font-medium text-gray-700"
                                >
                                    Points
                                </label>
                                <Field
                                    type="number"
                                    name="scoring"
                                    id="scoring"
                                    className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent"
                                    placeholder="De 1 a 5"
                                    step="0.25"
                                    min="1"
                                    max="5"
                                />
                                <ErrorMessage
                                    name="scoring"
                                    component="div"
                                    className="text-red-500 text-sm"
                                />
                            </div>

                            {/* Muestra un mensaje de éxito */}
                            {successMessage && (
                                <div className="mb-4 text-green-700 font-bold text-2xl text-center">
                                    {successMessage}
                                </div>
                            )}

                            {/* Muestra un mensaje de error general */}
                            {errors.general && (
                                <div className="mb-4 text-red-700 font-bold text-center">
                                    {errors.general}
                                </div>
                            )}
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full bg-indigo-500 hover:bg-indigo-600 text-white font-medium py-2 px-4 rounded-lg transition duration-200"
                            >
                                {isSubmitting ? "Enviando..." : "Enviar Reseña"}
                            </button>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    );
}
