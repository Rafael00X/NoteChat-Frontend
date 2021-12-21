import React from "react";
import { Button, Card } from "react-bootstrap";
import { useQuery } from "@apollo/client";

import { GET_PROFILE } from "../util/graphql";

function ProfileCard(props) {
    const { userId, callback, closeCallback } = props;

    const { data, loading } = useQuery(GET_PROFILE, { variables: { userId } });

    function handleClick() {
        if (!userId) return;
        callback(userId);
    }

    function handleClose() {
        closeCallback();
    }

    if (loading) {
        return null;
    }

    if (!data) {
        return <h2>No match found</h2>;
    }

    console.log(data.getProfile);

    return (
        <Card style={{ width: "18rem" }}>
            <Card.Img variant="top" src="holder.js/100px180" />
            <Card.Body>
                <Card.Text>{data.getProfile.userId}</Card.Text>
            </Card.Body>
            <Card.Body>
                <Card.Title>{data.getProfile.username}</Card.Title>
                <Card.Text>Description here</Card.Text>
                <Button variant="primary" onClick={handleClick}>
                    Message
                </Button>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
            </Card.Body>
        </Card>
    );
}

export default ProfileCard;
