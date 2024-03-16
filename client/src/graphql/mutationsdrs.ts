import { gql } from "@apollo/client";

export const ADD_SECRET_DRS = gql`
  mutation addSecretDRS($secret: AddSecretInput!) {
    addSecretDRS(secret: $secret) {
      id
      secret
      password
    }
  }
`;

export const DELETE_SECRET_DRS = gql`
  mutation deleteSecretDRS($id: ID!) {
    deleteSecretDRS(id: $id) {
      id
      secret
      password
    }
  }
`;
