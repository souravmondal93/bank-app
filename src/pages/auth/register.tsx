import React, { ReactElement } from 'react';
import NextLink from 'next/link'
// Chakra imports
import {
  Box,
  Flex,
  Button,
  FormControl,
  FormLabel,
  HStack,
  Input,
  Link,
  Switch,
  Text,
  Icon,
  DarkMode,
} from '@chakra-ui/react';
// Icons
import { FaApple, FaFacebook, FaGoogle } from 'react-icons/fa';

// Layout
import AuthLayout from '../../layouts/auth';
// Custom Components
import GradientBorder from '../../components/GradientBorder/GradientBorder';

Register.getLayout = function getLayout(page: ReactElement) {
  return <AuthLayout>{page}</AuthLayout>;
};

function Register() {
  const titleColor = 'white';
  const textColor = 'gray.400';

  return (
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
        <Text fontSize='4xl' lineHeight='39px' color='white' fontWeight='bold'>
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
            Register With
          </Text>
          <HStack spacing='15px' justify='center' mb='22px'>
            <GradientBorder borderRadius='15px'>
              <Flex
                _hover={{ filter: 'brightness(120%)' }}
                transition='all .25s ease'
                cursor='pointer'
                justify='center'
                align='center'
                bg='rgb(19,21,54)'
                w='71px'
                h='71px'
                borderRadius='15px'
              >
                <Link href='#'>
                  <Icon
                    color={titleColor}
                    as={FaFacebook}
                    w='30px'
                    h='30px'
                    _hover={{ filter: 'brightness(120%)' }}
                  />
                </Link>
              </Flex>
            </GradientBorder>
            <GradientBorder borderRadius='15px'>
              <Flex
                _hover={{ filter: 'brightness(120%)' }}
                transition='all .25s ease'
                cursor='pointer'
                justify='center'
                align='center'
                bg='rgb(19,21,54)'
                w='71px'
                h='71px'
                borderRadius='15px'
              >
                <Link href='#'>
                  <Icon
                    color={titleColor}
                    as={FaApple}
                    w='30px'
                    h='30px'
                    _hover={{ filter: 'brightness(120%)' }}
                  />
                </Link>
              </Flex>
            </GradientBorder>
            <GradientBorder borderRadius='15px'>
              <Flex
                _hover={{ filter: 'brightness(120%)' }}
                transition='all .25s ease'
                cursor='pointer'
                justify='center'
                align='center'
                bg='rgb(19,21,54)'
                w='71px'
                h='71px'
                borderRadius='15px'
              >
                <Link href='#'>
                  <Icon
                    color={titleColor}
                    as={FaGoogle}
                    w='30px'
                    h='30px'
                    _hover={{ filter: 'brightness(120%)' }}
                  />
                </Link>
              </Flex>
            </GradientBorder>
          </HStack>
          <Text
            fontSize='lg'
            color='gray.400'
            fontWeight='bold'
            textAlign='center'
            mb='22px'
          >
            or
          </Text>
          <FormControl overflowY="scroll" height="400px">
            <FormLabel
              color={titleColor}
              ms='4px'
              fontSize='sm'
              fontWeight='normal'
            >
              Full Name
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
                placeholder='Your name'
              />
            </GradientBorder>
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
              />
            </GradientBorder>
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
              />
            </GradientBorder>
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
              />
            </GradientBorder>
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
              />
            </GradientBorder>
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
              />
            </GradientBorder>
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
              />
            </GradientBorder>
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
              />
            </GradientBorder>
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
              />
            </GradientBorder>
            <FormControl display='flex' alignItems='center' mb='24px'>
              <DarkMode>
                <Switch id='remember-login' colorScheme='brand' me='10px' />
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
              <Link as={NextLink}
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
      </GradientBorder>
    </Flex>
  );
}

export default Register;
