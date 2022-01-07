import React, { useState } from "react";

import Contacts from "./Contacts";
import Inbox from "./Inbox";
import { useUserContext } from "../../context/UserContext";

function ChatSection() {
    const [inboxDetails, setInboxDetails] = useState(null);
    const userContext = useUserContext();
    console.log(inboxDetails);

    function callbackGetRecipient(recipientId, recipientName) {
        if (recipientId == null) {
            setInboxDetails(null);
        } else {
            const conversationId =
                userContext.id < recipientId
                    ? userContext.id + recipientId
                    : recipientId + userContext.id;
            setInboxDetails({ conversationId, recipientId, recipientName });
        }
    }

    return (
        <div id="chat-section">
            <div className="contact-list">
                <Contacts userId={userContext.id} callbackGetRecipient={callbackGetRecipient} />
            </div>
            {inboxDetails && <Inbox details={inboxDetails} setDetails={setInboxDetails} />}
        </div>
    );
}

export default ChatSection;
