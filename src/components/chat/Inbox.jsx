import React from "react";
import { useQuery } from "@apollo/client";

import MessageForm from "./MessageForm";
import { GET_CONVERSATION } from "../../util/graphql";

function Inbox(props) {
    const { convId, userId, recId } = props;
    let recipientId;

    const { data, loading } = useQuery(GET_CONVERSATION, { variables: { conversationId: convId } });
    if (loading) return null;
    if (!data) {
        recipientId = recId;
    } else {
        recipientId = data.getConversation.userIds.find((id) => id !== userId);
    }

    //console.log("convId: " + convId + ", userId: " + userId + ", recipientId: " + recipientId);

    return (
        <div className="inbox">
            {data &&
                data.getConversation.messages.map((message) => (
                    <div
                        key={message.id}
                        className={userId === message.userId ? "message-sent" : "message-received"}>
                        <p>{message.body}</p>
                    </div>
                ))}
            <MessageForm id={convId} userId={userId} recipientId={recipientId} />
        </div>
    );
}

export default Inbox;
