import React, { ReactElement, useEffect } from 'react';
import Head from 'next/head';
import { useQuery, useMutation, useApolloClient } from '@apollo/client';
import { useRouter } from 'next/router';

// Chakra imports
import {
  Box,
  Flex,
  Grid,
  useDisclosure,
  SimpleGrid,
  Text,
  Button,
  Spacer
} from '@chakra-ui/react';

// Custom components
import Card from '@/components/molecules/card/card';
import CardBody from '@/components/molecules/card/card-body';
import CardHeader from '@/components/molecules/card/card-header';
import BarChart from '@/components/organisms/charts/bar-chart';
import LineChart from '@/components/organisms/charts/line-chart';

// Data
import {
  barChartOptionsDashboard,
  lineChartOptionsDashboard,
} from '@/variables/charts';
// Layouts
import HomeLayout from '@/layouts/home';
import Modal from '@/components/molecules/modal/modal';
import StatsDisplay from '@/components/molecules/stats-display/stats-display';
import SpendInfo from '@/components/molecules/spend-info/spend-info';

import reportAccessibility from '@/utils/report-accessibility';
import { DASHBOARD_DATA } from '@/graphql/query/dashboard.query';
import { UPDATE_NEW_USER } from '@/graphql/mutation/dashboard.mutation';
import { httpLink, setAuthToken } from '../../../apollo-client';

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
  return (
    <HomeLayout>
      <Head>
        <title>Vision Bank - Dashboard</title>
      </Head>
      {page}
    </HomeLayout>
  );
};

function Dashboard() {
  const router = useRouter();
  const client = useApolloClient();
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

  useEffect(() => {
    console.error('Dashboard Data Error: ', error);
    if (error?.toString().includes('Unauthorized')) {
      console.log('401')
      client.setLink(setAuthToken('').concat(httpLink));
      router.push('/auth/login');
    }
  }, [error, client, router]);

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
          <Card>
            <CardBody>
              <StatsDisplay
                label='Starting Balance'
                value={`£${data.insights.startingBalance}`}
                change={data.insights.startingBalanceChange}
                icon='wallet'
              />
            </CardBody>
          </Card>
          <Card minH='83px'>
            <CardBody>
              <StatsDisplay
                label='Total Money In'
                value={`£${data.insights.totalMoneyIn}`}
                change={data.insights.totalMoneyInChange}
                icon='globe'
              />
            </CardBody>
          </Card>
          <Card>
            <CardBody>
              <StatsDisplay
                label='Total Money Out'
                value={`£${data.insights.totalMoneyOut}`}
                change={data.insights.totalMoneyOutChange}
                icon='document'
              />
            </CardBody>
          </Card>
          <Card>
            <CardBody>
              <StatsDisplay
                label='Left To Spend'
                value={`£${data.insights.leftToSpend}`}
                change={data.insights.leftToSpendChange}
                icon='cart'
              />
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
                  <SpendInfo
                    label="Shopping"
                    value={`£${data.insights.shoppingExpenditure}`}
                    progress={20}
                    ariaLabel='Shopping Expenditure'
                    icon="wallet"
                   />
                  <SpendInfo
                    label="Groceries"
                    value={`£${data.insights.groceriesExpenditure}`}
                    progress={90}
                    ariaLabel='Groceries Expenditure'
                    icon="rocket"
                   />
                  <SpendInfo
                    label="Bills"
                    value={`£${data.insights.billsExpenditure}`}
                    progress={30}
                    ariaLabel='Bills Expenditure'
                    icon="cart"
                   />
                  <SpendInfo
                    label="Misc"
                    value={`£${data.insights.miscExpenditure}`}
                    progress={50}
                    ariaLabel='Misc Expenditure'
                    icon="stats"
                   />
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

reportAccessibility(React);

export default Dashboard;
