import React, { useContext, useEffect, useReducer } from "react";
import { useQuery } from "@apollo/client";
import clone from "just-clone";

import { useUserContext } from "./UserContext";
import { FETCH_CONVERSATIONS } from "../util/graphql";

const SET = "set";
const ADD_MESSAGE = "add-message";
const ADD_CONVERSATION = "add-conv";
function reducer(state, action) {
    switch (action.type) {
        case SET:
            return action.value;
        case ADD_MESSAGE:
            console.log("# Inside 'add-message' reducer");
            const { conversationId, message } = action.value;
            const conv = clone(state.find((c) => c.conversation.id === conversationId));
            if (!conv) {
                console.log("# Couldn't find conversation");
                return state;
            }
            conv.conversation.messages.push(message);
            return [conv].concat(state.filter((c) => c.conversation.id !== conversationId));
        case ADD_CONVERSATION:
            console.log("# Inside 'add-conv' reducer");
            const c = action.value;
            c.__typename = "FetchConv";
            return [action.value, ...state];
        default:
            return state;
    }
}

const ConversationContext = React.createContext({
    data: [],
    addConversation: () => {},
    addMessage: () => {}
});
const useConversationContext = () => useContext(ConversationContext);

function ConversationProvider({ children }) {
    console.log("# ConversationContext rendered #");
    const userContext = useUserContext();
    const [conversations, dispatch] = useReducer(reducer, []);

    const conversationIds = userContext.conversations;
    const { data } = useQuery(FETCH_CONVERSATIONS, {
        fetchPolicy: "no-cache",
        skip: conversationIds === null || conversationIds === undefined,
        variables: { conversationIds }
    });
    useEffect(() => {
        console.log("Conversation data: ");
        console.log(data);
        if (data !== undefined && data !== null && data.length !== 0)
            dispatch({ type: SET, value: data.fetchConversations });
    }, [data]);

    function addMessage(conversationId, message) {
        dispatch({ type: ADD_MESSAGE, value: { conversationId, message } });
    }

    function addConversation(conversation, profile) {
        dispatch({ type: ADD_CONVERSATION, value: { conversation, profile } });
    }

    return (
        <ConversationContext.Provider value={{ data: conversations, addConversation, addMessage }}>
            {children}
        </ConversationContext.Provider>
    );
}

export { useConversationContext, ConversationProvider };
