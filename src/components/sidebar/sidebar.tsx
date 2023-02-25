
import { HamburgerIcon } from "@chakra-ui/icons";
// chakra imports
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
import IconBox from "../icons/icon-box";
import Brand from "@/components/sidebar/brand";
import PropTypes from "prop-types";
import React from "react";
import NextLink from "next/link";
import { useRouter } from 'next/router'

// FUNCTIONS

function Sidebar(props) {
  // to check for active links and opened collapses
  let location = useRouter();
  // this is for the rest of the collapses
  const [state, setState] = React.useState({});
  const mainPanel = React.useRef();
  let constiantChange = "0.2s linear";
  // verifies if routeName is the one active (in browser input)
  const activeRoute = (routeName) => {
    return location.pathname === routeName ? "active" : "";
  };
  // this function creates the links and collapses that appear in the sidebar (left menu)
  const createLinks = (routes) => {
    const { sidebarconstiant } = props;
    // Chakra Color Mode
    let activeBg = "#1A1F37";
    let inactiveBg = "#1A1F37";
    let activeColor = "white";
    let inactiveColor = "white";
    let sidebarActiveShadow = "none";

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
        <Link as={NextLink} href={prop.layout + prop.path}>
          {activeRoute(prop.layout + prop.path) === "active" ? (
            <Button
              boxSize='initial'
              justifyContent='flex-start'
              alignItems='center'
              boxShadow={sidebarActiveShadow}
              bg={activeBg}
              transition={constiantChange}
              backdropFilter='blur(42px)'
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
                boxShadow: "0px 7px 11px rgba(0, 0, 0, 0.04)",
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
                    me='12px'
                    transition={constiantChange}>
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
                    me='12px'
                    transition={constiantChange}>
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


  const { logoText, routes, sidebarconstiant } = props;

  const links = <>{createLinks(routes)}</>;

  //  BRAND
  //  Chakra Color Mode
  let sidebarBg =
    "linear-gradient(111.84deg, rgba(6, 11, 38, 0.94) 59.3%, rgba(26, 31, 55, 0) 100%)";
  let sidebarRadius = "16px";
  let sidebarMargins = "16px 0px 16px 16px";

  // SIDEBAR
  return (
    <Box ref={mainPanel}>
      <Box display={{ sm: "none", xl: "block" }} position='fixed'>
        <Box
          bg={sidebarBg}
          backdropFilter='blur(10px)'
          transition={constiantChange}
          w='260px'
          maxW='260px'
          ms={{
            sm: "16px",
          }}
          my={{
            sm: "16px",
          }}
          h='calc(100vh - 32px)'
          ps='20px'
          pe='20px'
          m={sidebarMargins}
          borderRadius={sidebarRadius}>
          <Box><Brand logoText={logoText} /></Box>
          <Stack direction='column' mb='40px'>
            <Box>{links}</Box>
          </Stack>
        </Box>
      </Box>
    </Box>
  );
}

Sidebar.propTypes = {
  logoText: PropTypes.string,
  routes: PropTypes.arrayOf(PropTypes.object),
  constiant: PropTypes.string,
};

export default Sidebar;
