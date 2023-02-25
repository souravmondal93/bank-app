import React, { ReactElement, useState, useEffect } from 'react';
import { gql, useQuery } from '@apollo/client';

// Chakra imports
import { Box, Button, Flex, Grid, Icon, Spacer, Text } from '@chakra-ui/react';

// Images
const BackgroundCard1 = 'assets/img/billing-background-card.png';

// Custom components
import Card from '@/components/card/card';
import CardBody from '@/components/card/card-body';
import CardHeader from '@/components/card/card-header';
import IconBox from '@/components/icons/icon-box';
import TransactionRow from '@/components/tables/TransactionRow';

// Icons
import { FaRegCalendarAlt } from 'react-icons/fa';
import { IoEllipsisHorizontalSharp } from 'react-icons/io5';
import { RiMastercardFill } from 'react-icons/ri';
import { BillIcon, GraphIcon } from '@/components/icons/all-icons';

// Data
import HomeLayout from '@/layouts/home';
import { partition, formatAmount, formatDateTimeString } from '@/common/helper';
import CONSTANTS from '@/common/constants';

const SAVINGS_ACCOUNT_DATA = gql`
  query Query {
    CreditCarTransactionsByCurrentUser {
      _id
      type
      payeeName
      date
      amount
      status
      reference
      sourceAccountId
      senderId
      recipientId
    }
    getMyCreditCardAccount {
      _id
      type
      isActive
      owner
      sortCode
      accountNumber
      currency
      balance
    }
  }
`;

CreditCard.getLayout = function getLayout(page: ReactElement) {
  return <HomeLayout>{page}</HomeLayout>;
};

