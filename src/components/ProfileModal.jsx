import React from "react";
import Avatar from "react-avatar";
import { Modal } from "react-bootstrap";
import { useQuery } from "@apollo/client";
import { IoCopySharp } from "react-icons/io5";

import { GET_PROFILE } from "../util/graphql";

function ProfileModal(props) {
    const {
        state: [show, setShow]
    } = props;
    const userId = show;

    const { data, loading } = useQuery(GET_PROFILE, { variables: { userId }, skip: show === null });
    if (data === null || data === undefined) return null;

    function handleCopy() {
        navigator.clipboard.writeText(userId);
    }
    if (loading)
        return (
            <Modal show={show} onHide={() => setShow(null)} keyboard={false}>
                <div class="profile-view-card">
                    <div class="text">
                        <h2>Loading details...</h2>
                    </div>
                </div>
            </Modal>
        );

    return (
        <Modal show={show} onHide={() => setShow(null)} keyboard={false}>
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
        </Modal>
    );

    /*

    return (
        <Modal show={show} onHide={() => setShow(null)} keyboard={false}>
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

                    <textarea>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
                        quis nostrud exercitation ullamco laboris nisi ut. Lorem ipsum dolor sit
                        amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
                        labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                        exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis
                        aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu
                        fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt
                        in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor
                        sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
                        labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                        exercitation ullamco laboris nisi ut. Lorem ipsum dolor sit amet,
                        consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
                        dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                        ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure
                        dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                        pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui
                        officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet,
                        consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
                        dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                        ullamco laboris nisi ut. Lorem ipsum dolor sit amet, consectetur adipiscing
                        elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                        enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                        aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
                        voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
                        occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit
                        anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing
                        elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                        enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut.
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
                        quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
                        consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
                        cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat
                        non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                    </textarea>
                </div>
            </div>
        </Modal>
    );
    */
}

export default ProfileModal;
