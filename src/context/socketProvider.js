import React, { useState, useEffect, useContext, createContext } from "react";
import io from "socket.io-client";

import { useConversationContext } from "./ConversationContext";
import { useUserContext } from "./UserContext";
import { socketServerUrl } from "../config";

const URL = socketServerUrl;

const SocketContext = createContext();
function useSocketContext() {
    return useContext(SocketContext);
}

const RECEIVE_MESSAGE = "receive-message";
const RECEIVE_CONVERSATION = "receive-conv";

function SocketProvider({ children }) {
    console.log("# SocketContext rendered #");
    const conversationContext = useConversationContext();
    const userContext = useUserContext();
    const [socket, setSocket] = useState();
    useEffect(() => {
        const newSocket = io(URL, { query: { id: userContext.id } });

        newSocket.on(RECEIVE_MESSAGE, ({ conversationId, message }) => {
            console.log("Received message:");
            console.log(message);
            conversationContext.addMessage(conversationId, message);
        });

        newSocket.on(RECEIVE_CONVERSATION, ({ conversation, users }) => {
            console.log("Received conversation:");
            const profile = users.find((u) => u.userId !== userContext.id);
            conversationContext.addConversation(conversation, profile);
        });

        setSocket(newSocket);
        return () => {
            newSocket.off(RECEIVE_CONVERSATION);
            newSocket.off(RECEIVE_MESSAGE);
            newSocket.close();
        };
    }, [conversationContext, userContext]);

    return <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>;
}

export { useSocketContext, SocketProvider };
