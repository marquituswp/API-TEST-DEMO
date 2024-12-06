"use client"
// Componente para modificar un usuario
import { useUser } from "@/context/UserContext"; // Importar el contexto
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

export default function ModifyUser() {
    const { userData, updateUserData } = useUser(); // Obtener los datos del usuario y la función para actualizarlos
    const [interests, setInterests] = useState(userData.interests); // Variable para guardar los intereses del usuario a modificar
    const [inputInterest, setInputInterest] = useState(""); // Variable para guardar el interés introducido
    const [successMessage, setSuccessMessage] = useState(""); // Estado para el mensaje de éxito
    const { token } = useAuth();  // Token del usuario

    // Validación de los campos del formulario
    const validationSchema = Yup.object({
        name: Yup.string()
            .min(3, "At least 3 characters")
            .max(99, "At most 99 characters"),
        email: Yup.string().email("Invalid email"),
        password: Yup.string()
            .min(8, "At least 8 characters")
            .max(16, "At most 16 characters")
            .nullable()  
            .notRequired(),  
        age: Yup.number()
            .min(1, "Age must be greater than 0"),
        city: Yup.string(),
        allowOffers: Yup.boolean(),
    });

    // Funciones para añadir y eliminar intereses
    const handleAddInterest = () => {
        setSuccessMessage("");
        const trimmedInterest = inputInterest.trim();
        if (trimmedInterest && !interests.includes(trimmedInterest)) {
            setInterests([...interests, trimmedInterest]);
            setInputInterest("");
        }
    };

    // Función para eliminar un interés
    const handleRemoveInterest = (index) => {
        setSuccessMessage("");
        setInterests(interests.filter((_, i) => i !== index));
    };

    // Función para enviar los datos del formulario
    const HandleSubmit = (values, { setSubmitting, setErrors }) => {
        try{
            const body = {
                ...values,
                interests
            };
    
            // Si la contraseña no está vacía, añadirla al cuerpo del request
            if (values.password !== "") {
                body.password = values.password;
            } else {
                delete body.password;
            }
            fetch(`http://localhost:3000/users/`, {
                method: "PUT",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(body),
            })
                .then((response) => response.json())
                .then((data) => {
                    setSubmitting(false);
                    if (data.message) {
                        setSuccessMessage("User modified successfully");
                        updateUserData({ ...userData, ...body });
                    } else {
                        setSuccessMessage("");
                        setErrors({ general: "Invalid values" });
                    }
                })
                .catch(() => {
                    setSuccessMessage("");
                    setErrors({ general: "An error occurred while updating" });
                    setSubmitting(false);
                });
        }catch(e){
            setSuccessMessage("");
            setErrors({ general: "An error occurred while updating" });
            setSubmitting(false);
        }
        
    };

    return (
        <div className="flex flex-col items-center py-20 gap-10">
            <h2 className="text-2xl font-bold text-gray-700">Modify your User Data</h2>
            {userData && (
                <Formik
                    initialValues={{
                        name: userData.name,
                        email: userData.email,
                        password: "",  // Contraseña vacía por defecto
                        age: userData.age,
                        city: userData.city,
                        allowOffers: userData.allowOffers,
                    }}
                    validationSchema={validationSchema}
                    onSubmit={HandleSubmit}
                >
                    {({ isSubmitting, errors }) => (
                        <Form
                            className="flex flex-col gap-4 w-full max-w-lg"
                            onChange={() => {
                                // Restablecer mensajes al cambiar cualquier dato
                                setSuccessMessage("");
                                if (errors.general) {
                                    errors.general = ""; // Limpia el mensaje de error general
                                }
                            }}
                        >
                            <div className="relative">
                                <Field
                                    type="text"
                                    name="name"
                                    placeholder="Name"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-300 focus:border-blue-500"
                                />
                                <ErrorMessage
                                    name="name"
                                    component="div"
                                    className="absolute right-0 top-0 bg-red-500 text-white text-sm px-3 py-1 rounded-md"
                                />
                            </div>

                            <div className="relative">
                                <Field
                                    type="number"
                                    name="age"
                                    placeholder="Age"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-300 focus:border-blue-500"
                                />
                                <ErrorMessage
                                    name="age"
                                    component="div"
                                    className="absolute right-0 top-0 bg-red-500 text-white text-sm px-3 py-1 rounded-md"
                                />
                            </div>

                            <div className="relative">
                                <Field
                                    type="email"
                                    name="email"
                                    placeholder="Email"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-300 focus:border-blue-500"
                                />
                                <ErrorMessage
                                    name="email"
                                    component="div"
                                    className="absolute right-0 top-0 bg-red-500 text-white text-sm px-3 py-1 rounded-md"
                                />
                            </div>

                            <div className="relative">
                                <Field
                                    type="password"
                                    name="password"
                                    placeholder="Password (optional)"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-300 focus:border-blue-500"
                                />
                                <ErrorMessage
                                    name="password"
                                    component="div"
                                    className="absolute right-0 top-0 bg-red-500 text-white text-sm px-3 py-1 rounded-md"
                                />
                            </div>

                            <div className="relative">
                                <Field
                                    type="text"
                                    name="city"
                                    placeholder="City"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-300 focus:border-blue-500"
                                />
                                <ErrorMessage
                                    name="city"
                                    component="div"
                                    className="absolute right-0 top-0 bg-red-500 text-white text-sm px-3 py-1 rounded-md"
                                />
                            </div>

                            <div className="flex gap-2">
                                <input
                                    type="text"
                                    value={inputInterest}
                                    onChange={(e) => setInputInterest(e.target.value)}
                                    placeholder="Add Interest"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-300 focus:border-blue-500"
                                />
                                <button
                                    type="button"
                                    onClick={handleAddInterest}
                                    className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                                >
                                    Add
                                </button>
                            </div>

                            <ul className="flex flex-col gap-2">
                                {interests.map((interest, index) => (
                                    <li
                                        key={index}
                                        className="flex items-center justify-between p-2 bg-gray-100 rounded-md shadow-sm"
                                    >
                                        {interest}
                                        <button
                                            type="button"
                                            onClick={() => handleRemoveInterest(index)}
                                            className="text-red-500 hover:text-red-600"
                                        >
                                            Remove
                                        </button>
                                    </li>
                                ))}
                            </ul>

                            <div className="flex items-center gap-2">
                                <label className="text-gray-700">Allow Offers</label>
                                <Field
                                    type="checkbox"
                                    name="allowOffers"
                                    className="w-4 h-4 text-blue-500 border-gray-300 rounded focus:ring focus:ring-blue-300"
                                />
                            </div>

                            {/* Mostrar mensaje de éxito */}
                            {successMessage && (
                                <div className="mb-4 text-green-700 font-bold text-2xl text-center">
                                    {successMessage}
                                </div>
                            )}

                            {/* Mostrar mensaje de error */}
                            {errors.general && (
                                <div className="mb-4 text-red-700 text-2xl font-bold text-center">
                                    {errors.general}
                                </div>
                            )}

                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:opacity-50"
                            >
                                Submit
                            </button>
                        </Form>
                    )}
                </Formik>
            )}
        </div>
    );
}
