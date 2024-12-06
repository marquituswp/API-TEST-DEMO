"use client";
// Componente para actualizar una web
import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup"; // Importamos Yup
import { useCommerce } from "@/context/CommerceContext";

export default function UpdateWeb() {
    const { tokenCommerce } = useCommerce();
    const [successMessage, setSuccessMessage] = useState(""); // Mensaje de respuesta
    const [errorMessage, setErrorMessage] = useState(""); // Mensaje de error
    const [webUpdate, setWebUpdate] = useState(null); // Web a actualizar (para mostrar los valores actuales)

    // Esquema de validación
    const validationSchema = Yup.object({
        city: Yup.string().required("City is required"),
        activity: Yup.string().required("Activity is required"),
        title: Yup.string().required("Title is required"),
        summary: Yup.string().required("Summary is required"),
    });

    // Obtener la web a actualizar
    useEffect(() => {
        if (!tokenCommerce) return;
        const cif = jwtDecode(tokenCommerce).cif;

        fetch(`http://localhost:3000/web/`)
            .then((response) =>
                response.ok ? response.json() : response.text()
            )
            .then((data) => {
                data.map((web) => {
                    if (web.cifCommerce === cif) {
                        setWebUpdate(web);
                    }else{
                        setErrorMessage("NO_WEB");
                    }
                });
            })
            .catch(() => {
                setErrorMessage("ERROR_FETCHING_DATA"); // Si hubo un error al hacer la petición
            });
    }, [tokenCommerce]);

    // Función para enviar el formulario
    const handleSubmit = (values, { setSubmitting, setErrors }) => {
        fetch(`http://localhost:3000/web/`, {
            method: "PUT",
            headers: {
                Authorization: `Bearer ${tokenCommerce}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(values),
        })
            .then((response) =>
                response.ok ? response.json() : response.text()
            )
            .then((data) => {
                if (data._id) {
                    setSuccessMessage("Web Updated");
                } else if (data.startsWith("{")) {
                    setSuccessMessage("");
                    setErrors({ general: "Invalid values" });
                } else {
                    setSuccessMessage("");
                    setErrors({ general: data });
                }
            })
            .catch(() => {
                setSuccessMessage("");
                setErrors({ general: "Can't update" });
            })
            .finally(() => {
                setSubmitting(false);
            });
    };

    return (
        <div className="max-w-2xl mx-auto p-6 bg-white shadow-md rounded-md mt-8">
            <h2 className="text-3xl font-bold text-gray-800 text-center mb-6">
                Update Web
            </h2>

            {errorMessage && !webUpdate && (
                <div className="mb-4 text-red-700 text-2xl font-bold text-center">{errorMessage}</div>
            )}

            {/* Formulario para actualizar la web */}
            {webUpdate && (
                <Formik
                    initialValues={{
                        city: webUpdate.city,
                        activity: webUpdate.activity,
                        title: webUpdate.title,
                        summary: webUpdate.summary,
                    }}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                >
                    {({ isSubmitting, errors }) => (
                        <Form className="space-y-6">
                            {/* Campos del formulario */}
                            <div>
                                <label
                                    htmlFor="city"
                                    className="block text-sm font-medium text-gray-700"
                                >
                                    City
                                </label>
                                <Field
                                    type="text"
                                    name="city"
                                    id="city"
                                    className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                />
                                <ErrorMessage
                                    name="city"
                                    component="div"
                                    className="text-red-600 text-sm"
                                />
                            </div>

                            <div>
                                <label
                                    htmlFor="activity"
                                    className="block text-sm font-medium text-gray-700"
                                >
                                    Activity
                                </label>
                                <Field
                                    type="text"
                                    name="activity"
                                    id="activity"
                                    className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                />
                                <ErrorMessage
                                    name="activity"
                                    component="div"
                                    className="text-red-600 text-sm"
                                />
                            </div>

                            <div>
                                <label
                                    htmlFor="title"
                                    className="block text-sm font-medium text-gray-700"
                                >
                                    Title
                                </label>
                                <Field
                                    type="text"
                                    name="title"
                                    id="title"
                                    className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                />
                                <ErrorMessage
                                    name="title"
                                    component="div"
                                    className="text-red-600 text-sm"
                                />
                            </div>

                            <div>
                                <label
                                    htmlFor="summary"
                                    className="block text-sm font-medium text-gray-700"
                                >
                                    Summary
                                </label>
                                <Field
                                    type="text"
                                    name="summary"
                                    id="summary"
                                    className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                />
                                <ErrorMessage
                                    name="summary"
                                    component="div"
                                    className="text-red-600 text-sm"
                                />
                            </div>

                            {errors.general && (
                                <div className="mb-4 text-red-700 text-2xl font-bold text-center">
                                    {errors.general}
                                </div>
                            )}

                            {successMessage && (
                                <div className="mb-4 text-green-700 font-bold text-2xl text-center">
                                    {successMessage}
                                </div>
                            )}

                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="btn w-full"
                            >
                                {isSubmitting ? "Updating Web..." : "Submit"}
                            </button>


                        </Form>
                    )}
                </Formik>
            )}
        </div>
    );
}
