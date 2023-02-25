import {
  Button,
  HStack,
  Text,
} from "@chakra-ui/react";
import React from "react";
import NextLink from 'next/link'

import {
  DocumentIcon,
  HomeIcon,
  PersonIcon,
  RocketIcon,
} from "@/components/icons/all-icons";

const navbarIcon = "white";

export const AuthLinks = () => (
  <HStack display={{ sm: "none", lg: "flex" }}>
    <NextLink href='/auth/register'>
      <Button
        fontSize='sm'
        ms='0px'
        me='0px'
        px='0px'
        // me={{ sm: "2px", md: "16px" }}
        color={navbarIcon}
        variant='transparent-with-icon'
        leftIcon={
          <RocketIcon color={navbarIcon} w='12px' h='12px' me='0px' />
        }>
        <Text>Sign Up</Text>
      </Button>
    </NextLink>
    <NextLink href='/auth/login'>
      <Button
        fontSize='sm'
        ms='0px'
        px='0px'
        me={{ sm: "2px", md: "16px" }}
        color={navbarIcon}
        variant='transparent-with-icon'
        leftIcon={
          <DocumentIcon color={navbarIcon} w='12px' h='12px' me='0px' />
        }>
        <Text>Sign In</Text>
      </Button>
    </NextLink>
  </HStack>
);