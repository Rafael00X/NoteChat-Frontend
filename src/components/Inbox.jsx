import React, { useEffect } from "react";
import { useApolloClient, useQuery } from "@apollo/client";

import MessageForm from "./MessageForm";
import { GET_CONVERSATION } from "../util/graphql";
import { useSocketContext } from "../context/socketProvider";

function Inbox(props) {
    const { conversationId, userId } = props;
    const socket = useSocketContext();
    const client = useApolloClient();

    useEffect(() => {
        if (socket == null) return;
        socket.on("receive-message", ({ conversationId, message }) => {
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
        });
        return () => socket.off("receive-message");
    }, [socket, client]);

    const { data, loading } = useQuery(GET_CONVERSATION, { variables: { conversationId } });
    if (loading) return null;
    if (!data) {
        console.log("Couldn't find conversation");
        return null;
    }

    const recipientId = data.getConversation.userIds.find((id) => id !== userId);

    return (
        <div className="inbox">
            {data.getConversation.messages.map((message) => (
                <div
                    key={message.id}
                    className={userId === message.userId ? "message-sent" : "message-received"}>
                    <p>{message.body}</p>
                </div>
            ))}
            <MessageForm id={data.getConversation.id} userId={userId} recipientId={recipientId} />
        </div>
    );
}

export default Inbox;
