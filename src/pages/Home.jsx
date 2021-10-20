import React, { useContext, useState } from "react";
import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { FaPowerOff, FaUser } from "react-icons/fa";

import NoteSection from "../components/NoteSection";
import ChatSection from "../components/ChatSection";
import { AuthContext } from "../context/authorization";

function Home() {
    const context = useContext(AuthContext);
    const [activeItem, setActiveItem] = useState("home");
    const [component, setComponent] = useState(<NoteSection />);

    function handleItemClick(event) {
        const name = event.target.getAttribute("name");

        switch (name) {
            case "home":
                setComponent(<NoteSection />);
                setActiveItem(name);
                break;
            case "chat":
                setComponent(<ChatSection />);
                setActiveItem(name);
                break;
            case "profile":
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
                    <Nav activeKey={activeItem} id="navbar-items" style={{ width: "100%" }}>
                        <Nav.Link name="home" eventKey="home" onClick={handleItemClick}>
                            Home
                        </Nav.Link>
                        <Nav.Link
                            className="me-auto"
                            name="chat"
                            eventKey="chat"
                            onClick={handleItemClick}>
                            Chat
                        </Nav.Link>
                        <NavDropdown
                            align={{ lg: "end" }}
                            title={
                                <img
                                    className="comment-avatar"
                                    alt=""
                                    src="https://react.semantic-ui.com/images/avatar/large/molly.png"
                                    style={{ borderRadius: "50%", width: "30px", height: "30px" }}
                                />
                            }>
                            <NavDropdown.Item name="profile" onClick={handleItemClick}>
                                <FaUser />
                                &nbsp; Profile
                            </NavDropdown.Item>
                            <NavDropdown.Item name="logout" onClick={handleItemClick}>
                                <FaPowerOff />
                                &nbsp; Logout
                            </NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                </Container>
            </Navbar>
            <div id="navbar-component">{component}</div>
        </Container>
    );
}

export default Home;
