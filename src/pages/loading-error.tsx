import React from 'react'
import { Flex, Box, Heading, Spinner } from '@chakra-ui/react'

interface ErrorProps {
  error: { message: string }
}

const Error: React.FC<ErrorProps> = ({ error }) => {
  return (
    <Flex height="100vh" alignItems="center" justifyContent="center">
      <Box>
        <Heading>An error has occurred</Heading>
        <p>{error.message}</p>
      </Box>
    </Flex>
  )
}

const Loading: React.FC = () => {
  return (
    <Flex height="100vh" alignItems="center" justifyContent="center">
      <Box>
        <Spinner size="xl" />
      </Box>
    </Flex>
  )
}

export default { Error, Loading }
