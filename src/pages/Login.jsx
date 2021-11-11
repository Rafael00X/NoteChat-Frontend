import React, { useContext, useState } from "react";
import { useMutation } from "@apollo/client";
import { Button, Container, Form } from "react-bootstrap";

import { LOGIN_USER } from "../util/graphql";
import { useForm } from "../util/hooks";
import { AuthContext } from "../context/authorization";

function Login(props) {
    // Initializing context
    const context = useContext(AuthContext);

    const [errors, setErrors] = useState({});

    const { onChange, onSubmit, values } = useForm(loginUserCallback, {
        email: "",
        password: ""
    });

    // Using graphql query
    const [loginUser, { loading }] = useMutation(LOGIN_USER, {
        // Query successful
        update(_, { data }) {
            localStorage.setItem("user", JSON.stringify(data.login));
            context.login(data.login);
            props.history.push("/"); // Takes to home page "/"
        },
        // Query failed
        onError(err) {
            console.log(err.graphQLErrors[0].extensions.error);
            setErrors(err.graphQLErrors[0].extensions.error);
        },
        variables: values
    });

    function loginUserCallback() {
        loginUser();
    }

    return (
        <Container id="login-form-container" className="light-glass form-container">
            <Form onSubmit={onSubmit} className={loading ? "loading" : ""}>
                <h3>Login</h3>
                <Form.Control
                    placeholder="Email"
                    name="email"
                    type="email"
                    value={values.email}
                    onChange={onChange}
                />
                <Form.Control
                    placeholder="Password"
                    name="password"
                    type="password"
                    value={values.password}
                    onChange={onChange}
                />
                <Button type="submit">Login</Button>
            </Form>
            <a href="/register">Not a user? Register</a>
            {Object.keys(errors).length > 0 && (
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

export default Login;
