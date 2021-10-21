import React from "react";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { useQuery } from "@apollo/client";
import { Container } from "react-bootstrap";

import NoteCard from "../components/NoteCard";
import NoteForm from "../components/NoteForm";
import { GET_POSTS } from "../util/graphql";

function NoteSection() {
    const { loading, error, data } = useQuery(GET_POSTS);

    if (error) return `Error! ${error.message}`;

    return (
        <Container id="note-section">
            <NoteForm />
            {loading ? (
                <h1>Loading posts...</h1>
            ) : (
                data.getPosts && (
                    <TransitionGroup>
                        {data.getPosts.map((post) => {
                            return (
                                <CSSTransition
                                    key={post.id}
                                    classNames="fade"
                                    timeout={500}
                                    appear={false}
                                    in={true}
                                    exit={true}>
                                    <NoteCard post={post} />
                                </CSSTransition>
                            );
                        })}
                    </TransitionGroup>
                )
            )}
        </Container>
    );
}

export default NoteSection;
