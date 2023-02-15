import {
  Box,
  Link,
  Text,
} from "@chakra-ui/react";
import React from "react";
import NextLink from 'next/link'

const mainText = "white";

export const Brand = ({ logoText }:  { logoText: string }) =>  (
  <Link as={NextLink}
    display="flex"
    target='_blank'
    lineHeight='100%'
    fontWeight='bold'
    justifyContent='center'
    alignItems='center'
    color={mainText}
    href='/'
    >
    <Box
      bg='linear-gradient(97.89deg, #FFFFFF 70.67%, rgba(117, 122, 140, 0) 108.55%)'
      bgClip='text'>
      <Text fontSize='sm' letterSpacing='3px' mt='3px' color='transparent'>
        {logoText}
      </Text>
    </Box>
  </Link>
);