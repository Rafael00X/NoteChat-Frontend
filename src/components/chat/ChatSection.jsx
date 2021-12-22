import React, { useState, useEffect } from "react";
import { useApolloClient } from "@apollo/client";

import ConversationCard from "./ConversationCard";
import Inbox from "./Inbox";
import Menu from "./Menu";
import FindUser from "./FindUser";
import FindConversation from "./FindConversation";
import { GET_CONVERSATION } from "../../util/graphql";
import { useSocketContext } from "../../context/socketProvider";

function ChatSection() {
    const user = JSON.parse(localStorage.getItem("user"));
    const [convId, setConvId] = useState(null);
    const [conversations, setConversations] = useState(user.conversations);
    const [recipientId, setRecipientId] = useState(null);
    const [searchBox, setSearchBox] = useState(null);

    const socket = useSocketContext();
    const client = useApolloClient();

    useEffect(() => {
        if (socket == null) return;
        socket.on("receive-message", ({ conversationId, message }) => {
            if (!conversations.find((c) => c === conversationId)) {
                console.log("New");
                setConversations([...conversations, conversationId]);
                user.conversations.push(conversationId);
                localStorage.setItem("user", JSON.stringify(user));
            } else {
                console.log(message);
                const data = client.readQuery({
                    query: GET_CONVERSATION,
                    variables: { conversationId }
                });
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
        });
        return () => socket.off("receive-message");
    }, [socket, client]);

    console.log(conversations);

    function callbackConvId(id) {
        setConvId(id);
        setRecipientId(null);
    }

    function callbackRecipientId(id) {
        if (user.id < id) {
            setConvId(user.id + id);
        } else {
            setConvId(id + user.id);
        }
        setRecipientId(id);
    }

    return (
        <div id="chat-section">
            <div className="contact-list">
                <Menu searchBox={searchBox} setSearchBox={setSearchBox} />
                {(searchBox === "User" && (
                    <FindUser userId={user.id} callback={callbackRecipientId} />
                )) ||
                    (searchBox === "Conv" && (
                        <FindConversation
                            allConvs={user.conversations}
                            setConversations={setConversations}
                        />
                    ))}
                {conversations.map((conv) => (
                    <ConversationCard key={conv} id={conv} callback={callbackConvId} />
                ))}
            </div>
            {(convId || recipientId) && (
                <Inbox convId={convId} userId={user.id} recId={recipientId} />
            )}
        </div>
    );
}

export default ChatSection;
