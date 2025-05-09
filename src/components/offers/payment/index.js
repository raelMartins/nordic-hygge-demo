import React, {useState} from 'react';
import {Image, Flex, Box, Text, VStack, Divider, Center} from '@chakra-ui/react';
import {formatToCurrency} from '/src/utils';
import BankAccountModal from './BankAccountModal';
import {ChevronRightIcon} from '@chakra-ui/icons';
import ConfirmCard from './ConfirmCard';
import {useAssetPayment} from '/src/ui-lib/ui-lib.hooks';
import processingLoader from './../../../images/processing-transaction.gif';
import successfulLoader from './../../../images/successful-transaction.gif';
import {AssetPaymentWithBankSVG, DebitCardSVG, WalletCardSVG} from '../../assets/svgs';
import {PaymentAccess} from '@/components/payment/PaymentAccess';

const PaymentDrawer = ({
  asset,
  drawer,
  customScrollbarStyles,
  setStep,
  amount,
  refetch = () => {},
}) => {
  const paymentType = 'deposit';
  const [selectedCard, setSelectedCard] = useState(null);

  const paymentDetails = {
    amount_to_pay: Number(amount),
    equity_id: asset?.id,
    is_coown: false,
    pending: true,
  };

  const {
    handleBankTransfer,
    handlePayFromWallet,
    handlePaywithCard,
    authUrl,
    setAuthUrl,
    isLoading,
    setLoading,
    paymentStep,
    setPaymentStep,
    trasferDetails,
    setTransferDetails,
    formattedAmount,
    isAboveLimit,
    paymentMutation,
    depositMutation,
    handleEndTransaction,
  } = useAssetPayment({
    paymentType,
    amountToPay: amount,
    modal: drawer,
    paymentDetails,
    auth_code: selectedCard?.authorization_code,
    asset_id: asset?.project?.id,
  });

  return (
    <>
      {paymentStep === 'index' ? (
        <>
          {paymentMutation.isSuccess || depositMutation.isSuccess ? (
            <Center
              mt="20px"
              w="full"
              h="full"
              maxH={'450px'}
              flexDirection={'column'}
              textAlign={'center'}
            >
              <Image alt="loader" w="150px" h="150px" src={successfulLoader.src} />
              <Text
                textAlign={'center'}
                color="text"
                fontWeight={500}
                fontSize={'28px'}
                my="25px"
                className="heading-text-regular"
              >
                Transaction Successful
              </Text>
              <Text textAlign={'center'} color="text" fontSize={'16px'} fontWeight="400">
                Your payment has been successfully processed
              </Text>
            </Center>
          ) : isLoading ? (
            <Center
              mt="20px"
              w="full"
              h="full"
              maxH={'450px'}
              flexDirection={'column'}
              textAlign={'center'}
            >
              <Image alt="loader" w="150px" h="150px" src={processingLoader.src} />
              <Text
                textAlign={'center'}
                color="text"
                fontWeight={500}
                fontSize={'28px'}
                my="25px"
                className="heading-text-regular"
              >
                Processing payment
              </Text>
              <Text textAlign={'center'} color="text" fontSize={'16px'} fontWeight="400">
                Wait a moment
              </Text>
            </Center>
          ) : (
            <Box h={'fit-content'} overflowY="auto" __css={customScrollbarStyles}>
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
                <Text color="text" fontWeight={400} fontSize={{base: '16px', md: '16px'}}>
                  You will Pay
                </Text>
                <Text
                  color="matador_text.500"
                  fontWeight={600}
                  fontSize={{base: '28px', md: '34px'}}
                >
                  {formatToCurrency(formattedAmount)}
                </Text>
              </Flex>

              <Text color="text" mt="30px" fontSize={'16px'}>
                Select payment method
              </Text>

              <VStack
                border="1px solid"
                borderColor={'matador_border_color.100 !important'}
                borderRadius={'4px'}
                spacing="16px"
                mt="17px"
                direction={'column'}
                divider={<Divider w="full" borderColor={'matador_border_color.100 !important'} />}
                align={'stretch'}
                py="17px"
                px="17px"
              >
                {!isAboveLimit && (
                  <Flex
                    cursor={isAboveLimit ? 'not-allowed' : 'pointer'}
                    onClick={() => setPaymentStep('confirmCard')}
                    justify={'space-between'}
                    align={'center'}
                    w="full"
                  >
                    <Flex py="5px" gap="17px" align="center">
                      <DebitCardSVG />
                      <Flex direction={'column'}>
                        <Text color="text" fontWeight={500} fontSize={'16px'}>
                          Debit Card
                        </Text>
                        <Text color="text" fontWeight={400} fontSize={'10px'}>
                          Use a debit card to complete your payment
                        </Text>
                      </Flex>
                    </Flex>
                    <ChevronRightIcon fontSize={'20px'} />
                  </Flex>
                )}

                <PaymentAccess
                  checkWallet
                  content={
                    <Flex
                      cursor={'pointer'}
                      onClick={handlePayFromWallet}
                      justify={'space-between'}
                      align={'center'}
                      w="full"
                    >
                      <Flex py="5px" gap="17px" align="center">
                        <WalletCardSVG />
                        <Flex direction={'column'}>
                          <Text color="text" fontWeight={500} fontSize={'16px'}>
                            Wallet
                          </Text>
                          <Text color="text" fontWeight={400} fontSize={'10px'}>
                            Make payment from your wallet
                          </Text>
                        </Flex>
                      </Flex>
                      <ChevronRightIcon fontSize={'20px'} />
                    </Flex>
                  }
                />

                <Flex
                  cursor={'pointer'}
                  onClick={handleBankTransfer}
                  justify={'space-between'}
                  align={'center'}
                  w="full"
                >
                  <Flex py="5px" gap="17px" align="center">
                    <AssetPaymentWithBankSVG />
                    <Flex direction={'column'}>
                      <Text color="text" fontWeight={500} fontSize={'16px'}>
                        Bank Transfer
                      </Text>
                      <Text color="text" fontWeight={400} fontSize={'10px'}>
                        Transfer payment to a designated account
                      </Text>
                    </Flex>
                  </Flex>
                  <ChevronRightIcon fontSize={'20px'} />
                </Flex>
              </VStack>
            </Box>
          )}
        </>
      ) : paymentStep === 'bankDetails' ? (
        <BankAccountModal
          handleEndTransaction={handleEndTransaction}
          authUrl={authUrl}
          amount={formattedAmount}
          paymentType={paymentType}
          loading={isLoading}
          success={paymentMutation.isSuccess || depositMutation.isSuccess}
          trasferDetails={trasferDetails}
          setPaymentStep={setPaymentStep}
          modal={drawer}
        />
      ) : paymentStep === 'confirmCard' ? (
        <ConfirmCard
          amountToPay={amount}
          loading={isLoading}
          selectedCard={selectedCard}
          proceed={handlePaywithCard}
          setPaymentStep={setPaymentStep}
          setSelectedCard={setSelectedCard}
          success={paymentMutation.isSuccess || depositMutation.isSuccess}
        />
      ) : null}
    </>
  );
};

export default PaymentDrawer;
