import React from "react";
import "../css/TestComponent.css";

function ProfileCard() {
    return (
        <div class="profile-card">
            <div class="text">
                <img
                    src="https://www.shareicon.net/data/512x512/2016/09/15/829452_user_512x512.png"
                    alt=""
                />
                <h3>Jane Smith</h3>
                <p>Student | Coder</p>
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                    incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis
                    nostrud exercitation ullamco laboris nisi ut.
                </p>
            </div>
            <div class="links">
                <a target="_blank" href="https://codepen.io/l-e-e/">
                    <i class="fab fa-codepen"></i>
                </a>
                <a target="_blank" href="https://github.com/Leena26">
                    <i class="fab fa-github"></i>
                </a>
                <a target="_blank" href="https://www.youtube.com/channel/UCPOyUi82bRcPTdpDuSHVNbw">
                    <i class="fab fa-youtube"></i>
                </a>
            </div>
        </div>
    );
}

export default ProfileCard;
