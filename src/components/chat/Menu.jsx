import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { IoMdSend } from "react-icons/io";

function Menu(props) {
    const { conv, def } = props;
    const [active, setActive] = useState(false);
    const [component, setComponent] = useState();

    function handleClick() {
        if (active) {
            setActive(false);
            setComponent();
            conv.setConversations(def);
        } else {
            setActive(true);
            setComponent(<FindConversation conv={conv} />);
        }
    }

    return (
        <div>
            <div>
                <Button onClick={() => handleClick()}>Search</Button>
            </div>
            {component}
        </div>
    );
}

function FindConversation(props) {
    const { conversations, setConversations } = props.conv;
    const [text, setText] = useState("");

    function onChange(event) {
        const v = event.target.value;
        setText(v);
        const newConversations = conversations.filter((conv) => conv.startsWith(v));
        setConversations(newConversations);
    }

    return (
        <Form.Control
            as="textarea"
            rows={1}
            placeholder="Enter name search..."
            name="body"
            value={text}
            onChange={onChange}
        />
    );
}

export default Menu;
