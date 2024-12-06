"use client";
// Componente para modificar un comercio
import { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useAuth } from "@/context/AuthContext";

export default function ModifyCommerce() {
    const { token } = useAuth();
    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [cif, setCif] = useState("");
    const [commerceSelected, setCommerceSelected] = useState(null);

    useEffect(() => {
        if (cif) {

            fetch(`http://localhost:3000/comercio/${cif}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            })
                .then((response) => (response.ok ? response.json() : response.text()))
                .then((data) => {
                    if (data._id) {
                        setCommerceSelected(data);
                        setErrorMessage("");
                    } else if (data.startsWith("{")) {
                        setCommerceSelected(null);
                        setErrorMessage("CIF_INVALID");
                    } else {
                        setCommerceSelected(null);
                        setErrorMessage(data);
                    }
                })
                .catch(() => {
                    setErrorMessage("ERROR_FETCHING_DATA");
                });
        }
    }, [cif, token]);

    const handleChange = (event) => {
        setCif(event.target.value);
    };

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

    const handleSubmit = (values, { setSubmitting, setErrors }) => {
        fetch(`http://localhost:3000/comercio/${values.cif}`, {
            method: "PUT",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(values),
        })
            .then((response) => response.json())
            .then((data) => {
                if (data.errors) {
                    setSuccessMessage("");
                    setErrors({ general: "Invalid values" });
                }
                if (data._id) {
                    setSuccessMessage("Commerce Updated");
                }
            })
            .catch(() => {
                setSuccessMessage("");
                setErrors({ general: "Error updating commerce" });
            })
            .finally(() => {
                setSubmitting(false);
            });
    };

    return (
        <div className="bg-gray-50 p-6 rounded-lg shadow-md max-w-xl mx-auto mt-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Modify a Commerce</h2>

            {/* Formulario para buscar el comercio por CIF */}
            <form className="mb-6">
                <div className="flex items-center gap-4">
                    <input
                        type="text"
                        onChange={handleChange}
                        placeholder="Enter Commerce CIF"
                        className="w-full p-2 border border-gray-300 rounded focus:ring focus:ring-blue-300"
                    />
                </div>
            </form>

            {/* Mostrar mensaje de error si no se encuentra el comercio */}
            {errorMessage && !commerceSelected && (
                <div className="mb-4 text-red-700 text-2xl font-bold text-center">{errorMessage}</div>
            )}

            {commerceSelected && (
                <Formik
                    initialValues={{
                        name: commerceSelected.name,
                        cif: cif,
                        email: commerceSelected.email,
                        phone: commerceSelected.phone,
                        page_id: commerceSelected.page_id,
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

                            {successMessage && (
                                <div className="mb-4 text-green-700 font-bold text-2xl text-center">
                                    {successMessage}
                                </div>
                            )}

                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className={`w-full p-2 rounded text-white ${isSubmitting
                                    ? "bg-gray-400 cursor-not-allowed"
                                    : "bg-blue-500 hover:bg-blue-600"
                                    }`}
                            >
                                Update Commerce
                            </button>
                        </Form>
                    )}
                </Formik>
            )}
        </div>
    );
}
