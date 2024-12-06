"use client";
import Link from "next/link";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useCommerce } from "@/context/CommerceContext";
import { useRouter } from "next/navigation";
import { jwtDecode } from "jwt-decode";

export default function CommerceDetails({ commerce }) {
    const router = useRouter();
    const { loginCommerce, updateCommerceData } = useCommerce();

    // Validación con Yup
    const validationSchema = Yup.object({
        token: Yup.string().required("El token es obligatorio"),
    });

    const handleSubmit = (values, {setSubmitting, setErrors }) => {
        try {
            // Intentamos decodificar el token
            const token = jwtDecode(values.token);

            // Comprobamos si el CIF del token coincide con el comercio
            if (token.cif !== commerce.cif) {
                // Si no coincide, usamos setErrors para establecer el error
                setErrors({ token: "El token no pertenece a este comercio" });
                setSubmitting(false);
                return; // Salimos de la función sin continuar el login
            }

            // Si todo es correcto, hacemos login y actualizamos los datos del comercio
            loginCommerce(values.token);
            updateCommerceData(commerce);
            router.push("/dashboardCommerce/options");
        } catch (error) {
            // En caso de error en la decodificación del token
            setErrors({ token: "Token inválido o expirado" });
        }
    };

    return (
        <div className="p-6 bg-white rounded-lg shadow-lg w-2/4 mx-auto flex flex-col py-12 px-4 mt-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">Commerce Details</h2>
            <div className="space-y-4">
                <div className="flex items-center space-x-4">
                    <span className="font-bold text-gray-700">Name:</span>
                    <span className="text-gray-900">{commerce.name}</span>
                </div>
                <div className="flex items-center space-x-4">
                    <span className="font-bold text-gray-700">CIF:</span>
                    <span className="text-gray-900">{commerce.cif}</span>
                </div>
                <div className="flex items-center space-x-4">
                    <span className="font-bold text-gray-700">Email:</span>
                    <span className="text-gray-900">{commerce.email}</span>
                </div>
                <div className="flex items-center space-x-4">
                    <span className="font-bold text-gray-700">Phone:</span>
                    <span className="text-gray-900">{commerce.phone}</span>
                </div>
                <div className="flex items-center space-x-4">
                    <span className="font-bold text-gray-700">Page ID:</span>
                    <span className="text-gray-900">{commerce.page_id}</span>
                </div>
                <div className="m-auto">
                    <h1 className="text-2xl font-semibold text-center">Login</h1>
                    <Formik
                        initialValues={{ token: "" }}
                        validationSchema={validationSchema}
                        onSubmit={handleSubmit}
                    >
                        {({ isSubmitting, errors }) => (
                            <Form className="mt-4">
                                <div className="mb-4">
                                    <label
                                        htmlFor="token"
                                        className="block text-sm font-medium text-gray-700"
                                    >
                                        Token
                                    </label>
                                    <Field
                                        type="text"
                                        id="token"
                                        name="token"
                                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    />
                                    <ErrorMessage
                                        name="token"
                                        component="div"
                                        className="text-sm text-red-600 mt-1"
                                    />
                                </div>
                                {errors.general && (
                                    <div className="mb-4 text-red-700 font-bold text-center">
                                        {errors.general}
                                    </div>
                                )}
                                <button
                                    type="submit"
                                    className="btn w-full flex justify-center bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
                                    disabled={isSubmitting}
                                >
                                    {isSubmitting ? "Verifying..." : "Login"}
                                </button>
                            </Form>
                        )}
                    </Formik>
                </div>
            </div>
        </div>
    );
}
