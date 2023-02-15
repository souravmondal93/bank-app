import React, { useState } from 'react'
import { useMutation } from '@apollo/client'
import { FormControl, FormLabel, Input, Button } from '@chakra-ui/react'
import { NextPage } from 'next'

interface LoginData {
  login: {
    token: string
  }
}

interface LoginVariables {
  email: string
  password: string
}

const LOGIN_MUTATION = gql`
  mutation LoginMutation($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
    }
  }
`

const LoginPage: NextPage = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [login, { data }] = useMutation<LoginData, LoginVariables>(LOGIN_MUTATION)

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    await login({ variables: { email, password } })
  }

  return (
    <form onSubmit={handleSubmit}>
      <FormControl>
        <FormLabel htmlFor="email">Email</FormLabel>
        <Input
          type="email"
          id="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
      </FormControl>
      <FormControl mt={4}>
        <FormLabel htmlFor="password">Password</FormLabel>
        <Input
          type="password"
          id="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
      </FormControl>
      <Button mt={4} type="submit">
        Login
      </Button>
    </form>
  )
}

export default LoginPage
