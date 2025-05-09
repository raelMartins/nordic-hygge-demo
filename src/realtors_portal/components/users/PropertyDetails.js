import {StackDivider, Text, Image, HStack, VStack, Badge, Center, Heading} from '@chakra-ui/react';

import emptyFeedback from '/src/realtors_portal/images/icons/empty_feedback.png';

import React from 'react';

import {InspectionFeedBack} from '/src/realtors_portal/components/users/inspection/InspectionFeedBack';
import {Stars} from '/src/realtors_portal/components/assets/Stars';
//   import { Stars } from "/src/ui-lib/ui-lib.components/StarRatings";

export const PropertyDetails = ({data}) => {
  const timeArray = data?.time?.split(' ');

  return (
    <HStack
      align="start"
      pr="23px"
      py="18px"
      w="full"
      spacing="0px"
      borderRadius="12px"
      border="solid 1px whitesmoke"
      divider={<StackDivider />}
    >
      <VStack spacing="none" py="31px" px="38px">
        <Text fontSize="18px" color="#191919" fontWeight="400">
          {timeArray[0]}
        </Text>
        <Text mt="70px" fontSize="48px" fontWeight="600" lineHeight="60px">
          {timeArray[1]}
        </Text>
        <Text fontSize="16px" fontWeight="500" mt="39px">
          {timeArray[2] + timeArray[3]}
        </Text>
        <Badge
          mt="32px"
          textTransform="capitalize"
          bg="#DBFFF5"
          py="8px"
          px="13px"
          color={data.tour_method.toLowerCase() === 'video chat' ? '#12D8A0' : '#195880'}
          borderRadius="48px"
        >
          {data.tour_method}
        </Badge>
      </VStack>

      <VStack spacing="none" ml="21px" w="full" h="100%" alignSelf="start">
        <Heading alignSelf="start" fontSize="32px" fontWeight="600">
          {data.project_details.name}
        </Heading>
        {/* <HStack
              spacing="20px"
              w="full"
              bg="#F8F8F8"
              borderRadius="12px"
              justify="space-between"
              px="14px"
              py="8px"
            >
              <VStack spacing="13px" w="full">
                <HStack w="full">
                  <Image src={locationIcon.src} boxSize="24px" />
                  <Text as="span" fontSize="14px" fontWeight={500}>
                    Location
                  </Text>
                </HStack>
                <Text
                  as="span"
                  fontSize="14px"
                  fontWeight="300"
                  fontHeight="17.75px"
                >
                  {data.location.location ?? "address not specified "}
                </Text>
              </VStack>
              <Button
                border={`1px solid ${true ? "#4545FE" : "#919191"}`}
                bg="#FFFFFF"
                color={true ? "#4545FE" : "#919191"}
                w="fit-content"
              >
                Map
              </Button>
            </HStack> */}
        <HStack w="full" mt="10px">
          <VStack
            minW="209px"
            spacing="13px"
            align="start"
            border="solid 1px whitesmoke"
            borderRadius="12px"
            px="15px"
            py="13px"
          >
            <Text as="span" fontSize="14px" fontWeight="500">
              Status
            </Text>
            <Badge
              bg={
                data.status !== 'failed'
                  ? data.status === 'Pending'
                    ? '#0C344D1A'
                    : '#DBFFF5'
                  : '#E4E4E4'
              }
              py="8px"
              px="13px"
              textTransform="capitalize"
              color={
                data.status !== 'Failed'
                  ? data.status === 'pending'
                    ? '#0C344D'
                    : '#195880'
                  : '#606060'
              }
              borderRadius="48px"
            >
              {data.status === 'Done' ? 'Successful Inspection' : data.status}
              {/* Successful Inspection */}
              {/* Failed */}
            </Badge>
          </VStack>
          <VStack
            alignSelf="stretch"
            align="start"
            spacing="13px"
            w="full"
            border="solid 1px whitesmoke"
            borderRadius="12px"
            px="15px"
            py="13px"
          >
            <Text as="span" fontSize="14px" fontWeight="500">
              Rating
            </Text>
            <HStack spacing="8px">
              <Stars num={data.star_rating} />
            </HStack>
          </VStack>
        </HStack>
        <VStack
          minH="169px"
          mt="13px"
          w="full"
          align="start"
          px="15px"
          py="13px"
          spacing="none"
          border="solid 1px whitesmoke"
          borderRadius="12px"
        >
          <Text as="span" fontSize="14px" fontWeight="500">
            Feedback
          </Text>
          {data.user_feedback ? (
            <>
              <Text w="full" mt="13px" fontSize="14px" fontWeight="300">
                Etiam nec urna at massa laoreet placerat id vitae justo. Maecenas malesuada metus
                vitae urna vulputate fringilla ipsum ut commodo. Mauris hendrerit mauris neque,
                quis.
              </Text>
              <InspectionFeedBack />
            </>
          ) : (
            <VStack w="full" mt="18px">
              <Image alt="" src={emptyFeedback.src} w="34px" h="40px" />
              <Text as="span" fontSize="14px" fontWeight="400">
                No feedback
              </Text>
            </VStack>
          )}
        </VStack>
      </VStack>
    </HStack>
  );
};
export default PropertyDetails;
