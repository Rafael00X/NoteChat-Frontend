import React from "react";
import { Button, Icon, Label } from "semantic-ui-react";

function CommentButton(props) {
    const { commentCount, callback } = props;

    return (
        <Button as="div" labelPosition="right">
            <Button basic color="blue" onClick={callback}>
                <Icon name="comments" />
            </Button>
            <Label as="a" basic color="blue" pointing="left">
                {commentCount}
            </Label>
        </Button>
    );
}

export default CommentButton;
