import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { Container } from "react-bootstrap";

import "bootstrap/dist/css/bootstrap.min.css";
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
                <Container id="root-container">
                    <HomeRoute exact path="/" component={Home} />
                    <AuthRoute exact path="/register" component={Register} />
                    <AuthRoute exact path="/login" component={Login} />
                </Container>
            </Router>
        </AuthProvider>
    );
}

// <HomeRoute exact path="/" component={Home} />
// <AuthRoute exact path="/register" component={Register} />
// <AuthRoute exact path="/login" component={Login} />

export default App;
