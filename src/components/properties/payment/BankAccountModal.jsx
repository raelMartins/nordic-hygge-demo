import React from 'react';
import {
  Flex,
  Center,
  Box,
  ModalContent,
  Image,
  Text,
  useClipboard,
  useToast,
  DrawerContent,
  HStack,
  Icon,
} from '@chakra-ui/react';
import {ArrowBackIcon, CloseIcon, CopyIcon} from '@chakra-ui/icons';
import processingLoader from '@/images/processing-transaction.gif';
import {calculateFee} from '@/utils/calculateFee';
import {Button} from '@/ui-lib';
import {BsExclamationCircle} from 'react-icons/bs';
import {FallBackBankTransfer} from './FallBackBankTransfer';
import {useCustomToast} from '@/components/CustomToast';

export const BankAccountModal = ({
  handleEndTransaction,
  loading,
  amount,
  setPaymentStep,
  trasferDetails,
  modal,
  change_screen,
}) => {
  const toast = useCustomToast();
  const {hasCopied, onCopy} = useClipboard(trasferDetails?.account_number);

  const copy = () => {
    onCopy();
    toast({
      title: 'Account Number Copied! 👍🏻',
      status: 'info',
      duration: 1500,
      isClosable: true,
      position: 'top-right',
    });
  };

  return (
    <>
      {loading ? (
        <Center mt="20px" w="full" h="full" flexDirection={'column'}>
          <Image alt="loader" w="150px" h="150px" src={processingLoader.src} />
          <Text
            textAlign={'center'}
            fontWeight={{base: 600, md: 400}}
            className="heading-text-regular"
            fontSize={'28px'}
            my={{base: '12px', md: '25px'}}
          >
            Fetching bank details
          </Text>
          <Text opacity={0.8} fontSize={{base: '14px', md: '16px'}} fontWeight="400">
            Wait a moment
          </Text>
        </Center>
      ) : (
        <Box w="full">
          <Flex mb="24px" justify={'space-between'} align={'center'}>
            <HStack
              spacing="12px"
              onClick={() => {
                setPaymentStep('index');
                handleEndTransaction();
              }}
              cursor="pointer"
            >
              <ArrowBackIcon fontSize={'25px'} cursor="pointer" />
              <Text
                fontSize={{base: '23px', md: '28px'}}
                fontWeight={400}
                className="heading-text-regular"
              >
                Bank Transfer
              </Text>
            </HStack>
          </Flex>

          {trasferDetails?.length ? (
            <FallBackBankTransfer accounts={trasferDetails} for_listing amount={amount} />
          ) : (
            <>
              <Flex
                w="full"
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
                    fontSize={{base: '12px', md: '13px'}}
                    fontWeight={500}
                    textAlign={'center'}
                    mb="12px"
                  >
                    {`Kindly proceed with the payment of ${calculateFee(
                      amount
                    )} to the provided account number , and please be aware that there is a fee associated with transfer.`}
                  </Text>
                </Box>
                <Flex
                  w="75%"
                  mx="auto"
                  bg="#1C1C2A"
                  p="12px 16px"
                  justify={'space-between'}
                  align={'center'}
                  borderRadius={`11px`}
                >
                  <Box w="25px" />
                  <Box textAlign={'center'}>
                    <Text fontSize={{base: '13px'}} fontWeight={600}>
                      {trasferDetails?.account_bank_name}
                    </Text>
                    <Text
                      fontSize={{base: '20px', md: '28px'}}
                      fontWeight={700}
                      className="heading-text-regular"
                      lineHeight={`120%`}
                    >
                      {trasferDetails?.account_number}
                    </Text>
                  </Box>
                  {
                    // hasCopied ? (
                    //   showToast(true)
                    // ) :
                    <CopyIcon
                      onClick={copy}
                      fontSize={'25'}
                      color={hasCopied ? 'custom_color.dark_background_pop' : 'inherit'}
                      cursor="pointer"
                      h={8}
                      w={8}
                    />
                  }
                </Flex>
                {trasferDetails?.account_name && (
                  <Text
                    color={`custom_color.dark_background_pop`}
                    fontSize={`13px`}
                    fontWeight={`600`}
                    textAlign={`center`}
                    lineHeight={`140%`}
                    maxW={`360px`}
                    mx={`auto`}
                  >
                    Account name: {trasferDetails?.account_name}
                  </Text>
                )}
                <Flex gap="5px" w="full">
                  <Icon mt="2px" as={BsExclamationCircle} fontSize={'13px'} />
                  <Text fontSize={{base: '12px', md: '11px'}} fontWeight={400}>
                    While most transfers are processed almost immediately, please note that it may
                    take longer in some cases. Be rest assured that we will notify you via email as
                    soon as the transfer is complete.
                  </Text>
                </Flex>
              </Flex>
              <Button
                variation={`secondary`}
                boxStyle={{width: `100%`}}
                borderRadius={{base: `5px`}}
                color={`custom_color.dark_background_pop`}
                onClick={() => {
                  // change_screen('options');
                  setPaymentStep('index');
                }}
              >
                Done
              </Button>
            </>
          )}
        </Box>
      )}
    </>
  );
};
export default BankAccountModal;
