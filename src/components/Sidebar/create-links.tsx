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
} from "@chakra-ui/react";
import IconBox from "../../components/Icons/IconBox";

const CreateLinks = (props: any) => {
  const { sidebarconstiant, routes } = props;
  // Chakra Color Mode
  let activeBg = "#1A1F37";
  let inactiveBg = "#1A1F37";
  let activeColor = "white";
  let inactiveColor = "white";
  let sidebarActiveShadow = "none";

  return routes.map((prop: any, key: any) => {
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
            _hover='none'
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
            _hover='none'
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

export default CreateLinks;