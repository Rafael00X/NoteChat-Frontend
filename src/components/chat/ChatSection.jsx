import React, { useState } from "react";

import ConversationCard from "./ConversationCard";
import Inbox from "./Inbox";
import Menu from "./Menu";
import AddConv from "./AddConv";

function ChatSection() {
    const user = JSON.parse(localStorage.getItem("user"));
    const [convId, setConvId] = useState(null);
    const [conversations, setConversations] = useState(user.conversations);
    const useConversations = { conversations, setConversations };

    console.log(conversations);

    function callback(id) {
        setConvId(id);
    }

    return (
        <div id="chat-section">
            <div className="contact-list">
                <Menu conv={useConversations} def={user.conversations} />
                <AddConv conv={useConversations} userId={user.id} />
                {conversations.map((conv) => (
                    <ConversationCard key={conv} id={conv} callback={callback} />
                ))}
            </div>
            {convId && <Inbox conversationId={convId} userId={user.id} />}
        </div>
    );
}

export default ChatSection;
