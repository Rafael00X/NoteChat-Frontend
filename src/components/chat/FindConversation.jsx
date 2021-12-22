import React, { useState } from "react";

function FindConversation(props) {
    const { setConversations, allConvs } = props;
    const [text, setText] = useState("");

    function onChange(event) {
        const v = event.target.value;
        setText(v);
        const newConversations = allConvs.filter((conv) => conv.startsWith(v));
        setConversations(newConversations);
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
