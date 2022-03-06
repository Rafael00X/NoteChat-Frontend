import React from "react";
import Avatar from "react-avatar";
import { MdClose } from "react-icons/md";

import MessageForm from "./MessageForm";
import { useConversationContext } from "../../context/ConversationContext";
import { useUserContext } from "../../context/UserContext";
import { getDate, getHourAndMinute } from "../../util/momentFormats";

function Inbox(props) {
    const {
        details: { conversationId, recipientId, recipientName },
        setDetails
    } = props;

    return (
        <div id="inbox">
            <InboxHeader recipientName={recipientName} handleClose={() => setDetails(null)} />
            <MessageContainer conversationId={conversationId} />
            <MessageForm conversationId={conversationId} recipientId={recipientId} />
        </div>
    );
}

function InboxHeader(props) {
    const { handleClose, recipientName } = props;

    return (
        <div className="inbox-header">
            <Avatar
                className="header-avatar"
                maxInitials={1}
                name={recipientName}
                round={true}
                size="40px"
                textSizeRatio={2.0}
                style={{ margin: "15px" }}
            />
            <span className="name">{recipientName}</span>
            <button className="transparent" onClick={handleClose}>
                <MdClose />
            </button>
        </div>
    );
}

function MessageContainer(props) {
    const { conversationId } = props;
    const conversationContext = useConversationContext();
    const userContext = useUserContext();
    const c = conversationContext.data.find((c) => c.conversation.id === conversationId);
    const data = c ? c.conversation : null;
    return (
        <div className="message-container">
            {data &&
                data.messages.map((message) => {
                    const alignment = userContext.id === message.userId ? "right" : "left";
                    return (
                        <div key={message.id} style={{ textAlign: alignment }}>
                            <div className={"message " + alignment}>
                                <p className="message-body">{message.body}</p>
                                <p className="message-time">
                                    {"At " +
                                        getHourAndMinute(message.createdAt) +
                                        " on " +
                                        getDate(message.createdAt)}
                                </p>
                            </div>
                        </div>
                    );
                })}
        </div>
    );
}

export default Inbox;
