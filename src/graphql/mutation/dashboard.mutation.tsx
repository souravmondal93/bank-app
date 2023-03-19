
import { gql } from '@apollo/client';

export const UPDATE_NEW_USER = gql`
  mutation UpdateNewUser($newUser: NewUserUpdateInput!) {
    updateNewUser(newUser: $newUser) {
      newUser
    }
  }
`;