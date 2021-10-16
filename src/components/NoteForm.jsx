import React, { useState } from "react";
import { Button, Card, TextArea, Form } from "semantic-ui-react";
import { useMutation } from "@apollo/client";

import { CREATE_POST, GET_POSTS } from "../util/graphql";

function NoteForm() {
    const [text, setText] = useState("");

    const [createPost, { loading }] = useMutation(CREATE_POST, {
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

    function onSubmit() {
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
        <Form onSubmit={onSubmit} loading={loading ? true : false} className="note-form">
            <Card fluid>
                <Card.Content>
                    <TextArea
                        id="new-note-body"
                        placeholder="Add a note..."
                        name="body"
                        value={text}
                        onChange={onChange}
                        onBlur={toggleVisibility}
                    />
                </Card.Content>

                <Card.Content extra id="note-form-buttons">
                    <div className="ui two buttons">
                        <Button color="black" type="submit" disabled={text === ""}>
                            Post
                        </Button>
                        <Button basic color="black" type="button" onClick={handleClearClick}>
                            Clear
                        </Button>
                    </div>
                </Card.Content>
            </Card>
        </Form>
    );
}

export default NoteForm;
