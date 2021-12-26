import React from "react";
import Avatar from "react-avatar";
import { useQuery } from "@apollo/client";

import { GET_PROFILE } from "../util/graphql";

function ProfileView(props) {
    const { userId } = props;

    const { data, loading } = useQuery(GET_PROFILE, { variables: { userId } });
    if (loading) return null;
    else console.log(data.getProfile);

    return (
        <div id="card">
            <div className="personal">
                <Avatar
                    className="profile-avatar"
                    name={data.getProfile.username}
                    size="60px"
                    round="15px"
                    textSizeRatio={1.75}
                />
                <NameHolder name={data.getProfile.username} id={data.getProfile.userId} />
            </div>
            <Info bio="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum." />
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

export default ProfileView;
