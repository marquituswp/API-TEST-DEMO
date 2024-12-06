"use client"
import { useState } from "react";
import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
export default function SignUpFormik() {
    const { login } = useAuth(); // Hook para iniciar sesión
    const router = useRouter(); // Hook de Next.js que permite redirigir a otras páginas
    const [interests, setInterests] = useState([]); // Estado que guarda los intereses del usuario
    const [inputInterest, setInputInterest] = useState(""); // Estado que guarda el valor del input de intereses

    // Esquema de validación de los campos del formulario
    const validationSchema = Yup.object({
        name: Yup.string()
            .min(3, "Name at least 3 characters")
            .max(99, "Name at most 99 characters")
            .required("Name is required"),
        email: Yup.string().email("Invalid email").required("Email is required"),
        password: Yup.string()
            .min(8, "At least 8 characters")
            .max(16, "At most 16 characters")
            .required("Password is required"),
        age: Yup.number()
            .min(1, "Age greater than 0")
            .required("Age is required"),
        city: Yup.string().required("City is required"),
        allowOffers: Yup.boolean(),
    });

    // Función que añade un interés al array de intereses
    const handleAddInterest = () => {
        if (inputInterest.trim() !== "") {
            setInterests([...interests, inputInterest.trim()]);
            setInputInterest("");
        }
    };

    // Función que elimina un interés del array de intereses
    const handleRemoveInterest = (index) => {
        setInterests(interests.filter((_, i) => i !== index));
    };

    // Función que envía los datos del formulario al servidor
    const handleSubmit = async (values, { setSubmitting, setErrors }) => {
        try {
            const body = { ...values, interests };

            const response = await fetch("http://localhost:3000/auth/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(body),
            });

            if (response.ok) {
                const data = await response.json();

                if (data.token) {
                    login(data.token); // Inicia sesión
                    router.push("/"); // Redirige al home o dashboard
                } else {
                    setErrors({ general: "Unexpected response from the server." });
                }
            } else {
                const errorText = await response.text();
                setErrors({ general: errorText || "Invalid email or password." });
            }
        } catch (error) {
            setErrors({ general: "An unexpected error occurred. Please try again." });
        } finally {
            setSubmitting(false);
        }

    };

    return (
        <div className="flex items-center justify-center h-screen">
            <div className="flex flex-col items-center bg-[rgba(255,255,255,0.7)]  p-8 rounded-lg max-w-sm w-full shadow-[1px_1px_15px_5px_rgba(0,0,0,1)]">
                <h1 className="text-4xl font-bold text-gray-800 mb-6">Sign Up</h1>
                <Formik
                    initialValues={{
                        name: "",
                        email: "",
                        password: "",
                        age: "",
                        city: "",
                        allowOffers: false,
                    }}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                >
                    {({ isSubmitting, errors }) => (
                        <Form className="w-full flex items-center flex-col">
                            <div className="mb-4 relative">
                                <Field
                                    type="text"
                                    name="name"
                                    placeholder="Name"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                />
                                <ErrorMessage
                                    name="name"
                                    component="div"
                                    className="absolute right-0 -top-3.5 text-red-700 px-3 rounded-md font-bold text-sm m-0"
                                />
                            </div>

                            <div className="mb-4 relative">
                                <Field
                                    type="number"
                                    name="age"
                                    placeholder="Age"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                />
                                <ErrorMessage
                                    name="age"
                                    component="div"
                                    className="absolute right-0 -top-3.5 text-red-700 px-3 rounded-md font-bold text-sm m-0"
                                />
                            </div>

                            <div className="mb-4 relative">
                                <Field
                                    type="email"
                                    name="email"
                                    placeholder="Email"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                />
                                <ErrorMessage
                                    name="email"
                                    component="div"
                                    className="absolute right-0 -top-3.5 text-red-700 px-3 rounded-md font-bold text-sm m-0"
                                />
                            </div>

                            <div className="mb-4 relative">
                                <Field
                                    type="password"
                                    name="password"
                                    placeholder="Password"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                />
                                <ErrorMessage
                                    name="password"
                                    component="div"
                                    className="absolute right-0 -top-3.5 text-red-700 px-3 rounded-md font-bold text-sm m-0"
                                />
                            </div>

                            <div className="mb-4 relative">
                                <Field
                                    type="text"
                                    name="city"
                                    placeholder="City"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                />
                                <ErrorMessage
                                    name="city"
                                    component="div"
                                    className="absolute right-0 -top-3.5 text-red-700 px-3 rounded-md font-bold text-sm m-0"
                                />
                            </div>

                            <div className="flex flex-row items-center justify-center">
                                <input
                                    type="text"
                                    value={inputInterest}
                                    onChange={(e) => setInputInterest(e.target.value)}
                                    placeholder="Add Interest"
                                    className=" px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none mr-2"
                                />
                                <button type="button" onClick={handleAddInterest} className="btn p-0 py-1">
                                    Add Interest
                                </button>
                            </div>
                            <ul className="w-full mt-4">
                                {interests.map((interest, index) => (
                                    <li key={index} className="flex items-center justify-between p-2 rounded-md">
                                        <div className="max-w-[50%]">
                                            <p className="text-gray-700">
                                                {interest}</p>
                                        </div>

                                        <button
                                            type="button"
                                            onClick={() => handleRemoveInterest(index)} // Llama a removeInterest
                                            className="bg-red-500 ml-2 text-white text-lg font-bold py-2 px-4 rounded-lg hover:bg-red-700 active:bg-red-800 "
                                        >
                                            Remove
                                        </button>
                                    </li>
                                ))}
                            </ul>


                            <div className="mb-4 relative mt-5">
                                <label className="text-gray-700">
                                    Allow Offers</label>
                                <Field type="checkbox" name="allowOffers" className="ml-2" />
                            </div>

                            {/* Mostrar mensaje de error si no se encuentra el comercio */}
                            {errors.general && (
                                <div className="mb-4 text-red-700 font-bold text-center">
                                    {errors.general}
                                </div>
                            )}

                            <button type="submit" disabled={isSubmitting} className="btn">
                                Submit
                            </button>
                        </Form>
                    )}
                </Formik>

                {/* Link para redirigir al usuario a la página de login */}
                <Link href="/auth/login">
                    <p >Do you already have an account? <span className="text-blue-500 hover:underline">Login</span></p>
                </Link>
            </div>

        </div>
    );
}
