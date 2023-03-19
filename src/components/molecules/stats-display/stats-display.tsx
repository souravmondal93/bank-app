import {
  Flex,
  Stat,
  StatHelpText,
  StatLabel,
  StatNumber,
} from '@chakra-ui/react';

import {
  CartIcon,
  DocumentIcon,
  GlobeIcon,
  WalletIcon,
} from '@/components/atoms/icons/all-icons';
import IconBox from '@/components/atoms/icons/icon-box';
import { ReactElement } from 'react';

type StatsDisplayProps = {
  label: string;
  value: string;
  change: string;
  icon: string;
};

const IconMap = {
  wallet: <WalletIcon h={'24px'} w={'24px'} color='#fff' />,
  globe: <GlobeIcon h={'24px'} w={'24px'} color='#fff' />,
  document: <DocumentIcon h={'24px'} w={'24px'} color='#fff' />,
  cart: <CartIcon h={'24px'} w={'24px'} color='#fff' />,
};

const getIcon = (icon: string): ReactElement => {
  return IconMap[icon];
};

const getFontColor = (change: string) => {
  const sign = change.charAt(0);

  return sign === '+' ? 'green.400' : sign === '-' ? 'red.400' : 'gray.400';
}

const StatsDisplay = (props: StatsDisplayProps) => {
  const { label, value, change, icon } = props;

  return (
    <Flex flexDirection='row' align='center' justify='center' w='100%'>
      <Stat me='auto'>
        <StatLabel fontSize='sm' color='gray.400' fontWeight='bold' pb='2px'>
          {label}
        </StatLabel>
        {/* <Flex> */}
        <StatNumber fontSize='lg' color='#fff'>
          £{value}
        </StatNumber>
        <StatHelpText
          alignSelf='flex-end'
          justifySelf='flex-end'
          m='0px'
          color={getFontColor(change)}
          fontWeight='bold'
          ps='3px'
          fontSize='xs'
        >
          {change}
        </StatHelpText>
        {/* </Flex> */}
      </Stat>
      <IconBox as='box' h={'45px'} w={'45px'} bg='brand.200'>
        {getIcon(icon)}
      </IconBox>
    </Flex>
  );
};

export default StatsDisplay;
