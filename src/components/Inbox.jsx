import React from "react";
import { useQuery } from "@apollo/client";

import MessageForm from "./MessageForm";
import { GET_CONVERSATION } from "../util/graphql";

function Inbox(props) {
    const { conversationId, userId } = props;

    const { data } = useQuery(GET_CONVERSATION, { variables: { conversationId } });
    if (!data) {
        console.log("Couldn't find conversation");
        return null;
    }

    return (
        <div className="inbox">
            {data.getConversation.messages.map((message) => (
                <div
                    key={message.id}
                    className={userId === message.userId ? "message-sent" : "message-received"}>
                    <p>{message.body}</p>
                </div>
            ))}
            <MessageForm id={data.getConversation.id} />
        </div>
    );
}

export default Inbox;
