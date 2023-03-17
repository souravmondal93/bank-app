import React, { ReactElement } from 'react';
// Chakra imports
import {
  Flex,
  Heading,
  Link,
  Text,
} from '@chakra-ui/react';
import NextLink from 'next/link';

// Layout
import AuthLayout from '@/layouts/auth';

Custom404.getLayout = function getLayout(page: ReactElement) {
  return <AuthLayout>{page}</AuthLayout>;
};

function Custom404() {
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
        <Heading color={titleColor} fontSize='32px' mb='10px' h='200px'>
          <Text fontSize='6xl'>Uh Oh!</Text>
          <Text fontSize='2xl'>Looks like you shouldn&apos;t be here!</Text>
        </Heading>
        

        <Flex
          flexDirection='column'
          maxW='100%'
          mt='0px'
          h='200px'
        >
          <Text
          mb='36px'
          ms='4px'
          color={textColor}
          fontWeight='bold'
          fontSize='md'
        >
          Please use login page to start your journey
        </Text>
        <Link
          as={NextLink}
          color={titleColor}
          href='/auth/login'
          ms='5px'
          fontWeight='bold'
        >
          Sign In
        </Link>
        </Flex>
      </Flex>
    </Flex>
  );
}

export default Custom404;
