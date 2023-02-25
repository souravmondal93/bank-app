import React from 'react';
import { Flex, Link, List, ListItem, Text } from '@chakra-ui/react';

const Footer: React.FC = () => {
  return (
    <Flex
      flexDirection={{
        base: 'column',
        xl: 'row',
      }}
      alignItems={{
        base: 'center',
        xl: 'start',
      }}
      justifyContent='space-between'
      px='30px'
      pb='20px'
    >
      <Text
        fontSize='sm'
        color='white'
        textAlign={{
          base: 'center',
          xl: 'start',
        }}
        mb={{ base: '20px', xl: '0px' }}
      >
        &copy; {new Date().getFullYear()},{' '}
        <Text as='span'>{'Made with ❤️ by '}</Text>
        <Link href='' target='_blank'>
          {'Vision Bank  '}
        </Link>
      </Text>
      <List display='flex'>
        <ListItem
          me={{
            base: '20px',
            md: '44px',
          }}
        >
          <Link color='white' fontSize='sm' href=''>
            {'Privacy'}
          </Link>
        </ListItem>
        <ListItem
          me={{
            base: '20px',
            md: '44px',
          }}
        >
          <Link color='white' fontSize='sm' href=''>
            {'T&C'}
          </Link>
        </ListItem>
      </List>
    </Flex>
  );
};

export default Footer;
