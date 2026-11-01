export const typeDefs = /* GraphQL */ `
  type Query {
    me: User
  }

  type User {
    id: ID!
    name: String!
    email: String!
    emailVerified: Boolean!
    image: String
  }

  type Media {
    id: ID!
    source: String!
    name: String!
  }

  type MediaGroup {
    id: ID!
    userId: ID!
    name: String!
    defaultMediaId: ID!
  }

  type UserMedia {
    id: ID!
    mediaId: ID!
    mediaGroupId: ID!
    name: String!
  }

  type Tag {
    id: ID!
    name: String!
    mediaGroupId: ID!
  }
`;
