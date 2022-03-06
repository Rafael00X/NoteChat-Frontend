import React from "react";
import { useQuery } from "@apollo/client";
import { Button } from "react-bootstrap";

import { GET_PROFILE } from "../../util/graphql";
import Avatar from "react-avatar";

function ProfileCard(props) {
    const { userId, callback } = props;
    const { data, loading } = useQuery(GET_PROFILE, { variables: { userId } });

    function handleMessage() {
        if (!userId) return;
        callback(userId, data.getProfile.username);
    }

    if (loading) return null;

    if (!data)
        return (
            <div id="card">
                <h2>No match found</h2>
            </div>
        );

    return (
        <div id="card">
            <div className="personal">
                <Avatar
                    name={data.getProfile.username}
                    maxInitials={1}
                    size="50px"
                    round={true}
                    textSizeRatio={2.0}
                    style={{ display: "inline-block", margin: "15px" }}
                />
                <NameHolder name={data.getProfile.username} id={data.getProfile.userId} />
            </div>

            <ButtonHolder handleMessage={handleMessage} />
        </div>
    );
}

function NameHolder(props) {
    return (
        <div className="nameHolder">
            <h1>{props.name}</h1>
            <h2>{"ID: " + props.id}</h2>
        </div>
    );
}

function ButtonHolder(props) {
    return (
        <div className="buttonHolder">
            <Button onClick={props.handleMessage} style={{ width: "100%" }}>
                Message
            </Button>
        </div>
    );
}

export default ProfileCard;
