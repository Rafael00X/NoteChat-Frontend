import React, { useContext, useState } from "react";
import { FaTrashAlt } from "react-icons/fa";

import { AuthContext } from "../context/authorization";
import ConfirmDialog from "./ConfirmDialog";

function Comment(props) {
    const { comment, callback } = props;
    const { user } = useContext(AuthContext);
    const [show, setShow] = useState(false);

    function deleteCommentCallback() {
        callback({
            commentId: comment.id,
            userId: comment.userId
        });
    }

    function handleDelete() {
        setShow(true);
    }

    return (
        <>
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

            <ConfirmDialog
                title="Delete Comment"
                body="Are you sure you want to delete this comment?"
                callback={deleteCommentCallback}
                state={[show, setShow]}
            />
        </>
    );
}

export default Comment;
