import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  mutation Mutation($loginUserInput: LoginUserInput!) {
    loginUser(loginUserInput: $loginUserInput) {
      access_token
    }
  }
`;