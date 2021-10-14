import { useMutation } from "@apollo/client";
import React from "react";
import { Button, Card, Image, Icon, Label } from "semantic-ui-react";

import { DELETE_POST, GET_POSTS } from "../util/graphql";

function NoteCard(props) {
    const { id, username, createdAt, body, likeCount, commentCount } = props.post;

    const [deletePost, { loading }] = useMutation(DELETE_POST, {
        update(cache, result) {
            const data = cache.readQuery({ query: GET_POSTS });
            console.log(result);
            cache.writeQuery({
                query: GET_POSTS,
                data: {
                    getPosts: data.getPosts.filter((post) => post.id !== id)
                }
            });
        },
        onError(err) {
            console.log(err);
        }
    });

    function handleDelete(event) {
        event.target.classList.add("loading");
        const values = {
            postId: id
        };
        deletePost({ variables: values });
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
                    {username}
                </Card.Header>
                <div className="note-modify-buttons">
                    <Button>
                        <Icon name="edit" />
                    </Button>
                    <Button onClick={handleDelete}>
                        <Icon name="trash alternate" />
                    </Button>
                </div>
                <Card.Meta>{`${createdAt}`}</Card.Meta>
                <Card.Description>{body}</Card.Description>
            </Card.Content>
            <Card.Content extra>
                <div className="ui fluid">
                    <Button as="div" labelPosition="right">
                        <Button color="red">
                            <Icon name="heart" />
                        </Button>
                        <Label as="a" basic color="red" pointing="left">
                            {likeCount}
                        </Label>
                    </Button>
                    <Button as="div" labelPosition="right" floated="right">
                        <Button basic color="blue">
                            <Icon name="comments" />
                        </Button>
                        <Label as="a" basic color="blue" pointing="left">
                            {commentCount}
                        </Label>
                    </Button>
                </div>
            </Card.Content>
        </Card>
    );
}

export default NoteCard;
