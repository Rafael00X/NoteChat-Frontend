import React, { useContext, useState } from "react";
import { Grid, Image, Menu } from "semantic-ui-react";

import NoteSection from "../components/NoteSection";
import ProfileSection from "../components/ProfileSection";
import { AuthContext } from "../context/authorization";

function Home() {
    const context = useContext(AuthContext);
    const [activeItem, setActiveItem] = useState("home");
    const [component, setComponent] = useState(<NoteSection />);

    function handleItemClick(event, { name }) {
        setActiveItem(name);
        switch (name) {
            case "home":
                setComponent(<NoteSection />);
                break;
            case "profile":
                setComponent(<ProfileSection />);
                break;
            case "logout":
                context.logout();
                break;
            default:
                console.log("Invalid component");
        }
    }

    return (
        <div>
            <Grid>
                <Grid.Row>
                    <Grid.Column width={3}>
                        <Menu pointing secondary vertical>
                            <Menu.Item
                                name="home"
                                active={activeItem === "home"}
                                onClick={handleItemClick}
                            />
                            <Menu.Item
                                name="profile"
                                active={activeItem === "profile"}
                                onClick={handleItemClick}
                            />
                            <Menu.Item
                                name="settings"
                                active={activeItem === "settings"}
                                onClick={handleItemClick}
                            />
                            <Menu.Item
                                name="logout"
                                active={activeItem === "logout"}
                                onClick={handleItemClick}
                            />
                        </Menu>
                    </Grid.Column>
                    <Grid.Column width={10}>{component}</Grid.Column>
                    <Grid.Column width={3}>
                        <Image src="https://react.semantic-ui.com/images/wireframe/paragraph.png" />
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        </div>
    );
}

export default Home;
