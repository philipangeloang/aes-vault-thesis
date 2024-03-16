import { gql } from "@apollo/client";

export const GET_SECRETS_DRS = gql`
  query getSecretsDRS {
    secretsDRS {
      id
      secret
      password
    }
  }
`;

export const GET_SECRET_DRS = gql`
  query getSecretDRS($id: ID!, $password: String!) {
    secretDRS(id: $id, password: $password) {
      id
      secret
      password
    }
  }
`;
