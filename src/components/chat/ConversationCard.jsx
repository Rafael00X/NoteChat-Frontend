import React from "react";
import Avatar from "react-avatar";

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
        callback(recipientId, name);
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
