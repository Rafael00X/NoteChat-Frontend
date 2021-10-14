import React from "react";
import { Grid, Image } from "semantic-ui-react";

import NoteSection from "../components/NoteSection";

function Home() {
    return (
        <div>
            <Grid>
                <Grid.Row>
                    <Grid.Column width={4}>
                        <Image src="https://react.semantic-ui.com/images/wireframe/paragraph.png" />
                    </Grid.Column>
                    <Grid.Column width={8}>
                        <NoteSection />
                    </Grid.Column>
                    <Grid.Column width={4}>
                        <Image src="https://react.semantic-ui.com/images/wireframe/paragraph.png" />
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        </div>
    );
}

/*
function Home() {
    const { loading, error, data } = useQuery(GET_POSTS);

    if (loading) return "Loading...";
    if (error) return `Error! ${error.message}`;

    return (
        <div>
            <NoteForm />
            {loading ? (
                <h1>Loading posts...</h1>
            ) : (
                data.getPosts &&
                data.getPosts.map((post, index) => <NoteCard key={index} post={post} />)
            )}
        </div>
    );
}
*/
export default Home;
