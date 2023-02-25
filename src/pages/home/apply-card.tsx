import React, { ReactElement, useEffect, useState } from 'react';
// Chakra imports
import {
	Box,
	CircularProgress,
	CircularProgressLabel,
	Flex,
	Grid,
	Text,
	Button,
	useDisclosure
} from '@chakra-ui/react';
import { gql, useQuery } from '@apollo/client';

// Custom components
import Card from '@/components/Card/Card.js';
import Modal from '@/components/modal/modal';
import HomeLayout from '@/layouts/home';

ApplyCard.getLayout = function getLayout(page: ReactElement) {
  return <HomeLayout>{page}</HomeLayout>;
};

const DASHBOARD_DATA = gql`
  query Query {
    whoAmI {
      firstName
      lastName
      income
    }
  }
`;

const DEFAULT_MODAL_VALUES = {
	title: '',
	body: 'For Gold card, income should be between £20,000 and £50,000. For Platinum card, income should be more than £50,000.',
	footerText: ''
}
const GOLD_CARD_MIN_BALANCE = 20000;
const GOLD_CARD_MAX_BALANCE = 50000;
const PLATINUM_CARD_MIN_BALANCE = 50000;
const CARD_TYPE_GOLD = 'CARD_TYPE_GOLD';
const CARD_TYPE_PLATINUM = 'CARD_TYPE_PLATINUM';

export default function ApplyCard() {
	const { isOpen, onOpen, onClose } = useDisclosure();
  const { data, loading, error } = useQuery(DASHBOARD_DATA);
	const [income, setIncome] = useState(0);
	const [modalValues, setModalValues] = useState(DEFAULT_MODAL_VALUES);

	useEffect(() => {
		if (data?.whoAmI?.income) {
			setIncome(data?.whoAmI?.income);
		}
	}, [data]);

	const applyCard = (cardType: string) => {
		if (cardType === CARD_TYPE_GOLD && income >= GOLD_CARD_MIN_BALANCE && income <= GOLD_CARD_MAX_BALANCE) {
			setModalValues({
				title: 'Congrats!',
				body: 'You have successfully placed order for your new Gold card.',
				footerText: 'Yay!'
			});
		} else if (cardType === CARD_TYPE_PLATINUM && income > PLATINUM_CARD_MIN_BALANCE) {
			setModalValues({
				title: 'Congrats!',
				body: 'You have successfully placed order for your new Platinum card.',
				footerText: 'Yay!'
			})
		} else {
			setModalValues({
				title: 'Card Details',
				body: DEFAULT_MODAL_VALUES.body,
				footerText: 'Close'
			})
		}
		onOpen();
	}

	return (
		<>
		<Flex flexDirection='column' pt={{ base: '120px', md: '75px' }}>
			<Grid templateColumns={{ sm: '1fr', md: '1fr 1fr', '2xl': '2fr 1.2fr 1.5fr' }} my='26px' gap='18px'>
				{/* Satisfaction Rate */}
				<Card gridArea={{ md: '2 / 1 / 3 / 2', '2xl': 'auto' }} variant="light">
					<Flex direction='column' position="relative" >
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
									// variant='vision'
									>
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
							<Button
								fontSize='xs'
								variant='brand'
								borderRadius='12px'
								position="absolute"
								bottom="0"
								right="0"
								px='30px'
								onClick={() => applyCard(CARD_TYPE_GOLD)}
								display={{
									sm: "none",
									lg: "flex",
								}}>
								Apply
							</Button>
						</Flex>
					</Flex>
				</Card>
				{/* Referral Tracking */}
				<Card gridArea={{ md: '2 / 2 / 3 / 3', '2xl': 'auto' }}>
					<Flex direction='column' position="relative">
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
									// variant='vision'
									>
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
							<Button
								fontSize='xs'
								variant='brand'
								borderRadius='12px'
								position="absolute"
								bottom="0"
								right="0"
								px='30px'
								onClick={() => applyCard(CARD_TYPE_PLATINUM)}
								display={{
									sm: "none",
									lg: "flex",
								}}>
								Apply
							</Button>
						</Flex>
					</Flex>
				</Card>
			</Grid>
		</Flex>
		<Modal
			title={modalValues.title}
			onClose={onClose}
			isOpen={isOpen}
			body={modalValues.body}
			footer={
				<>
					<Button variant='brand' onClick={onClose}>
						{modalValues.footerText}
					</Button>
				</>
			}
		/>
		</>
	);
}
