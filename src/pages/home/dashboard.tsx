import React, { ReactElement, useEffect } from 'react';

// Chakra imports
import {
  Box,
  Flex,
  Grid,
  useDisclosure,
  Progress,
  SimpleGrid,
  Spacer,
  Stat,
  StatHelpText,
  StatLabel,
  StatNumber,
  Text,
  Button,
  Link,
} from '@chakra-ui/react';
import { gql, useQuery, useMutation } from '@apollo/client';

// Custom components
import Card from '@/components/card/card';
import CardBody from '@/components/card/card-body';
import CardHeader from '@/components/card/card-header';
import BarChart from '@/components/charts/bar-chart';
import LineChart from '@/components/charts/line-chart';
import IconBox from '@/components/icons/icon-box';
// Icons
import {
  CartIcon,
  DocumentIcon,
  GlobeIcon,
  RocketIcon,
  StatsIcon,
  WalletIcon,
} from '@/components/icons/all-icons';
// Data
import {
  barChartOptionsDashboard,
  lineChartOptionsDashboard,
} from '@/variables/charts';
// Layouts
import HomeLayout from '@/layouts/home';
import Modal from '@/components/modal/modal';

export const DASHBOARD_DATA = gql`
  query Query {
    getMyAccount {
      balance
    }
    whoAmI {
      firstName
      lastName
      newUser
    }
    insights {
      _id
      startingBalance
      startingBalanceChange
      totalMoneyIn
      totalMoneyInChange
      totalMoneyOut
      totalMoneyOutChange
      leftToSpend
      leftToSpendChange
      shoppingExpenditure
      groceriesExpenditure
      billsExpenditure
      miscExpenditure
      lastWeekChange
      savingsAccountByMonth
      creditCardByMonth
      months
      lastYearChange
      spendingByWeek {
        spending
        week
      }
    }
  }
`;

const UPDATE_NEW_USER = gql`
  mutation UpdateNewUser($newUser: NewUserUpdateInput!) {
    updateNewUser(newUser: $newUser) {
      newUser
    }
  }
`;

interface UpdateNewUserData {
  updateNewUser: {
    newUser: boolean;
  };
}

interface UpdateNewUserVariables {
  newUser: {
    newUser: boolean;
  };
}

Dashboard.getLayout = function getLayout(page: ReactElement) {
  return <HomeLayout>{page}</HomeLayout>;
};

