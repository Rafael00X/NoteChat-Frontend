import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { Button } from "react-bootstrap";

import { GET_POSTS, DELETE_POST } from "../util/graphql";
import ConfirmDialog from "./ConfirmDialog";

function DeleteButton(props) {
    const { postId } = props;
    const [show, setShow] = useState(false);

    const [deletePost] = useMutation(DELETE_POST, {
        update(cache, result) {
            const data = cache.readQuery({ query: GET_POSTS });
            console.log(result);
            const newData = data.getPosts.filter((post) => post.id !== postId);
            cache.writeQuery({
                query: GET_POSTS,
                data: {
                    getPosts: newData
                }
            });
        },
        onError(err) {
            console.log(err);
            // TODO - Remove loading icon
        },
        variables: {
            postId
        }
    });

    function deletePostCallback() {
        deletePost();
    }

    function handleDelete(event) {
        //event.target.classList.add("loading");
        setShow(true);
    }

    return (
        <>
            <Button variant="warning" onClick={handleDelete}>
                Delete
            </Button>

            <ConfirmDialog
                title="Delete Post"
                body="Are you sure you want to delete this post?"
                callback={deletePostCallback}
                state={[show, setShow]}
            />
        </>
    );
}

export default DeleteButton;
