import React, { useContext, useState } from "react";
import { useMutation } from "@apollo/client";
import { Button, Form } from "semantic-ui-react";

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
        update(_, result) {
            context.login(result.data.register);
            props.history.push("/"); // Takes to home page "/"
        },
        // Query failed
        onError(err) {
            console.log(err);
            console.log(err.graphQLErrors[0].extensions.error);
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
        <div className="form-container">
            <Form onSubmit={onSubmit} className={loading ? "loading" : ""}>
                <h1>Register</h1>
                <Form.Input
                    label="Username"
                    placeholder="Username"
                    name="username"
                    type="text"
                    value={values.username}
                    onChange={onChange}
                />
                <Form.Input
                    label="Email"
                    placeholder="Email"
                    name="email"
                    type="email"
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
                <Form.Input
                    label="Confirm Password"
                    placeholder="Password"
                    name="confirmPassword"
                    type="password"
                    error={errors.password ? true : false}
                    value={values.confirmPassword}
                    onChange={onChange}
                />
                <Button type="submit">Register</Button>
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

export default Register;
