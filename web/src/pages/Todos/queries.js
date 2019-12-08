import { gql } from 'apollo-boost';

export const GET_TODOS = gql`
  query GetTodos {
    viewer {
      email
      todos {
        id
        title
        description
        done
        dueDate
        labels
      }
    }
  }
`;

export const CREATE_TODO = gql`
  mutation CreateTodo(
    $title: String!
    $description: String!
    $dueDate: DateTime
    $labels: [String!]!
  ) {
    createTodo(
      title: $title
      description: $description
      dueDate: $dueDate
      labels: $labels
    ) {
      id
      title
      description
      done
      dueDate
      labels
    }
  }
`;

export const DELETE_TODO = gql`
  mutation DeleteTodo($id: ID!) {
    deleteTodo(id: $id) {
      ok
      todo {
        id
        done
      }
    }
  }
`;

export const UPDATE_TODO = gql`
  mutation UpdateTodo(
    $id: ID!
    $title: String!
    $description: String!
    $dueDate: DateTime
    $done: Boolean
    $labels: [String!]!
  ) {
    updateTodo(
      id: $id
      title: $title
      description: $description
      dueDate: $dueDate
      done: $done
      labels: $labels
    ) {
      ok
      todo {
        id
        title
        description
        dueDate
        done
        labels
      }
    }
  }
`;
