import React, { useContext, useState } from "react";
import { useMutation } from "@apollo/client";
import { Button, Form } from "semantic-ui-react";

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

    /*

    function onSubmit(event) {
        event.preventDefault();
        console.log(event.target);
        console.log(event.target[0]);

        const values = {
            email: event.target.email.value,
            password: event.target.password.value
        };

        loginUser({ variables: values });
    }
    */

    return (
        <div className="form-container">
            <Form onSubmit={onSubmit} className={loading ? "loading" : ""}>
                <h1>Login</h1>
                <Form.Input
                    label="Email"
                    placeholder="Email"
                    name="email"
                    type="email"
                    error={errors.email ? true : false}
                    value={values.email}
                    onChange={onChange}
                />
                <Form.Input
                    label="Password"
                    placeholder="Password"
                    name="password"
                    type="password"
                    error={errors.password ? true : false}
                    value={values.password}
                    onChange={onChange}
                />
                <Button type="submit">Login</Button>
            </Form>
            {Object.keys(errors).length > 0 && (
                <div className="ui error message">
                    <ul className="list">
                        {Object.values(errors).map((error, index) => (
                            <li key={index}>{error}</li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}

export default Login;
