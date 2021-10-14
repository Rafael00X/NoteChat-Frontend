import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { Container } from "semantic-ui-react";

import "semantic-ui-css/semantic.min.css";
import "./App.css";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { AuthProvider } from "./context/authorization";
import { AuthRoute, HomeRoute } from "./util/customRoutes";

function App() {
    return (
        <AuthProvider>
            <Router>
                <Container>
                    <HomeRoute exact path="/" component={Home} />
                    <AuthRoute exact path="/login" component={Login} />
                    <AuthRoute exact path="/register" component={Register} />
                </Container>
            </Router>
        </AuthProvider>
    );
}

export default App;
