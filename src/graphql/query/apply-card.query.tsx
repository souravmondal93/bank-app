import { gql } from '@apollo/client';

export const APPLY_CARD_DATA = gql`
  query Query {
    whoAmI {
      firstName
      lastName
      income
    }
  }
`;