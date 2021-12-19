import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useMutation } from "@apollo/client";

import { CREATE_CONVERSATION } from "../../util/graphql";

function AddConv(props) {
    const { userId, conv } = props;
    const [text, setText] = useState("");
    const userIds = [userId];
    const { conversations, setConversations } = conv;

    const [createConv] = useMutation(CREATE_CONVERSATION, {
        update(cache, result) {
            const newConversations = conversations.filter(() => true);
            newConversations.push(result.data.createConversation.id);
            setConversations(newConversations);
        },
        onError(err) {
            console.log(err);
        },
        variables: {
            userIds: userIds
        }
    });

    function onChange(event) {
        setText(event.target.value);
    }

    function onSubmit(event) {
        event.preventDefault();
        if (text.trim() !== "") {
            userIds.push(text);
            createConv();
        }
        setText("");
    }

    return (
        <div className="add-conv-form">
            <Form onSubmit={onSubmit}>
                <Form.Control
                    as="textarea"
                    rows={1}
                    id="new-conv-body"
                    placeholder="Type an id..."
                    name="body"
                    value={text}
                    onChange={onChange}
                />

                <Button type="submit" disabled={text.trim() === ""}>
                    Add
                </Button>
            </Form>
        </div>
    );
}

export default AddConv;
