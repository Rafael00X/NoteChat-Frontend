import React, { useContext, useState } from "react";
import { Card, Image } from "semantic-ui-react";

import CommentButton from "./CommentButton";
import DeleteButton from "./DeleteButton";
import LikeButton from "./LikeButton";
import NoteComments from "./NoteComments";
import { AuthContext } from "../context/authorization";

function NoteCard(props) {
    const { post } = props;
    const { user } = useContext(AuthContext);
    const [showComments, setShowComments] = useState(false);

    function commentCallback() {
        setShowComments(!showComments);
    }

    return (
        <Card className="notecard" fluid>
            <Card.Content>
                <Image
                    className="note-avatar"
                    floated="left"
                    size="mini"
                    src="https://react.semantic-ui.com/images/avatar/large/molly.png"
                />
                <Card.Header as="a" className="note-header">
                    {post.username}
                </Card.Header>
                <div className="note-modify-buttons">
                    {post.userId === user.id ? <DeleteButton postId={post.id} /> : null}
                </div>
                <Card.Meta>{`${post.createdAt}`}</Card.Meta>
                <Card.Description>{post.body}</Card.Description>
            </Card.Content>
            <Card.Content extra>
                <div className="ui fluid">
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
                        callback={commentCallback}
                    />
                </div>
            </Card.Content>
            {showComments ? <NoteComments comments={post.comments} postId={post.id} /> : null}
        </Card>
    );
}

export default NoteCard;
