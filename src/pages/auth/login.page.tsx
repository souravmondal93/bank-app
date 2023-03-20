import React, { ReactElement, useEffect } from 'react';
import Head from 'next/head';
import { useForm } from 'react-hook-form';
import { useMutation } from '@apollo/client';
import { useRouter } from 'next/router';
import NextLink from 'next/link';
import { yupResolver } from '@hookform/resolvers/yup';
import { useApolloClient } from '@apollo/client';

// Chakra imports
import {
  Flex,
  Button,
  FormControl,
  FormLabel,
  Heading,
  Link,
  Switch,
  Text,
  DarkMode,
} from '@chakra-ui/react';

import { httpLink, setAuthToken } from '../../../apollo-client';

// Layout
import AuthLayout from '@/layouts/auth';

// Custom Components
import InputController from '@/components/molecules/input-controller/input-controller';

import reportAccessibility from '@/utils/report-accessibility';
import { LOGIN_USER } from '@/graphql/mutation/login.mutation';
import { LOGIN_SCHEMA } from '@/common/login-form.schema';


Login.getLayout = function getLayout(page: ReactElement) {
  return (
    <AuthLayout>
      <Head>
        <title>Vision Bank - Login Page</title>
      </Head>
      {page}
    </AuthLayout>
  );
};

function Login() {
  const router = useRouter();
  const client = useApolloClient();

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
    resolver: yupResolver(LOGIN_SCHEMA),
  });
  const [loginUser, { data, loading, error }] = useMutation(
    LOGIN_USER,
    {
      errorPolicy: 'all',
    }
  );

  const onSubmit = (formData: any) => {
    loginUser({
      variables: {
        loginUserInput: {
          email: formData.email,
          password: formData.password,
        },
      },
    });
  };

  useEffect(() => {
    if (data?.loginUser?.access_token) {
      client.setLink(
        setAuthToken(data.loginUser.access_token).concat(httpLink)
      );
      router.push('/home/dashboard');
    }
  }, [data, router, client]);

  useEffect(() => {
    console.log('Login Errors: ', errors);
    if (process.env.NODE_ENV !== 'test' && Object.keys(errors).length === 0) {
      client.setLink(setAuthToken('').concat(httpLink));
      client.clearStore().then(() => {
        client.resetStore();
      });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) return <h1>Loading ...</h1>;

  if (error) return <h1>Something Went Wrong ...</h1>;

  return (
    <Flex
      alignItems='center'
      justifyContent='start'
      style={{ userSelect: 'none' }}
      mx={{ base: 'auto', lg: 'unset' }}
      ms={{ base: 'auto', lg: 'auto' }}
      w={{ base: '100%', md: '50%', lg: '450px' }}
      px='50px'
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <Flex
          direction='column'
          w='100%'
          background='transparent'
          mt={{ base: '50px', md: '150px', lg: '160px', xl: '245px' }}
          mb={{ base: '60px', lg: '95px' }}
        >
          <Heading color="white" fontSize='32px' mb='10px'>
            Welcome! <br />
            Nice to see you!
          </Heading>
          <Text
            mb='36px'
            ms='4px'
            color='gray.400'
            fontWeight='bold'
            fontSize='14px'
          >
            Enter your email and password to sign in
          </Text>
          <InputController
            control={control}
            errors={errors}
            errorText="Email is required"
            label="Email"
            fieldName="email"
            placeholder='Your email adress'
            dataTestId="email-input"
           />
          <InputController
            control={control}
            errors={errors}
            errorText="Password is required"
            label="Password"
            fieldName="password"
            placeholder='Your password'
            type="password"
            dataTestId="password-input"
           />
          <FormControl display='flex' alignItems='center'>
            <DarkMode>
              <Switch id='remember-login' colorScheme='brand' me='10px' />
            </DarkMode>
            <FormLabel
              htmlFor='remember-login'
              mb='0'
              ms='1'
              fontWeight='normal'
              color='white'
            >
              Remember me
            </FormLabel>
          </FormControl>
          {error ? (
            <Text fontSize='md' color='red.500' fontWeight='bold' mt='15px'>
              {error.message}
            </Text>
          ) : null}
          <Button
            variant='brand'
            fontSize='10px'
            type='submit'
            w='100%'
            maxW='350px'
            h='45'
            mb='20px'
            mt='20px'
            isLoading={loading}
            loadingText='Signing In ...'
            data-testid='sign-in-submit'
          >
            SIGN IN
          </Button>

          <Flex
            flexDirection='column'
            justifyContent='center'
            alignItems='center'
            maxW='100%'
            mt='0px'
          >
            <Text color='gray.400' fontWeight='medium'>
              Don&apos;t have an account?
              <Link
                as={NextLink}
                color="white"
                href='/auth/register'
                ms='5px'
                fontWeight='bold'
              >
                Sign Up
              </Link>
            </Text>
          </Flex>
        </Flex>
      </form>
    </Flex>
  );
}

// reportAccessibility(React);

export default Login;
