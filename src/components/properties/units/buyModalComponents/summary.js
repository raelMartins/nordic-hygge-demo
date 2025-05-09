import {useState} from 'react';
import {Flex, Text, Input, HStack, Icon, Stack, StackDivider} from '@chakra-ui/react';
import {Button} from '@/ui-lib';
import {ArrowBackIcon} from '@chakra-ui/icons';
import {formatToCurrency} from '@/utils';
import useLocalStorage from '@/utils/hooks/useLocalStorage';
import {fetchPaymentPlanDoc} from '@/api/listings';
import {useQuery} from 'react-query';
import {useRouter} from 'next/router';
import {IoChevronForward} from 'react-icons/io5';
import {action_box_header_style} from '../UnitActionBox';
import {useCustomToast} from '@/components/CustomToast';
import {PaymentAccess} from '@/components/payment/PaymentAccess';

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
  },
};
const Summary = ({
  setSelectedPlan,
  PAYMENT_PLAN_DATA,
  setStep,
  selectedPlan,
  setAmountToPay,
  unitData,
  fullPayment,
  change_screen = () => {},
}) => {
  const toast = useCustomToast();
  const router = useRouter();

  const {
    initial_deposit_in_value,
    purchase_price,
    payment_period_in_months,
    periodic_payment,
    payment_frequency,
    plan_type,
  } = selectedPlan || {};
  const [editing, setEditing] = useState(false);
  const [amount, setAmount] = useState(initial_deposit_in_value || unitData?.price || '');

  const param = fullPayment
    ? `unit=${router.query?.unit ?? unitData?.id}&purpose=outright`
    : `plan=${selectedPlan?.id}&purpose=paymentplan`;
  const projectDocQuery = useQuery(['fetchPaymentPlanDoc', param], () =>
    fetchPaymentPlanDoc(param)
  );
  const projectDocument =
    projectDocQuery.data?.data?.results?.[0]?.document_file ||
    projectDocQuery.data?.data?.results?.[0]?.document_url;

  const FEES = selectedPlan ? selectedPlan?.bundle?.fees : unitData?.fees;

  const handleProceed = () => {
    if (editing) return handleEditing();
    const accumulatedFeeAndAmount = FEES?.reduce(
      (acc, obj) => acc + Number(obj?.amount),
      Number(amount)
    );
    setAmountToPay(accumulatedFeeAndAmount);
    setSelectedPlan({
      ...selectedPlan,
      initial_deposit_in_value: amount,
    });
    setStep('payment');
  };

  const handleEditing = () => {
    if (Number(amount) >= Number(initial_deposit_in_value)) return setEditing(!editing);
    else
      return toast({
        description: `Sorry, you can't set an amount lower than the initial deposit amount (${formatToCurrency(
          initial_deposit_in_value
        )})`,
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: 'top-right',
      });
  };

  const mainContent = (
    <Stack w="full" gap={{base: `20px`}}>
      <Flex justify={'space-between'} align={'center'}>
        <HStack
          {...action_box_header_style}
          onClick={() =>
            PAYMENT_PLAN_DATA && !PAYMENT_PLAN_DATA[0]?.id
              ? change_screen(`options`)
              : setStep('type')
          }
        >
          <ArrowBackIcon fontSize={'25px'} cursor="pointer" color="#fff" />
          <Text>
            {payment_period_in_months ? `${payment_period_in_months} Months` : 'Payment Summary'}
          </Text>
        </HStack>
      </Flex>

      <Flex
        direction="column"
        justify={'center'}
        p={`35px`}
        align={'center'}
        color="#fff"
        border="1px solid"
        borderColor={'#24242B'}
        bg="#1C1C2A"
        borderRadius={`5px`}
        gap={`4px`}
      >
        <Text
          fontSize={{base: '13px'}}
          fontWeight={400}
          lineHeight={`150%`}
          letterSpacing={`0.26px`}
        >
          {selectedPlan ? `Initial Deposit` : `You will Pay`}
        </Text>
        {editing ? (
          <Input
            autoFocus
            w="50%"
            mx="auto"
            textAlign="center"
            border={editing ? '1px solid !important' : 'none'}
            borderColor="#24242B !important"
            bg={`#15151E`}
            outline={'none'}
            value={amount}
            type="number"
            min={initial_deposit_in_value || 0}
            onChange={e => setAmount(e.target.value)}
            fontWeight={{base: '500', lg: '700'}}
            fontSize={{base: '19px', lg: '24px'}}
            lineHeight={{base: `140%`}}
          />
        ) : (
          <Text
            fontWeight={{base: '500', lg: '600'}}
            fontSize={{base: '19px', lg: '24px'}}
            lineHeight={{base: `130%`}}
          >
            {formatToCurrency(amount)}
          </Text>
        )}
      </Flex>

      <Stack
        align={'stretch'}
        __css={customScrollbarStyles}
        h="fit-content"
        maxH={'400px'}
        overflowY="auto"
        py="5px"
        gap={`10px`}
        divider={<StackDivider borderColor="#24242B" m={`0px !important`} />}
        fontSize={`16px`}
        fontWeight={`400`}
        lineHeight={`160%`}
        letterSpacing={`0.32px`}
      >
        <Flex justify={'space-between'} align={'center'}>
          <Text>Purchase Price</Text>
          <Text fontWeight={`600`}>
            {selectedPlan
              ? formatToCurrency(selectedPlan?.purchase_price)
              : formatToCurrency(unitData?.price)}
          </Text>
        </Flex>
        {selectedPlan && (
          <Flex justify={'space-between'} align={'center'}>
            <Text>Initial deposit percentage</Text>
            <Text fontWeight={`600`}>{Math.round((amount / purchase_price) * 100)}%</Text>
          </Flex>
        )}
        {plan_type === 'custom' && (
          <Flex
            justify={'space-between'}
            align={'center'}
            onClick={() => setStep('breakdown')}
            cursor={`pointer`}
          >
            <Text>Payment Breakdown</Text>
            <HStack
              align={'center'}
              justify={'center'}
              color="custom_color.dark_background_pop"
              fontWeight={600}
              gap={`4px`}
            >
              <Text>View</Text>
              <Icon as={IoChevronForward} fontSize={'20px'} />
            </HStack>
          </Flex>
        )}
        {plan_type === 'manual' && payment_frequency !== 'flexible' && (
          <Flex justify={'space-between'} align={'center'}>
            <Text>
              {payment_frequency
                ? payment_frequency?.charAt(0).toUpperCase() +
                  payment_frequency?.slice(1) +
                  ' Payment'
                : 'Periodic Payment'}
            </Text>
            <Text fontWeight={`600`}>
              {payment_frequency !== 'flexible' ? formatToCurrency(periodic_payment) : '-'}
            </Text>
          </Flex>
        )}

        {FEES?.map((fee, i) => (
          <Flex key={i} justify={'space-between'} align={'center'} gap={`5px`}>
            <Text>{fee?.name}</Text>
            <Text
              fontWeight={`600`}
              minW={`max-content`}
              fontSize={fee?.amount * 1 > 999999 ? `14px` : `16px`}
            >
              {formatToCurrency(fee?.amount)}
            </Text>
          </Flex>
        ))}
        {projectDocument && (
          <Flex
            justify={'space-between'}
            align={'center'}
            onClick={() => window.open(projectDocument)}
            cursor={`pointer`}
          >
            <Text>Terms of Agreement</Text>
            <HStack
              align={'center'}
              justify={'center'}
              color="custom_color.dark_background_pop"
              fontWeight={600}
              gap={`4px`}
            >
              <Text>View</Text>
              <Icon as={IoChevronForward} fontSize={'20px'} />
            </HStack>
          </Flex>
        )}
      </Stack>

      <Stack gap={`10px`}>
        <PaymentAccess
          content={
            <Button
              variation={`primary`}
              boxStyle={{width: `100%`}}
              p={`9px`}
              fontSize={`16px`}
              fontWeight={`600`}
              lineHeight={`140%`}
              letterSpacing={`0.48px`}
              onClick={handleProceed}
            >
              Proceed to Payment
            </Button>
          }
        />
      </Stack>
    </Stack>
  );

  return mainContent;
};

export default Summary;
