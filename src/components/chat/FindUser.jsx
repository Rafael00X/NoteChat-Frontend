import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";

function FindUser(props) {
    const { userId, setUser } = props;
    const [text, setText] = useState("");
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
        </div>
    );
}

export default FindUser;
