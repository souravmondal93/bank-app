// Chakra imports
import {
  Box,
  Button,
  Flex,
  Link,
  useColorModeValue,
} from "@chakra-ui/react";
import PropTypes from "prop-types";
import React from "react";

import { SidebarResponsive } from "@/components/sidebar/sidebar-responsive";
import { AuthLinks } from './auth-links';
import { Brand } from './brand';
import routes from "../../routes";

type AuthNavbarProps =  {
  logoText: string;
  logo?: string;
  secondary?: string;
}


export default function AuthNavbar(props: AuthNavbarProps) {
  const [open, setOpen] = React.useState(false);
  const { logo, logoText, secondary, ...rest } = props;

  // Chakra color mode
  const navbarShadow = useColorModeValue(
    "0px 7px 23px rgba(0, 0, 0, 0.05)",
    "none"
  );
  const navbarFilter = useColorModeValue(
    "none",
    "drop-shadow(0px 7px 23px rgba(0, 0, 0, 0.05))"
  );
  
  
  return (
    <Flex
      position="fixed"
      top='16px'
      left='50%'
      transform='translate(-50%, 0px)'
      background="linear-gradient(123.64deg, rgba(255, 255, 255, 0) -22.38%, rgba(255, 255, 255, 0.039) 70.38%)"
      border='2px solid'
      borderColor="rgba(226, 232, 240, 0.3)"
      boxShadow={navbarShadow}
      filter={navbarFilter}
      backdropFilter="blur(42px)"
      borderRadius='20px'
      px='16px'
      py='22px'
      mx='auto'
      width='1044px'
      maxW='90%'
      alignItems='center'>
      <Flex w='100%' justifyContent={{ sm: "start", lg: "space-between" }}>
        <Brand logoText={logoText} />
        <Box
          ms={{ base: "auto", lg: "0px" }}
          display={{ base: "flex", lg: "none" }}>
          <SidebarResponsive
            routes={routes}
            iconColor='white'
            logoText={props.logoText}
            secondary={props.secondary}
            {...rest}
          />
        </Box>
        <AuthLinks />
        <Link href=''>
          <Button
            fontSize='xs'
            variant='brand'
            borderRadius='12px'
            px='30px'
            display={{
              sm: "none",
              lg: "flex",
            }}>
            Free Account
          </Button>
        </Link>
      </Flex>
    </Flex>
  );
}

AuthNavbar.propTypes = {
  color: PropTypes.oneOf(["primary", "info", "success", "warning", "danger"]),
  brandText: PropTypes.string,
};
