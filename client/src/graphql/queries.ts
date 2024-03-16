import { gql } from "@apollo/client";

export const GET_SECRETS = gql`
  query getSecrets {
    secrets {
      id
      secret
      password
    }
  }
`;

export const GET_SECRET = gql`
  query getSecret($id: ID!, $password: String!) {
    secret(id: $id, password: $password) {
      id
      secret
      password
    }
  }
`;
