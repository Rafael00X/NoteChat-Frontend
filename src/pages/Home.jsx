import React, { useContext, useState } from "react";
import { Container, Nav, Navbar } from "react-bootstrap";

import NoteSection from "../components/NoteSection";
import ProfileSection from "../components/ProfileSection";
import { AuthContext } from "../context/authorization";

function Home() {
    const context = useContext(AuthContext);
    const [activeItem, setActiveItem] = useState("home");
    const [component, setComponent] = useState(<NoteSection />);

    function handleItemClick(event) {
        const name = event.target.getAttribute("name");
        setActiveItem(name);
        switch (name) {
            case "home":
                setComponent(<NoteSection />);
                break;
            case "profile":
                setComponent(<ProfileSection />);
                break;
            case "logout":
                context.logout();
                break;
            default:
                console.log("Invalid component");
        }
    }

    return (
        <Container className="light-glass" id="dashboard">
            <Navbar bg="dark" variant="dark">
                <Container>
                    <Navbar.Brand>
                        <img
                            alt=""
                            src="/logo.svg"
                            width="30"
                            height="30"
                            className="d-inline-block align-top"
                        />{" "}
                        NoteChat
                    </Navbar.Brand>
                    <Nav className="me-auto" id="navbar-items">
                        <Nav.Link name="home" onClick={handleItemClick}>
                            Home
                        </Nav.Link>
                        <Nav.Link name="chat" onClick={handleItemClick}>
                            Chat
                        </Nav.Link>
                        <Nav.Link name="profile" onClick={handleItemClick}>
                            Profile
                        </Nav.Link>
                        <Nav.Link name="logout" onClick={handleItemClick}>
                            Logout
                        </Nav.Link>
                    </Nav>
                </Container>
            </Navbar>
            <div id="navbar-component">{component}</div>
        </Container>
    );
}

export default Home;
