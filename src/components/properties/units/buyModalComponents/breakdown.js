import {
  Box,
  VStack,
  Flex,
  Text,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  Modal,
  ModalOverlay,
  ModalContent,
  HStack,
  Center,
} from '@chakra-ui/react';
import {fetchCustomPlanSummary} from '@/api/payment';
import {useQuery} from 'react-query';
import {formatToCurrency} from '@/utils';
import {Spinner} from '@/ui-lib';
import isMobile from '@/utils/extras';
import {ArrowBackIcon, CloseIcon} from '@chakra-ui/icons';

const customScrollbarStyles = {
  '&::-webkit-scrollbar': {
    width: '4px',
    borderRadius: '16px',
  },
  '&::-webkit-scrollbar-track': {
    borderRadius: '16px',
    WebkitBoxShadow: 'inset 0 0 6px rgba(255, 255, 255, 0.1)',
  },
  '&::-webkit-scrollbar-thumb': {
    borderRadius: '16px',
    backgroundColor: '#ffffff',
    // outline: "1px solid slategrey", // You can include this line if needed
  },
};
const Breakdown = ({selectedPlan, setStep, buyModal, customScrollbarStyles, onCloseModal}) => {
  const customPlanBreakDown = useQuery(
    ['customPLansummary', selectedPlan?.id],
    () => fetchCustomPlanSummary(selectedPlan?.id),
    {
      enabled: !!selectedPlan,
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
    <Box h={'fit-content'} overflowY="auto" __css={customScrollbarStyles}>
      <Flex justify={'space-between'} align={'center'}>
        <HStack spacing="12px" onClick={() => setStep('summary')} cursor="pointer">
          <ArrowBackIcon fontSize={'25px'} cursor="pointer" color="text" />
          <Text
            className="heading-text-regular"
            fontSize={{base: '23px', md: '28px'}}
            fontWeight={400}
          >
            Payment Breakdown
          </Text>
        </HStack>
      </Flex>

      <VStack
        mt="20px"
        w="full"
        gap={'20px'}
        maxH={{base: `300px`, lg: `400px`}}
        overflowY="auto"
        __css={customScrollbarStyles}
        h="fit-content"
      >
        <Flex
          w="full"
          mt="0px"
          direction="column"
          py="23px"
          bg="#1C1C2A"
          px="15px"
          align={'center'}
          justify={'center'}
          borderRadius={'5px'}
          gap={`4px`}
          lineHeight={`140%`}
        >
          <Text color="text" fontSize={'13px'} fontWeight={500}>
            Initial Deposit
          </Text>
          <Text color="text" fontSize={'19x'} fontWeight={700}>
            {formatToCurrency(selectedPlan?.initial_deposit_in_value)}
          </Text>
          <Box
            p="4px 10px"
            bg="tag_bg"
            top={0}
            right={0}
            borderRadius={`48px`}
            background={`rgba(255, 255, 255, 0.10)`}
          >
            <Text fontSize={'11px'} fontWeight={600}>
              {`Due Date: After 1 month`}
            </Text>
          </Box>
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
                mt="0px"
                direction="column"
                py="23px"
                bg="#1C1C2A"
                px="15px"
                align={'center'}
                justify={'center'}
                borderRadius={'5px'}
                gap={`4px`}
                lineHeight={`140%`}
              >
                <Text color="text" fontSize={'13px'} fontWeight={500}>
                  {getOrdinal(idx + 1)} payment
                </Text>
                <Text color="text" fontSize={'19x'} fontWeight={700}>
                  {item?.amount ? formatToCurrency(item?.amount) : '-'}
                </Text>
                <Box
                  p="4px 10px"
                  bg="tag_bg"
                  top={0}
                  right={0}
                  borderRadius={`48px`}
                  background={`rgba(255, 255, 255, 0.10)`}
                >
                  <Text fontSize={'11px'} fontWeight={600}>
                    {`Due Date: After ${item?.period_in_months} month${
                      Number(item?.period_in_months) === 1 ? '' : 's'
                    }`}
                  </Text>
                </Box>
              </Flex>
            ))}
          </>
        )}
      </VStack>
    </Box>
  );
};

export default Breakdown;
