"use client"
// Componente SignUp
import { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Message from "@/components/Message";
import Link from "next/link";
export default function SignUpFormik({ setLoggedSignUp, setNameSignUp }) { // setLoggedSignUp es una función que se ejecuta cuando se registra un usuario
    const [data, setData] = useState(""); // Estado que guarda el mensaje de error o éxito
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
    const handleSubmit = (values, { setSubmitting }) => {
        const body = { ...values, interests };
        fetch("http://localhost:3000/auth/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(body),
        })
            .then((response) => response.ok ? response.json() : response.text())
            .then((data) => {
                setSubmitting(false);
                if (data.token) {
                    setLoggedSignUp(true); // Ejecuta la función setLoggedSignUp
                    const token = data.token;
                    localStorage.setItem("token", token); // Guarda el token en el localStorage
                    setNameSignUp(data.user.name); // Asigna el nombre del usuario al estado
                } else {
                    setData(data);
                }
            })
            .catch(() => {
                setData("Invalid Values");
                setSubmitting(false);
            });
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
                    {({ isSubmitting, values }) => (
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

                            <button type="submit" disabled={isSubmitting} className="btn">
                                Submit
                            </button>
                        </Form>
                    )}
                </Formik>
                <Message loginMessage={data} />
                <Link href="/auth/login">
                    <p >Do you already have an account? <span className="text-blue-500 hover:underline">Login</span></p>
                </Link>
            </div>

        </div>
    );
}
