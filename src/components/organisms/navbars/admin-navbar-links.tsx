// Chakra Imports
import {
  Button,
  Flex,
  Menu,
  MenuButton,
  Text,
  Link,
} from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { useMutation } from '@apollo/client';
import PropTypes from 'prop-types';
import React from 'react';
import NextLink from 'next/link';
import routes from '../../../routes';
import { useApolloClient } from '@apollo/client';

// Chakra Icons
import { BellIcon } from '@chakra-ui/icons';

// Custom Icons
import { ProfileIcon } from '@/components/atoms/icons/all-icons';

// Custom Components
import { SidebarResponsive } from '@/components/molecules/sidebar/sidebar-responsive';
import { httpLink, setAuthToken } from '../../../../apollo-client';
import { LOGIN_USER } from '@/graphql/mutation/login.mutation';

type AdminNavbarLinksProps = {
   variant?: string;
   secondary: string;
   onOpen?: any;
   logoText?: string;
   fixed?: string;
}

export default function AdminNavbarLinks(props: AdminNavbarLinksProps) {
  const router = useRouter();
  const client = useApolloClient();
  const { variant, secondary, ...rest } = props;

  const [loginUser] = useMutation(LOGIN_USER, {
    errorPolicy: 'all',
  });

  // Chakra Color Mode
  let mainText = 'gray.400';
  let navbarIcon = 'white';

  if (secondary) {
    navbarIcon = 'white';
    mainText = 'white';
  }

  const logoutUser = () => {
    client.setLink(setAuthToken('').concat(httpLink));
    router.push('/auth/login');
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
        {...rest}
      />
      <Menu>
        <MenuButton aria-label="Show notifications">
          <BellIcon
            color={navbarIcon}
            mt='-4px'
            w='18px'
            h='18px'
            ms={{ base: '16px', xl: '0px' }}
            me='16px'
          />
        </MenuButton>
      </Menu>
    </Flex>
  );
}

AdminNavbarLinks.propTypes = {
  variant: PropTypes.string,
  secondary: PropTypes.bool,
};
