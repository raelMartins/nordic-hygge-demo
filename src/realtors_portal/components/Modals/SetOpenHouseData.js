import {Box, HStack, Image, Button, Text, useDisclosure, VStack} from '@chakra-ui/react';
import React from 'react';
import {useState, forwardRef} from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import successGif from '@/realtors_portal/images/animated_icons/check-icon-unscreen.gif';
import {Popup} from '@/realtors_portal/ui-lib';
import {FcCalendar} from 'react-icons/fc';

export const SetOpenHouseDate = ({ShowCalendar}) => {
  const SetSuccess = useDisclosure();
  const [startDate, setStartDate] = useState(new Date(), 0, 9);
  const selectedMonthAndDay = startDate.toDateString().toString().slice(4, 10);
  const selectedYear = startDate.toDateString().toString().slice(11, 15);

  const filterPassedTime = time => {
    const currentDate = new Date();
    const selectedDate = new Date(time);

    return currentDate.getTime() < selectedDate.getTime();
  };

  return (
    <Box>
      <Popup width="782px" isOpen={ShowCalendar.isOpen} onClose={ShowCalendar.onClose} mt="11vh">
        <Popup.Body>
          <HStack mb={4} align="center" spacing="18px" w="full" px={5}>
            <FcCalendar style={{color: '#4545FE', fontSize: '54px'}} />
            <Box>
              <Text fontSize="28px" fontWeight={700}>
                Open House Date
              </Text>
              <Text fontSize="14px" pt={-4}>
                Select Date and Time
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
              <Text fontWeight={500} fontSize="14px">
                {selectedYear}
              </Text>
              <Text fontWeight={800} fontSize="20px" lineHeight="24px">
                {selectedMonthAndDay}
              </Text>
            </VStack>
          </Box>
          <Box mt="17px">
            <DatePicker
              inline
              showTimeSelect
              selected={startDate}
              portalId="root-portal"
              filterTime={filterPassedTime}
              dateFormat="MMMM d, yyyy h:mm aa"
              onChange={date => setStartDate(date)}
            />
          </Box>
          <Button
            onClick={() => {
              ShowCalendar.onClose();
              SetSuccess.onOpen();
            }}
            variant="dark"
            mx="auto"
            w="421px"
            h="55px"
          >
            Set
          </Button>
        </Popup.Body>
      </Popup>

      {/* Set Success */}
      <Popup
        minW="425px"
        pt="45px"
        pb="15px"
        h="392px"
        isOpen={SetSuccess.isOpen}
        onClose={SetSuccess.onClose}
        isCentered
      >
        <Image alt="" src={successGif.src} w="108px" mb="25px" mx="auto" />
        <Text textAlign="center" fontSize="24px" fontWeight={600}>
          Date Set Successfully
        </Text>

        <Popup.Body>
          <VStack w="full" px={0.2} maxW="320px">
            <Text fontSize="14px" textAlign="center">
              The open house date for this project has been set. Your customers will get the update.
            </Text>
          </VStack>
          <Button onClick={SetSuccess.onClose} variant="primary" mx="auto" w="321px" h="55px">
            OK
          </Button>
        </Popup.Body>
      </Popup>
    </Box>
  );
};
