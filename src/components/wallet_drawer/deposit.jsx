import {useState} from 'react';
import {
  Flex,
  HStack,
  Image,
  Text,
  VStack,
  Box,
  Center,
  useClipboard,
  useToast,
  Spinner,
  Icon,
  Stack,
} from '@chakra-ui/react';
import {Button, FormInput} from '../../ui-lib/ui-lib.components';
import depositIcon from '../../images/icons/credit-card-shield.svg';
import cardImg from '../../images/icons/card.svg';
import bank from '../../images/icons/payment-with-bank.svg';
import {CheckIcon, CopyIcon, ArrowBackIcon, CloseIcon} from '@chakra-ui/icons';
import {BiPlus} from 'react-icons/bi';
import {useMutation, useQuery} from 'react-query';
import {fetchVirtualAccountNumber, makeeDepositToWallet} from '../../api/Wallet';
import {BUSINESS_ID, storeName, store_name} from '../../constants/routes';
import {formatToCurrency} from '../../utils';
import {RegularSpinner} from '../../ui-lib/ui-lib.components/Spinner/spinner';
import {fetchSavedCards, makePaymentWithSavedCard} from '../../api/payment';
import {BsExclamationCircle} from 'react-icons/bs';
import openExternalUrl from '../../utils/openExternalLink';
import {CheckIconSVG, CreditCardShieldSVG, PaymentWithBankSVG} from '../assets/svgs';
import EmptyState from '../appState/empty-state';
import {scrollBarStyles} from '../common/ScrollBarStyles';
import {handleTransferNote} from '../../utils/transferNote';
import {MY_COUNTRY} from '@/constants/country';
import {useCustomToast} from '../CustomToast';

