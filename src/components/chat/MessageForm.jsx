import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { IoMdSend } from "react-icons/io";

import { CREATE_MESSAGE } from "../../util/graphql";
import { useSocketContext } from "../../context/socketProvider";

function MessageForm(props) {
    const { conversationId, recipientId } = props;
    const [text, setText] = useState("");
    const socket = useSocketContext();

    const [size, setSize] = useState(26);

    const [createMessage] = useMutation(CREATE_MESSAGE, {
        update(cache, result) {
            const data = result.data.createMessage;
            console.log(data);
            if (data.conversation) {
                socket.emit("send-conv", {
                    recipient: recipientId,
                    conversation: data.conversation,
                    users: data.users
                });
            } else {
                socket.emit("send-message", {
                    recipient: recipientId,
                    conversationId,
                    message: data.message
                });
            }
        },
        onError(err) {
            console.log(err);
        },
        variables: {
            conversationId,
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
}

export default MessageForm;
