import React from 'react'
import { useQuery } from '@apollo/client'
import { Table, Thead, Tr, Td, Th, Tbody } from '@chakra-ui/react'
import gql from 'graphql-tag'
import { NextPage } from 'next'

interface Transaction {
  id: string
  date: string
  description: string
  amount: number
}

interface TransactionsData {
  transactions: Transaction[]
}

const TRANSACTIONS_QUERY = gql`
  query TransactionsQuery {
    transactions {
      id
      date
      description
      amount
    }
  }
`

interface Props {
  transactions: Transaction[]
}

const TransactionsPage: NextPage<Props> = ({ transactions }) => {
  return (
    <Table>
      <Thead>
        <Tr>
          <Th>Date</Th>
          <Th>Description</Th>
          <Th>Amount</Th>
        </Tr>
      </Thead>
      <Tbody>
        {transactions.map((transaction) => (
          <Tr key={transaction.id}>
            <Td>{transaction.date}</Td>
            <Td>{transaction.description}</Td>
            <Td>{transaction.amount}</Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  )
}

export async function getServerSideProps() {
  const { data } = await useQuery<TransactionsData>(TRANSACTIONS_QUERY)
  return {
    props: {
      transactions: data?.transactions || []
    }
  }
}

export default TransactionsPage
