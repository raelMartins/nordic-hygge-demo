import {Flex, HStack, Stack, Text, VStack} from '@chakra-ui/react';
import React from 'react';
import {handleLastTwoDigits, removeLasttTwoDigits} from '@/realtors_portal/utils/';
import {formatPropertySize} from '@/realtors_portal/utils/truncateLongText';

export const AdditionalInfo = ({listingDetail}) => {
  const boxStyle = {
    maxW: {lg: '480px'},
    w: {lg: '100%'},
    height: '70px',

    background: '#F8F8F8',
    borderRadius: '12px',
  };
  return (
    <VStack w={{lg: 'full'}} maxW={{lg: '480px'}} ml={{lg: 'auto'}} spacing="26px">
      <Stack spacing="18px" w="full">
        <Flex
          p={{base: `16px 23px`, lg: '20px 26px'}}
          {...boxStyle}
          minH="96px"
          h={'auto'}
          bg="#FFFFFF"
          justify="space-between"
          border="1px solid #E4E4E4"
          gap={`10px`}
          m={{base: 4, lg: 0}}
        >
          {listingDetail?.price_per_fraction && (
            <Stack spacing="1px" flex={`1`}>
              <Text
                display="flex"
                fontWeight="600"
                fontSize={{base: '22px', lg: '28px'}}
                color="#191919"
                flexWrap={`wrap`}
              >
                {removeLasttTwoDigits(Number(listingDetail?.price_per_fraction ?? 0))}
                {handleLastTwoDigits(Number(listingDetail?.price_per_fraction ?? 0.0))}
              </Text>
              <Text
                fontWeight=" 400"
                fontSize={{base: '11px', lg: '14px'}}
                lineHeight="18px"
                color="#606060"
              >
                Price per fraction
              </Text>
            </Stack>
          )}
          <Stack spacing="1px" flex={`1`}>
            <Text
              display="flex"
              fontWeight="600"
              fontSize={{base: '22px', lg: '28px'}}
              color="#4545FE"
              flexWrap={`wrap`}
            >
              {removeLasttTwoDigits(Number(listingDetail?.starting_from))}
              {handleLastTwoDigits(Number(listingDetail?.starting_from))}
            </Text>
            <Text
              fontWeight=" 400"
              fontSize={{base: '11px', lg: '14px'}}
              lineHeight="18px"
              color="#606060"
            >
              Starting Price
            </Text>
          </Stack>
        </Flex>
        <VStack align="flex-start" justify="center" {...boxStyle} px="18px">
          <Text fontWeight="600" fontSize="12px" lineHeight="15px" color="#191919">
            Address
          </Text>
          <Text fontWeight="300" fontSize="14px" lineHeight="18px" color="#191919">
            {listingDetail?.address}
          </Text>
        </VStack>
        <VStack align="flex-start" justify="center" {...boxStyle} px="18px">
          <Text fontWeight="600" fontSize="12px" lineHeight="15px" color="#191919">
            Landmark
          </Text>
          <Text fontWeight="300" fontSize="12px" lineHeight="15px" color="#191919">
            {listingDetail?.landmark}
          </Text>
        </VStack>
        <HStack spacing="12px">
          <VStack align="flex-start" justify="center" {...boxStyle} px="18px" flex={`1`}>
            <Text fontWeight="600" fontSize="12px" lineHeight="15px" color="#191919">
              Longitude
            </Text>
            <Text fontWeight="300" fontSize="12px" lineHeight="15px" color="#191919">
              {listingDetail?.longitude}
            </Text>
          </VStack>
          <VStack align="flex-start" justify="center" {...boxStyle} px="18px" flex={`1`}>
            <Text fontWeight="600" fontSize="12px" lineHeight="15px" color="#191919">
              Latitude
            </Text>
            <Text fontWeight="300" fontSize="12px" lineHeight="15px" color="#191919">
              {listingDetail?.latitude}
            </Text>
          </VStack>
        </HStack>
      </Stack>
      <Stack
        w="100%"
        mt={{lg: '26px'}}
        px={{base: 6, lg: 0}}
        gap={'8px'}
        // divider={{base: <StackDivider border="1px solid red" />, lg: <></>}}
      >
        {listingDetail?.building_type && (
          <HStack
            justify="space-between"
            borderBottom="1px solid #E4E4E4"
            p={{base: `18px 0px 12px`}}
          >
            <Text color="#667085" fontWeight={400} fontSize="14px" lineHeight="18px">
              Listing type
            </Text>
            <Text
              fontWeight={500}
              fontSize="14px"
              lineHeight="18px"
              textAlign="right"
              color="#191919"
            >
              {listingDetail?.building_type}
            </Text>
          </HStack>
        )}
        <HStack
          justify="space-between"
          borderBottom="1px solid #E4E4E4"
          p={{base: `18px 0px 12px`}}
        >
          <Text color="#667085" fontWeight={400} fontSize="14px" lineHeight="18px">
            Land title
          </Text>
          <Text
            fontWeight={500}
            fontSize="14px"
            lineHeight="18px"
            textAlign="right"
            color="#191919"
          >
            {listingDetail?.land_title}
          </Text>
        </HStack>
        <HStack
          justify="space-between"
          borderBottom="1px solid #E4E4E4"
          p={{base: `18px 0px 12px`}}
        >
          <Text color="#667085" fontWeight={400} fontSize="14px" lineHeight="18px">
            Land size
          </Text>
          <Text
            fontWeight={500}
            fontSize="14px"
            lineHeight="18px"
            textAlign="right"
            color="#191919"
          >
            {formatPropertySize(listingDetail?.land_size)}
          </Text>
        </HStack>

        {listingDetail?.units_available ? (
          <HStack
            justify="space-between"
            borderBottom="1px solid #E4E4E4"
            p={{base: `18px 0px 12px`}}
          >
            <Text color="#667085" fontWeight={400} fontSize="14px" lineHeight="18px">
              Total units
            </Text>
            <Text
              fontWeight={500}
              fontSize="14px"
              lineHeight="18px"
              textAlign="right"
              color="#191919"
            >
              {listingDetail?.units_available}
            </Text>
          </HStack>
        ) : null}
        {listingDetail?.total_units ? (
          <HStack
            justify="space-between"
            borderBottom="1px solid #E4E4E4"
            p={{base: `18px 0px 12px`}}
          >
            <Text color="#667085" fontWeight={400} fontSize="14px" lineHeight="18px">
              Available units
            </Text>
            <Text
              fontWeight={500}
              fontSize="14px"
              lineHeight="18px"
              textAlign="right"
              color="#191919"
            >
              {listingDetail?.total_units}
            </Text>
          </HStack>
        ) : null}

        {listingDetail?.units_sold ? (
          <HStack
            justify="space-between"
            borderBottom="1px solid #E4E4E4"
            p={{base: `18px 0px 12px`}}
          >
            <Text color="#667085" fontWeight={400} fontSize="14px" lineHeight="18px">
              Sold units
            </Text>
            <Text
              fontWeight={500}
              fontSize="14px"
              lineHeight="18px"
              textAlign="right"
              color="#191919"
            >
              {listingDetail?.units_sold}
            </Text>
          </HStack>
        ) : null}
        {listingDetail?.total_available_fractions && (
          <HStack
            justify="space-between"
            borderBottom="1px solid #E4E4E4"
            p={{base: `18px 0px 12px`}}
          >
            <Text color="#667085" fontWeight={400} fontSize="14px" lineHeight="18px">
              Total available fractions
            </Text>
            <Text
              fontWeight={500}
              fontSize="14px"
              lineHeight="18px"
              textAlign="right"
              color="#191919"
            >
              {listingDetail?.total_available_fractions}
            </Text>
          </HStack>
        )}
      </Stack>
    </VStack>
  );
};

export default AdditionalInfo;
