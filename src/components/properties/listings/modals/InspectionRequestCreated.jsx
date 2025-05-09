import {hourMinute, monthDayYear} from '@/utils/formatDate';
import {Box, HStack, Stack, StackDivider, Text} from '@chakra-ui/react';
import {formatInTimeZone} from 'date-fns-tz';

export const InspectionRequestCreated = ({data}) => {
  return (
    <Stack
      bg="#1C1C2A"
      color={`#ffffff`}
      border={`1px solid`}
      borderColor={`#292929`}
      gap={{base: `0px`}}
      fontSize={{base: `16px`}}
      lineHeight={{base: `140%`}}
      textTransform={`capitalize`}
      letterSpacing={{base: `0.159px`}}
      divider={<StackDivider borderColor={`#292929`} margin={`0px !important`} />}
    >
      <HStack justify={`space-between`} gap={`4px`} p={{base: `16px`}}>
        <Text fontWeight={{base: `400`}}>Inspection Type</Text>
        <Text fontWeight={{base: `600`}}>{data?.tour_method}</Text>
      </HStack>
      <HStack justify={`space-between`} gap={`4px`} p={{base: `16px`}}>
        <Text fontWeight={{base: `400`}}>Date</Text>
        <Text fontWeight={{base: `600`}}>{monthDayYear(data?.time)}</Text>
      </HStack>
      <HStack justify={`space-between`} gap={`4px`} p={{base: `16px`}}>
        <Text fontWeight={{base: `400`}}>Time</Text>
        <Text fontWeight={{base: `600`}}>
          {/* {hourMinute(data?.time)} ({data?.timezone}) */}
          {formatInTimeZone(data?.time, data?.timezone, 'h:mm aa zzz ')}
        </Text>
      </HStack>
      <HStack justify={`space-between`} gap={`4px`} p={{base: `16px`}}>
        <Text fontWeight={{base: `400`}}>Status</Text>
        <Text
          color={
            data?.status?.toLowerCase() === `approved` || data?.status?.toLowerCase() === `accepted`
              ? `#12B76A`
              : `#F79009`
          }
          fontWeight={{base: `600`}}
        >
          {data?.status}
        </Text>
      </HStack>
    </Stack>
  );
};
