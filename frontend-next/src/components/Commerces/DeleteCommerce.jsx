"use client"
import { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useAuth } from "@/context/AuthContext";
export default function DeleteCommerce() {
    const { token } = useAuth();
    const [successMessage, setSuccessMessage] = useState("");

    const validationSchema = Yup.object({
        cif: Yup.string()
            .length(9, "CIF must be 9 characters")
            .required("CIF is required"),
        hard: Yup.boolean().required("Please select hard delete option"),
    });

    const handleSubmit = (values, { setSubmitting, setErrors }) => {
        const url = values.hard
            ? `http://localhost:3000/comercio/${values.cif}?hard=true`
            : `http://localhost:3000/comercio/${values.cif}?hard=false`;

        fetch(url, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
        })
            .then((response) => (response.ok ? response.json() : response.text()))
            .then((data) => {
                if (data.message) {
                    setSuccessMessage(
                        values.hard
                            ? "Commerce Deleted Physically"
                            : "Commerce Deleted Logically"
                    );
                } else {
                    setSuccessMessage("");
                    setErrors({ general: data });
                }
            })
            .catch(() => {
                setSuccessMessage("");
                setErrors({ general: values.cif ? "CIF not found" : "CIF is required"});
            })
            .finally(() => {
                setSubmitting(false);
            });
    };

    return (
        <div className="bg-gray-50 p-6 rounded-lg shadow-md max-w-lg mx-auto mt-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Remove Commerce</h2>

            <Formik
                initialValues={{
                    cif: "",
                    hard: false,
                }}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >
                {({ isSubmitting, errors }) => (
                    <Form className="space-y-4">
                        {/* CIF Field */}
                        <div>
                            <Field
                                type="text"
                                name="cif"
                                placeholder="CIF of your Commerce"
                                className="w-full p-2 border border-gray-300 rounded focus:ring focus:ring-blue-300"
                            />
                            <ErrorMessage
                                name="cif"
                                component="div"
                                className="text-red-500 text-sm mt-1"
                            />
                        </div>

                        {/* Hard Delete Checkbox */}
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

                        {/* General Error Message */}
                        {errors.general && (
                            <div className="mb-4 text-red-700 text-2xl font-bold text-center">
                                {errors.general}
                            </div>
                        )}

                        {/* Success Message */}
                        {successMessage && (
                            <div className="mb-4 text-green-700 font-bold text-2xl text-center">{successMessage}</div>
                        )}

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className={`btn w-full ${isSubmitting
                                    ? "bg-gray-400 hover:bg-gray-500 cursor-not-allowed"
                                    : "bg-red-500 hover:bg-red-600"
                                }`}
                        >
                            {isSubmitting ? "DELETING..." : "DELETE"}
                        </button>
                    </Form>
                )}
            </Formik>
        </div>
    );
}
