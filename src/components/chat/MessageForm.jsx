import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { IoMdSend } from "react-icons/io";

import { CREATE_MESSAGE } from "../../util/graphql";
import { useSocketContext } from "../../context/socketProvider";

function MessageForm(props) {
    const { id, userId, username, recipientId } = props;
    const [text, setText] = useState("");
    const socket = useSocketContext();

    const [size, setSize] = useState(26);

    const [createMessage] = useMutation(CREATE_MESSAGE, {
        update(cache, result) {
            socket.emit("send-message", {
                conversationId: id,
                recipient: recipientId,
                senderId: userId,
                senderName: username,
                message: result.data.createMessage
            });
            //sendMessage(id, recipientId, result.data.createMessage);
        },
        onError(err) {
            console.log(err);
        },
        variables: {
            conversationId: id,
            recipientId,
            body: text
        }
    });

    function onChange({ target }) {
        setText(target.value);

        const minRows = target.getAttribute("minrows"),
            maxRows = target.getAttribute("maxrows"),
            rowSize = 24;

        target.rows = minRows;
        let currRows = target.scrollHeight / rowSize;
        if (currRows < minRows) currRows = minRows;
        else if (currRows > maxRows) currRows = maxRows;
        target.rows = currRows;
        setSize(target.offsetHeight);

        /*

        if (!target._baseScrollHeight) {
            target.value = "";
            target._baseScrollHeight = target.scrollHeight;
            target.value = text;
        }

        const minRows = target.getAttribute("minrows"),
            maxRows = target.getAttribute("maxrows"),
            rowSize = 24;

        target.rows = minRows;
        let currRows = (target.scrollHeight - target._baseScrollHeight) / rowSize + 1;
        if (currRows < minRows) currRows = minRows;
        else if (currRows > maxRows) currRows = maxRows;
        target.rows = currRows;
        setSize(target.scrollHeight);
        console.log([target.scrollHeight, currRows, target._baseScrollHeight, target.scrollHeight]);
        */
    }

    function onSubmit(event) {
        event.preventDefault();
        if (text.trim() !== "") {
            createMessage();
        }
        setText("");
    }

    return (
        <div className="message-form">
            <div
                className="cover"
                style={{ display: "block", height: size + "px", marginBottom: "auto" }}>
                <form onSubmit={onSubmit}>
                    <div className="search" style={{ height: size + "px" }}>
                        <textarea
                            rows="1"
                            minrows="1"
                            maxrows="3"
                            value={text}
                            placeholder="Type a message"
                            onChange={onChange}
                            style={{ overflowY: "scroll" }}
                        />
                        <button type="submit" disabled={text.trim() === ""}>
                            <IoMdSend />
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );

    /*
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
    */
}

export default MessageForm;
