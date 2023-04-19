import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  mutation loginUser($name: String!, $email: String!, $password: String!) {
    login(name: $name, email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($username: ID!, $email: String!, $password: String!) {
    addUser(username: $username, email: String, password: String) {
      token
      user {
        _id
        username
        email
      }
    }
  }
`;

export const SAVE_BOOK = gql`
  mutation saveBook($bookId: String!, $authors: [String], $description: String, $title: String, $image: String, $link: String) {
    saveBook(book: $book) {
      _id
      username
      savedBooks {
        _id
        bookId
        authors
        description
        title
        image
        link
      }
    }
  }
`;

export const REMOVE_BOOK = gql`
  mutation removeBook($bookId: ID!) {
    removeBook(bookId: $bookId) {
      _id
      username
      savedBooks {
        _id
        bookId
        authors
        description
        title
        image
        link
      }
    }
  }
`;
