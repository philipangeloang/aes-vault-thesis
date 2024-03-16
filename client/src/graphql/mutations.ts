import { gql } from "@apollo/client";

export const ADD_SECRET = gql`
  mutation addSecret($secret: AddSecretInput!) {
    addSecret(secret: $secret) {
      id
      secret
      password
    }
  }
`;

export const DELETE_SECRET = gql`
  mutation deleteSecret($id: ID!) {
    deleteSecret(id: $id) {
      id
      secret
      password
    }
  }
`;
