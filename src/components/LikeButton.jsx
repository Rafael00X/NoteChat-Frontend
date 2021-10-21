import React, { useEffect, useState } from "react";
import { useMutation } from "@apollo/client";
import { Button } from "react-bootstrap";
import { FaHeart } from "react-icons/fa";

import { LIKE_POST } from "../util/graphql";

function LikeButton(props) {
    const { likeCount, likes, userId, postId } = props;
    const [liked, setLiked] = useState(false);

    const [likePost] = useMutation(LIKE_POST, {
        onError(err) {
            console.log(err);
        },
        variables: {
            postId
        }
    });

    function handleLike() {
        likePost();
    }

    useEffect(() => {
        if (likes.find((like) => like.userId === userId)) {
            setLiked(true);
        } else {
            setLiked(false);
        }
    }, [likes, userId]);

    return (
        <Button className={"like-btn" + (liked ? " filled" : "")} onClick={handleLike}>
            <span>
                <FaHeart />
                &nbsp;&nbsp;&nbsp;{likeCount}
            </span>
        </Button>
    );
}

export default LikeButton;
//variant={liked ? "danger" : "outline-danger"}
