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
  Icon,
  Stack,
} from '@chakra-ui/react';
import {BsExclamationCircle} from 'react-icons/bs';
import {CopyIcon} from '@chakra-ui/icons';
import wallet from '@/images/icons/debit-card.svg';
import {calculateFee} from '@/utils/calculateFee';
import {useAssetPayment} from '@/ui-lib/ui-lib.hooks';
import bank from '@/images/icons/payment-with-bank.svg';
import depositIcon from '@/images/icons/wallet-card.svg';
import processingLoader from '@/images/processing-transaction.gif';
import successfulLoader from '@/images/successful-transaction.gif';
import {
  CheckIconSVG,
  DebitCardSVG,
  PaymentWithBankSVG,
  WalletCardSVG,
} from '@/components/assets/svgs';
import {
  Button,
  FormInput,
  ResponsivePopup,
  ResponsivePopupCloseButton,
  ResponsivePopupContent,
} from '@/ui-lib';
import {drawer_styles, drawer_title_styles} from '@/components/navbar/Navbar';
import {formatToCurrency} from '@/utils';
import {useCustomToast} from '@/components/CustomToast';
import {PaymentAccess} from '@/components/payment/PaymentAccess';

const MakeDepositModal = ({depositModal, refetch, info}) => {
  const toast = useCustomToast();
  const [selectedMethod, setSelectedMethod] = useState(null);
  const [step, setStep] = useState('method');
  const [amount, setAmount] = useState('');
  const [amountError, setAmountError] = useState('');
  const amountToPay = amount?.replaceAll(',', '');

  const paymentDetails = {
    equity_id: info && info?.id,
    amount_to_pay: amountToPay,
    is_coown: false,
    pending: false,
  };

  const paymentType = 'deposit';

  const {
    handleBankTransfer,
    handlePayFromWallet,
    handlePaywithCard,
    isLoading,
    trasferDetails,
    paymentMutation,
    depositMutation,
    handleEndTransaction,
  } = useAssetPayment({paymentType, refetch, amountToPay, modal: depositModal, paymentDetails});

  const {hasCopied, onCopy} = useClipboard(trasferDetails?.account_number ?? '');

  const handleCopy = () => {
    onCopy();
    return toast({
      title: 'Account Number Copied!',
      status: 'info',
      duration: 1500,
      isClosable: true,
      position: 'top-right',
    });
  };
  const methods = [
    {
      id: '1',
      title: 'Debit Card',
      desc: 'NGN3,000,000 deposit limit',
      icon: <WalletCardSVG />,
      img: depositIcon.src,
    },
    {
      id: '2',
      title: 'Wallet',
      desc: 'Make payment from your wallet',
      icon: <DebitCardSVG />,
      img: wallet.src,
    },
    {
      id: '3',
      title: 'Bank Transfer',
      desc: 'Transfer into designated account',
      icon: <PaymentWithBankSVG />,
      img: bank.src,
    },
  ];

  const handleSelect = el => {
    setSelectedMethod(el);
    const method = el || selectedMethod;
    if (!amount) return setAmountError('Enter an amount to proceed');
    if (method?.id === '1') {
      setStep('card');
      setSelectedMethod(null);
    } else if (method?.id === '2') {
      setStep('wallet');
      setSelectedMethod(null);
    } else if (method?.id === '3') {
      handleBankTransfer();
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

  const success = paymentMutation.isSuccess || depositMutation.isSuccess;

  const mainContent = (
    <Box>
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

          <Stack p={{base: `24px 20px`}} gap={`16px`}>
            <Text
              color="text"
              fontSize={{base: '14px'}}
              fontWeight={{base: 500}}
              textTransform={`uppercase`}
              lineHeight={`120%`}
            >
              Select Payment Method
            </Text>
            <VStack spacing={{base: '14px', md: '16px'}} align={'stretch'}>
              {methods.map(method => (
                <PaymentAccess
                  key={method.id}
                  checkWallet={method?.title === `Wallet`}
                  content={
                    <Flex
                      justify="space-between"
                      onClick={() => handleSelect(method)}
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
                          selectedMethod?.id === method?.id
                            ? 'custom_color.color'
                            : 'matador_text.200',
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
                  }
                />
              ))}
            </VStack>
          </Stack>
        </>
      )}

      {step === 'card' && (
        <Box my="30px" p={{base: `24px 20px`}}>
          {success ? (
            <Center
              minH={`500px`}
              mt="20px"
              w="full"
              h="full"
              flexDirection={'column'}
              textAlign={'center'}
              gap={`20px`}
            >
              <Image alt="loader" w="150px" h="150px" src={successfulLoader.src} />
              <Text
                color="text"
                textAlign={'center'}
                fontWeight={{base: 600, md: 400}}
                className="heading-text-regular"
                fontSize={'28px'}
              >
                Transaction Successful
              </Text>
              <Text
                color="text"
                opacity={0.8}
                fontSize={{base: '14px', md: '16px'}}
                fontWeight="400"
              >
                Your payment has been successfully processed
              </Text>
              <Button
                variation={`primary`}
                onClick={depositModal.onClose}
                w="full"
                boxStyle={{width: '100%'}}
              >
                Done
              </Button>
            </Center>
          ) : isLoading ? (
            <Center
              minH={`500px`}
              mt="20px"
              w="full"
              h="full"
              flexDirection={'column'}
              textAlign={'center'}
            >
              <Image alt="loader" w="150px" h="150px" src={processingLoader.src} />
              <Text
                color="text"
                textAlign={'center'}
                fontWeight={{base: 600, md: 400}}
                className="heading-text-regular"
                fontSize={'28px'}
                my={{base: '12px', md: '25px'}}
              >
                Processing payment
              </Text>
              <Text
                color="text"
                opacity={0.8}
                fontSize={{base: '14px', md: '16px'}}
                fontWeight="400"
              >
                Wait a moment
              </Text>
            </Center>
          ) : (
            <Flex
              w="full"
              h="full"
              direction="column"
              justify={'center'}
              align={'center'}
              gap="20px"
            >
              <Text
                color="text"
                fontWeight={500}
                fontSize={{base: '18px', md: '28px'}}
                className="heading-text-semibold"
                lineHeight={{base: '24px', md: '36px'}}
              >
                Continue with card
              </Text>
              <Text
                color="text"
                textAlign={'center'}
                fontWeight={400}
                fontSize={{base: '13px', md: '16px'}}
                lineHeight={{base: '18px', md: '25px'}}
              >
                In order to finish the payment process, you will be charged through your
                debit/credit card.
              </Text>
              <Flex mt="27px" gap="26px" justify="space-between" align="center" w="full">
                <Button
                  border="1px solid"
                  color="text"
                  borderColor="matador_border_color.100"
                  bg="matador_background.100"
                  h="49px"
                  w={{base: '50%', md: '250px'}}
                  onClick={() => setStep('method')}
                >
                  Cancel
                </Button>
                <Button
                  onClick={handlePaywithCard}
                  color="custom_color.contrast"
                  w={{base: '50%', md: '250px'}}
                  bg="custom_color.color"
                  h="49px"
                >
                  Proceed
                </Button>
              </Flex>
            </Flex>
          )}
        </Box>
      )}

      {step === 'wallet' && (
        <Box my="30px" p={{base: `24px 20px`}}>
          {success ? (
            <Center
              minH={`500px`}
              mt="20px"
              w="full"
              h="full"
              flexDirection={'column'}
              textAlign={'center'}
              gap={`20px`}
            >
              <Image alt="loader" w="150px" h="150px" src={successfulLoader.src} />
              <Text
                color="text"
                textAlign={'center'}
                fontWeight={{base: 600, md: 400}}
                className="heading-text-regular"
                fontSize={'28px'}
              >
                Transaction Successful
              </Text>
              <Text
                color="text"
                opacity={0.8}
                fontSize={{base: '14px', md: '16px'}}
                fontWeight="400"
              >
                Your payment has been successfully processed
              </Text>
              <Button
                variation={`primary`}
                onClick={depositModal.onClose}
                w="full"
                boxStyle={{width: '100%'}}
              >
                Done
              </Button>
            </Center>
          ) : isLoading ? (
            <Center
              minH={`500px`}
              mt="20px"
              w="full"
              h="full"
              flexDirection={'column'}
              textAlign={'center'}
            >
              <Image alt="loader" w="150px" h="150px" src={processingLoader.src} />
              <Text
                color="text"
                textAlign={'center'}
                fontWeight={{base: 600, md: 400}}
                className="heading-text-regular"
                fontSize={'28px'}
                my={{base: '12px', md: '25px'}}
              >
                Processing payment
              </Text>
              <Text
                color="text"
                opacity={0.8}
                fontSize={{base: '14px', md: '16px'}}
                fontWeight="400"
              >
                Wait a moment
              </Text>
            </Center>
          ) : (
            <Flex
              w="full"
              h="full"
              direction="column"
              justify={'center'}
              align={'center'}
              gap="20px"
              minH={`500px`}
            >
              <Text
                color="text"
                fontWeight={500}
                fontSize={{base: '18px', md: '28px'}}
                className="heading-text-semibold"
                lineHeight={{base: '24px', md: '36px'}}
              >
                Continue with your wallet
              </Text>
              <Text
                color="text"
                textAlign={'center'}
                fontWeight={400}
                fontSize={{base: '13px', md: '16px'}}
                lineHeight={{base: '18px', md: '25px'}}
              >
                In order to finish the payment process, you will be charged through your wallet.
              </Text>
              <Flex mt="27px" gap="26px" justify="space-between" align="center" w="full">
                <Button
                  border="1px solid"
                  color="text"
                  borderColor="matador_border_color.100"
                  bg="matador_background.100"
                  h="49px"
                  w={{base: '50%', md: '250px'}}
                  onClick={() => setStep('method')}
                >
                  Cancel
                </Button>
                <Button
                  onClick={handlePayFromWallet}
                  color="custom_color.contrast"
                  w={{base: '50%', md: '250px'}}
                  bg="custom_color.color"
                  h="49px"
                >
                  Proceed
                </Button>
              </Flex>
            </Flex>
          )}
        </Box>
      )}

      {step === 'bank' && (
        <Box p={{base: `24px 20px`}}>
          {isLoading ? (
            <Center minH={`500px`} mt="20px" w="full" h="full" flexDirection={'column'}>
              <Image alt="loader" w="150px" h="150px" src={processingLoader.src} />
              <Text
                color="text"
                textAlign={'center'}
                fontWeight={{base: 600, md: 400}}
                className="heading-text-regular"
                fontSize={'28px'}
                my={{base: '12px', md: '25px'}}
              >
                Fetching bank details
              </Text>
              <Text
                color="text"
                opacity={0.8}
                fontSize={{base: '14px', md: '16px'}}
                fontWeight="400"
              >
                Wait a moment
              </Text>
            </Center>
          ) : (
            <Box w="full" color="text">
              <Flex mb="24px" direction="row" justify="space-between" align={'center'}>
                <Text
                  className="heading-text-regular"
                  fontSize={{base: '20px', md: '28px'}}
                  fontWeight={400}
                >
                  Bank Transfer
                </Text>
              </Flex>

              <Flex
                my="12px"
                h="130px"
                w="full"
                color="text"
                border="1px solid"
                borderColor={'matador_border_color.100 !important'}
                bg="matador_background.100"
                align={'center'}
                justify={'center'}
                direction="column"
              >
                <Text color="text" fontSize={{base: '14px', md: '18px'}} fontWeight={400}>
                  You will Pay
                </Text>
                <Text
                  color="matador_text.500"
                  fontSize={{base: '28px', md: '34px'}}
                  fontWeight={500}
                >
                  {calculateFee(amount)}
                </Text>
              </Flex>

              <Flex
                w="full"
                color="text"
                direction={'column'}
                my="22px"
                minH="260px"
                fontSize={'14px'}
                fontWeight={400}
                justify={'space-between'}
                align="stretch"
                gap="23px"
              >
                <Box>
                  <Text
                    color="text"
                    fontSize={{base: '12px', md: '13px'}}
                    fontWeight={500}
                    textAlign={'center'}
                    mb="12px"
                  >
                    {
                      'Kindly proceed with the payment to the provided account number , and please be aware that there is a fee associated with transfer.'
                    }
                  </Text>
                </Box>
                <Box>
                  <Flex
                    w="80%"
                    mx="auto"
                    bg="matador_background.100"
                    color={`text`}
                    border={`1px solid`}
                    borderColor={`matador_border_color.100`}
                    p="10px 35px"
                    justify={'space-between'}
                    align={'center'}
                  >
                    <Box w="25px" />
                    <Box textAlign={'center'}>
                      <Text fontSize={{base: '12px', md: '13px'}} fontWeight={500}>
                        {trasferDetails?.account_bank_name}
                      </Text>
                      <Text
                        fontSize={{base: '20px', md: '25px'}}
                        fontWeight={400}
                        className="heading-text-regular"
                      >
                        {trasferDetails?.account_number}
                      </Text>
                    </Box>
                    <CopyIcon
                      onClick={handleCopy}
                      fontSize={'25'}
                      color={hasCopied ? 'custom_color.color' : 'text'}
                      cursor="pointer"
                      h={8}
                      w={8}
                    />
                  </Flex>
                </Box>

                <Text
                  color="text"
                  fontSize={{base: '12px', md: '13px'}}
                  fontWeight={500}
                  textAlign={'center'}
                >
                  {trasferDetails?.account_name}
                </Text>
                <Flex gap="5px" w="full">
                  <Icon mt="2px" color="text" as={BsExclamationCircle} fontSize={'13px'} />
                  <Text
                    fontSize={{base: '12px', md: '11px'}}
                    fontWeight={400}
                    color="matador_text.500"
                  >
                    While most transfers are processed almost immediately, please note that it may
                    take longer in some cases. Be rest assured that we will notify you via email as
                    soon as the transfer is complete.
                  </Text>
                </Flex>
              </Flex>
              <Button
                variation={`primary`}
                onClick={depositModal.onClose}
                w="full"
                boxStyle={{width: '100%'}}
              >
                Done
              </Button>
            </Box>
          )}
        </Box>
      )}
    </Box>
  );

  return (
    <>
      <ResponsivePopup
        onCloseComplete={() => {
          setAmount('');
          handleEndTransaction();
          setStep('method');
          setSelectedMethod(null);
        }}
        isOpen={depositModal?.isOpen}
        onClose={depositModal?.onClose}
        autoFocus={false}
        placement="right"
        scrollBehavior="inside"
      >
        <ResponsivePopupContent {...drawer_styles}>
          {step === 'method' && (
            <Flex {...drawer_title_styles}>
              <Text>Make A Deposit</Text>
              <ResponsivePopupCloseButton />
            </Flex>
          )}
          {mainContent}
        </ResponsivePopupContent>
      </ResponsivePopup>
    </>
  );
};
export default MakeDepositModal;
