import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";

import ProfileCard from "../ProfileCard";

function FindUser(props) {
    const { userId, callback } = props;
    const [text, setText] = useState("");
    const [user, setUser] = useState();
    const userIds = [userId];

    function onChange(event) {
        setText(event.target.value);
    }

    function onSubmit(event) {
        event.preventDefault();
        if (text.trim() !== "") {
            userIds.push(text);
            setUser(text);
        }
        setText("");
    }

    function closeCardCallback() {
        setUser();
    }
    return (
        <div>
            <div className="wrapper">
                <form onSubmit={onSubmit}>
                    <div className="search">
                        <input
                            id="search"
                            value={text}
                            placeholder="Search by ID..."
                            onChange={onChange}
                            autoComplete="off"
                        />
                        <button type="submit" disabled={text.trim() === ""}>
                            <FaSearch />
                        </button>
                    </div>
                </form>
            </div>
            {user && (
                <ProfileCard userId={user} callback={callback} closeCallback={closeCardCallback} />
            )}
        </div>
    );
}

export default FindUser;
