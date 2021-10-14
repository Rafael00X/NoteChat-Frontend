import { gql } from "@apollo/client";

const GET_POSTS = gql`
    query getPosts {
        getPosts {
            id
            userId
            username
            body
            createdAt
            likeCount
            commentCount
        }
    }
`;

const CREATE_POST = gql`
    mutation CreatePost($body: String!) {
        createPost(body: $body) {
            id
            userId
            username
            body
            createdAt
            likeCount
            commentCount
        }
    }
`;

const DELETE_POST = gql`
    mutation DeletePost($postId: ID!) {
        deletePost(postId: $postId)
    }
`;

const LOGIN_USER = gql`
    mutation Login($email: String!, $password: String!) {
        login(email: $email, password: $password) {
            id
            email
            username
            createdAt
            token
        }
    }
`;

const REGISTER_USER = gql`
    mutation Register($username: String!, $email: String!, $password: String!) {
        register(username: $username, email: $email, password: $password) {
            id
            email
            username
            createdAt
            token
        }
    }
`;

export { GET_POSTS, CREATE_POST, DELETE_POST, LOGIN_USER, REGISTER_USER };
