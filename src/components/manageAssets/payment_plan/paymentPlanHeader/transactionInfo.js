import {
  Box,
  HStack,
  Image,
  Stack,
  StackDivider,
  Text,
  useDisclosure,
  useMediaQuery,
} from '@chakra-ui/react';

import React from 'react';
import ChakraBox from '../../components/chakraBox';
import HoverText from '../../../../ui-lib/ui-lib.components/hover/hoverOnText';
import rightconLightShade from '/src/images/icons/rightconLightShade.svg';
import CustomPaymentBreakdownForAssets from './paymentBreakDown';
import {IoChevronForward} from 'react-icons/io5';

const TransactionInfo = ({equityInfo, transactionInfo}) => {
  const [isBelowXl] = useMediaQuery('(max-width: 535px)');
  const drawerDisclosure = useDisclosure();

  return (
    <>
      <Stack spacing="14px" w="full" className="sub-text-regular">
        <Stack
          // p={{ md: "21.461px 24.894px", base: "16px 17.501px" }}
          p={{base: '13px'}}
          justifyContent="center"
          w="full"
          bg="matador_background.100"
          boxShadow="0px 3.434px 8.584px 0px rgba(0, 0, 0, 0.03)"
          border={`1px solid`}
          borderColor={`matador_border_color.100`}
          divider={<StackDivider borderColor={`matador_border_color.100`} />}
        >
          <Stack align="center" gap={{base: '6px', md: '8px'}} alignSelf="center">
            <Text fontSize="14px" fontWeight="400" color={'text'}>
              {transactionInfo.amount_paid_heading}
            </Text>
            <Text
              fontSize={{base: '16px', md: '24px'}}
              fontWeight="600"
              lineHeight={{base: '100%'}}
              color={'text'}
              letterSpacing={`0.48px`}
            >
              {transactionInfo.amountPaid}
            </Text>
            <HStack
              role="button"
              gap={`4px`}
              color="custom_color.color"
              onClick={drawerDisclosure.onOpen}
              spacing="3px"
            >
              <Text textTransform="capitalize" fontSize={{base: '12px'}} fontWeight="500">
                View Breakdown
              </Text>
              <IoChevronForward fontSize={`16px`} />
            </HStack>
          </Stack>

          {equityInfo?.payment_plan ? (
            <HStack
              w="full"
              align={`stretch`}
              spacing={{base: '12.33px', md: '21.84px'}}
              justify={`space-between`}
              p={{base: `27.5px 0px`}}
            >
              <Stack h="full" spacing={{base: '2.41px', md: '3.43px'}}>
                <Text
                  fontSize={'16px'}
                  lineHeight={`15px`}
                  fontWeight={{base: '600'}}
                  color="matador_text.100"
                  letterSpacing={`0.48px`}
                >
                  {transactionInfo?.due_balance}
                </Text>

                <Text
                  textTransform="capitalize"
                  color="matador_text.500"
                  fontSize={'12px'}
                  lineHeight={`14px`}
                  fontWeight="400"
                  letterSpacing={`-0.24px`}
                >
                  Due On {transactionInfo?.due_date}
                </Text>
              </Stack>
              <Stack spacing={{base: '2.41px', md: '3.43px'}} align="flex-end">
                <Text
                  fontSize={'16px'}
                  lineHeight={`15px`}
                  fontWeight={{base: '600'}}
                  color="matador_text.100"
                  letterSpacing={`0.48px`}
                >
                  {transactionInfo?.outStanding_balance}
                </Text>
                <Text
                  textTransform="capitalize"
                  color="matador_text.500"
                  fontSize={'12px'}
                  lineHeight={`14px`}
                  fontWeight="400"
                  letterSpacing={`-0.24px`}
                >
                  Outstanding Balance
                </Text>
              </Stack>
            </HStack>
          ) : null}
        </Stack>
      </Stack>
      <CustomPaymentBreakdownForAssets modalDisclosure={drawerDisclosure} equityInfo={equityInfo} />
    </>
  );
};

export default TransactionInfo;
