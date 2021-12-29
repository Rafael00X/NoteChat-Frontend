import React from "react";
import { useQuery } from "@apollo/client";
import Avatar from "react-avatar";
import { MdClose } from "react-icons/md";

import MessageForm from "./MessageForm";
import { GET_CONVERSATION, GET_PROFILE } from "../../util/graphql";

function Inbox(props) {
    console.log(props.details);
    const {
        userId,
        username,
        details: { conversationId, recipientId },
        setDetails
    } = props;

    const profileData = useQuery(GET_PROFILE, { variables: { userId: recipientId } });
    const conversationData = useQuery(GET_CONVERSATION, {
        variables: { conversationId: conversationId }
    });

    return (
        <div className="inbox">
            <InboxHeader profileData={profileData} handleClose={() => setDetails(null)} />
            <MessageContainer conversationData={conversationData} userId={userId} />
            <MessageForm
                id={conversationId}
                userId={userId}
                username={username}
                recipientId={recipientId}
            />
        </div>
    );
}

function InboxHeader(props) {
    const {
        handleClose,
        profileData: { data }
    } = props;

    return (
        <div className="inbox-header">
            {data && (
                <>
                    <Avatar
                        className="header-avatar"
                        maxInitials={1}
                        name={data.getProfile.username}
                        round={true}
                        size="40px"
                        textSizeRatio={2.0}
                        style={{ margin: "15px" }}
                    />
                    <span className="name">{data.getProfile.username}</span>
                    <button className="transparent" onClick={handleClose}>
                        <MdClose />
                    </button>
                </>
            )}
        </div>
    );
}

function MessageContainer(props) {
    const {
        conversationData: { data },
        userId
    } = props;

    return (
        <div className="message-container">
            {data &&
                data.getConversation.messages.map((message) => {
                    const alignment = userId === message.userId ? "right" : "left";
                    return (
                        <div key={message.id} style={{ textAlign: alignment }}>
                            <div className={"message " + alignment}>
                                <p className="message-body">{message.body}</p>
                                <p className="message-time">{message.createdAt}</p>
                            </div>
                        </div>
                    );
                })}
        </div>
    );
}

export default Inbox;
