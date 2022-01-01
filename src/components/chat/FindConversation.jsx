import React, { useState } from "react";

function FindConversation(props) {
    const {
        setConversations,
        useSearchMode: [searchMode, setSearchMode],
        allConvs
    } = props;
    const [text, setText] = useState("");

    function onChange(event) {
        const v = event.target.value;
        setText(v);
        const newConversations = allConvs.filter((conv) => conv.username.startsWith(v));
        setConversations(newConversations);
        if (v === "") setSearchMode(false);
        else if (!searchMode) setSearchMode(true);
    }

    return (
        <div>
            <div className="wrapper">
                <div className="search">
                    <input
                        id="search"
                        type="search"
                        value={text}
                        placeholder="Search by name..."
                        onChange={onChange}
                        autoComplete="off"
                    />
                </div>
            </div>
        </div>
    );
}

export default FindConversation;
