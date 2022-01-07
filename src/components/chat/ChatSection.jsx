import React, { useState, useEffect } from "react";
import { useApolloClient } from "@apollo/client";

import Contacts from "./Contacts";
import Inbox from "./Inbox";
import { useSocketContext } from "../../context/socketProvider";

function ChatSection(props) {
    const { convs } = props;
    const [allConversations, setAllConversations] = useState(convs);
    const [inboxDetails, setInboxDetails] = useState(null);
    const user = JSON.parse(localStorage.getItem("user"));
    console.log("Rendered ChatSection");
    console.log(convs.length);

    const socket = useSocketContext();
    const client = useApolloClient();

    useEffect(() => {
        setAllConversations(convs);
    }, [convs]);

    useEffect(() => {
        if (socket == null) return;
        socket.on("receive-message", ({ conversationId, message, senderId, senderName }) => {
            if (allConversations.find((c) => c.conversationId === conversationId)) {
                setAllConversations(
                    [allConversations.find((c) => c.conversationId === conversationId)].concat(
                        allConversations.filter((c) => c.conversationId !== conversationId)
                    )
                );
            }
        });
        return () => socket.off("receive-message");
    }, [socket, client]);

    function callbackGetRecipient(recipientId) {
        if (recipientId == null) {
            setInboxDetails(null);
        } else {
            const conversationId =
                user.id < recipientId ? user.id + recipientId : recipientId + user.id;
            setInboxDetails({ conversationId, recipientId });
        }
    }

    return (
        <div id="chat-section">
            <div className="contact-list">
                <Contacts userId={user.id} callbackGetRecipient={callbackGetRecipient} />
            </div>
            {inboxDetails && (
                <Inbox
                    userId={user.id}
                    username={user.username}
                    details={inboxDetails}
                    setDetails={setInboxDetails}
                />
            )}
        </div>
    );

    /*

    return (
        <div id="chat-section">
            <div className="contact-list">
                <Menu searchBox={searchBox} setSearchBox={setSearchBox} />
                {(searchBox === "User" && (
                    <FindUser userId={user.id} callback={callbackGetRecipient} />
                )) ||
                    (searchBox === "Conv" && (
                        <FindConversation
                            allConvs={user.conversations}
                            setConversations={setConversations}
                        />
                    ))}
                <div className="conversation-list">
                    {conversations.map((conv) => (
                        <ConversationCard
                            key={conv}
                            id={conv}
                            userId={user.id}
                            callback={callbackGetRecipient}
                        />
                    ))}
                </div>
            </div>
            {inboxDetails && (
                <Inbox userId={user.id} details={inboxDetails} setDetails={setInboxDetails} />
            )}
        </div>
    );
    */
}

export default ChatSection;
