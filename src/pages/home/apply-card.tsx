import { ReactElement } from 'react';
// Chakra imports
import {
	Box,
	Button,
	CircularProgress,
	CircularProgressLabel,
	Flex,
	Grid,
	Icon,
	Progress,
	SimpleGrid,
	Spacer,
	Stack,
	Stat,
	StatHelpText,
	StatLabel,
	StatNumber,
	Table,
	Tbody,
	Text,
	Th,
	Thead,
	Tr
} from '@chakra-ui/react';
// Styles for the circular progressbar
import medusa from 'assets/img/cardimgfree.png';
// Custom components
import Card from '@/components/Card/Card.js';
import CardBody from '@/components/Card/CardBody.js';
import CardHeader from '@/components/Card/CardHeader.js';
import BarChart from '@/components/Charts/BarChart';
import LineChart from '@/components/Charts/LineChart';
import IconBox from '@/components/Icons/IconBox';
// Icons
import { CartIcon, DocumentIcon, GlobeIcon, RocketIcon, StatsIcon, WalletIcon } from '@/components/Icons/Icons.js';
import DashboardTableRow from '@/components/Tables/DashboardTableRow';
import TimelineRow from '@/components/Tables/TimelineRow';
import React from 'react';
import { AiFillCheckCircle } from 'react-icons/ai';
import { BiHappy } from 'react-icons/bi';
import { BsArrowRight } from 'react-icons/bs';
import { IoCheckmarkDoneCircleSharp, IoEllipsisHorizontal } from 'react-icons/io5';
// Data
import {
	barChartDataDashboard,
	barChartOptionsDashboard,
	lineChartDataDashboard,
	lineChartOptionsDashboard
} from '@/variables/charts';
import { dashboardTableData, timelineData } from '@/variables/general';

import HomeLayout from '@/layouts/home';

ApplyCard.getLayout = function getLayout(page: ReactElement) {
  return <HomeLayout>{page}</HomeLayout>;
};

