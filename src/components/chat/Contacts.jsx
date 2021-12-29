import React from "react";
import { useState } from "react";

import FindUser from "./FindUser";
import FindConversation from "./FindConversation";
import ProfileCard from "./ProfileCard";
import ConversationCard from "./ConversationCard";

function Contacts(props) {
    const { allConversations, userId, callbackGetRecipient } = props;
    const [active, setActive] = useState(1);
    const [user, setUser] = useState();
    return (
        <div id="contacts">
            <ContactsHeader />
            <ButtonContainer useButton={[active, setActive]} />

            {active === 1 && (
                <Component1
                    allConversations={allConversations}
                    userId={userId}
                    callbackGetRecipient={callbackGetRecipient}
                />
            )}
            {active === 2 && (
                <Component2 userId={userId} callbackGetRecipient={callbackGetRecipient} />
            )}
        </div>
    );
}

export default Contacts;

function ContactsHeader(props) {
    return <div className="contacts-header"></div>;
}

function ButtonContainer(props) {
    const {
        useButton: [active, setActive]
    } = props;
    return (
        <div className="button-container">
            <button
                onClick={() => setActive(1)}
                style={{ backgroundColor: active === 1 ? "whitesmoke" : "grey" }}>
                Conv
            </button>
            <button
                onClick={() => setActive(2)}
                style={{ backgroundColor: active === 2 ? "whitesmoke" : "grey" }}>
                User
            </button>
        </div>
    );
}

function Component1(props) {
    const { allConversations, userId, callbackGetRecipient } = props;
    const [conversations, setConversations] = useState(allConversations);
    console.log(allConversations.map((c) => c.username));
    console.log(conversations.map((c) => c.username));

    return (
        <div className="component1">
            <div className="searchbar">
                <FindConversation setConversations={setConversations} allConvs={allConversations} />
            </div>
            <div className="conversation-list">
                {conversations.map((conv) => (
                    <ConversationCard
                        key={conv.conversationId}
                        id={conv.conversationId}
                        userId={userId}
                        callback={callbackGetRecipient}
                    />
                ))}
            </div>
        </div>
    );
}

function Component2(props) {
    const { userId, callbackGetRecipient } = props;
    const [user, setUser] = useState();

    return (
        <div className="component2">
            <div className="searchbar">
                <FindUser userId={userId} setUser={setUser} />
            </div>
            <div className="profile-card">
                {user && (
                    <ProfileCard
                        userId={user}
                        callback={callbackGetRecipient}
                        closeCallback={() => setUser()}
                    />
                )}
            </div>
        </div>
    );
}
