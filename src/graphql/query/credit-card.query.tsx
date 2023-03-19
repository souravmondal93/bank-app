import { gql } from '@apollo/client';

export const CREDIT_CARD_DATA = gql`
  query Query {
    CreditCarTransactionsByCurrentUser {
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
    getMyCreditCardAccount {
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