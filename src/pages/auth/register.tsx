import React, { ReactElement, useEffect } from 'react';
import NextLink from 'next/link';
// Chakra imports
import {
  Flex,
  Button,
  FormControl,
  FormLabel,
  Input,
  Link,
  Switch,
  Text,
  DarkMode,
  FormErrorMessage,
  useDisclosure,
} from '@chakra-ui/react';
import * as yup from 'yup';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { gql, useMutation } from '@apollo/client';

// Layout
import AuthLayout from '@/layouts/auth';
// Custom Components
import GradientBorder from '@/components/gradient-border/gradient-border';
import Modal from '@/components/modal/modal';

Register.getLayout = function getLayout(page: ReactElement) {
  return <AuthLayout>{page}</AuthLayout>;
};

export const REGISTER_USER = gql`
  mutation Mutation($createUserInput: CreateUserInput!) {
    createUser(createUserInput: $createUserInput) {
      _id
      firstName
      lastName
      email
      address
      occupation
      income
      pan
      phone
      newUser
    }
  }
`;

const DEFAULT_FORM_VALUES = {
  firstName: '',
  lastName: '',
  email: '',
  address: '',
  phone: '',
  occupation: '',
  income: 0,
  pan: '',
  password: '',
  confirmPassword: '',
};

const schema = yup
  .object({
    firstName: yup.string().required(),
    lastName: yup.string().required(),
    email: yup.string().required().email(),
    address: yup.string().required(),
    phone: yup.string().required(),
    occupation: yup.string().required(),
    income: yup.number().required().positive(),
    pan: yup.string().required(),
    password: yup
      .string()
      .required('Required')
      .min(8, 'Must be 8 characters or more')
      .matches(/[a-z]+/, 'One lowercase character')
      .matches(/[A-Z]+/, 'One uppercase character')
      .matches(/[@$!%*#?&]+/, 'One special character')
      .matches(/\d+/, 'One number'),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref('password')], 'Passwords must match'),
  })
  .required();

