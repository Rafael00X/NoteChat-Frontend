import React, { useState } from "react";

import ConversationCard from "./ConversationCard";
import Inbox from "./Inbox";

function ChatSection() {
    const [convId, setConvId] = useState(null);

    function callback(id) {
        setConvId(id);
    }

    const user = JSON.parse(localStorage.getItem("user"));
    return (
        <div id="chat-section">
            <div className="contact-list">
                <h4>Contact List</h4>
                {user.conversations.map((conv) => (
                    <ConversationCard key={conv} id={conv} callback={callback} />
                ))}
            </div>
            {convId && <Inbox conversationId={convId} userId={user.id} />}
        </div>
    );
}

export default ChatSection;
