import React, { ReactElement, useEffect, useState } from 'react';
import Head from 'next/head';

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
import Card from '@/components/molecules/card/card';
import Modal from '@/components/molecules/modal/modal';
import HomeLayout from '@/layouts/home';

import { APPLY_CARD_DATA } from '@/graphql/query/apply-card.query';
import CONSTANTS from '@/common/constants';

import reportAccessibility from '@/utils/report-accessibility';

ApplyCard.getLayout = function getLayout(page: ReactElement) {
  return (
    <HomeLayout>
      <Head>
        <title>Vision Bank - Apply Card</title>
      </Head>
      {page}
    </HomeLayout>
  );
};



function ApplyCard() {
	const { isOpen, onOpen, onClose } = useDisclosure();
  const { data, loading, error } = useQuery(APPLY_CARD_DATA);
	const [income, setIncome] = useState(0);
	const [modalValues, setModalValues] = useState(CONSTANTS.DEFAULT_MODAL_VALUES);

	useEffect(() => {
		if (data?.whoAmI?.income) {
			setIncome(data?.whoAmI?.income);
		}
	}, [data]);

	const applyCard = (cardType: string) => {
		if (cardType === CONSTANTS.CARD_TYPE_GOLD && income >= CONSTANTS.GOLD_CARD_MIN_BALANCE && income <= CONSTANTS.GOLD_CARD_MAX_BALANCE) {
			setModalValues({
				title: 'Congrats!',
				body: 'You have successfully placed order for your new Gold card.',
				footerText: 'Yay!'
			});
		} else if (cardType === CONSTANTS.CARD_TYPE_PLATINUM && income > CONSTANTS.PLATINUM_CARD_MIN_BALANCE) {
			setModalValues({
				title: 'Congrats!',
				body: 'You have successfully placed order for your new Platinum card.',
				footerText: 'Yay!'
			})
		} else {
			setModalValues({
				title: 'Card Details',
				body: CONSTANTS.DEFAULT_MODAL_VALUES.body,
				footerText: 'Close'
			})
		}
		onOpen();
	}

  if (loading) return <h1>Loading ...</h1>;

  if (error) return <h1>Something Went Wrong ...</h1>;

	return (
		<>
		<Flex flexDirection='column' pt={{ base: '120px', md: '75px' }}>
			<Grid templateColumns={{ sm: "1fr", lg: "50% 50%" }} my='26px' gap='18px'>
				{/* Satisfaction Rate */}
				<Card variant="light">
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
									aria-label="Gold card customer satisfaction"
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
								data-testid="gold-card-btn"
								onClick={() => applyCard(CONSTANTS.CARD_TYPE_GOLD)}>
								Apply
							</Button>
						</Flex>
					</Flex>
				</Card>
				{/* Referral Tracking */}
				<Card>
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
									aria-label="Platinum card customer satisfaction"
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
								data-testid="platinum-card-btn"
								onClick={() => applyCard(CONSTANTS.CARD_TYPE_PLATINUM)}>
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

reportAccessibility(React);

export default ApplyCard;