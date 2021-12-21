import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";

import ProfileCard from "../ProfileCard";

function FindUser(props) {
    const { userId, callback } = props;
    const [text, setText] = useState("");
    const [user, setUser] = useState();
    const userIds = [userId];

    function onChange(event) {
        setText(event.target.value);
    }

    function onSubmit(event) {
        event.preventDefault();
        if (text.trim() !== "") {
            userIds.push(text);
            setUser(text);
        }
        setText("");
    }

    function closeCardCallback() {
        setUser();
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
                    Search
                </Button>
            </Form>
            {user && (
                <ProfileCard userId={user} callback={callback} closeCallback={closeCardCallback} />
            )}
        </div>
    );
}

export default FindUser;
