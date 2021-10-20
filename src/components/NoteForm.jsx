import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useMutation } from "@apollo/client";

import { CREATE_POST, GET_POSTS } from "../util/graphql";

function NoteForm() {
    const [text, setText] = useState("");

    const [createPost] = useMutation(CREATE_POST, {
        update(cache, result) {
            const data = cache.readQuery({ query: GET_POSTS });
            cache.writeQuery({
                query: GET_POSTS,
                data: {
                    getPosts: [result.data.createPost, ...data.getPosts]
                }
            });
        },
        onError(err) {
            console.log(err);
        },
        variables: { body: text }
    });

    function onChange(event) {
        setText(event.target.value);
    }

    function onSubmit(event) {
        event.preventDefault();
        if (text !== "") {
            createPost();
        }
        setText("");
    }

    function handleClearClick() {
        setText("");
    }

    function toggleVisibility() {
        //document.getElementById("note-form-buttons").classList.toggle("absent");
    }

    return (
        <Form onSubmit={onSubmit} className="note-form">
            <Form.Control
                as="textarea"
                rows={1}
                id="new-note-body"
                placeholder="Add a note..."
                name="body"
                value={text}
                onChange={onChange}
                onBlur={toggleVisibility}
            />

            <div className="ui two buttons">
                <Button variant="dark" type="submit" disabled={text === ""}>
                    Post
                </Button>
                <Button type="button" onClick={handleClearClick}>
                    Clear
                </Button>
            </div>
        </Form>
    );
}

export default NoteForm;
