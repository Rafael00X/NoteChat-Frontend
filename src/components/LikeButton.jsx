import React, { useEffect, useState } from "react";
import { useMutation } from "@apollo/client";
import { Button, Icon, Label } from "semantic-ui-react";

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
        <Button as="div" labelPosition="right">
            <Button color="red" basic={!liked} onClick={handleLike}>
                <Icon name="heart" />
            </Button>
            <Label as="a" basic color="red" pointing="left">
                {likeCount}
            </Label>
        </Button>
    );
}

export default LikeButton;
