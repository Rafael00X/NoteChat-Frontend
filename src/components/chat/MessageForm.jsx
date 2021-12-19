import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useMutation } from "@apollo/client";
import { IoMdSend } from "react-icons/io";

import { CREATE_MESSAGE, GET_CONVERSATION } from "../../util/graphql";
import { useSocketContext } from "../../context/socketProvider";

function CommentForm(props) {
    const { id, recipientId } = props;
    const [text, setText] = useState("");
    const socket = useSocketContext();

    const [createMessage] = useMutation(CREATE_MESSAGE, {
        update(cache, result) {
            sendMessage(id, recipientId, result.data.createMessage);

            const data = cache.readQuery({
                query: GET_CONVERSATION,
                variables: { conversationId: id }
            });

            cache.writeQuery({
                query: GET_CONVERSATION,
                variables: { conversationId: id },
                data: {
                    getConversation: {
                        ...data.getConversation,
                        messages: [...data.getConversation.messages, result.data.createMessage]
                    }
                }
            });
        },
        onError(err) {
            console.log(err);
        },
        variables: {
            conversationId: id,
            body: text
        }
    });

    function onChange(event) {
        setText(event.target.value);
    }

    function onSubmit(event) {
        event.preventDefault();
        if (text.trim() !== "") {
            createMessage();
        }
        setText("");
    }

    function sendMessage(conversationId, recipient, message) {
        socket.emit("send-message", { conversationId, recipient, message });
    }

    return (
        <div className="message-form">
            <Form onSubmit={onSubmit}>
                <Form.Control
                    as="textarea"
                    rows={1}
                    id="new-message-body"
                    placeholder="Type a message..."
                    name="body"
                    value={text}
                    onChange={onChange}
                />

                <Button type="submit" disabled={text.trim() === ""}>
                    <IoMdSend />
                </Button>
            </Form>
        </div>
    );
}

export default CommentForm;
