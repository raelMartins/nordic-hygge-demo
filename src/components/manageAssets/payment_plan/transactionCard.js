import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  useDisclosure,
} from '@chakra-ui/react';
import React from 'react';
import {Popup} from 'ui-lib';
import {changeDateFormat} from 'utils/formatDate';
import {HStack, Heading, Image, Text, VStack} from '@chakra-ui/react';
import transactionView from '/src/images/icons/transactionView.svg';
import {formatToCurrency} from 'utils';

const TransactionCard = ({info}) => {
  const modalDisclosure = useDisclosure();

  const handlePaymentType = {
    recurring: {
      text: 'Recurring',
    },
    shared_equity_plan_initial: {
      text: 'Initial deposit',
    },
    equity_plan_deposit: {
      text: 'Top up',
    },
    shared_equity_outright: {
      text: 'Full payment',
    },
  };

  return (
    <>
      <Button
        _hover={{
          opacity: '1',
        }}
        onClick={modalDisclosure.onOpen}
        bg="transparent"
        border="1px solid matador_text.100 !important"
        color="matador_text.100"
        fontSize="16px"
        fontWeight="500"
        h="40px"
        w="112px"
        borderRadius="12px"
      >
        View
      </Button>
      <Modal isOpen={modalDisclosure.isOpen} onClose={modalDisclosure.onClose}>
        <ModalOverlay bg="rgba(0,0,0,0.5)" />

        <ModalContent mt="15vh" maxW="400px" minH="590px" borderRadius="16px" bg="#0D0D0D" p="30px">
          <HStack w="full" mb="18px" justify="space-between">
            <Heading w="full" textAlign="start" fontSize="28px" fontWeight="600" color="#fff">
              Transaction
            </Heading>
            <ModalCloseButton position="initial" color="#fff" />
          </HStack>
          <ModalBody
            my="0px"
            display="flex"
            alignItems="center"
            flexDirection="column"
            rowGap="30px"
            p="0px"
          >
            <Image src={transactionView.src} alt="transaction icon" boxSize="150px" />
            <VStack spacing="34px" align="center" w="full">
              <VStack spacing="5px" w="full">
                <Text fontSize="24px" fontWeight="600" color="#fff">
                  {info?.equity?.project?.name ?? 'Land Mark'}
                </Text>
                <Text fontSize="14px" fontWeight="300" color="#CBCBCB">
                  {changeDateFormat(info?.created_at, 'add_time')}
                </Text>
              </VStack>
              <VStack spacing="5px" w="full">
                <Text fontSize="12px" fontWeight="400" color="#fff">
                  Transaction amount
                </Text>
                <Text fontSize="14px" fontWeight="300" color="#fff">
                  {formatToCurrency(info?.amount)}
                </Text>
              </VStack>
              <VStack spacing="8px" w="full">
                <Text fontSize="12px" fontWeight="400" color="#fff">
                  Transaction type
                </Text>
                <HStack
                  bg={
                    info?.transaction_action_type === 'equity_plan_initial'
                      ? 'rgba(9, 219, 160, 0.1)'
                      : '#1A1A1A'
                  }
                  borderRadius="32px"
                  justify="center"
                  align="center"
                  px="16px"
                  py="8px"
                >
                  <Text
                    fontSize="16px"
                    fontWeight="500"
                    lineHeight="normal"
                    color={
                      info?.transaction_action_type === '"shared_equity_plan_initial"'
                        ? '#09DBA0'
                        : '#6C6AFF'
                    }
                  >
                    {handlePaymentType?.[
                      info?.equity?.autoDebit ? 'recurring' : info?.transaction_action_type
                    ]?.text ?? '-'}
                  </Text>
                </HStack>
              </VStack>
              <VStack spacing="4px" w="full">
                <Text fontSize="12px" fontWeight="400" color="#fff">
                  Ref
                </Text>
                <Text fontSize="14px" fontWeight="500" color="#fff">
                  {info?.reference ?? '-'}
                </Text>
              </VStack>
            </VStack>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default TransactionCard;
