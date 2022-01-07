import React from "react";
import { useQuery } from "@apollo/client";
import Avatar from "react-avatar";

import { GET_PROFILE, GET_CONVERSATION } from "../../util/graphql";

/*
function ConversationCard(props) {
    const { id, userId, callback } = props;
    let recipientId = null;
    let name = "";
    let lastMessage = "";

    const conversationQuery = useQuery(GET_CONVERSATION, { variables: { conversationId: id } });

    if (!conversationQuery.loading && conversationQuery.data) {
        let data = conversationQuery.data.getConversation;
        recipientId = data.userIds.find((item) => item !== userId);
        lastMessage = data.messages.slice(-1)[0].body;
    }

    const profileQuery = useQuery(GET_PROFILE, {
        skip: !recipientId,
        variables: { userId: recipientId }
    });

    if (!profileQuery.loading && profileQuery.data) {
        name = profileQuery.data.getProfile.username;
    }

    function handleClick() {
        callback(recipientId);
    }

    return (
        <div className="conversation-card" onClick={handleClick}>
            <Avatar
                name={name}
                size="40px"
                round="25px"
                textSizeRatio={2.0}
                style={{ display: "inline-block", margin: "15px" }}
            />
            <div className="body">
                <span className="name">{name}</span>
                <span className="last-message">{lastMessage}</span>
            </div>
        </div>
    );
}
*/

function ConversationCard(props) {
    const {
        conversation: { conversation, profile },
        searchMode,
        callback
    } = props;
    const recipientId = profile.userId;
    const name = profile.username;
    const lastMessage = searchMode
        ? ""
        : conversation.messages[conversation.messages.length - 1].body;

    function handleClick() {
        callback(recipientId);
    }

    return (
        <div className="conversation-card" onClick={handleClick}>
            <Avatar
                name={name}
                maxInitials={1}
                size="40px"
                round="25px"
                textSizeRatio={2.0}
                style={{ display: "inline-block", margin: "15px" }}
            />
            <div className="body">
                <span className="name">{name}</span>
                <span className="last-message">{lastMessage}</span>
            </div>
        </div>
    );
}
export default ConversationCard;
