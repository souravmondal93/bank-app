import React, { ReactElement, useEffect } from 'react';
// Chakra imports
import {
  Flex,
  Button,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Link,
  Switch,
  Text,
  DarkMode,
  FormErrorMessage
} from '@chakra-ui/react';
import { useForm, Controller } from 'react-hook-form';
import { gql, useMutation } from '@apollo/client';
import { useRouter } from 'next/router';
import NextLink from 'next/link';


import { httpLink, setAuthToken } from '../../../apollo-client';

const LOGIN_USER = gql`
  mutation Mutation($loginUserInput: LoginUserInput!) {
    loginUser(loginUserInput: $loginUserInput) {
      access_token
    }
  }
`;

// Layout
import AuthLayout from '../../layouts/auth';

// Custom Components
import GradientBorder from '../../components/GradientBorder/GradientBorder';

Login.getLayout = function getLayout(page: ReactElement) {
  return <AuthLayout>{page}</AuthLayout>;
};

function Login() {
  const router = useRouter();
  const titleColor = 'white';
  const textColor = 'gray.400';

  const { control, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
  });
  const [loginUser, { data, loading, error, client }] = useMutation(LOGIN_USER, {
    errorPolicy: 'all',
  });

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
      client.setLink(setAuthToken(data.loginUser.access_token).concat(httpLink));
      router.push('/home/dashboard');
    }
  }, [data]);

  useEffect(() => {
    console.log('Login Errors: ', errors);
  }, [errors])

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
          <Heading color={titleColor} fontSize='32px' mb='10px'>
            Welcome! <br />
            Nice to see you!
          </Heading>
          <Text
            mb='36px'
            ms='4px'
            color={textColor}
            fontWeight='bold'
            fontSize='14px'
          >
            Enter your email and password to sign in
          </Text>
          <Controller
            name='email'
            rules={{ required: "Email is required" }}
            control={control}
            render={({ field }) => (
              <FormControl isInvalid={errors.email}>
                <FormLabel
                  ms='4px'
                  fontSize='sm'
                  fontWeight='normal'
                  color='white'
                >
                  Email
                </FormLabel>
                <GradientBorder
                  mb='24px'
                  w={{ base: '100%', lg: 'fit-content' }}
                  borderRadius='20px'
                >
                  <Input
                    color='white'
                    bg='rgb(19,21,54)'
                    border='transparent'
                    borderRadius='20px'
                    fontSize='sm'
                    size='lg'
                    w={{ base: '100%', md: '346px' }}
                    maxW='100%'
                    h='46px'
                    placeholder='Your email adress'
                    {...field}
                  />
                  
                </GradientBorder>
                {errors.email && <FormErrorMessage mt='0px' mb='20px'>Email is required</FormErrorMessage>}
              </FormControl>
            )}
          />
          <Controller
            name='password'
            rules={{ required: "Password is required" }}
            control={control}
            render={({ field }) => (
              <FormControl isInvalid={errors.password}>
                <FormLabel
                  ms='4px'
                  fontSize='sm'
                  fontWeight='normal'
                  color='white'
                >
                  Password
                </FormLabel>
                <GradientBorder
                  mb='24px'
                  w={{ base: '100%', lg: 'fit-content' }}
                  borderRadius='20px'
                >
                  <Input
                    color='white'
                    bg='rgb(19,21,54)'
                    border='transparent'
                    borderRadius='20px'
                    fontSize='sm'
                    size='lg'
                    w={{ base: '100%', md: '346px' }}
                    maxW='100%'
                    type='password'
                    placeholder='Your password'
                    {...field}
                  />
                </GradientBorder>
                {errors.password && <FormErrorMessage mt='0px' mb='20px'>Password is required</FormErrorMessage>}
              </FormControl>
            )}
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
            <Text fontSize='md' color='red.500' fontWeight='bold' mt="15px">
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
            <Text color={textColor} fontWeight='medium'>
              Don't have an account?
              <Link as={NextLink} color={titleColor} href='/auth/register' ms='5px' fontWeight='bold'>
                Sign Up
              </Link>
            </Text>
          </Flex>
        </Flex>
      </form>
    </Flex>
  );
}

export default Login;
