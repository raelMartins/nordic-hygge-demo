import React from 'react';
import {Flex, Center, Box, Image, Text, useClipboard, useToast, Icon} from '@chakra-ui/react';
import {CopyIcon} from '@chakra-ui/icons';
import processingLoader from '../../../images/processing-transaction.gif';
import {BsExclamationCircle} from 'react-icons/bs';
import {calculateFee} from '../../../utils/calculateFee';
import {handleTransferNote} from '../../../utils/transferNote';
import {FallBackBankTransfer} from '@/components/properties/payment/FallBackBankTransfer';
import {useCustomToast} from '@/components/CustomToast';

export const BankAccountModal = ({handleEndTransaction, loading, amount, trasferDetails}) => {
  const toast = useCustomToast();
  const {hasCopied, onCopy} = useClipboard(trasferDetails?.account_number);

  const showToast = () => {
    // toast({
    //   title: 'Account Number Copied! 👍🏻',
    //   status: 'info',
    //   duration: 1500,
    //   isClosable: true,
    //   position: 'top-right',
    // });
    return <CopyIcon fontSize={'25'} color="custom_color.color" cursor="pointer" h={8} w={8} />;
  };

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
        <Center mt="20px" w="full" h="full" maxH="450px" flexDirection={'column'}>
          <Image alt="loader" w="50%" h="50%" src={processingLoader.src} />
          <Text
            color="text"
            fontWeight={500}
            fontSize={'28px'}
            my="25px"
            className="heading-text-regular"
          >
            Fetching bank details
          </Text>
          <Text color="text" fontSize={'16px'} fontWeight="400">
            Wait a moment
          </Text>
        </Center>
      ) : trasferDetails.length ? (
        <FallBackBankTransfer accounts={trasferDetails} amount={amount} />
      ) : (
        <Box color="text" h={'fit-content'} overflowY="auto">
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
            <Text color="matador_text.500" fontWeight={600} fontSize={{base: '28px', md: '34px'}}>
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
                  <Text fontSize="14px" fontWeight={600}>
                    {trasferDetails?.account_bank_name}
                  </Text>
                  <Text fontSize="25px" fontWeight={400} className="heading-text-regular">
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
                    color={hasCopied ? 'custom_color.color' : 'text'}
                    cursor="pointer"
                    h={8}
                    w={8}
                  />
                }
              </Flex>
            </Box>
            <Text
              color="text"
              fontSize={{base: '12px', md: '13px'}}
              fontWeight={500}
              textAlign={'center'}
            >
              {/* {handleTransferNote(trasferDetails?.data?.note)} */}
              {trasferDetails?.account_name}
            </Text>
            <Flex gap="5px" w="full">
              <Icon mt="2px" color="text" as={BsExclamationCircle} fontSize={'13px'} />
              <Text fontSize={{base: '12px', md: '11px'}} fontWeight={400} color="matador_text.500">
                While most transfers are processed almost immediately, please note that it may take
                longer in some cases. Be rest assured that we will notify you via email as soon as
                the transfer is complete.
              </Text>
            </Flex>
          </Flex>
        </Box>
      )}
    </>
  );
};
export default BankAccountModal;
