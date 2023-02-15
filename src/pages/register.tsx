import React, { useState } from 'react'
import { useMutation } from '@apollo/client'
import { FormControl, FormLabel, Input, Button } from '@chakra-ui/react'
import gql from 'graphql-tag'
import { NextPage } from 'next'
import { useForm, SubmitHandler } from 'react-hook-form'

interface RegisterData {
  register: {
    id: string
  }
}

interface RegisterVariables {
  firstName: string
  lastName: string
  address: string
  city: string
  state: string
  pincode: string
  pan: string
  income: number
  occupation: string
}

const REGISTER_MUTATION = gql`
  mutation RegisterMutation(
    $firstName: String!
    $lastName: String!
    $address: String!
    $city: String!
    $state: String!
    $pincode: String!
    $pan: String!
    $income: Float!
    $occupation: String!
  ) {
    register(
      firstName: $firstName
      lastName: $lastName
      address: $address
      city: $city
      state: $state
      pincode: $pincode
      pan: $pan
      income: $income
      occupation: $occupation
    ) {
      id
    }
  }
`

const RegisterPage: NextPage = () => {
  const { handleSubmit, register, formState: { errors } } = useForm()
  const [registerUser, { data }] = useMutation<RegisterData, RegisterVariables>(REGISTER_MUTATION)

  const onSubmit: SubmitHandler<any> = async (values: RegisterVariables) => {
    await registerUser({ variables: values })
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormControl isInvalid={errors.firstName}>
        <FormLabel htmlFor="firstName">First Name</FormLabel>
        <Input
          type="text"
          id="firstName"
          {...register('firstName', { required: true, pattern: /^[A-Za-z]+$/ })}
        />
        {errors.firstName && <p>This field is required and should contain only letters</p>}
      </FormControl>
      <FormControl mt={4} isInvalid={errors.lastName}>
        <FormLabel htmlFor="lastName">Last Name</FormLabel>
        <Input
          type="text"
          id="lastName"
          {...register('lastName', { required: true, pattern: /^[A-Za-z]+$/ })}
        />
        {errors.lastName && <p>This field is required and should contain only letters</p>}
      </FormControl>
      <FormControl mt={4} isInvalid={errors.address}>
        <FormLabel htmlFor="address">Address</FormLabel>
        <Input
          type="text"
          id="address"
          {...register('address', { required: true })}
        />
        {errors.address && <p>This field is required</p>}
      </FormControl>
    </form>
  );
};
