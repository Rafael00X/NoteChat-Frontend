import React, { useContext, useState } from "react";
import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { FaPowerOff, FaUser } from "react-icons/fa";
import { useApolloClient } from "@apollo/client";
import Avatar from "react-avatar";

import NoteSection from "../components/note/NoteSection";
import ChatSection from "../components/chat/ChatSection";
import ProfileView from "../components/ProfileView";
import ConfirmDialog from "../components/ConfirmDialog";
import { AuthContext } from "../context/authorization";
import { SocketProvider } from "../context/socketProvider";

import { ConversationProvider } from "../context/ConversationContext";
import { UserProvider, useUserContext } from "../context/UserContext";

function Home() {
    console.log("### Home Rendered ###");

    return (
        <UserProvider>
            <ConversationProvider>
                <SocketProvider>
                    <LandingPage />
                </SocketProvider>
            </ConversationProvider>
        </UserProvider>
    );
}

export default Home;

function LandingPage() {
    const userContext = useUserContext();
    const context = useContext(AuthContext);
    const client = useApolloClient();
    const [activeItem, setActiveItem] = useState("home");
    const [show, setShow] = useState(false);
    console.log("Rendered Landing Page");

    function logoutCallback() {
        localStorage.removeItem("user");
        client.cache.reset();
        context.logout();
    }

    function handleItemClick(event) {
        const name = event.target.getAttribute("name");
        if (activeItem === name) return;

        switch (name) {
            case "home":
            case "chat":
            case "profile":
                setActiveItem(name);
                break;
            case "logout":
                setShow(true);
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
                            src="https://img.icons8.com/color/48/000000/communication.png"
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
                                <Avatar
                                    className="profile-avatar"
                                    name={userContext.username}
                                    maxInitials={1}
                                    size="30px"
                                    round={true}
                                    textSizeRatio={1.75}
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

            <ConfirmDialog
                title="Logout"
                body="Are you sure you want to logout?"
                callback={logoutCallback}
                state={[show, setShow]}
            />

            <div id="navbar-component">
                {activeItem === "home" && <NoteSection />}
                {activeItem === "chat" && <ChatSection />}
                {activeItem === "profile" && <ProfileView userId={userContext.id} />}
            </div>
        </Container>
    );
}
