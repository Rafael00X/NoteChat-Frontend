import React, { useContext, useState } from "react";
import { Card } from "react-bootstrap";
import Avatar from "react-avatar";

import CommentButton from "./CommentButton";
import DeleteButton from "./DeleteButton";
import LikeButton from "./LikeButton";
import NoteComments from "./NoteComments";
import { AuthContext } from "../../context/authorization";

function NoteCard(props) {
    const { post } = props;
    const { user } = useContext(AuthContext);
    const [showComments, setShowComments] = useState(false);

    function commentCallback() {
        setShowComments(!showComments);
    }

    return (
        <Card className="note-card">
            <Card.Body>
                <Avatar
                    className="note-avatar"
                    name={post.username}
                    size="50px"
                    round="10px"
                    textSizeRatio={2.0}
                />
                <div className="note-header">
                    <h5 role="button">{post.username}</h5>
                    <p>{post.createdAt}</p>
                </div>
                <div className="note-modify-buttons">
                    {post.userId === user.id ? <DeleteButton postId={post.id} /> : null}
                </div>
                <Card.Text>{post.body}</Card.Text>
            </Card.Body>

            <Card.Body className="note-buttons">
                <LikeButton
                    userId={user.id}
                    postId={post.id}
                    likeCount={post.likeCount}
                    likes={post.likes}
                />
                <CommentButton
                    userId={post.userId}
                    postId={post.id}
                    commentCount={post.commentCount}
                    active={showComments}
                    callback={commentCallback}
                />
            </Card.Body>

            {showComments ? <NoteComments comments={post.comments} postId={post.id} /> : null}
        </Card>
    );
}

export default NoteCard;
