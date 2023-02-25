import React from 'react';
import { Box, ChakraProvider, Portal, Flex, Text } from '@chakra-ui/react';

import AuthNavbar from '../components/navbars/auth-navbar';
import AuthFooter from '../components/footer/auth-footer';
import theme from '../theme/theme-auth';

export default function AuthLayout(props: { children: React.ReactNode }) {
  const { children } = props;
  const navRef = React.useRef();
  const wrapper = React.createRef();

  return (
    <ChakraProvider theme={theme} resetCSS={false}>
      <Box ref={navRef} w='100%'>
        <Portal containerRef={navRef}>
          <AuthNavbar logoText='VISION BANK' />
        </Portal>
        <Box w='100%'>
          <Box w='100%'>
            <Flex position='relative'>
              <Flex
                minH='100vh'
                h={{ base: '120vh', lg: 'fit-content' }}
                w='100%'
                maxW='1044px'
                mx='auto'
                pt={{ sm: '100px', md: '0px' }}
                flexDirection='column'
                me={{ base: 'auto'}}
              >
                <Box
                  display={{ base: 'none', lg: 'block' }}
                  overflowX='hidden'
                  h='100%'
                  maxW={{ md: '50vw', lg: '50vw' }}
                  minH='100vh'
                  w='960px'
                  position='absolute'
                  left='0px'
                >
                  <Box
                    bgImage="url('/assets/img/signInImage.png')"
                    w='100%'
                    h='100%'
                    bgSize='cover'
                    bgPosition='50%'
                    position='absolute'
                    display='flex'
                    flexDirection='column'
                    justifyContent='center'
                    alignItems='center'
                  >
                    <Text
                      textAlign='center'
                      color='white'
                      letterSpacing='8px'
                      fontSize='20px'
                      fontWeight='500'
                    >
                      INSPIRED BY THE FUTURE:
                    </Text>
                    <Text
                      textAlign='center'
                      color='transparent'
                      letterSpacing='8px'
                      fontSize='36px'
                      fontWeight='bold'
                      bgClip='text !important'
                      bg='linear-gradient(94.56deg, #FFFFFF 79.99%, #21242F 102.65%)'
                    >
                      THE VISION BANK
                    </Text>
                  </Box>
                </Box>
                {children}
                <Box
                  w={{ base: '335px', md: '450px' }}
                  mx={{ base: 'auto', lg: 'unset' }}
                  ms={{ base: 'auto', lg: 'auto' }}
                  mb='80px'
                >
                  <AuthFooter />
                </Box>
              </Flex>
            </Flex>
          </Box>
        </Box>
      </Box>
    </ChakraProvider>
  );
};