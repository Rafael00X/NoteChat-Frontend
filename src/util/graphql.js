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
            likes {
                id
                userId
                username
                createdAt
            }
            commentCount
            comments {
                id
                userId
                username
                body
                createdAt
            }
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
            likes {
                id
                userId
                username
                createdAt
            }
            commentCount
        }
    }
`;

const DELETE_POST = gql`
    mutation DeletePost($postId: ID!) {
        deletePost(postId: $postId) {
            id
            username
            body
        }
    }
`;

const LIKE_POST = gql`
    mutation LikePost($postId: ID!) {
        likePost(postId: $postId) {
            id
            likeCount
            likes {
                id
                userId
            }
        }
    }
`;

const CREATE_COMMENT = gql`
    mutation CreateComment($postId: ID!, $body: String!) {
        createComment(postId: $postId, body: $body) {
            id
            commentCount
            comments {
                id
                userId
            }
        }
    }
`;

const DELETE_COMMENT = gql`
    mutation DeleteComment($postId: ID!, $userId: ID!, $commentId: ID!) {
        deleteComment(postId: $postId, userId: $userId, commentId: $commentId) {
            id
            commentCount
            comments {
                id
                userId
            }
        }
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

export {
    GET_POSTS,
    CREATE_POST,
    DELETE_POST,
    LIKE_POST,
    CREATE_COMMENT,
    DELETE_COMMENT,
    LOGIN_USER,
    REGISTER_USER
};
