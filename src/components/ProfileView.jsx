import React from "react";
import Avatar from "react-avatar";
import { useQuery } from "@apollo/client";
import { IoCopySharp } from "react-icons/io5";

import "../css/TestComponent.css";

import { GET_PROFILE } from "../util/graphql";

function ProfileCard(props) {
    const { userId } = props;

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
}

export default ProfileCard;
