import React from "react";
import { useQuery } from "@apollo/client";
import { Container } from "semantic-ui-react";

import NoteCard from "../components/NoteCard";
import NoteForm from "../components/NoteForm";
import { GET_POSTS } from "../util/graphql";

function NoteSection() {
    const { loading, error, data } = useQuery(GET_POSTS);

    if (error) return `Error! ${error.message}`;

    return (
        <Container id="notes-section">
            <NoteForm />
            {loading ? (
                <h1>Loading posts...</h1>
            ) : (
                data.getPosts && data.getPosts.map((post) => <NoteCard key={post.id} post={post} />)
            )}
        </Container>
    );
}

export default NoteSection;