function CreditCard() {
  const { data, loading, error } = useQuery(SAVINGS_ACCOUNT_DATA);
  const [completedTransactions, setCompletedTransactions] = useState([]);
  const [scheduledTransactions, setScheduledTransactions] = useState([]);
  const [accountId, setAccountId] = useState('');
  const [balance, setBalance] = useState(0);

  const getTransactionType = (transaction: any, accountId: string): string => {
    console.log('Transaction: ', transaction.sourceAccountId, accountId);
    return transaction.sourceAccountId === accountId
      ? CONSTANTS.CREDIT_TRANSACTION
      : CONSTANTS.DEBIT_TRANSACTION;
  };

  useEffect(() => {
    if (data?.getMyCreditCardAccount?._id) {
      setAccountId(data.getMyCreditCardAccount._id);
    }

    if (data?.getMyCreditCardAccount?.balance) {
      setBalance(data.getMyCreditCardAccount.balance);
    }

    if (data?.CreditCarTransactionsByCurrentUser?.length) {
      const [completed, scheduled] = partition(
        data.CreditCarTransactionsByCurrentUser,
        (transaction) => transaction.status === 'DONE'
      );
      setCompletedTransactions(completed);
      setScheduledTransactions(scheduled);
    }
  }, [data]);

  if (loading) return <h1>Loading ...</h1>;

  if (error) return <h1>Something Went Wrong ...</h1>;

  return (
    <Flex direction='column' pt={{ base: '120px', md: '75px' }} mx='auto'>
      <Grid templateColumns={{ sm: '1fr', lg: '60% 38%' }} gap='18px'>
        <Box>
          <Card mb={{ sm: '24px' }}>
            <CardHeader mb='12px'>
              <Flex direction='column' w='100%'>
                <Flex
                  direction={{ sm: 'column', lg: 'row' }}
                  justify={{ sm: 'center', lg: 'space-between' }}
                  align={{ sm: 'center' }}
                  w='100%'
                  my={{ md: '12px' }}
                >
                  <Text
                    color='#fff'
                    fontSize={{ sm: 'lg', md: 'xl', lg: 'lg' }}
                    fontWeight='bold'
                  >
                    Your Transactions
                  </Text>
                  <Flex align='center'>
                    <Icon
                      as={FaRegCalendarAlt}
                      color='gray.400'
                      w='15px'
                      h='15px'
                      // color='#fff'
                      me='6px'
                    />
                    <Text color='gray.400' fontSize='sm'>
                      Recent Transactions
                    </Text>
                  </Flex>
                </Flex>
              </Flex>
            </CardHeader>
            <CardBody>
              <Flex direction='column' w='100%'>
                <Text color='gray.400' fontSize='xs' mb='18px'>
                  NEWEST
                </Text>
                {completedTransactions.map((row: any) => {
                  return (
                    <TransactionRow
                      name={row.payeeName}
                      date={formatDateTimeString(row.date)}
                      price={formatAmount(row.amount)}
                      type={getTransactionType(row, accountId)}
                      key={row._id}
                    />
                  );
                })}
              </Flex>
            </CardBody>
          </Card>
          <Card my={{ lg: '24px' }}>
            <CardHeader mb='12px'>
              <Flex direction='column' w='100%'>
                <Flex
                  direction={{ sm: 'column', lg: 'row' }}
                  justify={{ sm: 'center', lg: 'space-between' }}
                  align={{ sm: 'center' }}
                  w='100%'
                  my={{ md: '12px' }}
                >
                  <Text
                    color='#fff'
                    fontSize={{ sm: 'lg', md: 'xl', lg: 'lg' }}
                    fontWeight='bold'
                  >
                    Upcoming Transactions
                  </Text>
                </Flex>
              </Flex>
            </CardHeader>
            <CardBody>
              <Flex direction='column' w='100%'>
                <Text color='gray.400' fontSize='xs' mb='18px'>
                  UPCOMING
                </Text>
                {scheduledTransactions.map((row: any) => {
                  return (
                    <TransactionRow
                      name={row.payeeName}
                      date={formatDateTimeString(row.date)}
                      price={formatAmount(row.amount)}
                      type={getTransactionType(row, accountId)}
                      key={row._id}
                    />
                  );
                })}
              </Flex>
            </CardBody>
          </Card>
        </Box>

        <Box>
          <Grid
            templateColumns={{
              sm: '1fr',
              md: '1fr',
            }}
            gap='26px'
          >
            {/* Mastercard */}
            <Card
              // backgroundImage={BackgroundCard1}
              backgroundRepeat='no-repeat'
              bgSize='cover'
              bgPosition='10%'
              p='16px'
            >
              <CardBody h='100%' w='100%'>
                <Flex
                  direction='column'
                  color='white'
                  h='100%'
                  p='0px 10px 20px 10px'
                  w='100%'
                >
                  <Flex justify='space-between' align='center'>
                    <Text fontSize='md' fontWeight='bold'>
                      Vision Bank
                    </Text>
                    <Icon
                      as={RiMastercardFill}
                      w='48px'
                      h='auto'
                      color='gray.400'
                    />
                  </Flex>
                  <Spacer />
                  <Flex direction='column'>
                    <Box>
                      <Text
                        fontSize={{ sm: 'xl', lg: 'lg', xl: 'xl' }}
                        letterSpacing='2px'
                        fontWeight='bold'
                      >
                        6243 7821 1246 XXXX
                      </Text>
                    </Box>
                    <Flex mt='14px'>
                      <Flex direction='column' me='34px'>
                        <Text fontSize='xs'>VALID THRU</Text>
                        <Text fontSize='xs' fontWeight='bold'>
                          12/28
                        </Text>
                      </Flex>
                      <Flex direction='column'>
                        <Text fontSize='xs'>CVV</Text>
                        <Text fontSize='xs' fontWeight='bold'>
                          09X
                        </Text>
                      </Flex>
                    </Flex>
                  </Flex>
                </Flex>
              </CardBody>
            </Card>
            {/* Credit Balance */}
            <Card>
              <Flex direction='column'>
                <Flex
                  justify='space-between'
                  p='22px'
                  mb='18px'
                  bg='linear-gradient(127.09deg, rgba(34, 41, 78, 0.94) 19.41%, rgba(10, 14, 35, 0.49) 76.65%)'
                  borderRadius='18px'
                >
                  <Flex direction='column'>
                    <Text color='#E9EDF7' fontSize='12px'>
                      Credit Balance
                    </Text>
                    <Text color='#fff' fontWeight='bold' fontSize='34px'>
                      £25,215
                    </Text>
                  </Flex>
                  <Flex direction='column'>
                    <Button
                      bg='transparent'
                      // _hover='none'
                      // _active='none'
                      alignSelf='flex-end'
                      p='0px'
                    >
                      <Icon
                        as={IoEllipsisHorizontalSharp}
                        color='#fff'
                        w='24px'
                        h='24px'
                        justifySelf='flex-start'
                        alignSelf='flex-start'
                      />
                    </Button>
                    <GraphIcon w='60px' h='18px' />
                  </Flex>
                </Flex>
                <Text fontSize='10px' color='gray.400' mb='8px'>
                  NEWEST
                </Text>
                <Flex justify='space-between' align='center'>
                  <Flex align='center'>
                    <IconBox
                      bg='#22234B'
                      borderRadius='30px'
                      w='42px'
                      h='42px'
                      me='10px'
                    >
                      <BillIcon w='22px' h='22px' />
                    </IconBox>
                    <Flex direction='column'>
                      <Text color='#fff' fontSize='sm' mb='2px'>
                        Bill & Taxes
                      </Text>
                      <Text color='gray.400' fontSize='sm'>
                        Today, 16:36
                      </Text>
                    </Flex>
                  </Flex>
                  <Text color='#fff' fontSize='sm' fontWeight='bold'>
                    -£154.50
                  </Text>
                </Flex>
              </Flex>
            </Card>
          </Grid>
        </Box>
      </Grid>
    </Flex>
  );
}

export default CreditCard;
