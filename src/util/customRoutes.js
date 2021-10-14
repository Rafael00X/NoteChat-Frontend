import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";

import { AuthContext } from "../context/authorization";

function AuthRoute({ component: Component, ...rest }) {
    const { user } = useContext(AuthContext);

    return (
        <Route
            {...rest}
            render={(props) => (user ? <Redirect to="/" /> : <Component {...props} />)}
        />
    );
}

function HomeRoute({ component: Component, ...rest }) {
    const { user } = useContext(AuthContext);

    return (
        <Route
            {...rest}
            render={(props) => (user ? <Component {...props} /> : <Redirect to="/login" />)}
        />
    );
}

export { AuthRoute, HomeRoute };
