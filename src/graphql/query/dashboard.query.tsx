import { gql } from '@apollo/client';

export const DASHBOARD_DATA = gql`
  query Query {
    getMyAccount {
      balance
    }
    whoAmI {
      firstName
      lastName
      newUser
    }
    insights {
      _id
      startingBalance
      startingBalanceChange
      totalMoneyIn
      totalMoneyInChange
      totalMoneyOut
      totalMoneyOutChange
      leftToSpend
      leftToSpendChange
      shoppingExpenditure
      groceriesExpenditure
      billsExpenditure
      miscExpenditure
      lastWeekChange
      savingsAccountByMonth
      creditCardByMonth
      months
      lastYearChange
      spendingByWeek {
        spending
        week
      }
    }
  }
`;