import React from 'react';
import {Box, VStack, Flex, Text, Center, HStack, Icon} from '@chakra-ui/react';
import {fetchCustomPlanSummary} from '../../api/payment';
import {useQuery} from 'react-query';
import {formatToCurrency} from '../../utils';
import {Spinner} from '../../ui-lib';
import {BsArrowLeft} from 'react-icons/bs';
import {CloseIcon} from '@chakra-ui/icons';

const Breakdown = ({onNotClose, asset, customScrollbarStyles, setType}) => {
  const customPlanBreakDown = useQuery(
    ['customPLansummary', asset?.payment_plan?.id],
    () => fetchCustomPlanSummary(asset?.payment_plan?.id),
    {
      enabled: !!asset?.payment_plan,
    }
  );

  function getOrdinal(number) {
    if (typeof number !== 'number') {
      return ''; // Return an empty string for invalid inputs
    }

    const suffixes = ['th', 'st', 'nd', 'rd'];
    const lastDigit = number % 10;
    const lastTwoDigits = number % 100;

    // Special cases for 11, 12, and 13, as they don't follow the usual pattern
    if (lastTwoDigits === 11 || lastTwoDigits === 12 || lastTwoDigits === 13) {
      return number + 'th';
    }

    // Use the appropriate suffix based on the last digit
    const suffix = suffixes[lastDigit] || 'th';

    return number + suffix;
  }

  return (
    <Box px="24px" pb="38px" h={'fit-content'}>
      <Flex w="full" justify={'space-between'} align={'center'} pt={'28px'}>
        <HStack align={'center'}>
          <Icon
            color="text"
            as={BsArrowLeft}
            fontSize={'27px'}
            style={{cursor: 'pointer'}}
            onClick={() => setType('summary')}
          />
          <Text color="text" fontSize={'20px'} fontWeight={500} className="heading-text-regular">
            Payment breakdown
          </Text>
        </HStack>

        <CloseIcon fontSize={'17px'} onClick={onNotClose} cursor={'pointer'} />
      </Flex>

      <VStack
        w="full"
        spacing={'20px'}
        maxH={'40vh'}
        h="fit-content"
        overflowY="auto"
        __css={customScrollbarStyles}
      >
        <Flex
          w="full"
          direction="column"
          mt="20px"
          py="23px"
          bg="background"
          px="15px"
          align={'center'}
          justify={'center'}
          borderRadius={'5px'}
          border="1px solid"
          borderColor={'matador_border_color.100'}
        >
          <Text color="text" fontSize={'14px'} fontWeight={400}>
            Initial Deposit
          </Text>
          <Text color="text" fontSize={'18px'} fontWeight={600}>
            {formatToCurrency(asset?.payment_plan?.initial_deposit_in_value)}
          </Text>
        </Flex>
        {customPlanBreakDown?.isLoading ? (
          <Center w="full" h="full">
            <Spinner disableAbsoluteCenteredSpinner h={{base: `50px`}} w={{base: `50px`}} />
          </Center>
        ) : (
          <>
            {customPlanBreakDown.data?.data?.data?.map((item, idx) => (
              <Flex
                key={idx}
                w="full"
                direction="column"
                mt="20px"
                py="23px"
                bg="background"
                px="15px"
                align={'center'}
                justify={'center'}
                borderRadius={'2px'}
                border="1px solid"
                borderColor={'matador_border_color.100'}
              >
                <Text color="matador_text.500" fontSize={'13px'} fontWeight={500}>
                  {getOrdinal(idx + 1)} payment
                </Text>
                <Text color="matador_text.500" fontSize={'19x'} fontWeight={500}>
                  {item?.amount ? formatToCurrency(item?.amount) : '-'}
                </Text>

                <VStack
                  borderRadius="38.4px"
                  bg="primaryFilterOpacity"
                  justify="center"
                  h="16.4px"
                  align="center"
                  py="3.2px"
                  px="8px"
                >
                  <Text fontSize="8px" color="custom_color.color" fontWeight="500">
                    Due Date: After {item?.period_in_months} month(s)
                  </Text>
                </VStack>
              </Flex>
            ))}
          </>
        )}
      </VStack>
    </Box>
  );
};

export default Breakdown;
