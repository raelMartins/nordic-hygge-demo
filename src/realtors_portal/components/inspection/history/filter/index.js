import {
  Box,
  Checkbox,
  CheckboxGroup,
  Heading,
  HStack,
  Image,
  Input,
  Menu,
  MenuButton,
  MenuList,
  Stack,
  Text,
  useDisclosure,
  VStack,
} from '@chakra-ui/react';
import FilterIcon from '@/realtors_portal/images/icons/filter.svg';
import miniCalendarIcon from '@/realtors_portal/images/icons/agent_req_calendar.svg';
import leftArrowBack from '@/realtors_portal/images/icons/leftArrowBack.svg';
import calendar_agents_inspection from '@/realtors_portal/images/icons/calendar_agents_inspection.svg';

import React, {useState} from 'react';
import {useRouter} from 'next/router';
import {changeDateFormat} from '@/realtors_portal/utils/formatDate';
import useGetSession from '@/utils/hooks/getSession';
import {RButton} from '@/realtors_portal/ui-lib';

const Filter = ({setUrl, url}) => {
  const [date, setDate] = useState({});
  const [filterDate, setFilterDate] = useState(false);
  const [dateError, setDateError] = useState('');
  const [toBeFiltered, setToBeFiltered] = useState({inspection_type: []});
  // const [hasDateBeenSelected, setHasDateBeenSelected] = useState(false);
  function hasNotBeenSelected(obj) {
    return Object.keys(obj).length === 0;
  }

  const {isOpen, onClose, onOpen} = useDisclosure();

  const router = useRouter();
  const dateInputfield = document.querySelectorAll('.dateforManageAgent');
  const dateFrom = new Date(date?.from);
  const dateTo = new Date(date?.to);

  const {sessionData: userDetails} = useGetSession('a_details');

  const {sign_up_time} = userDetails || {};
  const sign_up_date = new Date(sign_up_time);

  const applyFilter = () => {
    // if (dateFrom < sign_up_date) {
    //   return setDateError(
    //     "🙈 Oops! 'Date from' predates the date you joined. Please enter a year after you joined."
    //   );
    // }

    // if (date.to && dateFrom > dateTo) {
    //   return setDateError(
    //     "Oops, time travel not allowed! Pick a later 'date to' 😜"
    //   );
    // }
    let filter_param = `date_range=true&${Object.entries(date)
      .map(([name, value]) => {
        return `${name}=${value}`;
      })

      .join('&')}`;
    if (hasNotBeenSelected(date)) {
      filter_param = '';
    }

    setUrl(
      `&${filter_param}${
        toBeFiltered?.inspection_type?.length < 2
          ? `${filter_param ? '&' : ''}${
              toBeFiltered.inspection_type[0] ? 'inspection_type=' : ''
            }${toBeFiltered.inspection_type[0]?.toLowerCase() ?? ''}`
          : ''
      }`
    );
    // router.push(`${router.route}?${filter_param}${url.type && "&"}${url.type}`);
    setDate({});
    dateInputfield.forEach(input => {
      input.value = '';
    });
    return onClose();
  };

  const handleArrowBack = proceed => {
    const dateFrom = new Date(date?.from);
    const dateTo = new Date(date?.to);
    if (proceed) {
      if (dateFrom < sign_up_date) {
        return setDateError(
          "🙈 Oops! 'Date from' predates the date you joined. Please enter a year after you joined."
        );
      }

      if (date.to && dateFrom > dateTo) {
        return setDateError("Oops, time travel not allowed! Pick a later 'date to' 😜");
      }

      // setUrl({
      //   ...url,
      //   filter: `date_range=true&${filter_param}`,
      //   param: `?${filter_param}${url.type && "&"}${url.type}`,
      // });
      // router.push(`${router.route}?${filter_param}${url.type && "&"}${url.type}`);
      setFilterDate(false);

      dateInputfield.forEach(input => {
        input.value = '';
      });
    }

    if (dateFrom < sign_up_date) {
      setDate({});
      return setFilterDate(false);
    }

    if (date.to && dateFrom > dateTo) {
      setDate({});
      return setFilterDate(false);
    }
    setFilterDate(false);
  };

  const handleCheck = (e, prop) => {
    setToBeFiltered({...toBeFiltered, [prop]: e});
  };

  const handleChange = e => {
    const inputDate = new Date(e.target.valueAsNumber);

    const currentDate = new Date();
    if (inputDate > currentDate) {
      return setDateError(
        "Oops, looks like you're ahead of your time! Please select a date on or before today. Thanks!"
      );
    }

    setDateError('');
    return (
      !isNaN(inputDate.getTime()) && setDate({...date, [e.target.name]: inputDate.toISOString()})
    );
  };
  const status = ['Virtual', 'In-Person'];

  const isValid = Object.entries(date)?.length || toBeFiltered?.inspection_type?.length < 2;

  return (
    <Menu isOpen={isOpen} onClose={onClose} closeOnSelect={false}>
      <MenuButton onClick={onOpen}>
        <HStack justify="center" spacing="9px">
          <Image src={FilterIcon.src} />
        </HStack>
      </MenuButton>

      <MenuList
        // w="267px"
        position="relative"
        zIndex="2"
        w={{base: `300px`, md: '388px'}}
        minH="319px"
        // px="26px"
        py="20px"
        boxShadow="3px 20px 30px rgba(0, 0, 0, 0.1),-10px -10px 60px #ffffff"
        borderRadius="16px"
        bg="#ffffff"
      >
        {!filterDate ? (
          <VStack spacing="none" pb="19px" w="full">
            <HStack px="26px" w="full" align="flex-start" justify="space-between">
              <Heading fontSize="14px" fontWeight="600">
                Date Range
              </Heading>

              <Text
                as="span"
                color="#4545FE"
                cursor="pointer"
                fontSize="14px"
                fontWeight="300"
                onClick={() => {
                  setDate({});
                  setToBeFiltered({});
                  setDateError('');
                  return dateInputfield.forEach(input => {
                    input.value = '';
                  });
                }}
              >
                Reset
              </Text>
            </HStack>
            <HStack
              px="26px"
              borderBottom="solid #E4E4E4 1px"
              mt="14px"
              pb="20px"
              w="full"
              justify="space-between"
              cursor="pointer"
            >
              {!hasNotBeenSelected(date) ? (
                <Text fontSize="16px" fontWeight="400">{`${changeDateFormat(
                  date.from
                )}-${changeDateFormat(date.to)}`}</Text>
              ) : (
                <Text fontSize="16px" onClick={() => setFilterDate(true)} fontWeight="400">
                  Filter by date range
                </Text>
              )}
              <Image onClick={() => setFilterDate(!filterDate)} src={miniCalendarIcon.src} alt="" />
            </HStack>
            <VStack
              //   borderBottom="solid 1px #E4E4E4"
              spacing="none"
              mt="14px"
              px="26px"
              borderBottom="solid #E4E4E4 1px"
              w="full"
              pb="20px"
            >
              <Heading mb="12px" alignSelf={'flex-start'} fontSize="14px" fontWeight="600">
                Inspection Type
              </Heading>

              <CheckboxGroup
                w="full"
                onChange={e => handleCheck(e, 'inspection_type')}
                value={toBeFiltered.status}
              >
                <VStack spacing="26px" w="full" align="flex-start" h="full">
                  {status.map((item, idx) => (
                    <Checkbox key={idx} value={item === 'Virtual' ? 'video' : item}>
                      <Text fontSize="14px" fontWeight="400">
                        {item}
                      </Text>
                    </Checkbox>
                  ))}
                </VStack>
              </CheckboxGroup>
            </VStack>
            <Stack w="full" mt="40px" px="46px">
              <RButton variation={`primary`} w="100%" onClick={applyFilter} isDisabled={!isValid}>
                Apply Filter
              </RButton>
            </Stack>
          </VStack>
        ) : (
          <VStack spacing="7px" w="full">
            <Image
              onClick={handleArrowBack}
              alignSelf="start"
              pl="26px"
              src={leftArrowBack.src}
              alt="back button"
              mb="8px"
            />

            <VStack w="full" px="26px" align="start" spacing="9px">
              <Image
                alignSelf="start"
                src={calendar_agents_inspection.src}
                alt="back button"
                mb="8px"
              />

              <Heading fontSize="14px" fontWeight="600">
                Select Date Range
              </Heading>

              {/* <Text
                as="span"
                color="#4545FE"
                cursor="pointer"
                fontSize="14px"
                fontWeight="300"
                onClick={() => {
                  setDate({});
                  setDateError("");
                  return dateInputfield.forEach((input) => {
                    input.value = "";
                  });
                }}
              >
                Reset
              </Text> */}
            </VStack>
            <VStack px="26px" w="full" spacing="5px">
              <Text
                as="label"
                alignSelf="flex-start"
                htmlFor="from"
                fontSize="14px"
                fontWeight="400"
                color="#191919"
              >
                From
              </Text>
              <Input
                placeholder="Select date"
                className="dateforManageAgent"
                type="date"
                borderColor="#E4E4E4"
                h="50px"
                w="full"
                borderRadius="8px"
                name="from"
                onChange={handleChange}
              />
            </VStack>
            <VStack px="26px" w="full" spacing="5px">
              <Text
                as="label"
                alignSelf="flex-start"
                htmlFor="from"
                fontSize="14px"
                fontWeight="400"
                color="#191919"
              >
                To
              </Text>
              <Input
                name="to"
                className="dateforManageAgent"
                onChange={handleChange}
                placeholder="Select date"
                type="date"
                borderColor="#E4E4E4"
                h="50px"
                w="full"
                borderRadius="8px"
              />
              {dateError && (
                <Text alignSelf="flex-start" as="span" fontSize="10px" color="red.400">
                  {dateError}
                </Text>
              )}
            </VStack>
            <Box pt="15px" w="full" justifySelf="flex-end" px="26px">
              <RButton
                variation={`primary`}
                w="100%"
                isDisabled={dateError || !(date?.from && date?.to)}
                onClick={handleArrowBack}
              >
                Proceed
              </RButton>
            </Box>
          </VStack>
        )}
      </MenuList>
    </Menu>
  );
};

export default Filter;
