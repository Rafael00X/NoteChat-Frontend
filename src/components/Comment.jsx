import React, { useContext } from "react";

import { AuthContext } from "../context/authorization";
import { Icon } from "semantic-ui-react";

function Comment(props) {
    const { comment, callback } = props;
    const { user } = useContext(AuthContext);

    function handleDelete() {
        callback({
            commentId: comment.id,
            userId: comment.userId
        });
    }

    return (
        <div>
            <span>
                <strong>{comment.username}</strong> - {comment.body}
            </span>
            {user.id === comment.userId ? (
                <Icon
                    name="trash alternate"
                    style={{ margin: 0, color: "red" }}
                    onClick={handleDelete}
                />
            ) : null}
        </div>
    );
}

export default Comment;
