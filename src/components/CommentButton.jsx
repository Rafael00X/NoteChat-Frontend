import React from "react";
import { Button } from "react-bootstrap";
import { FaComments } from "react-icons/fa";

function CommentButton(props) {
    const { commentCount, active, callback } = props;

    return (
        <Button className={"comment-btn" + (active ? " filled" : "")} onClick={callback}>
            <span>
                <FaComments />
                &nbsp;&nbsp;&nbsp;{commentCount}
            </span>
        </Button>
    );
}

export default CommentButton;
