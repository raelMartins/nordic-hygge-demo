import React from 'react';
import {Container, HStack, Image, Stack, Text} from '@chakra-ui/react';
import otherFeesAddOnImg from '@/realtors_portal/images/icons/paymentplan_green_mini.svg';
import {handleLastTwoDigits, removeLasttTwoDigits} from '@/realtors_portal/utils/';

export const UnitOtherFees = ({otherFeesData}) => {
  return (
    <Stack mt="17px" spacing="18px">
      {otherFeesData && otherFeesData.length > 0 ? (
        otherFeesData.map((fee, index) => (
          <HStack
            key={index}
            justify="space-between"
            bg="#ffffff"
            borderRadius="16px"
            pr="28px"
            boxShadow=" 0px 4px 8px rgba(0, 0, 0, 0.02)"
          >
            <HStack spacing="21px">
              <Image alt=" payment plan icon green" src={otherFeesAddOnImg.src} />
              <Text fontSize="20px" color="#191919" fontWeight="400">
                {fee?.name}
              </Text>
            </HStack>
            <Text fontSize="24px" fontWeight={600} color="#191919">
              {removeLasttTwoDigits(Number(fee?.amount ?? 0))}
              {handleLastTwoDigits(Number(fee?.amount ?? 0))}
            </Text>
          </HStack>
        ))
      ) : (
        <HStack
          justify="space-between"
          bg="#ffffff"
          borderRadius="16px"
          pr="28px"
          boxShadow=" 0px 4px 8px rgba(0, 0, 0, 0.02)"
        >
          <HStack spacing="21px">
            <Image
              filter="grayscale(100%)"
              alt=" payment plan icon green"
              src={otherFeesAddOnImg.src}
            />
            <Text fontSize="20px" color="#191919" fontWeight="400">
              N/A
            </Text>
          </HStack>
        </HStack>
      )}
    </Stack>
  );
};

export default UnitOtherFees;
