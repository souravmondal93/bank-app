import React from 'react';
import { Flex, Link, List, ListItem, Text } from '@chakra-ui/react';

const AuthFooter: React.FC = () => {
  return (
    <Flex
      flexDirection={{
        base: 'column',
      }}
      alignItems={{
        base: 'center',
      }}
      justifyContent='space-between'
      pb='20px'
      fontSize='sm'
    >
      <Text
        color='white'
        textAlign={{
          base: 'center',
        }}
        mb={{ base: '20px' }}
      >
        &copy; {new Date().getFullYear()}.{' '}
        <Text as='span' mx='2px'>
          Made with ❤️ by
        </Text>
        <Link href='' target='_blank'>
          {'Vision Bank '}
        </Link>
      </Text>
      <List display='flex'>
        <ListItem
          me={{
            base: '20px',
          }}
        >
          <Link color='white' fontSize='sm' href='#blog'>
            {'Blog'}
          </Link>
        </ListItem>
        <ListItem
          me={{
            base: '20px',
          }}
        >
          <Link color='white' href='#license'>
            {'Locations'}
          </Link>
        </ListItem>
        <ListItem
          me={{
            base: '20px',
          }}
        >
          <Link color='white' fontSize='sm' href=''>
            {'Privacy'}
          </Link>
        </ListItem>
        <ListItem>
          <Link color='white' fontSize='sm' href=''>
            {'T&C'}
          </Link>
        </ListItem>
      </List>
    </Flex>
  );
};

export default AuthFooter;
