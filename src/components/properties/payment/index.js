import React, {useEffect, useState} from 'react';
import {Image as ChakraImage, Flex, Box, Text, VStack, HStack, Center} from '@chakra-ui/react';
import BankAccountModal from './BankAccountModal';
import ConfirmWallet from './ConfirmWallet';
import {ArrowBackIcon} from '@chakra-ui/icons';
import ConfirmCard from './ConfirmCard';
import {useAssetPayment} from '@/ui-lib/ui-lib.hooks';
import processingLoader from '@/images/processing-transaction.gif';
import {AssetPaymentWithBankSVG, DebitCardSVG, WalletCardSVG} from '@/components/assets/svgs';
import {PaymentAccess} from '@/components/payment/PaymentAccess';

export const PaymentFlow = ({
  paymentType,
  amountToPay,
  modal,
  paymentDetails,
  change_screen,
  unitData,
  go_back,
}) => {
  const [selectedCard, setSelectedCard] = useState(null);

  const {
    handleBankTransfer,
    handlePayFromWallet,
    handlePaywithCard,
    authUrl,
    isLoading,
    paymentStep,
    setPaymentStep,
    trasferDetails,
    isAboveLimit,
    paymentMutation,
    depositMutation,
    handleEndTransaction,
  } = useAssetPayment({
    modal,
    amountToPay,
    paymentType,
    paymentDetails,
    auth_code: selectedCard?.authorization_code,
    asset_id: unitData?.project?.id,
  });

  const innerContent = (
    <>
      {isLoading ? (
        <Center mt="20px" w="full" h="full" flexDirection={'column'} textAlign={'center'}>
          <ChakraImage alt="loader" w="150px" h="150px" src={processingLoader.src} />
          <Text
            textAlign={'center'}
            fontWeight={{base: 600, md: 400}}
            className="heading-text-regular"
            fontSize={'28px'}
            my={{base: '12px', md: '25px'}}
          >
            Processing payment
          </Text>
          <Text opacity={0.8} fontSize={{base: '14px', md: '16px'}} fontWeight="400">
            Wait a moment
          </Text>
        </Center>
      ) : (
        <Box w="full">
          <Flex direction="row" justify="space-between" gap={`12px`} align={'center'} mb="10px">
            <HStack gap={`12px`}>
              <ArrowBackIcon onClick={go_back} fontSize={`20px`} cursor={`pointer`} />
              <Text
                fontSize={{base: '23px', md: '28px'}}
                fontWeight={400}
                className="heading-text-regular"
              >
                Payment Method
              </Text>
            </HStack>
          </Flex>

          <Text
            mt={{base: '24px'}}
            fontSize={{base: '14px', md: '16px'}}
            fontWeight={700}
            lineHeight={`140%`}
          >
            Select a Payment Method
          </Text>

          <VStack mt={{base: '10px', md: '14px'}} spacing={'16px'}>
            <PaymentAccess
              checkWallet
              content={
                <Flex
                  border="1px solid"
                  borderColor={'#24242B'}
                  borderRadius={`5px`}
                  p="16px"
                  cursor={'pointer'}
                  onClick={handlePayFromWallet}
                  w="full"
                  pt="15px"
                  pb="21px"
                  gap="17px"
                >
                  <WalletCardSVG mt="5px" darkBG />
                  <Flex direction={'column'} gap="6px">
                    <HStack spacing="10px" flexWrap={`wrap`}>
                      <Text fontWeight={`700`}>Wallet</Text>
                    </HStack>
                    <Text
                      fontWeight={500}
                      fontSize={'13px'}
                      lineHeight={`150%`}
                      letterSpacing={`.26px`}
                    >
                      Make payment from your wallet
                    </Text>
                  </Flex>
                </Flex>
              }
            />

            {!isAboveLimit && (
              <Flex
                border="1px solid"
                borderColor={'#24242B'}
                borderRadius={`5px`}
                p="16px"
                cursor={isAboveLimit ? 'not-allowed' : 'pointer'}
                onClick={() => setPaymentStep('confirmCard')}
                w="full"
                pt="15px"
                pb="21px"
                gap="17px"
              >
                <DebitCardSVG mt={`5px`} darkBG />

                <Flex direction={'column'} gap="6px">
                  <HStack spacing="10px" flexWrap={`wrap`}>
                    <Text fontWeight={`700`}>Debit/Credit Card</Text>
                  </HStack>

                  <Text
                    fontWeight={500}
                    fontSize={'13px'}
                    lineHeight={`150%`}
                    letterSpacing={`.26px`}
                  >
                    Use a debit card to complete your payment
                  </Text>
                </Flex>
              </Flex>
            )}

            <Flex
              border="1px solid"
              borderColor={'#24242B'}
              borderRadius={`5px`}
              p="16px"
              cursor={'pointer'}
              onClick={handleBankTransfer}
              w="full"
              pt="15px"
              pb="21px"
              gap="17px"
            >
              {/* <ChakraImage mt="5px" alt="next_image" h="30px" w="30px" src={bank.src} /> */}
              <AssetPaymentWithBankSVG darkBG />

              <Flex direction={'column'} gap="6px">
                <HStack spacing="10px" flexWrap={`wrap`}>
                  <Text fontWeight={`700`}>Bank Transfer</Text>
                </HStack>
                <Text
                  fontWeight={500}
                  fontSize={'13px'}
                  lineHeight={`150%`}
                  letterSpacing={`.26px`}
                >
                  Transfer payment to a designated account
                </Text>
              </Flex>
            </Flex>
          </VStack>
        </Box>
      )}
    </>
  );

  const mainContent = (
    <>
      {paymentStep === 'index' ? (
        innerContent
      ) : paymentStep === 'bankDetails' ? (
        <BankAccountModal
          handleEndTransaction={handleEndTransaction}
          authUrl={authUrl}
          amount={amountToPay}
          paymentType={paymentType}
          loading={isLoading}
          success={paymentMutation.isSuccess || depositMutation.isSuccess}
          trasferDetails={trasferDetails}
          setPaymentStep={setPaymentStep}
          modal={modal}
          change_screen={change_screen}
        />
      ) : paymentStep === 'confirmWallet' ? (
        <ConfirmWallet
          amountToPay={amountToPay}
          loading={isLoading}
          success={paymentMutation.isSuccess || depositMutation.isSuccess}
          proceed={handlePayFromWallet}
          setPaymentStep={setPaymentStep}
        />
      ) : paymentStep === 'confirmCard' ? (
        <ConfirmCard
          selectedCard={selectedCard}
          setSelectedCard={setSelectedCard}
          amountToPay={amountToPay}
          loading={isLoading}
          success={paymentMutation.isSuccess || depositMutation.isSuccess}
          proceed={handlePaywithCard}
          setPaymentStep={setPaymentStep}
        />
      ) : null}
    </>
  );

  return mainContent;
};
