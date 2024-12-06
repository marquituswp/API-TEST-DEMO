"use client";
// Componente para eliminar una web
import { useState, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup"; // Importamos Yup
import { useCommerce } from "@/context/CommerceContext";
import { jwtDecode } from "jwt-decode";
export default function DeleteWeb() {
    const { tokenCommerce } = useCommerce(); // Token del comercio
    const [successMessage, setSuccessMessage] = useState("");  // Mensaje de respuesta
    const [errorMessage, setErrorMessage] = useState(""); // Mensaje de error
    const [webDelete, setWebDelete] = useState(null) // Web a borrar

    // Esquema de validación
    const validationSchema = Yup.object({
        hard: Yup.boolean().required("Please select hard delete option"),
    });

    // Obtener la web a borrar
    useEffect(() => {
        if (!tokenCommerce) return; // Si no hay token, no hacemos nada
        const cif = jwtDecode(tokenCommerce).cif
        try{
            fetch(`http://localhost:3000/web/`, {
            })
                .then(response => response.ok ? response.json() : response.text())
                .then((data) => {
                    data.map((web) => {
                        if (web.cifCommerce === cif) {
                            setWebDelete(web) // Si la web es del comercio, la guardamos
                        } else {
                            setErrorMessage("NO_WEB") // Si no es del comercio, mostramos un error
                        }
                    })
                })
                .catch(() => {
                    setErrorMessage("ERROR_FETCHING_DATA"); // Si hubo un error al hacer la petición
                });
        }catch{
            setErrorMessage("ERROR_FETCHING_DATA");
        }
        
    }, [tokenCommerce]);

    // Función para enviar el formulario
    const handleSubmit = (values, { setSubmitting, setErrors }) => {
        try {
            fetch(`http://localhost:3000/web/?hard=${values.hard}`, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${tokenCommerce}`,
                    "Content-Type": "application/json",
                },
            })
                .then((response) => response.json())
                .then((data) => {
                    setSuccessMessage("WEB DELETED"); 
                })
                .catch(() => {
                    setSuccessMessage("");
                    setErrors({ general: "CAN'T DELETE" });
                })
                .finally(() => {
                    setSubmitting(false);
                });
        } catch {
            setSuccessMessage("");
            setErrors({ general: "Invalid values" });
        }
    };

    return (
        <div className="max-w-lg mx-auto p-6 bg-white shadow-md rounded-md mt-8">
            <h2 className="text-3xl font-bold text-gray-800 text-center mb-6">
                Remove Web
            </h2>

            {/* Mensaje de error si no hay webs*/}
            {errorMessage && !webDelete && (
                <div className="mb-4 text-red-700 text-2xl font-bold text-center">{errorMessage}</div>
            )}

            {webDelete && <Formik
                initialValues={{
                    hard: false,
                }}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >
                {({ isSubmitting, errors }) => (
                    <Form className="space-y-4">
                        <div className="flex items-center gap-2">
                            <Field
                                type="checkbox"
                                name="hard"
                                id="hard"
                                className="w-5 h-5 text-blue-500 border-gray-300 rounded focus:ring-blue-500"
                            />
                            <label htmlFor="hard" className="text-gray-700">
                                Perform hard delete (physical removal)
                            </label>
                            <ErrorMessage
                                name="hard"
                                component="div"
                                className="text-red-500 text-sm mt-1"
                            />
                        </div>

                        {/* Mensaje de error general */}
                        {errors.general && (
                            <div className="mb-4 text-red-700 text-2xl font-bold text-center">
                                {errors.general}
                            </div>
                        )}

                        {/* Mensaje de éxito */}
                        {successMessage && (
                            <div className="mb-4 text-green-700 font-bold text-2xl text-center">
                                {successMessage}
                            </div>
                        )}

                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="btn w-full bg-red-600 hover:bg-red-700"
                        >
                            {isSubmitting ? "DELETING..." : "DELETE"}
                        </button>

                    </Form>
                )}
            </Formik>}
        </div>
    );
}
