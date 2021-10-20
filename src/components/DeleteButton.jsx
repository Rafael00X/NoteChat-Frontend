import React from "react";
import { useMutation } from "@apollo/client";
import { Button } from "react-bootstrap";

import { GET_POSTS, DELETE_POST } from "../util/graphql";

function DeleteButton(props) {
    const { postId } = props;

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

    function handleDelete(event) {
        //event.target.classList.add("loading");
        deletePost();
    }

    return (
        <Button variant="outline-warning" onClick={handleDelete}>
            Delete
        </Button>
    );
}

export default DeleteButton;
