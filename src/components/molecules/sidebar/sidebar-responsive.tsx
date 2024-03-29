import PropTypes from "prop-types";
import React from "react";
import NextLink from "next/link";
import { useRouter } from 'next/router'

// Chakra Imports
import {
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerOverlay,
  Flex,
  Link,
  Stack,
  Text,
  useDisclosure,
  Icon
} from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";

import IconBox from "@/components/atoms/icons/icon-box";
import Brand from "@/components/molecules/sidebar/brand";


type SidebarResponsiveProps = {
  routes: any;
  iconColor: string;
  logoText: string;
  secondary: string;
  ms?: any;
};

export function SidebarResponsive(props: SidebarResponsiveProps) {
  // to check for active links and opened collapses
  let location = useRouter();
  // this is for the rest of the collapses
  const [state, setState] = React.useState({});
  const mainPanel = React.useRef();
  // verifies if routeName is the one active (in browser input)
  const activeRoute = (routeName) => {
    return location.pathname === routeName ? "active" : "";
  };
  // this function creates the links and collapses that appear in the sidebar (left menu)
  const createLinks = (routes) => {
    // Chakra Color Mode
    const activeBg = "#1A1F37";
    const inactiveBg = "#1A1F37";
    const activeColor = "white";
    const inactiveColor = "white";

    return routes.map((prop, key) => {
      if (prop.redirect) {
        return null;
      }
      if (prop.category) {
        const st = {};
        st[prop["state"]] = !state[prop.state];
        return (
          <>
            <Text
              color={activeColor}
              fontWeight='bold'
              mb={{
                xl: "12px",
              }}
              mx='auto'
              ps={{
                sm: "10px",
                xl: "16px",
              }}
              py='12px'>
              {prop.name}
            </Text>
            {createLinks(prop.views)}
          </>
        );
      }
      return (
        <Link as={NextLink} href={prop.layout + prop.path} key={key}>
          {activeRoute(prop.layout + prop.path) === "active" ? (
            <Button
              boxSize='initial'
              justifyContent='flex-start'
              alignItems='center'
              bg={activeBg}
              mb={{
                xl: "12px",
              }}
              mx={{
                xl: "auto",
              }}
              ps={{
                sm: "10px",
                xl: "16px",
              }}
              py='12px'
              borderRadius='15px'
              // _hover='none'
              w='100%'
              _active={{
                bg: "inherit",
                transform: "none",
                borderColor: "transparent",
              }}
              _focus={{
                boxShadow: "none",
              }}>
              <Flex>
                {typeof prop.icon === "string" ? (
                  <Icon>{prop.icon}</Icon>
                ) : (
                  <IconBox
                    bg='brand.200'
                    color='white'
                    h='30px'
                    w='30px'
                    me='12px'>
                    {prop.icon}
                  </IconBox>
                )}
                <Text color={activeColor} my='auto' fontSize='sm'>
                  {prop.name}
                </Text>
              </Flex>
            </Button>
          ) : (
            <Button
              boxSize='initial'
              justifyContent='flex-start'
              alignItems='center'
              bg='transparent'
              mb={{
                xl: "12px",
              }}
              mx={{
                xl: "auto",
              }}
              py='12px'
              ps={{
                sm: "10px",
                xl: "16px",
              }}
              borderRadius='15px'
              // _hover='none'
              w='100%'
              _active={{
                bg: "inherit",
                transform: "none",
                borderColor: "transparent",
              }}
              _focus={{
                boxShadow: "none",
              }}>
              <Flex>
                {typeof prop.icon === "string" ? (
                  <Icon>{prop.icon}</Icon>
                ) : (
                  <IconBox
                    bg={inactiveBg}
                    color='brand.200'
                    h='30px'
                    w='30px'
                    me='12px'>
                    {prop.icon}
                  </IconBox>
                )}
                <Text color={inactiveColor} my='auto' fontSize='sm'>
                  {prop.name}
                </Text>
              </Flex>
            </Button>
          )}
        </Link>
      );
    });
  };
  const { logoText, routes, iconColor, ...rest } = props;

  const links = <>{createLinks(routes)}</>;

  //  BRAND
  //  Chakra Color Mode
  

  // SIDEBAR
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef();
  // Color constiables
  return (
    <Flex
      display={{ sm: "flex", xl: "none" }}
      ref={mainPanel}
      alignItems='center'>
      <HamburgerIcon
        color={iconColor}
        w='18px'
        h='18px'
        ref={btnRef}
        // colorScheme='teal'
        onClick={onOpen}
      />
      <Drawer
        isOpen={isOpen}
        onClose={onClose}
        placement="left"
        finalFocusRef={btnRef}>
        <DrawerOverlay />
        <DrawerContent
          backdropFilter='blur(10px)'
          bg='linear-gradient(111.84deg, rgba(6, 11, 38, 0.94) 59.3%, rgba(26, 31, 55, 0) 100%); '
          w='250px'
          maxW='250px'
          ms={{
            sm: "16px",
          }}
          my={{
            sm: "16px",
          }}
          borderRadius='16px'>
          <DrawerCloseButton
            color='white'
            _focus={{ boxShadow: "none" }}
            _hover={{ boxShadow: "none" }}
          />
          <DrawerBody maxW='250px' px='1rem'>
            <Box maxW='100%' h='100vh'>
              <Box><Brand logoText={logoText} /></Box>
              <Stack direction='column' mb='40px'>
                <Box>{links}</Box>
              </Stack>
            </Box>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Flex>
  );
}

SidebarResponsive.propTypes = {
  logoText: PropTypes.string,
  routes: PropTypes.arrayOf(PropTypes.object),
};

export default SidebarResponsive;