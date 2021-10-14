import React from "react";
import { Button, Card, TextArea, Form } from "semantic-ui-react";
import { useMutation } from "@apollo/client";

import { CREATE_POST, GET_POSTS } from "../util/graphql";

function NoteForm() {
    const values = { body: "" };
    const [createPost, { loading }] = useMutation(CREATE_POST, {
        update(cache, result) {
            const data = cache.readQuery({ query: GET_POSTS });
            cache.writeQuery({
                query: GET_POSTS,
                data: {
                    getPosts: [result.data.createPost, ...data.getPosts]
                }
            });
            values.body = "";
        },
        onError(err) {
            console.log(err);
        },
        variables: values
    });

    function handleClearClick() {
        document.getElementById("addNote").value = "";
    }

    function onSubmit(event) {
        values.body = event.target.addNote.value;
        if (values.body !== "") {
            createPost({ variables: values });
        }
        document.getElementById("addNote").value = "";
    }

    return (
        <Form onSubmit={onSubmit} loading={loading ? true : false} className="note-form">
            <Card fluid className="create-note-card">
                <Card.Content>
                    <TextArea id="addNote" placeholder="Add a note..." />
                </Card.Content>

                <Card.Content extra>
                    <div className="ui two buttons">
                        <Button color="black" type="submit">
                            Post
                        </Button>
                        <Button basic color="black" onClick={handleClearClick}>
                            Clear
                        </Button>
                    </div>
                </Card.Content>
            </Card>
        </Form>
    );
}

export default NoteForm;