export default function ApplyCard() {
	return (
		<Flex flexDirection='column' pt={{ base: '120px', md: '75px' }}>
			<Grid templateColumns={{ sm: '1fr', md: '1fr 1fr', '2xl': '2fr 1.2fr 1.5fr' }} my='26px' gap='18px'>
				{/* Satisfaction Rate */}
				<Card gridArea={{ md: '2 / 1 / 3 / 2', '2xl': 'auto' }} variant="light">
					<Flex direction='column' >
						<Flex justify='space-between' align='center' mb='40px'>
							<Text color='#fff' fontSize='lg' fontWeight='bold'>
								Gold Card
							</Text>
						</Flex>
						<Flex direction={{ sm: 'column', md: 'row' }}>
							<Flex direction='column' me={{ md: '6px', lg: '52px' }} mb={{ sm: '16px', md: '0px' }}>
								<Flex
									direction='column'
									p='22px'
									pe={{ sm: '22e', md: '8px', lg: '22px' }}
									minW={{ sm: '220px', md: '140px', lg: '220px' }}
									bg='linear-gradient(126.97deg, #060C29 28.26%, rgba(4, 12, 48, 0.5) 91.2%)'
									borderRadius='20px'
									mb='20px'>
									<Text color='gray.400' fontSize='sm' mb='4px'>
										Credit Limit
									</Text>
									<Text color='#fff' fontSize='lg' fontWeight='bold'>
										50 000
									</Text>
								</Flex>
								<Flex
									direction='column'
									p='22px'
									pe={{ sm: '22px', md: '8px', lg: '22px' }}
									minW={{ sm: '170px', md: '140px', lg: '170px' }}
									bg='linear-gradient(126.97deg, #060C29 28.26%, rgba(4, 12, 48, 0.5) 91.2%)'
									borderRadius='20px'
                  mb='20px'>
									<Text color='gray.400' fontSize='sm' mb='4px'>
										Annual Charges
									</Text>
									<Text color='#fff' fontSize='lg' fontWeight='bold'>
										1000
									</Text>
								</Flex>
                <Flex
									direction='column'
									p='22px'
									pe={{ sm: '22px', md: '8px', lg: '22px' }}
									minW={{ sm: '170px', md: '140px', lg: '170px' }}
									bg='linear-gradient(126.97deg, #060C29 28.26%, rgba(4, 12, 48, 0.5) 91.2%)'
									borderRadius='20px'>
									<Text color='gray.400' fontSize='sm' mb='4px'>
										Annual Income
									</Text>
									<Text color='#fff' fontSize='lg' fontWeight='bold'>
                    Between <br />
                    200 000 - 500 000
									</Text>
								</Flex>
							</Flex>
							<Box mx={{ sm: 'auto', md: '0px' }}>
								<CircularProgress
									size={200}
									value={80}
									thickness={6}
									color='#05CD99'
									variant='vision'>
									<CircularProgressLabel>
										<Flex direction='column' justify='center' align='center'>
											<Text color='gray.400' fontSize='sm'>
												Customer
											</Text>
											<Text
												color='#fff'
												fontSize={{ md: '36px', lg: '50px' }}
												fontWeight='bold'
												mb='4px'>
												80%
											</Text>
											<Text color='gray.400' fontSize='sm'>
												Satisfaction
											</Text>
										</Flex>
									</CircularProgressLabel>
								</CircularProgress>
							</Box>
						</Flex>
					</Flex>
				</Card>
				{/* Referral Tracking */}
				<Card gridArea={{ md: '2 / 2 / 3 / 3', '2xl': 'auto' }}>
					<Flex direction='column'>
						<Flex justify='space-between' align='center' mb='40px'>
							<Text color='#fff' fontSize='lg' fontWeight='bold'>
								Platinum Card
							</Text>
						</Flex>
						<Flex direction={{ sm: 'column', md: 'row' }}>
							<Flex direction='column' me={{ md: '6px', lg: '52px' }} mb={{ sm: '16px', md: '0px' }}>
								<Flex
									direction='column'
									p='22px'
									pe={{ sm: '22e', md: '8px', lg: '22px' }}
									minW={{ sm: '220px', md: '140px', lg: '220px' }}
									bg='linear-gradient(126.97deg, #060C29 28.26%, rgba(4, 12, 48, 0.5) 91.2%)'
									borderRadius='20px'
									mb='20px'>
									<Text color='gray.400' fontSize='sm' mb='4px'>
										Credit Limit
									</Text>
									<Text color='#fff' fontSize='lg' fontWeight='bold'>
										150 000
									</Text>
								</Flex>
								<Flex
									direction='column'
									p='22px'
									pe={{ sm: '22px', md: '8px', lg: '22px' }}
									minW={{ sm: '170px', md: '140px', lg: '170px' }}
									bg='linear-gradient(126.97deg, #060C29 28.26%, rgba(4, 12, 48, 0.5) 91.2%)'
									borderRadius='20px'
                  mb='20px'>
									<Text color='gray.400' fontSize='sm' mb='4px'>
										Annual Charges
									</Text>
									<Text color='#fff' fontSize='lg' fontWeight='bold'>
										2500
									</Text>
								</Flex>
                <Flex
									direction='column'
									p='22px'
									pe={{ sm: '22px', md: '8px', lg: '22px' }}
									minW={{ sm: '170px', md: '140px', lg: '170px' }}
									bg='linear-gradient(126.97deg, #060C29 28.26%, rgba(4, 12, 48, 0.5) 91.2%)'
									borderRadius='20px'>
									<Text color='gray.400' fontSize='sm' mb='4px'>
										Annual Income
									</Text>
									<Text color='#fff' fontSize='lg' fontWeight='bold'>
										More than <br />
                    500 000
									</Text>
								</Flex>
							</Flex>
							<Box mx={{ sm: 'auto', md: '0px' }}>
								<CircularProgress
									size={200}
									value={95}
									thickness={6}
									color='#05CD99'
									variant='vision'>
									<CircularProgressLabel>
										<Flex direction='column' justify='center' align='center'>
											<Text color='gray.400' fontSize='sm'>
												Customer
											</Text>
											<Text
												color='#fff'
												fontSize={{ md: '36px', lg: '50px' }}
												fontWeight='bold'
												mb='4px'>
												95%
											</Text>
											<Text color='gray.400' fontSize='sm'>
												Satisfaction
											</Text>
										</Flex>
									</CircularProgressLabel>
								</CircularProgress>
							</Box>
						</Flex>
					</Flex>
				</Card>
			</Grid>
		</Flex>
	);
}
