import React, { useState } from "react";
import Avatar from "react-avatar";
import { useQuery } from "@apollo/client";
import { IoCopySharp } from "react-icons/io5";

import Card from "./TestComponent";

import { GET_PROFILE } from "../util/graphql";
/*
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
            <ProfileCard userId={userId} />
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
*/
function ProfileCard(props) {
    const { userId } = props;

    const [editMode, setEditMode] = useState(false);

    const { data, loading } = useQuery(GET_PROFILE, { variables: { userId } });
    if (loading) return null;
    else console.log(data.getProfile);

    function handleCopy() {
        navigator.clipboard.writeText(userId);
    }

    return (
        <div class="profile-view-card">
            <div class="text">
                <Avatar
                    className="profile-avatar"
                    maxInitials={1}
                    name={data.getProfile.username}
                    size="200px"
                    round={true}
                    textSizeRatio={1.75}
                />
                <h3>{data.getProfile.username}</h3>
                <div className="uid">
                    <span>{"ID: " + data.getProfile.userId}</span>
                    <button onClick={handleCopy}>
                        <IoCopySharp />
                    </button>
                </div>
            </div>
        </div>
    );

    /*
    function handleEdit() {
        setEditMode(true);
        // TODO
    }

    function handleSave() {
        setEditMode(false);
        // TODO
    }

    function handleCancel() {
        setEditMode(false);
        // TODO
    }

    return (
        <div class="profile-view-card">
            <div class="text">
                <Avatar
                    className="profile-avatar"
                    name={data.getProfile.username}
                    size="200px"
                    round={true}
                    textSizeRatio={1.75}
                />
                <h3>{data.getProfile.username}</h3>
                <div className="uid">
                    <span>{"ID: " + data.getProfile.userId}</span>
                    <button onClick={handleCopy}>
                        <IoCopySharp />
                    </button>
                </div>

                <textarea readOnly={!editMode}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                    incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis
                    nostrud exercitation ullamco laboris nisi ut. Lorem ipsum dolor sit amet,
                    consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
                    dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
                    laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
                    reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                    Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia
                    deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur
                    adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi
                    ut. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                    tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
                    quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
                    consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum
                    dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident,
                    sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor
                    sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
                    labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                    exercitation ullamco laboris nisi ut. Lorem ipsum dolor sit amet, consectetur
                    adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi
                    ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
                    voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
                    occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim
                    id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                    eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
                    veniam, quis nostrud exercitation ullamco laboris nisi ut. Lorem ipsum dolor sit
                    amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
                    dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
                    laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
                    reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                    Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia
                    deserunt mollit anim id est laborum.
                </textarea>
            </div>
            <div className="btns">
                {!editMode && <button onClick={handleEdit}>Edit</button>}
                {editMode && <button onClick={handleSave}>Save</button>}
                {editMode && <button onClick={handleCancel}>Cancel</button>}
            </div>
        </div>
    );
    */
}

export default ProfileCard;
