import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { Button, Card, Form } from "react-bootstrap";

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
        <Card.Body className="note-comments">
            <Form onSubmit={onSubmit}>
                <Form.Control
                    className="comment-textarea"
                    as="textarea"
                    rows={1}
                    name="body"
                    placeholder="Enter comment..."
                    type="text"
                    value={text}
                    onChange={onChange}
                />
                <Button className="comment-send-btn" type="submit">
                    Post
                </Button>
            </Form>
            <div>
                {comments.map((comment) => (
                    <Comment key={comment.id} comment={comment} callback={deleteCallback} />
                ))}
            </div>
        </Card.Body>
    );
}

export default NoteComments;
