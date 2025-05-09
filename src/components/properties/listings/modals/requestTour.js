import {useState} from 'react';
import {
  Flex,
  Text,
  Box,
  FormControl,
  FormLabel,
  useToast,
  Center,
  Stack,
  useMediaQuery,
} from '@chakra-ui/react';
import {Button, Spinner} from '@/ui-lib';
import {SelectTime} from '@/components/common/Calendar/forDateAndTime';
import {useMutation, useQuery} from 'react-query';
import {getTourRequest, requestATour} from '@/api/listing';
import {storeName} from '@/constants/routes';
import SelectDateCarousel from './selectDateCarousel';
import {CloseIcon} from '@chakra-ui/icons';
import {InspectionRequestCreated} from './InspectionRequestCreated';
import {useCustomToast} from '@/components/CustomToast';
import ThreeDots from '@/components/loaders/ThreeDots';
import moment from 'moment-timezone';
import {fromZonedTime, toZonedTime} from 'date-fns-tz';

export const RequestTourContent = ({change_screen, info}) => {
  const toast = useCustomToast();
  const [time, setTime] = useState('');
  const [tourMode, setTourMode] = useState('');
  const [mainDate, setmainDate] = useState('');
  const [isLargeScreen] = useMediaQuery('(min-width: 769px)');

  const inspectionRequestQuery = useQuery(['requestsQuery', info?.id], () =>
    getTourRequest(info?.id)
  );

  const inspectionRequest = inspectionRequestQuery?.data?.data?.data;

  const proceedRequest = useMutation(body => requestATour(body, info.id), {
    onSuccess: async res => {
      toast({
        description: `Inspection Scheduled Successfully`,
        status: 'success',
        duration: 5000,
        isClosable: true,
        position: 'top-right',
      });
      change_screen('options');
      inspectionRequestQuery?.refetch();
    },
    onError: err => {
      toast({
        title: 'An error occured',
        description: `${err?.response?.data?.message || 'Something went wrong, try again'}`,
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: 'top-right',
      });
    },
  });

  const handleSelectedDate = date => {
    return setmainDate(date);
  };

  const is_complete = mainDate && time && tourMode;
  const isDisabled = !is_complete || proceedRequest.isLoading;

  const presentDay = toZonedTime(new Date(), info?.listing_timezone);

  const filterPassedTime = time => {
    const selectedDate = toZonedTime(time, info?.listing_timezone);
    return presentDay < selectedDate;
  };

  const handleRequest = () => {
    if (is_complete) {
      const formattedDate = moment(mainDate).format('YYYY-MM-DD');
      const sanitizedTime = time.trim().toUpperCase(); // make sure it's '09:00 AM'
      const dateToUse = moment.tz(
        `${formattedDate} ${sanitizedTime}`,
        'YYYY-MM-DD hh:mm A',
        info?.listing_timezone
      );

      // Check if it's valid
      const utcDate = fromZonedTime(new Date(dateToUse), info?.listing_timezone).toISOString();
      const selectedDate = toZonedTime(new Date(dateToUse), info?.listing_timezone);
      const isPastDate = selectedDate < presentDay;
      if (isPastDate) {
        toast({
          title: 'Invalid Date',
          description: 'Please select a future date.',
          status: 'error',
          duration: 5000,
          isClosable: true,
          position: 'top-right',
        });
        return;
      }
      const body = {
        time: utcDate,
        store_name: storeName,
        type: tourMode?.toLowerCase(),
        mode: tourMode?.toLowerCase(),
      };
      if (!isDisabled) {
        proceedRequest.mutate(body);
      }
    } else
      toast({
        description: `Please select a date, time and a tour mode`,
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: 'top-right',
      });
  };
  return (
    <Stack gap={{base: `12px`, lg: `24px`}} w={{base: `100%`}}>
      <Flex direction="row" justify="space-between" align={'center'} className="sub-text-regular">
        <Text fontSize={'23px'} fontWeight={400} className="heading-text-regular">
          Schedule Inspection
        </Text>
        <CloseIcon cursor="pointer" fontSize="17px" onClick={() => change_screen('options')} />
      </Flex>

      {inspectionRequestQuery?.isLoading ? (
        <Center minH={`200px`} p={`16px`}>
          <ThreeDots darkBg boxSize={{base: '10px', md: '14px'}} />
        </Center>
      ) : inspectionRequest?.tour_method ? (
        <Box>
          <InspectionRequestCreated data={inspectionRequest} />
        </Box>
      ) : (
        <>
          <Flex rowGap="12px" direction={'column'} align={'stretch'} w="full" mb="12px">
            <FormLabel m="0px" fontSize={'16px'} className="heading-text-regular">
              Inspection type
            </FormLabel>
            <Flex gap={`59px`}>
              <Stack
                spacing={'8px'}
                direction="row"
                align="center"
                className="request-checkbox"
                onClick={() => setTourMode('In-Person')}
              >
                <Center
                  cursor="pointer"
                  border={'1px solid'}
                  borderRadius={'full'}
                  borderColor={
                    tourMode === 'In-Person' ? `custom_color.dark_background_pop` : '#fff'
                  }
                  w="16px"
                  h="16px"
                >
                  {tourMode === 'In-Person' && (
                    <Box
                      bg={`custom_color.dark_background_pop`}
                      w={'10px'}
                      h={'10px'}
                      borderRadius={'full'}
                    />
                  )}
                </Center>
                <Text fontSize="13px" fontWeight="500" className="sub-text-regular">
                  In-person
                </Text>
              </Stack>
              <Stack
                spacing={'8px'}
                direction="row"
                align="center"
                className="request-checkbox"
                onClick={() => setTourMode('Virtual')}
              >
                <Center
                  cursor="pointer"
                  border={'1px solid'}
                  borderRadius={'full'}
                  borderColor={tourMode === 'Virtual' ? `custom_color.dark_background_pop` : '#fff'}
                  w="16px"
                  h="16px"
                >
                  {tourMode === 'Virtual' && (
                    <Box
                      bg={`custom_color.dark_background_pop`}
                      w={'10px'}
                      h={'10px'}
                      borderRadius={'full'}
                    />
                  )}
                </Center>
                <Text fontSize="13px" fontWeight="500" className="sub-text-regular">
                  Virtual
                </Text>
              </Stack>
            </Flex>
          </Flex>

          <SelectDateCarousel mainDate={mainDate} handleSelectedDate={handleSelectedDate} />

          <FormControl>
            <SelectTime setTime={setTime} time={time} timezone={info?.listing_timezone} />
          </FormControl>

          <Button
            variation={`primary`}
            disabled={isDisabled}
            isDisabled={isDisabled}
            isLoading={proceedRequest.isLoading}
            onClick={handleRequest}
            w="full"
            p="13px 32px"
          >
            <Text fontSize={`16px`} fontWeight="500" className="sub-text-regular">
              Send Request
            </Text>
          </Button>
        </>
      )}
    </Stack>
  );
};
