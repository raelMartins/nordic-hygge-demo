import React, {useEffect, useState} from 'react';
import {
  ModalContent,
  Image,
  Flex,
  Box,
  Text,
  Modal,
  ModalOverlay,
  VStack,
  Divider,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  HStack,
  Center,
  Button,
} from '@chakra-ui/react';
import wallet from '../../images/icons/wallet-card.svg';
import bank from '../../images/icons/asset-payment-with-bank.svg';
import paymentCard from '../../images/icons/debit-card.svg';
import {formatToCurrency} from '../../utils';
import BankAccountModal from './BankAccountModal';
import ConfirmWallet from './ConfirmWallet';
import {CloseIcon} from '@chakra-ui/icons';
import ConfirmCard from './ConfirmCard';
import {useAssetPayment} from '../../ui-lib/ui-lib.hooks';
import processingLoader from '../../images/processing-transaction.gif';
import successfulLoader from '../../images/successful-transaction.gif';
import check_web from '../../images/done_green_check.gif';
import isMobile from '../../utils/extras';
import {AssetPaymentWithBankSVG, DebitCardSVG, WalletCardSVG} from '../assets/svgs';
import {PaymentAccess} from './PaymentAccess';

export const PaymentModalContent = ({
  go_back = () => {},
  setStep,
  paymentType,
  amountToPay,
  modal,
  paymentDetails,
  onCloseModal,
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
    amountToPay,
    paymentType,
    paymentDetails,
    // fractionPayloadForBankTransfer,
    auth_code: selectedCard?.authorization_code,
  });

  const handlePaymentModalClose = () => {
    setStep && setStep('type');
    setPaymentStep('index');
    handleEndTransaction();
    setSelectedCard(null);
    go_back();
  };

  const innerContent = (
    <>
      {paymentMutation.isSuccess || depositMutation.isSuccess ? (
        <Center mt="20px" w="full" h="full" flexDirection={'column'} textAlign={'center'}>
          {/* <Image alt="loader" w="150px" h="150px" src={successfulLoader.src} /> */}
          <Image alt="loader" w="150px" h="150px" src={check_web.src} />
          <Text
            color="text"
            textAlign={'center'}
            fontWeight={{base: 600, md: 400}}
            className="heading-text-regular"
            fontSize={'28px'}
            my={{base: '12px', md: '25px'}}
          >
            Transaction Successful
          </Text>
          <Text color="text" opacity={0.8} fontSize={{base: '14px', md: '16px'}} fontWeight="400">
            Your payment has been successfully processed
          </Text>
          <Button
            borderRadius={'2px'}
            onClick={onCloseModal}
            color="custom_color.contrast"
            w={'full'}
            maxW={'100%'}
            bg="custom_color.color"
            h="49px"
            mt="40px"
            _hover={{opacity: `1`}}
            _active={{opacity: `1`}}
          >
            Finish
          </Button>
        </Center>
      ) : isLoading ? (
        <Center mt="20px" w="full" h="full" flexDirection={'column'} textAlign={'center'}>
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
          <Text color="text" opacity={0.8} fontSize={{base: '14px', md: '16px'}} fontWeight="400">
            Wait a moment
          </Text>
        </Center>
      ) : (
        <Box w="full">
          <Flex direction="row" justify="space-between" align={'center'} mb="10px">
            <Text
              color="text"
              fontSize={{base: '23px', md: '28px'}}
              fontWeight={400}
              className="heading-text-regular"
            >
              Payment Method
            </Text>
            <CloseIcon color="text" style={{cursor: 'pointer'}} size="20" onClick={go_back} />
          </Flex>
          <Flex
            h="135px"
            mt="12px"
            bg="matador_background.100"
            border="1px solid"
            borderColor={'matador_border_color.100'}
            direction="column"
            w="full"
            align={'center'}
            justify={'center'}
          >
            <Text color="text" fontWeight={400} fontSize={{base: '16px', md: '16px'}}>
              You will Pay
            </Text>
            <Text color="matador_text.500" fontWeight={600} fontSize={{base: '28px', md: '34px'}}>
              {formatToCurrency(amountToPay)}
            </Text>
          </Flex>

          <Text
            color="text"
            mt={{base: '24px', md: '24px'}}
            fontSize={{base: '14px', md: '16px'}}
            fontWeight={500}
            opacity={0.7}
          >
            Select payment method
          </Text>

          <VStack mt={{base: '10px', md: '14px'}} spacing={'16px'}>
            <PaymentAccess
              checkWallet
              content={
                <Flex
                  bg="matador_background.100"
                  border="1px solid"
                  borderColor={'matador_border_color.100'}
                  p="16px"
                  cursor={'pointer'}
                  onClick={handlePayFromWallet}
                  w="full"
                  pt="15px"
                  pb="21px"
                  gap="17px"
                >
                  {/* <Image mt="5px" alt="next_image" h="30px" w="30px" src={wallet.src} /> */}
                  <WalletCardSVG mt="5px" />
                  <Flex direction={'column'} gap="6px">
                    <HStack spacing="10px">
                      <Text fontWeight={500} fontSize={'16px'} color="matador_text.100">
                        Wallet
                      </Text>
                    </HStack>
                    <Text fontWeight={500} color="matador_form.label" fontSize={'13px'}>
                      Make payment from your wallet
                    </Text>
                  </Flex>
                </Flex>
              }
            />

            {!isAboveLimit && (
              <Flex
                bg="matador_background.100"
                border="1px solid"
                borderColor={'matador_border_color.100'}
                p="16px"
                cursor={isAboveLimit ? 'not-allowed' : 'pointer'}
                onClick={() => setPaymentStep('confirmCard')}
                w="full"
                pt="15px"
                pb="21px"
                gap="17px"
              >
                <DebitCardSVG mt={`5px`} />

                <Flex direction={'column'} gap="6px">
                  <HStack spacing="10px">
                    <Text fontWeight={500} fontSize={'16px'} color="matador_text.100">
                      Debit/Credit Card
                    </Text>
                  </HStack>

                  <Text fontWeight={500} color="matador_form.label" fontSize={'13px'}>
                    Use a debit card to complete your payment
                  </Text>
                </Flex>
              </Flex>
            )}

            <Flex
              bg="matador_background.100"
              border="1px solid"
              borderColor={'matador_border_color.100'}
              p="16px"
              cursor={'pointer'}
              onClick={handleBankTransfer}
              w="full"
              pt="15px"
              pb="21px"
              gap="17px"
            >
              {/* <Image mt="5px" alt="next_image" h="30px" w="30px" src={bank.src} /> */}
              <AssetPaymentWithBankSVG />

              <Flex direction={'column'} gap="6px">
                <HStack spacing="10px">
                  <Text fontWeight={500} fontSize={'16px'} color="matador_text.100">
                    Bank Transfer
                  </Text>
                </HStack>
                <Text fontWeight={500} color="matador_form.label" fontSize={'13px'}>
                  Transfer payment to a designated account
                </Text>
              </Flex>
            </Flex>
          </VStack>
        </Box>
      )}
    </>
  );

  return (
    <>
      {paymentStep === 'index' ? (
        <>
          {isMobile ? (
            <DrawerContent
              bg="card_bg"
              color={`text`}
              maxW="560px"
              px={{base: '20px', md: '35px'}}
              minH="401px"
              pt={{base: '18px', md: '30px'}}
              pb={{base: '20px', md: '53px'}}
              // borderTopRadius={{base: '10px', md: '16px'}}
            >
              {innerContent}
            </DrawerContent>
          ) : (
            <ModalContent
              bg="card_bg"
              color={`text`}
              maxW="500px"
              px={{base: '20px', md: '35px'}}
              minH="401px"
              mt="10vh"
              pt={{base: '18px', md: '30px'}}
              pb={{base: '20px', md: '53px'}}
              borderRadius={{base: '10px', md: '5px'}}
            >
              {innerContent}
            </ModalContent>
          )}
        </>
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
};

const PaymentModal = ({
  setStep,
  paymentType,
  amountToPay,
  modal,
  paymentDetails,
  onCloseModal,
  isFractional,
}) => {
  console.log('amountToPay', amountToPay);
  const [selectedCard, setSelectedCard] = useState(null);

  const [screenWidth, setScreenWidth] = useState(0);

  useEffect(() => {
    setScreenWidth(window.innerWidth);

    window.addEventListener('resize', () => {
      setScreenWidth(window.innerWidth);
    });
  }, []);

  // const fractionPayloadForBankTransfer = isFractional
  //   ? {
  //       payment_option: 'bank_transfer',
  //     }
  //   : null;

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
    // fractionPayloadForBankTransfer,
    auth_code: selectedCard?.authorization_code,
  });

  const handlePaymentModalClose = () => {
    setStep && setStep('type');
    setPaymentStep('index');
    handleEndTransaction();
    setSelectedCard(null);
    onCloseModal();
  };

  const innerContent = (
    <>
      {paymentMutation.isSuccess || depositMutation.isSuccess ? (
        <Center mt="20px" w="full" h="full" flexDirection={'column'} textAlign={'center'}>
          {/* <Image alt="loader" w="150px" h="150px" src={successfulLoader.src} /> */}
          <Image alt="loader" w="150px" h="150px" src={check_web.src} />
          <Text
            color="text"
            textAlign={'center'}
            fontWeight={{base: 600, md: 400}}
            className="heading-text-regular"
            fontSize={'28px'}
            my={{base: '12px', md: '25px'}}
          >
            Transaction Successful
          </Text>
          <Text color="text" opacity={0.8} fontSize={{base: '14px', md: '16px'}} fontWeight="400">
            Your payment has been successfully processed
          </Text>
          <Button
            borderRadius={'2px'}
            onClick={onCloseModal}
            color="custom_color.contrast"
            w={'full'}
            maxW={'100%'}
            bg="custom_color.color"
            h="49px"
            mt="40px"
            _hover={{opacity: `1`}}
            _active={{opacity: `1`}}
          >
            Finish
          </Button>
        </Center>
      ) : isLoading ? (
        <Center mt="20px" w="full" h="full" flexDirection={'column'} textAlign={'center'}>
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
          <Text color="text" opacity={0.8} fontSize={{base: '14px', md: '16px'}} fontWeight="400">
            Wait a moment
          </Text>
        </Center>
      ) : (
        <Box w="full">
          <Flex direction="row" justify="space-between" align={'center'} mb="10px">
            <Text
              color="text"
              fontSize={{base: '23px', md: '28px'}}
              fontWeight={400}
              className="heading-text-regular"
            >
              Payment Method
            </Text>
            <CloseIcon
              color="text"
              style={{cursor: 'pointer'}}
              size="20"
              onClick={modal?.onClose}
            />
          </Flex>
          <Flex
            h="135px"
            mt="12px"
            bg="matador_background.100"
            border="1px solid"
            borderColor={'matador_border_color.100'}
            direction="column"
            w="full"
            align={'center'}
            justify={'center'}
          >
            <Text color="text" fontWeight={400} fontSize={{base: '16px', md: '16px'}}>
              You will Pay
            </Text>
            <Text color="matador_text.500" fontWeight={600} fontSize={{base: '28px', md: '34px'}}>
              {formatToCurrency(amountToPay)}
            </Text>
          </Flex>

          <Text
            color="text"
            mt={{base: '24px', md: '24px'}}
            fontSize={{base: '14px', md: '16px'}}
            fontWeight={500}
            opacity={0.7}
          >
            Select payment method
          </Text>

          <VStack mt={{base: '10px', md: '14px'}} spacing={'16px'}>
            <PaymentAccess
              checkWallet
              content={
                <Flex
                  bg="matador_background.100"
                  border="1px solid"
                  borderColor={'matador_border_color.100'}
                  p="16px"
                  cursor={'pointer'}
                  onClick={handlePayFromWallet}
                  w="full"
                  pt="15px"
                  pb="21px"
                  gap="17px"
                >
                  <WalletCardSVG mt="5px" />
                  <Flex direction={'column'} gap="6px">
                    <HStack spacing="10px">
                      <Text fontWeight={500} fontSize={'16px'} color="matador_text.100">
                        Wallet
                      </Text>
                    </HStack>
                    <Text fontWeight={500} color="matador_form.label" fontSize={'13px'}>
                      Make payment from your wallet
                    </Text>
                  </Flex>
                </Flex>
              }
            />

            {!isAboveLimit && (
              <Flex
                bg="matador_background.100"
                border="1px solid"
                borderColor={'matador_border_color.100'}
                p="16px"
                cursor={isAboveLimit ? 'not-allowed' : 'pointer'}
                onClick={() => setPaymentStep('confirmCard')}
                w="full"
                pt="15px"
                pb="21px"
                gap="17px"
              >
                <DebitCardSVG mt={`5px`} />

                <Flex direction={'column'} gap="6px">
                  <HStack spacing="10px">
                    <Text fontWeight={500} fontSize={'16px'} color="matador_text.100">
                      Debit/Credit Card
                    </Text>
                  </HStack>

                  <Text fontWeight={500} color="matador_form.label" fontSize={'13px'}>
                    Use a debit card to complete your payment
                  </Text>
                </Flex>
              </Flex>
            )}

            <Flex
              bg="matador_background.100"
              border="1px solid"
              borderColor={'matador_border_color.100'}
              p="16px"
              cursor={'pointer'}
              onClick={handleBankTransfer}
              w="full"
              pt="15px"
              pb="21px"
              gap="17px"
            >
              {/* <Image mt="5px" alt="next_image" h="30px" w="30px" src={bank.src} /> */}
              <AssetPaymentWithBankSVG />

              <Flex direction={'column'} gap="6px">
                <HStack spacing="10px">
                  <Text fontWeight={500} fontSize={'16px'} color="matador_text.100">
                    Bank Transfer
                  </Text>
                </HStack>
                <Text fontWeight={500} color="matador_form.label" fontSize={'13px'}>
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
        <>
          {isMobile ? (
            <DrawerContent
              bg="card_bg"
              color={`text`}
              maxW="560px"
              px={{base: '20px', md: '35px'}}
              minH="401px"
              pt={{base: '18px', md: '30px'}}
              pb={{base: '20px', md: '53px'}}
              // borderTopRadius={{base: '10px', md: '16px'}}
            >
              {innerContent}
            </DrawerContent>
          ) : (
            <ModalContent
              bg="card_bg"
              color={`text`}
              maxW="500px"
              px={{base: '20px', md: '35px'}}
              minH="401px"
              mt="10vh"
              pt={{base: '18px', md: '30px'}}
              pb={{base: '20px', md: '53px'}}
              borderRadius={{base: '10px', md: '5px'}}
            >
              {innerContent}
            </ModalContent>
          )}
        </>
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

  return (
    <>
      {screenWidth < 768 ? (
        <Drawer
          onCloseComplete={handlePaymentModalClose}
          isCentered
          onClose={modal?.onClose}
          isOpen={modal?.isOpen}
          placement="bottom"
          borderRadius={{base: '10px', md: '16px'}}
        >
          <DrawerOverlay />
          {mainContent}
        </Drawer>
      ) : (
        <Modal
          autoFocus={false}
          onCloseComplete={handlePaymentModalClose}
          isCentered
          onClose={modal?.onClose}
          isOpen={modal?.isOpen}
          borderRadius={{base: '10px', md: '16px'}}
        >
          <ModalOverlay />
          {mainContent}
        </Modal>
      )}
    </>
  );
};

export default PaymentModal;
