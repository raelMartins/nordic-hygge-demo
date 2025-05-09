import {Box, HStack, Stack, Text, useMediaQuery} from '@chakra-ui/react';

import React from 'react';
import ChakraBox from '../../components/chakraBox';
import HoverText from '../../../../ui-lib/ui-lib.components/hover/hoverOnText';

const TransactionInfo = ({equityInfo, transactionInfo}) => {
  const [isBelowXl] = useMediaQuery('(max-width: 535px)');

  return (
    <Stack spacing="14px" w="full" className="sub-text-regular">
      <Stack
        // p={{ md: "21.461px 24.894px", base: "16px 17.501px" }}
        py={{base: '16px', md: '21.461px'}}
        pb={{md: '20px', base: '16px'}}
        px={{base: '17.501px', md: '24.894px'}}
        spacing="none"
        justifyContent="center"
        w="full"
        bg="custom_color.color"
        h={{md: '129.88px', base: '101.578px'}}
        boxShadow="0px 3.434px 8.584px 0px rgba(0, 0, 0, 0.03)"
      >
        <Stack align="center" spacing={{base: '6px', md: '8px'}} alignSelf="center">
          <Text fontSize="12.018px" fontWeight="400" color={'custom_color.contrast'}>
            {transactionInfo.amount_paid_heading}
          </Text>
          <Text
            fontSize={{base: '16px', md: '22px'}}
            fontWeight="500"
            lineHeight={{base: '19px', md: '26px'}}
            color="custom_color.contrast"
          >
            {transactionInfo.amountPaid}
          </Text>
        </Stack>

        <Stack spacing="4px" mt={{base: '9.05px', md: '12.88px'}} w="full">
          <HStack w="full" justifyContent="space-between">
            <Text
              fontSize={{md: '12px', base: '10px'}}
              fontWeight="400"
              color="custom_color.contrast"
            >
              Co-owner Progress
            </Text>
            <Text
              fontSize={{md: '12px', base: '10px'}}
              fontWeight="400"
              color="custom_color.contrast"
            >
              {transactionInfo.progress}
            </Text>
          </HStack>
          <Box borderRadius="48px" h="8px" bg="#00000033" w="full">
            <ChakraBox
              borderRadius="48px"
              h="full"
              position="relative"
              bg="custom_color.contrast"
              initial={{
                width: '0%',
              }}
              animate={{
                width: `${transactionInfo.progress}`,
              }}
              transition={{
                duration: 1.5,
                delay: 0.4,
                ease: 'easeInOut',
              }}
              maxW="100%"
            />
          </Box>
        </Stack>
      </Stack>
      {equityInfo?.payment_plan ? (
        <HStack w="full" align={`stretch`} spacing={{base: '12.33px', md: '21.84px'}}>
          <HStack
            w="full"
            justify="space-between"
            border="0.858px solid"
            borderColor="matador_border_color.100"
            bg={`matador_background.100`}
            p={{md: '20px 13px', base: '24px 16px'}}
            // maxH={{base: '81.68px', md: '58px'}}
          >
            <Stack h="full" spacing={{base: '2.41px', md: '3.43px'}}>
              <Text
                textTransform="capitalize"
                color="matador_text.500"
                fontSize={'10px'}
                lineHeight={`14px`}
                fontWeight="400"
              >
                Due Balance
              </Text>

              <HoverText
                lens={isBelowXl ? 8 : 18}
                text={transactionInfo?.due_balance}
                fontSize={'11px'}
                lineHeight={`15px`}
                fontWeight={{base: '700', md: '500'}}
                color="matador_text.100"
              />
            </Stack>
            <Stack h="full" justify="end" spacing={{base: '2.41px', md: '3.43px'}} align="end">
              <Text
                textTransform="capitalize"
                color="matador_text.500"
                fontSize={'10px'}
                lineHeight={`14px`}
                fontWeight="400"
              >
                Due Date
              </Text>

              <HoverText
                // lens={isBelowXl ? 6 : 18}
                lens={[8, 20]}
                text={transactionInfo?.due_date}
                fontSize={'11px'}
                lineHeight={`15px`}
                fontWeight={{base: '700', md: '500'}}
                color="matador_text.100"
              />
            </Stack>
          </HStack>

          <HStack
            w="full"
            justify="center"
            border="0.858px solid"
            borderColor="matador_border_color.100"
            bg={`matador_background.100`}
            p={{base: '12.019px 10.094px', md: '17.096px 15.48px'}}
          >
            <Stack spacing={{base: '2.41px', md: '3.43px'}} align="center">
              <Text
                textTransform="capitalize"
                color="matador_text.500"
                fontSize={'10px'}
                lineHeight={`14px`}
                fontWeight="400"
              >
                Outstanding Balance
              </Text>
              <Text
                fontSize={{base: '10px', md: '14px'}}
                fontWeight={{base: '700', md: '500'}}
                lineHeight={`20px`}
                color="matador_text.100"
              >
                {transactionInfo?.outStanding_balance}
              </Text>
            </Stack>
          </HStack>
        </HStack>
      ) : null}
    </Stack>
  );
};

export default TransactionInfo;
