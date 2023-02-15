import React, { ReactElement } from 'react';
// Chakra imports
import {
  Box,
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
} from '@chakra-ui/react';

// Layout
import AuthLayout from '../../layouts/auth';

// Custom Components
// import AuthFooter from '../../components/Footer/auth-footer';
import GradientBorder from '../../components/GradientBorder/GradientBorder';

Login.getLayout = function getLayout(page: ReactElement) {
  return <AuthLayout>{page}</AuthLayout>;
};

function Login() {
  const titleColor = 'white';
  const textColor = 'gray.400';

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
        <FormControl>
          <FormLabel ms='4px' fontSize='sm' fontWeight='normal' color='white'>
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
            />
          </GradientBorder>
        </FormControl>
        <FormControl>
          <FormLabel ms='4px' fontSize='sm' fontWeight='normal' color='white'>
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
            />
          </GradientBorder>
        </FormControl>
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
        <Button
          variant='brand'
          fontSize='10px'
          type='submit'
          w='100%'
          maxW='350px'
          h='45'
          mb='20px'
          mt='20px'
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
            <Link color={titleColor} as='span' ms='5px' fontWeight='bold'>
              Sign Up
            </Link>
          </Text>
        </Flex>
      </Flex>
    </Flex>
  );
}

export default Login;
