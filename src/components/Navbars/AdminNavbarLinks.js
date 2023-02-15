// Chakra Icons
import { BellIcon, SearchIcon } from '@chakra-ui/icons';
// Chakra Imports
import {
  Button,
  Flex,
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
  Link,
} from '@chakra-ui/react';
// Assets
// import avatar1 from "/assets/img/avatars/avatar1.png";
// import avatar2 from "/assets/img/avatars/avatar2.png";
// import avatar3 from "/assets/img/avatars/avatar3.png";
// Custom Icons
import { ProfileIcon, SettingsIcon } from '@/components/Icons/Icons';
// Custom Components
import { ItemContent } from '@/components/Menu/ItemContent';
import { SidebarResponsive } from '@/components/Sidebar/Sidebar';
import PropTypes from 'prop-types';
import React from 'react';
import NextLink from 'next/link';
import routes from '../../routes.js';

export default function HomeNavbarLinks(props) {
  const { variant, secondary, ...rest } = props;

  // Chakra Color Mode
  let inputBg = '#0F1535';
  let mainText = 'gray.400';
  let navbarIcon = 'white';
  let searchIcon = 'white';

  if (secondary) {
    navbarIcon = 'white';
    mainText = 'white';
  }
  return (
    <Flex
      pe={{ sm: '0px', md: '16px' }}
      w={{ sm: '100%', md: 'auto' }}
      alignItems='center'
      flexDirection='row'
    >
      <Link as={NextLink} href='/auth/login'>
        <Button
          ms='0px'
          px='0px'
          me={{ sm: '2px', md: '16px' }}
          color={navbarIcon}
          variant='transparent-with-icon'
          rightIcon={
            <ProfileIcon color={navbarIcon} w='22px' h='22px' me='0px' />
          }
        >
          <Text display={{ sm: 'none', md: 'flex' }}>Logout</Text>
        </Button>
      </Link>
      <SidebarResponsive
        iconColor='gray.500'
        ms={{ base: '16px', xl: '0px' }}
        logoText={props.logoText}
        secondary={props.secondary}
        routes={routes}
        // logo={logo}
        {...rest}
      />
      <Menu>
        <MenuButton align='center'>
          <BellIcon
            color={navbarIcon}
            mt='-4px'
            w='18px'
            h='18px'
            ms={{ base: '16px', xl: '0px' }}
            me='16px'
          />
        </MenuButton>

        <MenuList
          border='transparent'
          backdropFilter='blur(63px)'
          bg='linear-gradient(127.09deg, rgba(6, 11, 40, 0.94) 19.41%, rgba(10, 14, 35, 0.69) 76.65%)'
          borderRadius='20px'
        >
          <Flex flexDirection='column'>
            <MenuItem
              borderRadius='8px'
              _hover={{
                bg: 'transparent',
              }}
              _active={{
                bg: 'transparent',
              }}
              _focus={{
                bg: 'transparent',
              }}
              mb='10px'
            >
              <ItemContent
                time='13 minutes ago'
                info='from Alicia'
                boldInfo='New Message'
                aName='Alicia'
                aSrc="url('/assets/img/avatars/avatar1.png')"
              />
            </MenuItem>
            <MenuItem
              borderRadius='8px'
              _hover={{
                bg: 'transparent',
              }}
              _active={{
                bg: 'transparent',
              }}
              _focus={{
                bg: 'transparent',
              }}
              _hover={{ bg: 'transparent' }}
              mb='10px'
            >
              <ItemContent
                time='2 days ago'
                info='by Josh Henry'
                boldInfo='New Album'
                aName='Josh Henry'
                aSrc="url('/assets/img/avatars/avatar2.png')"
              />
            </MenuItem>
            <MenuItem
              borderRadius='8px'
              _hover={{
                bg: 'transparent',
              }}
              _active={{
                bg: 'transparent',
              }}
              _focus={{
                bg: 'transparent',
              }}
            >
              <ItemContent
                time='3 days ago'
                info='Payment succesfully completed!'
                boldInfo=''
                aName='Kara'
                aSrc="url('/assets/img/avatars/avatar3.png')"
              />
            </MenuItem>
          </Flex>
        </MenuList>
      </Menu>
    </Flex>
  );
}

HomeNavbarLinks.propTypes = {
  variant: PropTypes.string,
  secondary: PropTypes.bool,
};
