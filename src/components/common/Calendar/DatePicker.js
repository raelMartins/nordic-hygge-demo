import { Box, HStack, Image, Stack, Text, useDisclosure, VStack } from '@chakra-ui/react';
import React from 'react';
import { useState, forwardRef } from 'react';
import DatePicker from 'react-datepicker';
import { Button, Popup } from '../../../ui-lib';
import 'react-datepicker/dist/react-datepicker.css';
import successGif from '/src/images/check-icon.gif';
import { FcCalendar } from 'react-icons/fc'

export const MatadorCustomDatePicker = () => {
	const ShowCalendar = useDisclosure();
	const RescheduleSuccess = useDisclosure();
	const [startDate, setStartDate] = useState(new Date(), 0, 9);
	const filterPassedTime = (time) => {
		const currentDate = new Date();
		const selectedDate = new Date(time);

		return currentDate.getTime() < selectedDate.getTime();
	};

	return (
		<Box>
			<Button mt={0} onClick={ShowCalendar.onOpen} variant='secondary' w='149px'>
				Reschedule
			</Button>
			{/* Initial Calendar screen */}
			<Popup width='782px' isOpen={ShowCalendar.isOpen} onClose={ShowCalendar.onClose}>
				<Popup.Body>
					<HStack mb={4} align='center' spacing='18px' w='full'>
						<FcCalendar style={{ color: '#4545FE', fontSize: '54px' }} />
						<Box>
							<Text fontSize='26px' fontWeight={700} fontFamily='optimaMedium'>
								Reschedule Inspection
							</Text>
							<Text fontSize='14px' pt={-4}>
								Select Date and Time
							</Text>
						</Box>
					</HStack>
					<DatePicker inline showTimeSelect selected={startDate} portalId='root-portal' filterTime={filterPassedTime} dateFormat='MMMM d, yyyy h:mm aa' onChange={(date) => setStartDate(date)} />
					<Button
						onClick={() => {
							ShowCalendar.onClose();
							RescheduleSuccess.onOpen();
						}}
						variant='dark'
						mx='auto'
						w='421px'
						h='55px'>
						Reschedule
					</Button>
				</Popup.Body>
			</Popup>

			{/* Reschedule Success */}
			<Popup minW='425px' pt='45px' pb='15px' h='392px' isOpen={RescheduleSuccess.isOpen} onClose={RescheduleSuccess.onClose} isCentered>
				<Image alt='' src={successGif.src} w='108px' mb='25px' mx='auto' />
				<Text textAlign='center' fontSize='24px' fontWeight={600} fontFamily='optimaMedium'>
					Reschedule Successful
				</Text>

				<Popup.Body>
					<VStack w='full' px={0.2} maxW='320px'>
						<Text fontSize='14px' textAlign='center'>
							Quisque nec sapien dignissim, volutpat tellus eget
						</Text>
					</VStack>
					<Button onClick={RescheduleSuccess.onClose} variant='primary' mx='auto' w='321px' h='55px'>
						OK
					</Button>
				</Popup.Body>
			</Popup>
		</Box>
	);
};
