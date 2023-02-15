import React from 'react'
import { Flex, Box, Heading, Text, Stat, StatLabel, StatNumber } from '@chakra-ui/react'

interface DashboardProps {
  creditCard: {
    balance: number,
    limit: number,
  }
  accounts: {
    accountNumber: string,
    balance: number,
  }[]
  upcomingExpenses: {
    amount: number,
    date: string,
    description: string,
  }[]
  upcomingPayments: {
    amount: number,
    date: string,
    description: string,
  }[]
  overduePayments: {
    amount: number,
    date: string,
    description: string,
  }[]
}

const Dashboard: React.FC<DashboardProps> = ({ creditCard, accounts, upcomingExpenses, upcomingPayments, overduePayments }) => {
  return (
    <Flex direction="column" alignItems="center">
      <Box m={4}>
        <Heading>Dashboard</Heading>
      </Box>
      <Box m={4}>
        <Heading size="sm">Credit Card</Heading>
        <Stat mb={4}>
          <StatLabel>Balance</StatLabel>
          <StatNumber>{creditCard.balance}</StatNumber>
        </Stat>
        <Stat mb={4}>
          <StatLabel>Limit</StatLabel>
          <StatNumber>{creditCard.limit}</StatNumber>
        </Stat>
      </Box>
      <Box m={4}>
        <Heading size="sm">Accounts</Heading>
        {accounts.map(account => (
          <>
            <Stat mb={4} key={account.accountNumber}>
              <StatLabel>Account Number</StatLabel>
              <StatNumber>{account.accountNumber}</StatNumber>
            </Stat>
            <Stat mb={4}>
              <StatLabel>Balance</StatLabel>
              <StatNumber>{account.balance}</StatNumber>
            </Stat>
          </>
        ))}
      </Box>
      <Box m={4}>
        <Heading size="sm">Upcoming Expenses</Heading>
        {upcomingExpenses.map(expense => (
          <Box mb={4} key={expense.description}>
            <Text>{expense.description}</Text>
            <Text>Amount: {expense.amount}</Text>
            <Text>Date: {expense.date}</Text>
          </Box>
        ))}
      </Box>
      <Box m={4}>
        <Heading size="sm">Upcoming Payments</Heading>
        {upcomingPayments.map(payment => (
          <Box mb={4} key={payment.description}>
            <Text>{payment.description}</Text>
            <Text>Amount: {payment.amount}</Text>
            <Text>Date: {payment.date}</Text>
          </Box>
        ))}
      </Box>
    </Flex>
  )
};
