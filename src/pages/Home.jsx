import React, { useContext, useState, useEffect } from "react";
import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { FaPowerOff, FaUser } from "react-icons/fa";
import { useApolloClient, useQuery } from "@apollo/client";
import Avatar from "react-avatar";

import NoteSection from "../components/note/NoteSection";
import ChatSection from "../components/chat/ChatSection";
import ProfileView from "../components/ProfileView";
import ConfirmDialog from "../components/ConfirmDialog";
import { AuthContext } from "../context/authorization";
import { SocketProvider, useSocketContext } from "../context/socketProvider";
import { GET_CONVERSATIONS, GET_CONVERSATION } from "../util/graphql";

import { ConversationProvider, useConversationContext } from "../context/ConversationContext";
import { UserProvider } from "../context/UserContext";

function Home() {
    const user = JSON.parse(localStorage.getItem("user"));
    console.log("### Home Rendered ###");

    return (
        <UserProvider>
            <ConversationProvider>
                <SocketProvider id={user.id}>
                    <LandingPage />
                </SocketProvider>
            </ConversationProvider>
        </UserProvider>
    );
}

export default Home;

function LandingPage() {
    const user = JSON.parse(localStorage.getItem("user"));
    const context = useContext(AuthContext);
    const client = useApolloClient();
    const [activeItem, setActiveItem] = useState("home");
    const [conversationIds, setConversationIds] = useState(user.conversations);
    const [show, setShow] = useState(false);
    console.log("Rendered Landing Page");

    const socket = useSocketContext();
    const convContext = useConversationContext();

    useEffect(() => {
        if (socket == null) return;
        socket.on("receive-message", ({ conversationId, message }) => {
            console.log("Received message in home");
            console.log(message);
            convContext.dispatch({ type: "add-message", value: { conversationId, message } });
            /*
            if (!conversationIds.find((c) => c === conversationId)) {
                console.log("New");
                setConversationIds([...conversationIds, conversationId]);
                user.conversations.push(conversationId);
                localStorage.setItem("user", JSON.stringify(user));
            } else {
                const data = client.readQuery({
                    query: GET_CONVERSATION,
                    variables: { conversationId }
                });
                if (data) {
                    client.writeQuery({
                        query: GET_CONVERSATION,
                        variables: { conversationId },
                        data: {
                            getConversation: {
                                ...data.getConversation,
                                messages: [...data.getConversation.messages, message]
                            }
                        }
                    });
                }
            }
            */
        });
        socket.on("receive-conv", ({ conversation, users }) => {
            console.log("Received conversation in home");
            console.log({ conversation, users });
            const profile = users.find((u) => u.userId !== user.id);
            convContext.dispatch({ type: "add-conv", value: { conversation, profile } });
        });
        return () => {
            socket.off("receive-message");
            socket.off("receive-conv");
        };
    }, [socket, convContext]);

    const convData = useQuery(GET_CONVERSATIONS, {
        variables: { conversationIds },
        fetchPolicy: "no-cache"
    });

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
                                <Avatar
                                    className="profile-avatar"
                                    name={user.username}
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
                {activeItem === "chat" && convData.data ? (
                    <ChatSection convs={convData.data.getConversations} />
                ) : (
                    <h1>Loading conversations...</h1>
                )}
                {activeItem === "profile" && <ProfileView userId={user.id} />}
            </div>
        </Container>
    );
}
