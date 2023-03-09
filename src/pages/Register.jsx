import React, { useContext, useState } from "react";
import { useMutation } from "@apollo/client";
import { Button, Container, Form } from "react-bootstrap";

import { REGISTER_USER } from "../util/graphql";
import { useForm } from "../util/hooks";
import { AuthContext } from "../context/authorization";

function Register(props) {
    // Initializing context
    const context = useContext(AuthContext);
    const [errors, setErrors] = useState({});

    const { onChange, onSubmit, values } = useForm(registerUserCallback, {
        username: "",
        email: "",
        password: "",
        confirmPassword: ""
    });

    // Using graphql query
    const [registerUser, { loading }] = useMutation(REGISTER_USER, {
        // Query successful
        update(_, { data }) {
            localStorage.setItem("user", JSON.stringify(data.register));
            context.login(data.register);
            props.history.push("/"); // Takes to home page "/"
        },
        // Query failed
        onError(err) {
            console.log(err);
            console.log(err.graphQLErrors[0].extensions.error);
            setErrors(err.graphQLErrors[0].extensions.error);
            //console.log(err.graphQLErrors[0].extensions);
        },
        variables: values
    });

    function registerUserCallback() {
        if (values.password === values.confirmPassword) {
            registerUser();
        } else {
            setErrors({ password: "Passwords must match" });
        }
    }

    return (
        <Container id="register-form-container" className="light-glass form-container">
            <Form onSubmit={onSubmit} className={loading ? "loading" : ""}>
                <h3>Register</h3>
                <Form.Control
                    placeholder="Name"
                    maxLength="50"
                    name="username"
                    type="text"
                    value={values.username}
                    onChange={onChange}
                />
                <Form.Control
                    placeholder="Email"
                    maxLength="320"
                    name="email"
                    type="email"
                    value={values.email}
                    onChange={onChange}
                />
                <Form.Control
                    placeholder="Password"
                    maxLength="50"
                    name="password"
                    type="password"
                    value={values.password}
                    onChange={onChange}
                />
                <Form.Control
                    placeholder="Confirm password"
                    maxLength="50"
                    name="confirmPassword"
                    type="password"
                    value={values.confirmPassword}
                    onChange={onChange}
                />
                <Button type="submit">Register</Button>
            </Form>
            <a href="/login">Already a user? Login</a>
            {errors && Object.keys(errors).length > 0 && (
                <div className="ui error message">
                    <ul className="list">
                        {Object.values(errors).map((error, index) => (
                            <li key={index}>{error}</li>
                        ))}
                    </ul>
                </div>
            )}
        </Container>
    );
}

export default Register;
