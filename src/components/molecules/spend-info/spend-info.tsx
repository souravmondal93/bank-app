import {
  Flex,
  Progress,
  Text,
} from '@chakra-ui/react';

import {
  CartIcon,
  RocketIcon,
  StatsIcon,
  WalletIcon,
} from '@/components/atoms/icons/all-icons';
import IconBox from '@/components/atoms/icons/icon-box';
import { ReactElement } from 'react';

type SpendInfoProps = {
  label: string;
  value: string;
  progress: number;
  ariaLabel: string;
  icon: string;
};

const IconMap = {
  wallet: <WalletIcon h={'15px'} w={'15px'} color='#fff' />,
  rocket: <RocketIcon h={'15px'} w={'15px'} color='#fff' />,
  stats: <StatsIcon h={'15px'} w={'15px'} color='#fff' />,
  cart: <CartIcon h={'15px'} w={'15px'} color='#fff' />,
};

const getIcon = (icon: string): ReactElement => {
  return IconMap[icon];
};

const SpendInfo = (props: SpendInfoProps) => {
  const { label, value, progress, icon, ariaLabel } = props;

  return (
    <Flex direction='column'>
      <Flex alignItems='center'>
        <IconBox as='box' h={'30px'} w={'30px'} bg='brand.200' me='6px'>
          {getIcon(icon)}
        </IconBox>
        <Text fontSize='sm' color='gray.400'>
          {label}
        </Text>
      </Flex>
      <Text
        fontSize={{ sm: 'md', lg: 'lg' }}
        color='#fff'
        fontWeight='bold'
        mb='6px'
        my='6px'
      >
        {value}
      </Text>
      <Progress
        colorScheme='brand'
        bg='#2D2E5F'
        borderRadius='30px'
        h='5px'
        value={progress}
        aria-label={ariaLabel}
      />
    </Flex>
  );
};

export default SpendInfo;
