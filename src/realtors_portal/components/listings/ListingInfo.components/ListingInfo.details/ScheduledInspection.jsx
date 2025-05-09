import {
  Box,
  Button,
  Flex,
  Heading,
  Image,
  Stack,
  Text,
  useDisclosure,
  HStack,
  VStack,
} from '@chakra-ui/react';
import React, {Fragment, useState} from 'react';
import DatePicker from 'react-datepicker';
import {FaCaretRight} from 'react-icons/fa';
import 'react-datepicker/dist/react-datepicker.css';

import {Popup} from '@/realtors_portal/ui-lib';

import {FcCalendar} from 'react-icons/fc';
import scheduleIcon from '@/realtors_portal/images/icons/schedule-icon.png';

export const ScheduledInspection = () => {
  const ShowCalendar = useDisclosure();
  const [startDate, setStartDate] = useState(new Date(), 0, 9);
  const selectedMonthAndDay = startDate.toDateString().toString().slice(4, 10);
  const selectedYear = startDate.toDateString().toString().slice(11, 15);

  const filterPassedTime = time => {
    const currentDate = new Date();
    const selectedDate = new Date(time);

    return currentDate.getTime() < selectedDate.getTime();
  };
  return (
    <Fragment>
      <Flex
        pl="19px"
        pr="40px"
        mt="46px"
        h="121px"
        maxW="390px"
        align="center"
        columnGap="26px"
        borderRadius="12px"
        border="1px solid #F5F5F5"
      >
        <Image alt="" src={scheduleIcon.src} boxSize="48px" />
        <Stack>
          <Heading fontWeight="500" fontSize="24px" lineHeight="30px" color="#191919">
            Scheduled Inspection
          </Heading>
          <Text
            cursor="pointer"
            display="flex"
            fontSize="14px"
            fontWeight={500}
            color={`#4545FE`}
            onClick={ShowCalendar.onOpen}
          >
            Manage
            <FaCaretRight style={{marginTop: '3px'}} fontSize="18px" color="#191919" />
          </Text>
        </Stack>
        <Popup isOpen={ShowCalendar.isOpen} onClose={ShowCalendar.onClose} mt="11vh">
          <Popup.Body maxW="857px">
            <HStack mb={4} align="center" spacing="15px" w="full">
              <FcCalendar style={{color: '#4545FE', fontSize: '54px'}} />
              <Box>
                <Text fontSize="28px" fontWeight={700}>
                  Scheduled Inspection
                </Text>
                <Text fontSize="14px" pt={-4}>
                  Available inspection days for this month
                </Text>
              </Box>
            </HStack>
            <Box
              px="30px"
              w="full"
              maxW="433px"
              h="81px"
              py="18px"
              bg={`#4545FE`}
              borderRadius="14px"
            >
              <VStack color="#FFFFFF">
                <Text fontWeight={500} fontSize="12px">
                  {selectedYear}
                </Text>
                <Text fontWeight={700} fontSize="20px" lineHeight="24px">
                  {selectedMonthAndDay}
                </Text>
              </VStack>
            </Box>
            <Box mt="17px">
              <DatePicker
                inline
                showTimeSelect
                selected={startDate}
                filterTime={filterPassedTime}
                dateFormat="MMMM d, yyyy h:mm aa"
                onChange={date => setStartDate(date)}
              />
            </Box>
            <Button onClick={ShowCalendar.onClose} variant="dark" mx="auto" w="421px" h="55px">
              Inspection Manager
            </Button>
          </Popup.Body>
        </Popup>
      </Flex>
    </Fragment>
  );
};

export default ScheduledInspection;
