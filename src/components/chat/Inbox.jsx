import React from "react";
import { useQuery } from "@apollo/client";

import MessageForm from "./MessageForm";
import { GET_CONVERSATION } from "../../util/graphql";

function Inbox(props) {
    console.log(props.details);
    const {
        userId,
        details: { conversationId, recipientId }
    } = props;

    const { data, loading } = useQuery(GET_CONVERSATION, {
        variables: { conversationId: conversationId }
    });
    if (loading) return null;

    // <MessageForm id={conversationId} userId={userId} recipientId={recipientId} />

    return (
        <div className="inbox">
            <div className="message-container">
                {data &&
                    data.getConversation.messages.map((message) => (
                        <div
                            key={message.id}
                            className={
                                "message" + (userId === message.userId ? " sent" : " received")
                            }>
                            <p>{message.body}</p>
                        </div>
                    ))}
            </div>
            <MessageForm id={conversationId} userId={userId} recipientId={recipientId} />
        </div>
    );
}

export default Inbox;
