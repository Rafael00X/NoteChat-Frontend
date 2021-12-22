import React from "react";
import { Button } from "react-bootstrap";

function Menu(props) {
    const { searchBox, setSearchBox } = props;

    function handleClick(item) {
        if (searchBox && item === searchBox) {
            setSearchBox(null);
        } else {
            setSearchBox(item);
        }
    }

    return (
        <div>
            <Button onClick={() => handleClick("Conv")}>Search Conv</Button>
            <Button onClick={() => handleClick("User")}>Search User</Button>
        </div>
    );
}

export default Menu;
