import React from "react";
import { useState } from "react";
import { RiMessage3Fill, RiUserAddFill } from "react-icons/ri";

import FindUser from "./FindUser";
import FindConversation from "./FindConversation";
import ProfileCard from "./ProfileCard";
import ConversationCard from "./ConversationCard";
import { useConversationContext } from "../../context/ConversationContext";
import { useEffect } from "react";

function Contacts(props) {
    const { userId, callbackGetRecipient } = props;
    const [active, setActive] = useState(1);
    return (
        <div id="contacts">
            <ContactsHeader />
            <ButtonContainer useButton={[active, setActive]} />

            {active === 1 && <Component1 callbackGetRecipient={callbackGetRecipient} />}
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
                <RiMessage3Fill />
                &nbsp;&nbsp;Conversations
            </button>
            <button
                onClick={() => setActive(2)}
                style={{ backgroundColor: active === 2 ? "whitesmoke" : "grey" }}>
                <RiUserAddFill />
                &nbsp;&nbsp;New Contact
            </button>
        </div>
    );
}

function Component1(props) {
    const { callbackGetRecipient } = props;
    const conversationContext = useConversationContext();
    const [conversations, setConversations] = useState([]);
    const [searchMode, setSearchMode] = useState(false);
    const allConversations = conversationContext.data;

    const convs = searchMode ? conversations : allConversations;

    useEffect(() => {
        if (!searchMode) setConversations(allConversations);
    }, [allConversations]);

    return (
        <div className="component1">
            <div className="searchbar">
                <FindConversation
                    setConversations={setConversations}
                    useSearchMode={[searchMode, setSearchMode]}
                    allConvs={allConversations}
                />
            </div>
            <div className="conversation-list">
                {convs.map((conv) => (
                    <ConversationCard
                        key={conv.conversation.id}
                        id={conv.conversation.id}
                        conversation={conv}
                        searchMode={searchMode}
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
