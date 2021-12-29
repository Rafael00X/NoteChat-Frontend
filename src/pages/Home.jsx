import React, { useContext, useState } from "react";
import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { FaPowerOff, FaUser } from "react-icons/fa";
import { useQuery } from "@apollo/client";
import Avatar from "react-avatar";

import NoteSection from "../components/note/NoteSection";
import ChatSection from "../components/chat/ChatSection";
import ProfileView from "../components/ProfileView";
import ConfirmDialog from "../components/ConfirmDialog";
import { AuthContext } from "../context/authorization";
import { SocketProvider } from "../context/socketProvider";
import { GET_CONVERSATIONS } from "../util/graphql";

function Home() {
    const context = useContext(AuthContext);
    const [activeItem, setActiveItem] = useState("home");
    const [component, setComponent] = useState(<NoteSection />);
    const [show, setShow] = useState(false);

    const user = JSON.parse(localStorage.getItem("user"));
    console.log(user);
    const convData = useQuery(GET_CONVERSATIONS, {
        variables: { conversationIds: user.conversations }
    });

    function logoutCallback() {
        localStorage.removeItem("user");
        context.logout();
    }

    function handleItemClick(event) {
        const name = event.target.getAttribute("name");

        switch (name) {
            case "home":
                setComponent(<NoteSection />);
                setActiveItem(name);
                break;
            case "chat":
                setComponent(<ChatSection convs={convData.data.getConversations} />);
                setActiveItem(name);
                break;
            case "profile":
                setComponent(<ProfileView userId={user.id} />);
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
        <SocketProvider id={user.id}>
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
                            {convData.data && (
                                <Nav.Link
                                    className="me-auto"
                                    name="chat"
                                    eventKey="chat"
                                    onClick={handleItemClick}>
                                    Chat
                                </Nav.Link>
                            )}
                            <NavDropdown
                                align={{ lg: "end" }}
                                title={
                                    <Avatar
                                        className="profile-avatar"
                                        name={user.username}
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

                <div id="navbar-component">{component}</div>
            </Container>
        </SocketProvider>
    );
}

export default Home;
