import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { Button, Form } from "react-bootstrap";

import Comment from "./Comment";
import { CREATE_COMMENT, DELETE_COMMENT } from "../util/graphql";

function NoteComments(props) {
    const { comments, postId } = props;
    const [text, setText] = useState("");

    const [createComment] = useMutation(CREATE_COMMENT, {
        variables: {
            postId: postId,
            body: text
        },
        onError(err) {
            console.log(err);
        }
    });

    const [deleteComment] = useMutation(DELETE_COMMENT, {
        onError(err) {
            console.log(err);
        }
    });

    function deleteCallback({ commentId, userId }) {
        deleteComment({
            variables: {
                commentId: commentId,
                postId: postId,
                userId: userId
            }
        });
    }

    function onChange(event) {
        setText(event.target.value);
    }

    function onSubmit(event) {
        event.preventDefault();
        createComment();
        setText("");
    }

    return (
        <div className="note-comments">
            <Form onSubmit={onSubmit}>
                <Form.Control
                    as="textarea"
                    rows={1}
                    name="body"
                    placeholder="Enter comment..."
                    type="text"
                    value={text}
                    onChange={onChange}
                />
                <Button type="submit">Post</Button>
            </Form>
            <div>
                {comments.map((comment) => (
                    <Comment key={comment.id} comment={comment} callback={deleteCallback} />
                ))}
            </div>
        </div>
    );
}

export default NoteComments;
