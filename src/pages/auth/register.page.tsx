import React, { ReactElement, useEffect } from 'react';
import Head from 'next/head';
import NextLink from 'next/link';
// Chakra imports
import {
  Flex,
  Button,
  FormControl,
  FormLabel,
  Link,
  Switch,
  Text,
  DarkMode,
  useDisclosure,
} from '@chakra-ui/react';
import * as yup from 'yup';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation } from '@apollo/client';

// Layout
import AuthLayout from '@/layouts/auth';
// Custom Components
import GradientBorder from '@/components/atoms/gradient-border/gradient-border';
import Modal from '@/components/molecules/modal/modal';
import InputController from '@/components/molecules/input-controller/input-controller';

import reportAccessibility from '@/utils/report-accessibility';
import { REGISTER_USER } from '@/graphql/mutation/register.mutation';
import CONSTANTS from '@/common/constants';
import { REGISTER_SCHEMA } from '@/common/register-form.schema';

Register.getLayout = function getLayout(page: ReactElement) {
  return (
    <AuthLayout>
      <Head>
        <title>Vision Bank - Register Page</title>
      </Head>
      {page}
    </AuthLayout>
  );
};

function Register() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: CONSTANTS.DEFAULT_FORM_VALUES,
    resolver: yupResolver(REGISTER_SCHEMA),
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
              color='gray.400'
              fontWeight='bold'
              textAlign='center'
              mb='22px'
            >
              Register
            </Text>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Flex direction='column' overflowY='scroll' height='400px'>
                <InputController
                  control={control}
                  errors={errors}
                  errorText="First Name is required"
                  label="First Name"
                  fieldName="firstName"
                  placeholder='First name'
                  dataTestId="first-name-input"
                />
                <InputController
                  control={control}
                  errors={errors}
                  errorText="Last Name is required"
                  label="Last Name"
                  fieldName="lastName"
                  placeholder='Last name'
                  dataTestId="last-name-input"
                />
                <InputController
                  control={control}
                  errors={errors}
                  errorText="Email is required"
                  label="Email"
                  fieldName="email"
                  placeholder='Email'
                  dataTestId="email-input"
                  type='email'
                />
                <InputController
                  control={control}
                  errors={errors}
                  errorText="Valid Address is required"
                  label="Address"
                  fieldName="address"
                  placeholder='Residential Address'
                  dataTestId="address-input"
                />
                <InputController
                  control={control}
                  errors={errors}
                  errorText="Phone is required"
                  label="Phone"
                  fieldName="phone"
                  placeholder='Contact Number'
                  dataTestId="contact-number-input"
                  type='tel'
                />
                <InputController
                  control={control}
                  errors={errors}
                  errorText="Occupation is required"
                  label="Occupation"
                  fieldName="occupation"
                  placeholder='Occupation'
                  dataTestId="occupation-input"
                />
                <InputController
                  control={control}
                  errors={errors}
                  errorText="Yearly Income is required"
                  label="Income"
                  fieldName="income"
                  placeholder='Yearly Income'
                  dataTestId="income-input"
                  type='number'
                />
                <InputController
                  control={control}
                  errors={errors}
                  errorText="PAN Details is required"
                  label="PAN Details"
                  fieldName="pan"
                  placeholder='PAN'
                  dataTestId="pan-input"
                />
                <InputController
                  control={control}
                  errors={errors}
                  errorText="Password should be at least 8 characters long, must
                    include one lowercase, one uppercase, one digit and
                    one special character (@$!%*#?&)"
                  label="Password"
                  fieldName="password"
                  placeholder='Your password'
                  dataTestId="password-input"
                  type='password'
                />
                <InputController
                  control={control}
                  errors={errors}
                  errorText="Entered Passwords doesn&apos;t match"
                  label="Confirm Password"
                  fieldName="confirmPassword"
                  placeholder='Confirm your password'
                  dataTestId="confirm-password-input"
                  type='password'
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
                      color="white"
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
                  <Text color='gray.400' fontWeight='medium'>
                    Already have an account?
                    <Link
                      as={NextLink}
                      color="white"
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

reportAccessibility(React);

export default Register;
