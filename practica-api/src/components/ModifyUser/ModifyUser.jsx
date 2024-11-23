// Componente para modificar un usuario
import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Message from "../Login/Message";

export default function ModifyUser({ onClickModify }) { // onClickModify es una función que se pasa como prop para cambiar el estado de la variable modify
    const [data, setData] = useState(""); // Variable para mostrar mensajes de error
    const [interests, setInterests] = useState([]); // Variable para guardar los intereses del usuario a modificar
    const [inputInterest, setInputInterest] = useState(""); // Variable para guardar el interés que se está añadiendo
    const [userData,setUserData]=useState(null) // Variable para guardar los datos del usuario a modificar

    // Fetch para obtener los datos del usuario a modificar y mostrarlos en el formulario
    useEffect(()=>{
        try {
            const id = jwtDecode(localStorage.getItem('token'))._id
            fetch(`http://localhost:3000/users/`)
                .then(response => response.json())
                .then(data => {
                    (data.map((user)=>{
                        if (user._id === id){
                            setInterests(user.interests)
                            setUserData(user)
                        }
                    }))

                })
                .catch(() => {
                })
        } catch {
            setData("Invalid values")
        }
    },[])

    // Validación de los campos del formulario
    const validationSchema = Yup.object({
        name: Yup.string()
            .min(3, "At least 3 characters")
            .max(99, "At most 99 characters"),
        email: Yup.string().email("Invalid email"),
        password: Yup.string()
            .min(8, "At least 8 characters")
            .max(16, "At most 16 characters"),
        age: Yup.number()
            .min(1, "Age must be greater than 0"),
        city: Yup.string(),
        allowOffers: Yup.boolean(),
    });

    // Funciones para añadir y eliminar intereses
    const handleAddInterest = () => {
        const trimmedInterest = inputInterest.trim();
        if (trimmedInterest && !interests.includes(trimmedInterest)) {
            setInterests([...interests, trimmedInterest]);
            setInputInterest("");
        }
    };

    // Función para eliminar un interés
    const handleRemoveInterest = (index) => {
        setInterests(interests.filter((_, i) => i !== index));
    };

    // Función para enviar los datos del formulario
    const handleSubmit = (values, { setSubmitting }) => {
        const token = localStorage.getItem("token");
        const body = { ...values, interests };

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
                    onClickModify("");
                }
            })
            .catch(() => {
                setData("Invalid values");
                setSubmitting(false);
            });
    };

    return (
        <>
            <h2>Modify a User</h2>
            {/** Formulario para modificar un usuario (solamente se muestra si se han obtenido los datos del usuario) */}
            {userData &&<Formik
                initialValues={{
                    name: userData.name,
                    email: userData.email,
                    password: "",
                    age: userData.age,
                    city: userData.city,
                    allowOffers: userData.allowOffers,
                }}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >
                {({ isSubmitting }) => (
                    <Form className="formContainer">
                        <div style={{ "position": "relative" }}>
                            <Field
                                type="text"
                                name="name"
                                placeholder="Name"
                            />
                            <ErrorMessage name="name" component="div" className="errorMessage" />
                        </div>

                        <div style={{ "position": "relative" }}>
                            <Field
                                type="number"
                                name="age"
                                placeholder="Age"
                            />
                            <ErrorMessage name="age" component="div" className="errorMessage" />
                        </div>

                        <div style={{ "position": "relative" }}>
                            <Field
                                type="email"
                                name="email"
                                placeholder="Email"
                            />
                            <ErrorMessage name="email" component="div" className="errorMessage" />
                        </div>

                        <div style={{ "position": "relative" }}>
                            <Field
                                type="password"
                                name="password"
                                placeholder="Password"
                            />
                            <ErrorMessage name="password" component="div" className="errorMessage" />
                        </div>

                        <div style={{ "position": "relative" }}>
                            <Field
                                type="text"
                                name="city"
                                placeholder="City"
                            />
                            <ErrorMessage name="city" component="div" className="errorMessage" />
                        </div>

                        <div className="arrayInputContainer">
                            <input
                                type="text"
                                value={inputInterest}
                                onChange={(e) => setInputInterest(e.target.value)}
                                placeholder="Add Interest"
                            />
                            <button type="button" onClick={handleAddInterest}>
                                Add Interest
                            </button>
                        </div>

                        <ul>
                            {interests.map((interest, index) => (
                                <li key={index} style={{ display: "flex", alignItems: "center" }}>
                                    {interest}
                                    <button
                                        type="button"
                                        onClick={() => handleRemoveInterest(index)}
                                        style={{ marginLeft: "10px", color: "red", cursor: "pointer" }}
                                    >
                                        Remove
                                    </button>
                                </li>
                            ))}
                        </ul>

                        <div>
                            <label>Allow Offers</label>
                            <Field type="checkbox" name="allowOffers"/>
                        </div>

                        <button type="submit" disabled={isSubmitting}>
                            Submit
                        </button>
                    </Form>
                )}
            </Formik>}
            <Message loginMessage={data} />
        </>
    );
}