export const DepositWallet = ({step, setStep, setPage, onWalClose}) => {
  const toast = useCustomToast();
  const [selectedMethod, setSelectedMethod] = useState(null);
  const VIRTUAL_ACCOUNT_NUMBER = useQuery(['fetchVirtualAccountNumber'], fetchVirtualAccountNumber);
  const bankDetails = {
    bank_name: VIRTUAL_ACCOUNT_NUMBER?.data?.data?.data?.account_bank_name ?? '',
    account_number: VIRTUAL_ACCOUNT_NUMBER?.data?.data?.data?.account_number ?? '',
    account_name: VIRTUAL_ACCOUNT_NUMBER?.data?.data?.data?.account_name ?? '',
  };
  const [amount, setAmount] = useState('');
  const [amountError, setAmountError] = useState('');
  const {hasCopied, onCopy} = useClipboard(
    VIRTUAL_ACCOUNT_NUMBER?.data?.data?.data?.account_number
  );
  const [selectedCard, setSelectedCard] = useState(null);
  // VIRTUAL_ACCOUNT_NUMBER?.data?.data?.data?.data;

  const MAKE_DEPOSITS_MUTATION = useMutation(formData => makeeDepositToWallet(formData), {
    onSuccess: res => {
      const link = res?.data?.data?.data?.link;
      if (link) openExternalUrl(link, '_blank');
    },
    onError: err => {
      toast({
        title: 'Oops...',
        description: `${
          err?.response?.data?.message ??
          err?.response?.message ??
          err?.response?.data[0] ??
          'Something went wrong'
        }`,
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: 'top-right',
      });
    },
  });

  const payWithSavedCardMutation = useMutation(formData => makePaymentWithSavedCard(formData), {
    onSuccess: res => {
      toast({
        title: 'Deposit successful👍🏻',
        status: 'success',
        duration: 5000,
        isClosable: true,
        position: 'top-right',
      });
      setPage('wallet');
    },
    onError: err => {
      toast({
        title: 'Oops...',
        description: `${
          err?.response?.data?.message ??
          err?.response?.message ??
          err?.response?.data[0] ??
          'Something went wrong'
        }`,
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: 'top-right',
      });
    },
  });

  const {data: savedCards} = useQuery(['cardSaved'], fetchSavedCards);
  const storeName = store_name();

  const handleAddNewCard = () => {
    const body = {
      amount: Number(amount.replaceAll(',', '').replaceAll(MY_COUNTRY?.symbol, '')),
      channel: 'card',
      store: storeName,
    };
    MAKE_DEPOSITS_MUTATION.mutate(body);
  };

  const showToast = () => {
    // toast({
    //   title: 'Account Number Copied!',
    //   status: 'info',
    //   duration: 1500,
    //   isClosable: true,
    //   position: 'top-right',
    // });
    return (
      <CopyIcon
        onClick={onCopy}
        fontSize={'25'}
        color="custom_color.color"
        cursor="pointer"
        h={8}
        w={8}
      />
    );
  };

  const copy = () => {
    onCopy();
    toast({
      title: 'Account Number Copied!',
      status: 'info',
      duration: 1500,
      isClosable: true,
      position: 'top-right',
    });
  };

  const handleMakeDeposits = () => {
    if (!BUSINESS_ID) return;

    if (!selectedCard?.authorization_code)
      return toast({
        description: 'Please select a card',
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: 'top-right',
      });

    const paymentDetailsObj = {
      auth_code: selectedCard?.authorization_code,
      amount: Number(amount.replaceAll(',', '').replaceAll(MY_COUNTRY?.symbol, '')),
      payment_data: {payment_type: 'wallet'},
      business_id: BUSINESS_ID(),
    };

    payWithSavedCardMutation.mutate(paymentDetailsObj);
  };

  const methods = [
    {
      id: 1,
      title: 'Debit Card',
      desc: 'NGN3,000,000 deposit limit',
      icon: <CreditCardShieldSVG />,
      img: depositIcon.src,
    },
    {
      id: 2,
      title: 'Bank Transfer',
      desc: 'Transfer into designated account',
      icon: <PaymentWithBankSVG />,
      img: bank.src,
    },
  ];

  const handleSelect = () => {
    if (selectedMethod?.id === 1) {
      if (!amount) return setAmountError('Enter an amount to proceed');
      setStep('card');
      setSelectedMethod(null);
    } else if (selectedMethod?.id === 2) {
      setStep('bank');
      setSelectedMethod(null);
    } else {
      toast({
        title: 'Select a payment method',
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: 'top-right',
      });
    }
  };

  const handleInput = e => {
    const input = e.target;
    let val = input.value;

    const cleanedString = val.replace(/[^\d]/g, ''); // Remove non-numeric characters
    val = cleanedString.replace(/^0+(?=\d)/, '');

    const length = val.length;

    if (length <= 2) {
      val = '0.' + val.padStart(2, '0');
    } else {
      const integerPart = val.slice(0, length - 2);
      const decimalPart = val.slice(-2);
      val = integerPart + '.' + decimalPart;
    }

    setAmount(val);
  };

  const handleBack = () => {
    if (step !== 'method') setStep('method');
    else setPage('wallet');
  };

  const disabledOption = !selectedMethod || (selectedMethod?.id === 1 && !amount);

  return (
    <Stack h="full" overflowY="auto" css={scrollBarStyles} gap={`0px`}>
      <Flex
        justify={'space-between'}
        display={{base: 'none', lg: 'flex'}}
        borderBottom="1px solid"
        borderColor={`matador_border_color.100 !important`}
        bg={`matador_background.100`}
        align={'center'}
        p={4}
      >
        <HStack spacing="12px">
          <ArrowBackIcon fontSize={'25px'} cursor="pointer" onClick={handleBack} color="text" />
          <Text fontSize={'23px'} fontWeight={500} color="text" className="heading-text-regular">
            Make a deposit
          </Text>
        </HStack>
        <CloseIcon
          display={{base: 'none', md: 'flex'}}
          fontSize={'12px'}
          cursor="pointer"
          color="text"
          onClick={onWalClose}
        />
      </Flex>
      {step === 'method' && (
        <>
          <Box
            align="center"
            justify="center"
            p={{base: `48px 56px`}}
            w="full"
            bg="matador_background.100"
            mt={`0px`}
          >
            <Stack w={`288px`} mx={`auto`} gap={`6px`}>
              <Text
                textAlign={'left'}
                w={`100%`}
                color="text"
                fontSize={`13px`}
                lineHeight={`150%`}
                letterSpacing={`.26px`}
                fontWeight="500"
              >
                Amount to deposit
              </Text>
              <FormInput
                color="text"
                bg="matador_background.200"
                textAlign="center"
                onChange={handleInput}
                value={amount ? formatToCurrency(amount) : formatToCurrency(``)}
                error={amountError}
                justify="center"
                w="100%"
                boxShadow="0px 1px 2px 0px rgba(16, 24, 40, 0.05)"
                fontSize={16}
                leftAddonStyle={{
                  top: '10px',
                  left: {base: '75px', sm: '120px', lg: '60px'},
                }}
                group={{
                  justifyContent: 'center',
                }}
                placeholder="0.00"
                _placeholder={{
                  fontSize: `16px`,
                  color: 'matador_form.label',
                }}
                borderRadius={`0px`}
              />
            </Stack>
          </Box>
          <Stack justify="space-between" px={8} gap="12px" bg="matador_background.200">
            <Text
              mt="25px"
              color="matador_text.500"
              lineHeight={`120%`}
              fontSize={{base: '12px', md: '14px'}}
              textTransform={`uppercase`}
            >
              Select Payment Method
            </Text>
            <VStack spacing={{base: '14px', md: '16px'}} align={'stretch'}>
              {methods.map(method => (
                <Flex
                  key={method.id}
                  justify="space-between"
                  onClick={() => setSelectedMethod(method)}
                  cursor="pointer"
                  gap="5px"
                  direction={'row'}
                  px={{base: '10px', md: '14px'}}
                  py={{base: '11px', md: '16px'}}
                  w="full"
                  border={'1px solid'}
                  borderColor={
                    selectedMethod?.id === method?.id
                      ? 'custom_color.color'
                      : 'matador_border_color.100 !important'
                  }
                  _hover={{
                    border: '1px solid',
                    borderColor:
                      selectedMethod?.id === method?.id ? 'custom_color.color' : 'matador_text.200',
                  }}
                  // bg="matador_background.100"
                  align="center"
                  borderRadius={`12px`}
                >
                  <HStack spacing={'14px'}>
                    {method.icon}
                    <VStack align={'stretch'} spacing={0}>
                      <Text
                        color="text"
                        fontSize={{base: '14px', md: '16px'}}
                        fontWeight={{base: '400'}}
                        lineHeight={`140%`}
                      >
                        {method.title}
                      </Text>
                      <Text color="text" fontSize={{base: '11px'}} fontWeight={{base: '400'}}>
                        {method.desc}
                      </Text>
                    </VStack>
                  </HStack>
                  {selectedMethod?.id === method?.id ? (
                    // <Image src={checkIcon.src} />
                    <CheckIconSVG />
                  ) : (
                    <Center
                      w="16px"
                      h="16px"
                      borderRadius={'full'}
                      border="1px solid"
                      borderColor={'matador_border_color.100 !important'}
                    />
                  )}
                </Flex>
              ))}
            </VStack>
            <Button
              variation={`primary`}
              isDisabled={disabledOption}
              onClick={handleSelect}
              fontWeight={600}
              fontSize={`16px`}
              p={{base: `9px`}}
            >
              Proceed
            </Button>
          </Stack>
        </>
      )}
      {step === 'card' && (
        <Stack w="full">
          <Box
            align="center"
            justify="center"
            py={8}
            w="full"
            bg="matador_background.100"
            mt={`0px`}
          >
            <Stack w={`288px`} mx={`auto`} gap={`6px`}>
              <Text
                textAlign={'left'}
                w={`100%`}
                color="text"
                fontSize={`13px`}
                lineHeight={`150%`}
                letterSpacing={`.26px`}
                fontWeight="500"
              >
                Amount to deposit
              </Text>
              <FormInput
                color="text"
                bg="matador_background.200"
                textAlign="center"
                onChange={handleInput}
                value={amount ? formatToCurrency(amount) : formatToCurrency(``)}
                error={amountError}
                justify="center"
                w="100%"
                boxShadow="0px 1px 2px 0px rgba(16, 24, 40, 0.05)"
                fontSize={16}
                leftAddonStyle={{
                  top: '10px',
                  left: {base: '75px', sm: '120px', lg: '60px'},
                }}
                group={{
                  justifyContent: 'center',
                }}
                placeholder="0.00"
                _placeholder={{
                  fontSize: `16px`,
                  color: 'matador_form.label',
                }}
                borderRadius={`0px`}
                isDisabled
              />
            </Stack>
          </Box>

          <Stack p="24px" gap={`12px`}>
            <Text mb={{base: '12px'}} textTransform={`uppercase`}>
              Select Card
            </Text>
            <Stack spacing="10px" mt="6px" align={'stretch'}>
              {!savedCards?.data?.results?.length ? (
                <Stack spacing={{base: '12px'}} align={'stretch'}>
                  {/* {savedCards?.data?.results?.map(card => ( */}
                  {[{}]?.map(card => (
                    <Flex
                      key={card?.id}
                      onClick={() => setSelectedCard(card)}
                      cursor="pointer"
                      gap="5px"
                      justify="space-between"
                      align={`center`}
                      direction={'row'}
                      px={{base: '10px', md: '14px'}}
                      py={{base: '12px', md: '16px'}}
                      w="full"
                      p={{base: '12px', md: '16px'}}
                      border={selectedCard?.id === card.id ? '1px solid' : '1px solid'}
                      borderColor={'matador_border_color.100 !important'}
                      bg="matador_background.200"
                      borderRadius={`5px`}
                    >
                      <HStack spacing={{base: '10px', md: '14px'}}>
                        {/* <Image w={{base: '25px', md: 'auto'}} alt="next_image" src={cardImg.src} /> */}
                        <Center
                          boxSize={`40px`}
                          borderRadius={`50%`}
                          bg={`custom_color.opacity._20`}
                        >
                          <CreditCardShieldSVG />
                        </Center>
                        <VStack align={'stretch'} spacing={0}>
                          <Text fontSize={{base: '16px'}} fontWeight={{base: '600'}} color="text">
                            {card?.bank}Zenith
                          </Text>
                          <Text
                            fontSize={{base: '13px'}}
                            fontWeight={{base: '400', md: '500'}}
                            lineHeight={`150%`}
                            letterSpacing={`.26px`}
                            color="text"
                          >
                            **** ****{card?.last4} **** **** **** 7799
                          </Text>
                        </VStack>
                      </HStack>

                      {selectedCard?.id === card.id ? (
                        // <Image src={checkIcon.src} />
                        <CheckIconSVG />
                      ) : (
                        <Center
                          w="16px"
                          h="16px"
                          borderRadius={'full'}
                          border="1px solid"
                          borderColor={'matador_border_color.100 !important'}
                        />
                      )}
                    </Flex>
                  ))}
                </Stack>
              ) : (
                <EmptyState
                  icon={<Image alt="empty_card" w="48px" h="48px" src={cardImg.src} />}
                  noHeader
                  text={
                    <Text fontSize={'12px'} fontWeight={400}>
                      No card has been added yet
                    </Text>
                  }
                  height={{base: '100px', md: '100px'}}
                  minH={`max-content`}
                />
              )}
            </Stack>

            <Stack gap="16px" mt="12px">
              {savedCards?.data?.results?.length && (
                <Button
                  variation={`primary`}
                  w="full"
                  fontWeight={400}
                  onClick={handleMakeDeposits}
                  mt={{base: '19px', lg: '36px'}}
                >
                  {payWithSavedCardMutation?.isLoading ? <Spinner /> : 'Proceed'}
                </Button>
              )}
              <Button
                variation={`primary`}
                w="full"
                fontWeight={400}
                alignSelf="flex-end"
                onClick={handleAddNewCard}
                disabled={MAKE_DEPOSITS_MUTATION?.isLoading}
                isLoading={MAKE_DEPOSITS_MUTATION?.isLoading}
              >
                {MAKE_DEPOSITS_MUTATION?.isLoading ? <Spinner /> : 'Add Card'}
              </Button>
            </Stack>
          </Stack>
        </Stack>
      )}
      {step === 'bank' && (
        <>
          {VIRTUAL_ACCOUNT_NUMBER.isLoading ? (
            <Center minH={`300px`}>
              <RegularSpinner />
            </Center>
          ) : (
            <Stack px={4}>
              <Box border="1px solid" borderColor={`matador_border_color.100 !important`} mt="22px">
                <Flex
                  color="text"
                  direction={'column'}
                  p="22px"
                  w="full"
                  minH="260px"
                  fontSize={'14px'}
                  fontWeight={400}
                  justify={'space-between'}
                  align="stretch"
                  gap="23px"
                >
                  <Text fontSize={{base: '12px', md: '14px'}} fontWeight={500}>
                    To add funds to your wallet, simply transfer from your bank account using the
                    details provided below.
                  </Text>
                  <Box>
                    <Text
                      fontSize={{base: '12px', md: '14px'}}
                      fontWeight={500}
                      textAlign={'center'}
                      mb="11px"
                    >
                      Your wallet account number
                    </Text>
                    <Flex
                      // bg="matador_background.100"
                      bg="matador_border_color.100"
                      color={`matador_text.100`}
                      border={`1px solid`}
                      borderColor={`matador_border_color.100 !important`}
                      p="10px 35px"
                      justify={'space-between'}
                      align={'center'}
                      h="85px"
                      borderRadius={`12px`}
                    >
                      <Box textAlign={'center'} flex={1}>
                        <Text fontSize={{base: '12px', md: '14px'}} fontWeight={600}>
                          {bankDetails?.bank_name}
                        </Text>
                        <Text fontSize={{base: '20px', md: '26px'}} fontWeight={600}>
                          {bankDetails?.account_number}
                        </Text>
                      </Box>
                      {
                        <CopyIcon
                          onClick={copy}
                          fontSize={'10'}
                          color={hasCopied ? 'custom_color.color' : 'matador_text.100'}
                          cursor="pointer"
                          h={5}
                          w={5}
                        />
                      }
                    </Flex>
                    {/* <Text
                      color="text"
                      fontSize={{base: '12px', md: '13px'}}
                      fontWeight={500}
                      textAlign={'center'}
                      mt="11px"
                    >
                      {bankDetails.account_name}
                    </Text> */}
                  </Box>
                  <Flex gap="5px" w="full">
                    <Icon mt="2px" color="text" as={BsExclamationCircle} fontSize={'13px'} />
                    <Text fontSize={12} fontWeight={400} color="matador_text.500">
                      While most transfers are processed almost immediately, please note that it may
                      take longer in some cases. Be rest assured that we will notify you via email
                      as soon as the transfer is complete.
                    </Text>
                  </Flex>
                  <Button variation={`primary`} onClick={handleBack} fontWeight={600}>
                    Done
                  </Button>
                </Flex>
              </Box>
            </Stack>
          )}
        </>
      )}
    </Stack>
  );
};

export default DepositWallet;
