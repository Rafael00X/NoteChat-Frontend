import React, { useContext, useState } from "react";
import { FaTrashAlt } from "react-icons/fa";
import Avatar from "react-avatar";

import { AuthContext } from "../../context/authorization";
import ConfirmDialog from "../ConfirmDialog";
import { getDate, getHourAndMinute } from "../../util/momentFormats";

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
                <Avatar
                    className="comment-avatar"
                    name={comment.username}
                    size="40px"
                    round="10px"
                    textSizeRatio={2.0}
                />
                <div className="comment-body">
                    <span>
                        <strong>{comment.username}</strong>
                    </span>
                    <p style={{ fontSize: "13px" }}>
                        <i>Commented at </i>
                        {getHourAndMinute(comment.createdAt)}
                        <i> on </i> {getDate(comment.createdAt)}
                    </p>
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
