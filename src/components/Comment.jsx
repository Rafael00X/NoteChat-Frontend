import React, { useContext } from "react";
import { FaTrashAlt } from "react-icons/fa";

import { AuthContext } from "../context/authorization";

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
        <div className="comment">
            <img
                className="comment-avatar"
                alt=""
                src="https://react.semantic-ui.com/images/avatar/large/molly.png"
            />
            <div className="comment-body">
                <span>
                    <strong>{comment.username}</strong>
                </span>
                <p>{comment.createdAt}</p>
                <p>{comment.body}</p>
            </div>

            {user.id === comment.userId ? (
                <div className="comment-modify-buttons">
                    <i role="button" onClick={handleDelete}>
                        <FaTrashAlt />
                    </i>
                </div>
            ) : null}
        </div>
    );
}

export default Comment;
