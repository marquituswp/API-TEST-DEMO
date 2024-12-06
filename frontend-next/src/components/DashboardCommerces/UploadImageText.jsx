"use client";
// Componente para subir una imagen y textos a la web
import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { useCommerce } from "@/context/CommerceContext";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

export default function UploadImageText() {
    const { tokenCommerce } = useCommerce();
    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [interests, setInterests] = useState([]); // Almacena los intereses
    const [inputText, setInputText] = useState("");
    const [imageFile, setImageFile] = useState(null); // Almacena el archivo seleccionado
    const [web, setWeb] = useState(null)

    // Carga los intereses de la web
    useEffect(() => {
        if (!tokenCommerce) return;
        const cif = jwtDecode(tokenCommerce).cif;
        fetch(`http://localhost:3000/web/`)
            .then((response) => (response.ok ? response.json() : response.text()))
            .then((data) => {
                data.map((web) => {
                    if (web.cifCommerce === cif) {
                        setWeb(web);
                        setInterests(web.texts || []);
                    }else{
                        setErrorMessage("NO_WEB");
                    }
                });
            })
            .catch(() => {
                setErrorMessage("ERROR_FETCHING_DATA");
            });
    }, [tokenCommerce]);

    // Valida el formulario
    const validationSchema = Yup.object({
        image: Yup.mixed().required("Image is required"),
    });

    const handleSubmit = async (values, { setSubmitting, setErrors }) => {
        try {
            if (!imageFile) {
                setSubmitting(false);
                return;
            }

            // Crea un objeto FormData con la imagen y los textos
            const formData = new FormData();
            formData.append("image", imageFile);
            interests.forEach((interest, index) => {
                formData.append(`text[${index}]`, interest);
            });
            const response = await fetch(`http://localhost:3000/web`, {
                method: "PATCH",
                headers: {
                    Authorization: `Bearer ${tokenCommerce}`,
                },
                body: formData,
            });

            if (response.ok) {
                setSuccessMessage("Web updated successfully!");
            } else {
                setSuccessMessage("");
                setErrors("Failed to update web");
            }
        } catch {
            setSuccessMessage("");
            setErrors("An error occurred while uploading");
        } finally {
            setSubmitting(false);
        }
    };

    const handleFileChange = (event, setFieldValue) => {
        const file = event.target.files[0];
        if (file) {
            setImageFile(file);
            setFieldValue("image", file);
        }
    };

    const addInterest = () => {
        if (inputText.trim() !== "") {
            setInterests([...interests, inputText.trim()]);
            setInputText("");
        }
    };

    const removeInterest = (indexToRemove) => {
        setInterests(interests.filter((_, index) => index !== indexToRemove));
    };

    return (
        <div className="max-w-2xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-8">
            <h2 className="text-3xl font-semibold text-gray-800 text-center mb-6">
                Upload Image and Text
            </h2>
            {/* Mostrar mensaje de error si no se encuentra el comercio */}
            {errorMessage && !web && (
                <div className="mb-4 text-red-700 text-2xl font-bold text-center">{errorMessage}</div>
            )}
            {web && <Formik
                initialValues={{
                    textInput: "",
                    image: null,
                }}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >
                {({ setFieldValue, isSubmitting, errors }) => (
                    <Form className="space-y-6">
                        <div>
                            <label
                                htmlFor="image"
                                className="block text-sm font-medium text-gray-700 mb-2"
                            >
                                Upload Image
                            </label>
                            <input
                                type="file"
                                id="image"
                                name="image"
                                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                onChange={(event) => handleFileChange(event, setFieldValue)}
                            />
                            <ErrorMessage
                                name="image"
                                component="div"
                                className="text-sm text-red-600 mt-1"
                            />
                        </div>

                        <div>
                            <label
                                htmlFor="textInput"
                                className="block text-sm font-medium text-gray-700 mb-2"
                            >
                                Add Text
                            </label>
                            <div className="flex space-x-2">
                                <Field
                                    id="textInput"
                                    name="textInput"
                                    type="text"
                                    value={inputText}
                                    onChange={(e) => setInputText(e.target.value)}
                                    placeholder="Add Text"
                                    className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                />
                                <button
                                    type="button"
                                    className="bg-indigo-500 text-white px-4 py-2 rounded-md shadow hover:bg-indigo-600"
                                    onClick={addInterest}
                                >
                                    Add
                                </button>
                            </div>
                        </div>

                        <ul className="space-y-2">
                            {interests.map((interest, index) => (
                                <li
                                    key={index}
                                    className="flex items-center justify-between bg-gray-100 p-2 rounded-md shadow-sm"
                                >
                                    <span>{interest}</span>
                                    <button
                                        type="button"
                                        className="text-red-500 hover:text-red-700"
                                        onClick={() => removeInterest(index)}
                                    >
                                        Remove
                                    </button>
                                </li>
                            ))}
                        </ul>

                        {/* General Error Message */}
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

                        <div className="text-center">
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="bg-green-500 text-white px-6 py-2 rounded-md shadow hover:bg-green-600"
                            >
                                {isSubmitting ? "Uploading..." : "Submit"}
                            </button>
                        </div>

                    </Form>
                )}
            </Formik>}
        </div>
    );
}
