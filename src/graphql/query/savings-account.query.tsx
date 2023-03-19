import { gql } from '@apollo/client';

export const SAVINGS_ACCOUNT_DATA = gql`
  query Query {
    transactionsByCurrentUser {
      _id
      type
      payeeName
      date
      amount
      status
      reference
      sourceAccountId
      senderId
      recipientId
    }
    getMyAccount {
      _id
      type
      isActive
      owner
      sortCode
      accountNumber
      currency
      balance
    }
  }
`;