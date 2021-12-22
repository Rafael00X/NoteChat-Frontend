import React from "react";
import { useQuery } from "@apollo/client";
import { Button } from "react-bootstrap";

import { GET_PROFILE } from "../util/graphql";

function ProfileCard(props) {
    const { userId, callback, closeCallback } = props;
    const { data, loading } = useQuery(GET_PROFILE, { variables: { userId } });

    function handleMessage() {
        if (!userId) return;
        callback(userId);
    }

    function handleCopy() {
        // TODO - Copy 'userId' to clipboard
    }

    function handleClose() {
        closeCallback();
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
                <Avatar image="https://raw.githubusercontent.com/JustMonk/codepen-resource-project/master/img/pixel%20avatar.png" />
                <NameHolder name={data.getProfile.username} id={data.getProfile.userId} />
            </div>
            <Info bio="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum." />
            <ButtonHolder
                handleMessage={handleMessage}
                handleCopy={handleCopy}
                handleClose={handleClose}
            />
        </div>
    );
}

function Avatar(props) {
    return (
        <div className="avatar">
            <img src={props.image} alt="user avatar" />
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

function Info(props) {
    return (
        <div className="info">
            <p>{props.bio}</p>
        </div>
    );
}

function ButtonHolder(props) {
    return (
        <div className="buttonHolder">
            <Button onClick={props.handleMessage}>Message</Button>
            <Button onClick={props.handleCopy}>Copy ID</Button>
            <Button onClick={props.handleClose}>Close</Button>
        </div>
    );
}

export default ProfileCard;
