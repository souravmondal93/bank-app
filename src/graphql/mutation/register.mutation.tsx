import { gql } from '@apollo/client';

export const REGISTER_USER = gql`
  mutation Mutation($createUserInput: CreateUserInput!) {
    createUser(createUserInput: $createUserInput) {
      _id
      firstName
      lastName
      email
      address
      occupation
      income
      pan
      phone
      newUser
    }
  }
`;