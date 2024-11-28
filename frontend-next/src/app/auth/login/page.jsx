"use client"// Componente de Login
import { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Message from "@/components/Message";
import Link from "next/link";
export default function Login({ setLoggedLogin, setNameLogin }) { // setLoggedLogin es una función que se ejecuta cuando se inicia sesión
    const [data, setData] = useState("");

    // Esquema de validación de los campos del formulario
    const validationSchema = Yup.object({
        email: Yup.string().email("Invalid email").required("Email is required"),
        password: Yup.string()
            .required("Password is required"),
    });

    // Función que envía los datos del formulario al servidor
    const handleSubmit = (values, { setSubmitting }) => {
        const { email, password } = values;
        const body = { email, password };

        fetch("http://localhost:3000/auth/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(body),
        })
            .then(response => response.ok ? response.json() : response.text())
            .then(data => {
                if (data.token) {
                    setLoggedLogin(true);
                    const token = data.token;
                    localStorage.setItem('token', token);
                    setNameLogin(data.user.name);
                } else {
                    setData(data)
                }
            })
            .catch((error) => {
                console.log(error);
                setData("ERROR_LOGIN");
            })
            .finally(() => {
                setSubmitting(false);
            });
    };

    return (
        <div className="flex items-center justify-center h-screen">
            <div className="flex flex-col items-center bg-[rgba(255,255,255,0.7)]  p-8 rounded-lg max-w-sm w-full shadow-[1px_1px_15px_5px_rgba(0,0,0,1)]">
                <h1 className="text-4xl font-bold text-gray-800 mb-6">Login</h1>

                <Formik
                    initialValues={{
                        email: "",
                        password: "",
                    }}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                >
                    {({ isSubmitting }) => (
                        <Form className="w-full">
                            <div className="mb-4 relative">
                                <Field
                                    type="email"
                                    name="email"
                                    placeholder="Enter your email"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                />
                                <ErrorMessage
                                    name="email"
                                    component="div"
                                    className="absolute right-0 -top-3.5 text-red-700 px-3 rounded-md font-bold text-sm m-0"
                                />
                            </div>

                            <div className="mb-6 relative">
                                <Field
                                    type="password"
                                    name="password"
                                    placeholder="Enter your password"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                />
                                <ErrorMessage
                                    name="password"
                                    component="div"
                                    className="absolute right-0 -top-3.5 text-red-700 px-3 rounded-md font-bold text-sm"
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {isSubmitting ? "Submitting..." : "Login"}
                            </button>
                        </Form>
                    )}
                </Formik>
                <Message message={data} />
                <Link href="/auth/register">
                <p >You don't have an account? <span className="text-blue-500 hover:underline">Create account</span></p>
                </Link>
            </div>
        </div>

    );
}
