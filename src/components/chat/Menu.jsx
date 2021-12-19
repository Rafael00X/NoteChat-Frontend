import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { IoMdSend } from "react-icons/io";

function Menu(props) {
    const { conv, def } = props;
    const [mode, setMode] = useState("");
    const [component, setComponent] = useState();

    function handleClick(newMode) {
        console.log(newMode);
        if (mode === newMode) {
            setMode("");
            setComponent();
            conv.setConversations(def);
        } else {
            switch (newMode) {
                case "Add":
                    setMode(newMode);
                    setComponent(<AddConversation />);
                    break;
                case "Search":
                    setMode(newMode);
                    setComponent(<FindConversation conv={conv} />);
                    break;
                default:
                    setMode("");
                    setComponent();
                    conv.setConversations(def);
            }
        }
    }

    return (
        <div>
            <div>
                <Button onClick={() => handleClick("Add")}>Add</Button>
                <Button onClick={() => handleClick("Search")}>Search</Button>
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

function AddConversation() {
    const [text, setText] = useState("");

    function onSubmit() {
        // TODO
    }

    function onChange(event) {
        setText(event.target.value);
    }

    return (
        <Form onSubmit={onSubmit}>
            <Form.Control
                as="textarea"
                rows={1}
                placeholder="Enter user ID to search..."
                name="body"
                value={text}
                onChange={onChange}
            />

            <Button type="submit" disabled={text.trim() === ""}>
                <IoMdSend />
            </Button>
        </Form>
    );
}

export default Menu;
