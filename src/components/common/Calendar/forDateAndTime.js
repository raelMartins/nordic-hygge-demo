import {
  Box,
  Button,
  Grid,
  HStack,
  Heading,
  Image,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  Text,
  useDisclosure,
  useTheme,
} from '@chakra-ui/react';
import angledArrow from '/src/images/icons/angledArrow.svg';

import DatePicker from 'react-datepicker';
import {ChevronLeftIcon, ChevronRightIcon} from '@chakra-ui/icons';
import 'react-datepicker/dist/react-datepicker.css';
import styled from '@emotion/styled';
import calendarIcon from '../../../images/icons/calendarIconForCreateStore.svg';
import timeIcon from '../../../images/icons/timeIconforcreateStore.svg';
import {useEffect, useState} from 'react';
import {IoChevronDown} from 'react-icons/io5';
import {formatInTimeZone} from 'date-fns-tz';

export const CustomSingleDatePicker = ({handleSelectedDate, mainDate, ...rest}) => {
  const theme = useTheme();
  const [startDate, setStartDate] = useState(new Date());
  const presentDay = new Date();

  const ShowCalendar = useDisclosure();

  const filterPassedTime = time => {
    const currentDate = new Date();
    const selectedDate = new Date(time);

    return currentDate.getTime() < selectedDate.getTime();
  };

  return (
    <Box>
      <HStack
        onClick={ShowCalendar.onOpen}
        h="50px"
        cursor="pointer"
        w="full"
        pl="17px"
        pr="11px"
        justify="space-between"
        borderRadius="0"
        border="solid 1px"
        borderColor={`matador_border_color.100`}
        {...rest}
      >
        <Text fontSize="14px" color="matador_form.label" fontWeight="400">
          {mainDate ? new Date(mainDate).toDateString() : 'Select Preferred Day'}
        </Text>
        <Image alt="calendar Icon" src={calendarIcon.src} />
      </HStack>
      {/* Initial Calendar screen */}
      <Modal
        p="0"
        motionPreset="slideInBottom"
        isCentered={false}
        top="60px"
        overflow="auto"
        // minW="327.4px"
        isOpen={ShowCalendar.isOpen}
        onClose={ShowCalendar.onClose}
      >
        <ModalOverlay />
        <ModalContent
          pt="14.8px"
          pb="21.9px"
          px="16.91px"
          mt="25vh"
          //   minW="fit-content"
          minW="fit-content"
          w="fit-content"
          borderRadius="5px"
          bg={`matador_background.200`}
          text={`text`}
        >
          <ModalBody p="0" w="fit-content">
            <Wrap
              color={theme?.colors?.custom_color?.color_pop}
              text={theme?.colors?.text}
              background={theme?.colors?.matador_background?.[`200`]}
            >
              <DatePicker
                inline
                showTimeSelect
                minDate={presentDay}
                selected={startDate}
                portalId="root-portal"
                filterTime={filterPassedTime}
                dateFormat="MMMM d, yyyy h:mm aa"
                onChange={date => setStartDate(date)}
              />
            </Wrap>
            <HStack w="full" justify="center" mt="16px">
              <Button
                fontWeight={500}
                onClick={() => ShowCalendar.onClose()}
                m="0 auto"
                bg="custom_color.background"
                fontSize="12px"
                h="40px"
                py="9.39px"
                color="custom_color.color"
                _hover={{
                  opacity: '0.4',
                }}
                borderRadius="0px"
                border="1px solid"
                borderColor="custom_color.color"
                w="full"
              >
                Cancel
              </Button>
              <Button
                fontWeight={500}
                onClick={() => (handleSelectedDate(startDate), ShowCalendar.onClose())}
                m="0 auto"
                bg="custom_color.color"
                fontSize="12px"
                h="40px"
                py="9.39px"
                color="custom_color.contrast"
                _hover={{
                  opacity: '0.4',
                }}
                borderRadius="0px"
                w="full"
              >
                Set
              </Button>
            </HStack>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
};

const Wrap = styled.div`
  .react-datepicker {
    border: none;
    background: transparent;
    color: ${props => props.text} !important;
  }
  .react-datepicker__time-container {
    display: none;
  }
  .react-datepicker__month-container {
    max-width: 250.723px;
    width: 300px;
    background: transparent !important;
    color: ${props => props.text};
  }

  .react-datepicker__day-names {
    width: 214px;
    margin: 0 auto;
    background: transparent !important;
    color: ${props => props.text};
  }

  .react-datepicker__day-name {
    // width: calc(100% / 8);
    font-size: 7px;
    width: 25px;
    height: 25px;
    font-weight: 500;
  }
  .react-datepicker__month {
    display: flex;
    flex-direction: column;
    width: 210px;
    margin: 0 auto;
    color: ${props => props.text};
  }
  .react-datepicker__day {
    width: calc(100% / 8);
    font-size: 9.26px;
    font-weight: 600;
    padding: 0px;
    color: ${props => props.text};
    width: 25px;
    height: 25px;
    transition: 0.3s ease-in-out;
    :hover {
      width: 25px;
      height: 25px;
      //   border-radius: 100%;
    }
  }
  .react-datepicker__day--selected {
    width: 25px;
    height: 25px;
    // border-radius: 100%;
    background: ${props => props.color};
  }

  .react-datepicker__navigation--next--with-time:not(
      .react-datepicker__navigation--next--with-today-button
    ) {
    right: 2px;
    top: 14.98px;
  }

  .react-datepicker__navigation-icon--previous::before,
  .react-datepicker__navigation-icon--next::before {
    border-color: ${props => props.text};
  }
  .react-datepicker__navigation--previous {
    left: 2px;
    top: 14.98px;
  }
  .react-datepicker__current-month {
    position: relative;
    // height: 81px;
    height: 46.9px;
    border-radius: 7px;
    // margin: 0 auto;
    background: transparent;
    display: flex;
    align-items: center;
    justify-content: center;
    color: ${props => props.text};
    font-size: 19px;
    font-weight: 500;
    letter-spacing: 1px;
    width: 100%;
  }
  .react-datepicker__header {
    background: transparent;
    color: ${props => props.text};
    border: none;
    padding-top: 0;
  }
  .react-datepicker__day-name {
    color: ${props => props.text};
  }
`;

export const SelectTime = ({setTime, time, timezone}) => {
  const timeArray = ['12:00', '12:15', '12:30', '12:45'];
  const [timed, setTimed] = useState('10:00');
  const [timedSuffix, setTimedSuffix] = useState('AM');
  const [showTime, setShowTime] = useState(false);
  const [changed, setChanged] = useState(false);

  const handleSuffix = () => {
    setTimedSuffix(timedSuffix === 'AM' ? 'PM' : 'AM');
    setChanged(true);
  };
  const openTimeSelect = () => {
    setShowTime(!showTime);
    setTime(`${timed} ${timedSuffix}`);
  };

  const increaseTime = () => {
    const [hour, minute] = timed.split(':');
    let updatedHour = parseInt(hour);
    let updatedMinute = parseInt(minute) + 15;

    if (updatedMinute >= 60) {
      updatedMinute -= 60;
      updatedHour = (updatedHour + 1) % 12;
    }

    if (updatedHour === 0) {
      updatedHour = 12;
    }

    const updatedTime = `${updatedHour.toString().padStart(2, '0')}:${updatedMinute
      .toString()
      .padStart(2, '0')}`;
    setTimed(updatedTime);
    setChanged(true);
  };

  const decreaseTime = () => {
    const [hour, minute] = timed.split(':');
    let updatedHour = parseInt(hour);
    let updatedMinute = parseInt(minute) - 15;

    if (updatedMinute < 0) {
      updatedMinute += 60;
      updatedHour = (updatedHour - 1 + 12) % 12;
    }

    if (updatedHour === 0) {
      updatedHour = 12;
    }

    const updatedTime = `${updatedHour.toString().padStart(2, '0')}:${updatedMinute
      .toString()
      .padStart(2, '0')}`;
    setTimed(updatedTime);
    setChanged(true);
  };

  useEffect(() => {
    if (timed && timedSuffix && changed) {
      setTime(`${timed} ${timedSuffix}`);
    } else {
      setTime('');
    }
  }, [timed, timedSuffix]);
  const formattedTimezone = formatInTimeZone(Date.now(), timezone, 'zzz');

  return (
    <>
      <Button
        bg="#1C1C2A"
        color={`#fff`}
        px="0"
        h="full"
        w="full"
        _hover={{
          opacity: '1',
        }}
        _active={{
          opacity: '0.6',
        }}
        onClick={openTimeSelect}
      >
        <HStack
          h="50px"
          justify="space-between"
          pl="17px"
          w="full"
          pr="11px"
          borderRadius="none"
          border="1px solid "
          borderColor={'#24242B'}
        >
          <Text className="sub-text-regular" fontSize="13px" fontWeight="500">
            {time
              ? `${time} (${formattedTimezone || `GMT + 1`})`
              : `Select Preferred Time (${formattedTimezone || `GMT + 1`})`}{' '}
          </Text>
          {/* <Image alt="calendar Icon" src={timeIcon.src} /> */}
          <IoChevronDown />
        </HStack>
      </Button>
      {showTime && (
        <Grid
          mt={{base: `10px`, lg: `20px`}}
          gap={`8px`}
          // templateColumns={{base: `1fr`, lg: `1fr 1fr`}}
          templateColumns={{base: `1fr 1fr`}}
          borderRadius="8px"
          py="0"
          color={`#fff`}
        >
          {/* <VStack spacing="none" pt="12px" pb="15px"> */}
          <HStack
            border={`1px solid`}
            borderColor={`#24242B`}
            bg={`#1C1C2A`}
            p={{base: `8px`, lg: '12px 20px'}}
            w="full"
            justify="space-between"
          >
            <Button
              padding="0"
              margin="0"
              background="none"
              border="none"
              _hover={{background: 'none'}}
              _focus={{boxShadow: 'none'}}
              _active={{background: 'none'}}
            >
              <ChevronLeftIcon fontSize="30px" onClick={decreaseTime} color={`#fff`} />
            </Button>

            <Text>{timed}</Text>

            <Button
              padding="0"
              margin="0"
              background="none"
              border="none"
              _hover={{background: 'none'}}
              _focus={{boxShadow: 'none'}}
              _active={{background: 'none'}}
            >
              <ChevronRightIcon fontSize="30px" onClick={increaseTime} color={`#fff`} />
            </Button>
          </HStack>
          <HStack
            border={`1px solid`}
            borderColor={`#24242B`}
            bg={`#1C1C2A`}
            w="full"
            p={{base: `8px`, lg: '12px 20px'}}
            justify="space-between"
          >
            <Button
              padding="0"
              margin="0"
              background="none"
              border="none"
              _hover={{background: 'none'}}
              _focus={{boxShadow: 'none'}}
              _active={{background: 'none'}}
            >
              <ChevronLeftIcon fontSize="30px" onClick={handleSuffix} color={`#fff`} />
            </Button>
            <Text>{timedSuffix}</Text>
            <Button
              padding="0"
              margin="0"
              background="none"
              border="none"
              _hover={{background: 'none'}}
              _focus={{boxShadow: 'none'}}
              _active={{background: 'none'}}
            >
              <ChevronRightIcon fontSize="30px" onClick={handleSuffix} color={`#fff`} />
            </Button>
          </HStack>

          {/* <MenuItem pb="10px" bg="transparent" w="full" justifyContent="center" alignItems="center">
            <Button
              fontWeight={500}
              onClick={() => setTime(`${timed} ${timedSuffix}`)}
              mt="10px"
              _hover={{
                opacity: '1',
              }}
              _active={{
                opacity: '1',
              }}
              _focus={{
                opacity: '1',
              }}
              h="42px"
              w={`100%`}
              px="10px"
              color="custom_color.contrast"
              bg="custom_color.color"
              borderRadius="5px"
            >
              Apply
            </Button>
          </MenuItem> */}
          {/* </VStack> */}
        </Grid>
      )}
    </>
  );
};
