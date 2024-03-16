export const typeDefs = `#graphql
    type Secret {
        id: ID!
        secret: String!
        password: String! 
    }

    type SecretDRS {
        id: ID!
        secret: String!
        password: String! 
    }
    
    type Query {
        secrets: [Secret]
        secret(id: ID!, password: String!): Secret
        secretsDRS: [SecretDRS]
        secretDRS(id: ID!, password: String!): SecretDRS
        
    }
    type Mutation {
        addSecret(secret: AddSecretInput!): Secret
        addSecretDRS(secret: AddSecretInput!): SecretDRS
        deleteSecret(id: ID!): Secret
        deleteSecretDRS(id: ID!): SecretDRS
        updateSecret(id: ID!, edits: EditSecretInput!): Secret
        updateSecretDRS(id: ID!, edits: EditSecretInput!): SecretDRS
    }

    # Input Types
    input AddSecretInput {
        secret: String!
        password: String!
    }

    input EditSecretInput {
        secret: String
        password: String
    }

`;