function Dashboard() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { data, loading, error } = useQuery(DASHBOARD_DATA);
  const [newUser, { data: newUserData }] = useMutation<
    UpdateNewUserData,
    UpdateNewUserVariables
  >(UPDATE_NEW_USER);

  useEffect(() => {
    console.log('Data: ', data);

    if (data?.whoAmI?.newUser) {
      newUser({ variables: { newUser: { newUser: false } } });
      onOpen();
    }
  }, [data, newUser, onOpen]);

  const getYearlyDataForLineChart = ({
    savingsAccountByMonth,
    creditCardByMonth,
  }: {
    savingsAccountByMonth: [number];
    creditCardByMonth: [number];
  }) => {
    return [
      {
        name: 'Savings Trend',
        data: savingsAccountByMonth,
      },
      {
        name: 'Credit Card Trend',
        data: creditCardByMonth,
      },
    ];
  };

  const getYearlyDataOptionsForLineChart = (months: [string]) => {
    return {
      ...lineChartOptionsDashboard,
      xaxis: { ...lineChartOptionsDashboard.xaxis, categories: months },
    };
  };

  const getWeeklyDataForLineChart = (weeklyData: any) => {
    return [
      {
        name: 'Expenses by Week',
        data: weeklyData.spending,
      },
    ];
  };

  const getWeeklyDataOptionsForLineChart = (weeklyData: any) => {
    return {
      ...barChartOptionsDashboard,
      xaxis: { ...barChartOptionsDashboard.xaxis, categories: weeklyData.week },
    };
  };

  if (loading) return <h1>Loading ...</h1>;

  if (error) return <h1>Something Went Wrong ...</h1>;

  return (
    <>
      <Flex flexDirection='column' pt={{ base: '120px', md: '75px' }}>
        <SimpleGrid columns={{ sm: 1, md: 2, xl: 4 }} spacing='24px'>
          {/* MiniStatistics Card */}
          <Card>
            <CardBody>
              <Flex
                flexDirection='row'
                align='center'
                justify='center'
                w='100%'
              >
                <Stat me='auto'>
                  <StatLabel
                    fontSize='sm'
                    color='gray.400'
                    fontWeight='bold'
                    pb='2px'
                  >
                    Starting Balance
                  </StatLabel>
                  <Flex>
                    <StatNumber fontSize='lg' color='#fff'>
                      £{data.insights.startingBalance}
                    </StatNumber>
                    <StatHelpText
                      alignSelf='flex-end'
                      justifySelf='flex-end'
                      m='0px'
                      color='green.400'
                      fontWeight='bold'
                      ps='3px'
                      fontSize='md'
                    >
                      {data.insights.startingBalanceChange}
                    </StatHelpText>
                  </Flex>
                </Stat>
                <IconBox as='box' h={'45px'} w={'45px'} bg='brand.200'>
                  <WalletIcon h={'24px'} w={'24px'} color='#fff' />
                </IconBox>
              </Flex>
            </CardBody>
          </Card>
          {/* MiniStatistics Card */}
          <Card minH='83px'>
            <CardBody>
              <Flex
                flexDirection='row'
                align='center'
                justify='center'
                w='100%'
              >
                <Stat me='auto'>
                  <StatLabel
                    fontSize='sm'
                    color='gray.400'
                    fontWeight='bold'
                    pb='2px'
                  >
                    Total Money In
                  </StatLabel>
                  <Flex>
                    <StatNumber fontSize='lg' color='#fff'>
                      £{data.insights.totalMoneyIn}
                    </StatNumber>
                    <StatHelpText
                      alignSelf='flex-end'
                      justifySelf='flex-end'
                      m='0px'
                      color='green.400'
                      fontWeight='bold'
                      ps='3px'
                      fontSize='md'
                    >
                      {data.insights.totalMoneyInChange}
                    </StatHelpText>
                  </Flex>
                </Stat>
                <IconBox as='box' h={'45px'} w={'45px'} bg='brand.200'>
                  <GlobeIcon h={'24px'} w={'24px'} color='#fff' />
                </IconBox>
              </Flex>
            </CardBody>
          </Card>
          {/* MiniStatistics Card */}
          <Card>
            <CardBody>
              <Flex
                flexDirection='row'
                align='center'
                justify='center'
                w='100%'
              >
                <Stat>
                  <StatLabel
                    fontSize='sm'
                    color='gray.400'
                    fontWeight='bold'
                    pb='2px'
                  >
                    Total Money Out
                  </StatLabel>
                  <Flex>
                    <StatNumber fontSize='lg' color='#fff'>
                      £{data.insights.totalMoneyOut}
                    </StatNumber>
                    <StatHelpText
                      alignSelf='flex-end'
                      justifySelf='flex-end'
                      m='0px'
                      color='red.500'
                      fontWeight='bold'
                      ps='3px'
                      fontSize='md'
                    >
                      {data.insights.totalMoneyOutChange}
                    </StatHelpText>
                  </Flex>
                </Stat>
                <Spacer />
                <IconBox as='box' h={'45px'} w={'45px'} bg='brand.200'>
                  <DocumentIcon h={'24px'} w={'24px'} color='#fff' />
                </IconBox>
              </Flex>
            </CardBody>
          </Card>
          {/* MiniStatistics Card */}
          <Card>
            <CardBody>
              <Flex
                flexDirection='row'
                align='center'
                justify='center'
                w='100%'
              >
                <Stat me='auto'>
                  <StatLabel
                    fontSize='sm'
                    color='gray.400'
                    fontWeight='bold'
                    pb='2px'
                  >
                    Left To Spend
                  </StatLabel>
                  <Flex>
                    <StatNumber fontSize='lg' color='#fff' fontWeight='bold'>
                      £{data.insights.leftToSpend}
                    </StatNumber>
                    <StatHelpText
                      alignSelf='flex-end'
                      justifySelf='flex-end'
                      m='0px'
                      color='green.400'
                      fontWeight='bold'
                      ps='3px'
                      fontSize='md'
                    >
                      {data.insights.leftToSpendChange}
                    </StatHelpText>
                  </Flex>
                </Stat>
                <IconBox as='box' h={'45px'} w={'45px'} bg='brand.200'>
                  <CartIcon h={'24px'} w={'24px'} color='#fff' />
                </IconBox>
              </Flex>
            </CardBody>
          </Card>
        </SimpleGrid>
        <Grid
          templateColumns={{
            sm: '1fr',
            md: '1fr 1fr',
            '2xl': '2fr 1.2fr 1.5fr',
          }}
          my='26px'
          gap='18px'
        >
          <Card
            p='0px'
            gridArea={{ md: '1 / 1 / 2 / 3', '2xl': 'auto' }}
            bgImage="url('/assets/img/cardimgfree.png')"
            bgSize='cover'
            bgPosition='50% 70%'
          >
            <CardBody w='100%' h='100%'>
              <Flex
                flexDirection={{ sm: 'column', lg: 'row' }}
                w='100%'
                h='100%'
              >
                <Flex
                  flexDirection='column'
                  h='100%'
                  p='22px'
                  minW='60%'
                  lineHeight='1.6'
                >
                  <Text fontSize='sm' color='gray.400' fontWeight='bold'>
                    Welcome back,
                  </Text>
                  <Text
                    fontSize='28px'
                    color='#fff'
                    fontWeight='bold'
                    mb='18px'
                  >
                    {data.whoAmI.firstName} {data.whoAmI.lastName}
                  </Text>
                  <Text
                    fontSize='md'
                    color='gray.400'
                    fontWeight='normal'
                    mb='auto'
                  >
                    Glad to see you again!
                  </Text>
                  <Spacer />
                </Flex>
                <Flex
                  flexDirection='column'
                  h='100%'
                  p='22px'
                  lineHeight='1.6'
                  w='100%'
                  textAlign='right'
                >
                  <Text fontSize='sm' color='gray.400' fontWeight='bold'>
                    Balance in your acccount
                  </Text>
                  <Text
                    fontSize='28px'
                    color='#fff'
                    fontWeight='bold'
                    mb='18px'
                  >
                    £{data.getMyAccount.balance}
                  </Text>
                </Flex>
              </Flex>
            </CardBody>
          </Card>
        </Grid>
        <Grid
          templateColumns={{ sm: '1fr', lg: '1.7fr 1.3fr' }}
          maxW={{ sm: '100%', md: '100%' }}
          gap='24px'
          mb='24px'
        >
          <Card p='28px 0px 0px 0px'>
            <CardHeader mb='20px' ps='22px'>
              <Flex direction='column' alignSelf='flex-start'>
                <Text fontSize='lg' color='#fff' fontWeight='bold' mb='6px'>
                  Account Overview
                </Text>
                <Text fontSize='md' fontWeight='medium' color='gray.400'>
                  <Text as='span' color='green.400' fontWeight='bold'>
                    ({data.insights.lastYearChange}) more
                  </Text>{' '}
                  in 2023
                </Text>
              </Flex>
            </CardHeader>
            <Box w='100%' minH={{ sm: '300px' }}>
              <LineChart
                lineChartData={getYearlyDataForLineChart({
                  savingsAccountByMonth: data.insights.savingsAccountByMonth,
                  creditCardByMonth: data.insights.creditCardByMonth,
                })}
                lineChartOptions={getYearlyDataOptionsForLineChart(
                  data.insights.months
                )}
              />
            </Box>
          </Card>
          <Card p='16px'>
            <CardBody>
              <Flex direction='column' w='100%'>
                <Box
                  bg='linear-gradient(126.97deg, #060C29 28.26%, rgba(4, 12, 48, 0.5) 91.2%)'
                  borderRadius='20px'
                  display={{ sm: 'flex', md: 'block' }}
                  // justify={{ sm: 'center', md: 'flex-start' }}
                  // align={{ sm: 'center', md: 'flex-start' }}
                  minH={{ sm: '180px', md: '220px' }}
                  p={{ sm: '0px', md: '22px' }}
                >
                  <BarChart
                    barChartOptions={getWeeklyDataOptionsForLineChart(
                      data.insights.spendingByWeek
                    )}
                    barChartData={getWeeklyDataForLineChart(
                      data.insights.spendingByWeek
                    )}
                  />
                </Box>
                <Flex
                  direction='column'
                  mt='24px'
                  mb='36px'
                  alignSelf='flex-start'
                >
                  <Text fontSize='lg' color='#fff' fontWeight='bold' mb='6px'>
                    Expenses
                  </Text>
                  <Text fontSize='md' fontWeight='medium' color='gray.400'>
                    <Text as='span' color='green.400' fontWeight='bold'>
                      ({data.insights.lastWeekChange})
                    </Text>{' '}
                    than last week
                  </Text>
                </Flex>
                <SimpleGrid gap={{ sm: '12px' }} columns={4}>
                  <Flex direction='column'>
                    <Flex alignItems='center'>
                      <IconBox
                        as='box'
                        h={'30px'}
                        w={'30px'}
                        bg='brand.200'
                        me='6px'
                      >
                        <WalletIcon h={'15px'} w={'15px'} color='#fff' />
                      </IconBox>
                      <Text fontSize='sm' color='gray.400'>
                        Shopping
                      </Text>
                    </Flex>
                    <Text
                      fontSize={{ sm: 'md', lg: 'lg' }}
                      color='#fff'
                      fontWeight='bold'
                      mb='6px'
                      my='6px'
                    >
                      £{data.insights.shoppingExpenditure}
                    </Text>
                    <Progress
                      colorScheme='brand'
                      bg='#2D2E5F'
                      borderRadius='30px'
                      h='5px'
                      value={20}
                    />
                  </Flex>
                  <Flex direction='column'>
                    <Flex alignItems='center'>
                      <IconBox
                        as='box'
                        h={'30px'}
                        w={'30px'}
                        bg='brand.200'
                        me='6px'
                      >
                        <RocketIcon h={'15px'} w={'15px'} color='#fff' />
                      </IconBox>
                      <Text fontSize='sm' color='gray.400'>
                        Groceries
                      </Text>
                    </Flex>
                    <Text
                      fontSize={{ sm: 'md', lg: 'lg' }}
                      color='#fff'
                      fontWeight='bold'
                      mb='6px'
                      my='6px'
                    >
                      £{data.insights.groceriesExpenditure}
                    </Text>
                    <Progress
                      colorScheme='brand'
                      bg='#2D2E5F'
                      borderRadius='30px'
                      h='5px'
                      value={90}
                    />
                  </Flex>
                  <Flex direction='column'>
                    <Flex alignItems='center'>
                      <IconBox
                        as='box'
                        h={'30px'}
                        w={'30px'}
                        bg='brand.200'
                        me='6px'
                      >
                        <CartIcon h={'15px'} w={'15px'} color='#fff' />
                      </IconBox>
                      <Text fontSize='sm' color='gray.400'>
                        Bills
                      </Text>
                    </Flex>
                    <Text
                      fontSize={{ sm: 'md', lg: 'lg' }}
                      color='#fff'
                      fontWeight='bold'
                      mb='6px'
                      my='6px'
                    >
                      £{data.insights.billsExpenditure}
                    </Text>
                    <Progress
                      colorScheme='brand'
                      bg='#2D2E5F'
                      borderRadius='30px'
                      h='5px'
                      value={30}
                    />
                  </Flex>
                  <Flex direction='column'>
                    <Flex alignItems='center'>
                      <IconBox
                        as='box'
                        h={'30px'}
                        w={'30px'}
                        bg='brand.200'
                        me='6px'
                      >
                        <StatsIcon h={'15px'} w={'15px'} color='#fff' />
                      </IconBox>
                      <Text fontSize='sm' color='gray.400'>
                        Misc
                      </Text>
                    </Flex>
                    <Text
                      fontSize={{ sm: 'md', lg: 'lg' }}
                      color='#fff'
                      fontWeight='bold'
                      mb='6px'
                      my='6px'
                    >
                      £{data.insights.miscExpenditure}
                    </Text>
                    <Progress
                      colorScheme='brand'
                      bg='#2D2E5F'
                      borderRadius='30px'
                      h='5px'
                      value={50}
                    />
                  </Flex>
                </SimpleGrid>
              </Flex>
            </CardBody>
          </Card>
        </Grid>
      </Flex>
      {data?.whoAmI?.newUser ? (
        <Modal
          title='Welcome'
          onClose={onClose}
          isOpen={isOpen}
          body={'Hello! Welcome to your new account and Vision Bank!'}
          footer={
            <>
              <Button variant='brand' onClick={onClose}>
                Let&apos;s Explore
              </Button>
            </>
          }
        />
      ) : null}
    </>
  );
}

export default Dashboard;
