import React, { useState } from "react";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { useQuery } from "@apollo/client";
import { Container } from "react-bootstrap";

import NoteCard from "./NoteCard";
import NoteForm from "./NoteForm";
import { GET_POSTS } from "../../util/graphql";
import ProfileModal from "../ProfileModal";

function NoteSection() {
    const { loading, error, data } = useQuery(GET_POSTS);
    const [show, setShow] = useState(null);

    if (error) return `Error! ${error.message}`;

    return (
        <Container id="note-section">
            <ProfileModal state={[show, setShow]} />
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
                                    <NoteCard post={post} setShow={setShow} />
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
