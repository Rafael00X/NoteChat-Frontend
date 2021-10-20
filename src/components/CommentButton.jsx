import React from "react";
import { Button } from "react-bootstrap";
import { FaComments } from "react-icons/fa";

function CommentButton(props) {
    const { commentCount, callback } = props;

    return (
        <Button variant="outline-primary" onClick={callback}>
            <span>
                <FaComments />
                &nbsp;&nbsp;&nbsp;{commentCount}
            </span>
        </Button>
    );
}

export default CommentButton;
