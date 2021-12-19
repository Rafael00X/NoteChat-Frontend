import React from "react";

function ConversationCard(props) {
    const { id, callback } = props;

    function handleClick() {
        callback(id);
    }

    return (
        <div className="conversation-card" onClick={handleClick}>
            <img
                className="avatar"
                alt=""
                src="https://react.semantic-ui.com/images/avatar/large/molly.png"
                style={{ width: "50px", height: "50px" }}
            />
            <div className="body">
                <span className="name">{id}</span>
            </div>
        </div>
    );
}

export default ConversationCard;