function Register() {
  const titleColor = 'white';
  const textColor = 'gray.400';
  const { isOpen, onOpen, onClose } = useDisclosure();

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: DEFAULT_FORM_VALUES,
    resolver: yupResolver(schema),
  });
  const [registerUser, { data, loading, error, client }] = useMutation(
    REGISTER_USER,
    {
      errorPolicy: 'all',
    }
  );

  const onSubmit = (formData: any) => {
    console.log('Register: ', formData);
    registerUser({
      variables: {
        createUserInput: {
          address: formData.address,
          email: formData.email,
          firstName: formData.firstName,
          income: formData.income,
          lastName: formData.lastName,
          occupation: formData.occupation,
          pan: formData.pan,
          password: formData.password,
          phone: formData.phone,
        },
      },
    });
  };

  useEffect(() => {
    if (data?.createUser?.newUser) {
      reset();
      onOpen();
    }
  }, [data, reset, onOpen]);

  useEffect(() => {
    console.log('Registration Errors: ', errors);
  }, [errors]);

  if (loading) return <h1>Loading ...</h1>;

  if (error) return <h1>Something Went Wrong ...</h1>;

  return (
    <>
      <Flex
        alignItems='center'
        justifyContent='start'
        style={{ userSelect: 'none' }}
        flexDirection='column'
        mx={{ base: 'auto', lg: 'unset' }}
        ms={{ base: 'auto', lg: 'auto' }}
        mb='50px'
        w={{ base: '100%', md: '50%', lg: '42%' }}
      >
        <Flex
          direction='column'
          textAlign='center'
          justifyContent='center'
          align='center'
          mt={{ base: '60px', md: '140px', lg: '200px' }}
          mb='50px'
        >
          <Text
            fontSize='4xl'
            lineHeight='39px'
            color='white'
            fontWeight='bold'
          >
            Welcome!
          </Text>
          <Text
            fontSize='md'
            color='white'
            fontWeight='normal'
            mt='10px'
            w={{ base: '100%', md: '90%', lg: '90%', xl: '80%' }}
          >
            Enter your details to experience the future of banking
          </Text>
        </Flex>
        <GradientBorder p='2px' me={{ base: 'none', lg: '30px', xl: 'none' }}>
          <Flex
            background='transparent'
            borderRadius='30px'
            direction='column'
            p='40px'
            minW={{ base: 'unset', md: '430px', xl: '450px' }}
            w='100%'
            mx={{ base: '0px' }}
            bg={{
              base: 'rgb(19,21,56)',
            }}
          >
            <Text
              fontSize='xl'
              color={textColor}
              fontWeight='bold'
              textAlign='center'
              mb='22px'
            >
              Register
            </Text>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Flex direction='column' overflowY='scroll' height='400px'>
                <Controller
                  name='firstName'
                  control={control}
                  render={({ field }) => (
                    <FormControl isInvalid={Boolean(errors.firstName)}>
                      <FormLabel
                        color={titleColor}
                        ms='4px'
                        fontSize='sm'
                        fontWeight='normal'
                      >
                        First Name
                      </FormLabel>
                      <GradientBorder
                        mb='24px'
                        h='50px'
                        w={{ base: '100%', lg: 'fit-content' }}
                        borderRadius='20px'
                      >
                        <Input
                          color={titleColor}
                          bg={{
                            base: 'rgb(19,21,54)',
                          }}
                          border='transparent'
                          borderRadius='20px'
                          fontSize='sm'
                          size='lg'
                          w={{ base: '100%', md: '346px' }}
                          maxW='100%'
                          h='46px'
                          type='text'
                          placeholder='First name'
                          {...field}
                          data-testid="first-name-input"
                        />
                      </GradientBorder>
                      {errors.firstName && (
                        <FormErrorMessage mt='0px' mb='20px'>
                          First Name is required
                        </FormErrorMessage>
                      )}
                    </FormControl>
                  )}
                />
                <Controller
                  name='lastName'
                  control={control}
                  render={({ field }) => (
                    <FormControl isInvalid={Boolean(errors.lastName)}>
                      <FormLabel
                        color={titleColor}
                        ms='4px'
                        fontSize='sm'
                        fontWeight='normal'
                      >
                        Last Name
                      </FormLabel>

                      <GradientBorder
                        mb='24px'
                        h='50px'
                        w={{ base: '100%', lg: 'fit-content' }}
                        borderRadius='20px'
                      >
                        <Input
                          color={titleColor}
                          bg={{
                            base: 'rgb(19,21,54)',
                          }}
                          border='transparent'
                          borderRadius='20px'
                          fontSize='sm'
                          size='lg'
                          w={{ base: '100%', md: '346px' }}
                          maxW='100%'
                          h='46px'
                          type='text'
                          placeholder='Last name'
                          {...field}
                          data-testid="last-name-input"
                        />
                      </GradientBorder>
                      {errors.lastName && (
                        <FormErrorMessage mt='0px' mb='20px'>
                          Last Name is required
                        </FormErrorMessage>
                      )}
                    </FormControl>
                  )}
                />
                <Controller
                  name='email'
                  control={control}
                  render={({ field }) => (
                    <FormControl isInvalid={Boolean(errors.email)}>
                      <FormLabel
                        color={titleColor}
                        ms='4px'
                        fontSize='sm'
                        fontWeight='normal'
                      >
                        Email
                      </FormLabel>
                      <GradientBorder
                        mb='24px'
                        h='50px'
                        w={{ base: '100%', lg: 'fit-content' }}
                        borderRadius='20px'
                      >
                        <Input
                          color={titleColor}
                          bg={{
                            base: 'rgb(19,21,54)',
                          }}
                          border='transparent'
                          borderRadius='20px'
                          fontSize='sm'
                          size='lg'
                          w={{ base: '100%', md: '346px' }}
                          maxW='100%'
                          h='46px'
                          type='email'
                          placeholder='Your email address'
                          {...field}
                          data-testid="email-input"
                        />
                      </GradientBorder>
                      {errors.email && (
                        <FormErrorMessage mt='0px' mb='20px'>
                          Email is required
                        </FormErrorMessage>
                      )}
                    </FormControl>
                  )}
                />
                <Controller
                  name='address'
                  control={control}
                  render={({ field }) => (
                    <FormControl isInvalid={Boolean(errors.address)}>
                      <FormLabel
                        color={titleColor}
                        ms='4px'
                        fontSize='sm'
                        fontWeight='normal'
                      >
                        Address
                      </FormLabel>
                      <GradientBorder
                        mb='24px'
                        h='50px'
                        w={{ base: '100%', lg: 'fit-content' }}
                        borderRadius='20px'
                      >
                        <Input
                          color={titleColor}
                          bg={{
                            base: 'rgb(19,21,54)',
                          }}
                          border='transparent'
                          borderRadius='20px'
                          fontSize='sm'
                          size='lg'
                          w={{ base: '100%', md: '346px' }}
                          maxW='100%'
                          h='46px'
                          type='text'
                          placeholder='Residential Address'
                          {...field}
                          data-testid="address-input"
                        />
                      </GradientBorder>
                      {errors.address && (
                        <FormErrorMessage mt='0px' mb='20px'>
                          Valid Address is required
                        </FormErrorMessage>
                      )}
                    </FormControl>
                  )}
                />
                <Controller
                  name='phone'
                  control={control}
                  render={({ field }) => (
                    <FormControl isInvalid={Boolean(errors.phone)}>
                      <FormLabel
                        color={titleColor}
                        ms='4px'
                        fontSize='sm'
                        fontWeight='normal'
                      >
                        Phone
                      </FormLabel>
                      <GradientBorder
                        mb='24px'
                        h='50px'
                        w={{ base: '100%', lg: 'fit-content' }}
                        borderRadius='20px'
                      >
                        <Input
                          color={titleColor}
                          bg={{
                            base: 'rgb(19,21,54)',
                          }}
                          border='transparent'
                          borderRadius='20px'
                          fontSize='sm'
                          size='lg'
                          w={{ base: '100%', md: '346px' }}
                          maxW='100%'
                          h='46px'
                          type='tel'
                          placeholder='Contact Number'
                          {...field}
                          data-testid="contact-number-input"
                        />
                      </GradientBorder>
                      {errors.phone && (
                        <FormErrorMessage mt='0px' mb='20px'>
                          Phone is required
                        </FormErrorMessage>
                      )}
                    </FormControl>
                  )}
                />
                <Controller
                  name='occupation'
                  control={control}
                  render={({ field }) => (
                    <FormControl isInvalid={Boolean(errors.occupation)}>
                      <FormLabel
                        color={titleColor}
                        ms='4px'
                        fontSize='sm'
                        fontWeight='normal'
                      >
                        Occupation
                      </FormLabel>
                      <GradientBorder
                        mb='24px'
                        h='50px'
                        w={{ base: '100%', lg: 'fit-content' }}
                        borderRadius='20px'
                      >
                        <Input
                          color={titleColor}
                          bg={{
                            base: 'rgb(19,21,54)',
                          }}
                          border='transparent'
                          borderRadius='20px'
                          fontSize='sm'
                          size='lg'
                          w={{ base: '100%', md: '346px' }}
                          maxW='100%'
                          h='46px'
                          type='text'
                          placeholder='Occupation'
                          {...field}
                          data-testid="occupation-input"
                        />
                      </GradientBorder>
                      {errors.occupation && (
                        <FormErrorMessage mt='0px' mb='20px'>
                          Occupation is required
                        </FormErrorMessage>
                      )}
                    </FormControl>
                  )}
                />
                <Controller
                  name='income'
                  control={control}
                  render={({ field }) => (
                    <FormControl isInvalid={Boolean(errors.income)}>
                      <FormLabel
                        color={titleColor}
                        ms='4px'
                        fontSize='sm'
                        fontWeight='normal'
                      >
                        Income
                      </FormLabel>
                      <GradientBorder
                        mb='24px'
                        h='50px'
                        w={{ base: '100%', lg: 'fit-content' }}
                        borderRadius='20px'
                      >
                        <Input
                          color={titleColor}
                          bg={{
                            base: 'rgb(19,21,54)',
                          }}
                          border='transparent'
                          borderRadius='20px'
                          fontSize='sm'
                          size='lg'
                          w={{ base: '100%', md: '346px' }}
                          maxW='100%'
                          h='46px'
                          type='number'
                          placeholder='Yearly Income'
                          {...field}
                          data-testid="income-input"
                        />
                      </GradientBorder>
                      {errors.income && (
                        <FormErrorMessage mt='0px' mb='20px'>
                          Yearly Income is required
                        </FormErrorMessage>
                      )}
                    </FormControl>
                  )}
                />
                <Controller
                  name='pan'
                  control={control}
                  render={({ field }) => (
                    <FormControl isInvalid={Boolean(errors.pan)}>
                      <FormLabel
                        color={titleColor}
                        ms='4px'
                        fontSize='sm'
                        fontWeight='normal'
                      >
                        PAN Details
                      </FormLabel>
                      <GradientBorder
                        mb='24px'
                        h='50px'
                        w={{ base: '100%', lg: 'fit-content' }}
                        borderRadius='20px'
                      >
                        <Input
                          color={titleColor}
                          bg={{
                            base: 'rgb(19,21,54)',
                          }}
                          border='transparent'
                          borderRadius='20px'
                          fontSize='sm'
                          size='lg'
                          w={{ base: '100%', md: '346px' }}
                          maxW='100%'
                          h='46px'
                          type='text'
                          placeholder='PAN'
                          {...field}
                          data-testid="pan-input"
                        />
                      </GradientBorder>
                      {errors.pan && (
                        <FormErrorMessage mt='0px' mb='20px'>
                          PAN Details is required
                        </FormErrorMessage>
                      )}
                    </FormControl>
                  )}
                />
                <Controller
                  name='password'
                  control={control}
                  render={({ field }) => (
                    <FormControl isInvalid={Boolean(errors.password)}>
                      <FormLabel
                        color={titleColor}
                        ms='4px'
                        fontSize='sm'
                        fontWeight='normal'
                      >
                        Password
                      </FormLabel>
                      <GradientBorder
                        mb='24px'
                        h='50px'
                        w={{ base: '100%', lg: 'fit-content' }}
                        borderRadius='20px'
                      >
                        <Input
                          color={titleColor}
                          bg={{
                            base: 'rgb(19,21,54)',
                          }}
                          border='transparent'
                          borderRadius='20px'
                          fontSize='sm'
                          size='lg'
                          w={{ base: '100%', md: '346px' }}
                          maxW='100%'
                          h='46px'
                          type='password'
                          placeholder='Your password'
                          {...field}
                          data-testid="password-input"
                        />
                      </GradientBorder>
                      {errors.password && (
                        <FormErrorMessage mt='0px' mb='20px'>
                          Password should be at least 8 characters long, must
                          include one lowercase, one uppercase, one digit and
                          one special character (@$!%*#?&)
                        </FormErrorMessage>
                      )}
                    </FormControl>
                  )}
                />
                <Controller
                  name='confirmPassword'
                  control={control}
                  render={({ field }) => (
                    <FormControl isInvalid={Boolean(errors.confirmPassword)}>
                      <FormLabel
                        color={titleColor}
                        ms='4px'
                        fontSize='sm'
                        fontWeight='normal'
                      >
                        Confirm Password
                      </FormLabel>
                      <GradientBorder
                        mb='24px'
                        h='50px'
                        w={{ base: '100%', lg: 'fit-content' }}
                        borderRadius='20px'
                      >
                        <Input
                          color={titleColor}
                          bg={{
                            base: 'rgb(19,21,54)',
                          }}
                          border='transparent'
                          borderRadius='20px'
                          fontSize='sm'
                          size='lg'
                          w={{ base: '100%', md: '346px' }}
                          maxW='100%'
                          h='46px'
                          type='password'
                          placeholder='Confirm your password'
                          {...field}
                          data-testid="confirm-password-input"
                        />
                      </GradientBorder>
                      {errors.confirmPassword && (
                        <FormErrorMessage mt='0px' mb='20px'>
                          Entered Passwords doesn&apos;t match
                        </FormErrorMessage>
                      )}
                    </FormControl>
                  )}
                />
                <FormControl>
                  <FormControl display='flex' alignItems='center' mb='24px'>
                    <DarkMode>
                      <Switch
                        id='remember-login'
                        colorScheme='brand'
                        me='10px'
                      />
                    </DarkMode>

                    <FormLabel
                      color={titleColor}
                      htmlFor='remember-login'
                      mb='0'
                      fontWeight='normal'
                    >
                      Remember me
                    </FormLabel>
                  </FormControl>
                  <Button
                    variant='brand'
                    fontSize='10px'
                    type='submit'
                    w='100%'
                    maxW='350px'
                    h='45'
                    mb='20px'
                    mt='20px'
                    data-testid="register-button"
                  >
                    REGISTER
                  </Button>
                </FormControl>
                <Flex
                  flexDirection='column'
                  justifyContent='center'
                  alignItems='center'
                  maxW='100%'
                  mt='0px'
                >
                  <Text color={textColor} fontWeight='medium'>
                    Already have an account?
                    <Link
                      as={NextLink}
                      color={titleColor}
                      ms='5px'
                      href='/auth/login'
                      fontWeight='bold'
                    >
                      Log In
                    </Link>
                  </Text>
                </Flex>
              </Flex>
            </form>
          </Flex>
        </GradientBorder>
      </Flex>
      <Modal
        title='Congratulations'
        onClose={onClose}
        isOpen={isOpen}
        body={
          'Your account is successfully created. Please login to start using your account.'
        }
        footer={
          <>
            <Link
              as={NextLink}
              
              href='/auth/login'
              mr={3}
            >
              <Button variant='brand'>
              Go to Login Page
              </Button>
            </Link>
            <Button onClick={onClose}>Close</Button>
          </>
        }
      />
    </>
  );
}

export default Register;
