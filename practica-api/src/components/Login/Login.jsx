import { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Message from "./Message";

export default function Login({ setLoggedLogin, setNameLogin }) {
    const [data, setData] = useState("");

    // Yup validation schema
    const validationSchema = Yup.object({
        email: Yup.string().email("Invalid email").required("Email is required"),
        password: Yup.string()
            .required("Password is required"),
    });

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
            .then(response => response.ok ? response.json():response.text())
            .then(data => {
                if (data.token) {
                    setLoggedLogin(true);
                    const token = data.token;
                    localStorage.setItem('token', token);
                    setNameLogin(data.user.name);
                } else{
                    setData(data)
                }
            })
            .catch(() => {
                setData("ERROR_LOGIN");
            })
            .finally(() => {
                setSubmitting(false);
            });
    };

    return (
        <>
            <h1>Login</h1>
            <Formik
                initialValues={{
                    email: "",
                    password: "",
                }}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >
                {({ isSubmitting }) => (
                    <Form className="formContainer">
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

                        <button type="submit" disabled={isSubmitting}>
                            Submit
                        </button>
                    </Form>
                )}
            </Formik>
            <Message loginMessage={data} />
        </>
    );
}
