import React from 'react';
import {Flex, Box, Text, VStack, Divider, Image, HStack, Icon, Center} from '@chakra-ui/react';
import {Button, CustomizableButton, Spinner} from '../../ui-lib';
import {formatToCurrency} from '../../utils';
import {BiCaretRight} from 'react-icons/bi';
import {calculateSharedValue} from '../../utils/calculateFee';
import {BsArrowLeft} from 'react-icons/bs';
import {CloseIcon} from '@chakra-ui/icons';
import processingLoader from '../../images/processing-transaction.gif';
import successfulLoader from '../../images/successful-transaction.gif';
import useGetSession from '@/utils/hooks/getSession';

const InviteesReaction = ({
  requestInfo,
  mutation,
  setType,
  coOwnerLoading,
  handleAccept,
  coowners,
  onNotClose,
  customScrollbarStyles,
}) => {
  const {sessionData: LoggedinUser} = useGetSession('loggedIn');

  const coownerInfo = coowners?.length
    ? coowners.find(item => item?.invitee?.id == LoggedinUser?.user?.id)
    : null;
  const asset = requestInfo?.coownership_request?.equity;
  const sharedUnitPrice = calculateSharedValue(asset?.total_unit_price, coownerInfo?.equity_value);
  const sharedInitialDeposit = calculateSharedValue(
    asset?.payment_plan?.initial_deposit_in_value,
    coownerInfo?.equity_value
  );

  const handleProceed = () => {
    handleAccept();
  };

  return (
    <>
      <Flex w="full" justify={'space-between'} align={'center'} px="24px" pt={'28px'}>
        <HStack align={'center'}>
          <Icon
            color="text"
            as={BsArrowLeft}
            fontSize={'27px'}
            style={{cursor: 'pointer'}}
            onClick={() => setType('summary')}
          />
          <Text color="text" fontSize={'20px'} fontWeight={500} className="heading-text-regular">
            Co-ownership invite details
          </Text>
        </HStack>

        <CloseIcon fontSize={'17px'} onClick={onNotClose} cursor={'pointer'} />
      </Flex>

      {mutation?.isSuccess ? (
        <Center mt="20px" w="full" h="full" maxH={'450px'} flexDirection={'column'}>
          <Image alt="loader" w="150px" h="150px" src={successfulLoader.src} />
          <Text
            color="text"
            fontWeight={500}
            fontSize={'28px'}
            my="25px"
            className="heading-text-regular"
          >
            Accepted
          </Text>
          <Text color="text" fontSize={'16px'} fontWeight="400">
            Invitation accepted
          </Text>
        </Center>
      ) : mutation?.isLoading ? (
        <Center mt="20px" w="full" h="full" maxH={'450px'} flexDirection={'column'}>
          <Image alt="loader" w="150px" h="150px" src={processingLoader.src} />
          <Text
            color="text"
            fontWeight={500}
            fontSize={'28px'}
            my="25px"
            className="heading-text-regular"
          >
            Accepting invite
          </Text>
          <Text color="text" fontSize={'16px'} fontWeight="400">
            Wait a moment
          </Text>
        </Center>
      ) : (
        <>
          <Box
            w="full"
            borderBottom="1px solid"
            borderColor={'matador_border_color.100'}
            mb="21px"
            mt={'14px'}
          />

          <Box px="24px" pb="38px" h={'fit-content'} overflowY="auto" __css={customScrollbarStyles}>
            {coOwnerLoading ? (
              <Center w="full" h="full">
                <Spinner disableAbsoluteCenteredSpinner h={{base: `50px`}} w={{base: `50px`}} />
              </Center>
            ) : asset?.payment_plan ? (
              <Box w="full">
                <Text
                  fontWeight={500}
                  fontSize={'22px'}
                  color={'text'}
                  mb="15px"
                  className="heading-text-regular"
                >
                  {asset?.project?.name}
                </Text>
                {/* <Image h='195px' w='full' src={asset?.project?.photos[0]?.photo} /> */}

                <Flex
                  mt="20px"
                  h="130px"
                  w="full"
                  border="1px solid"
                  borderColor={'matador_border_color.100'}
                  bg="matador_background.100"
                  color={`text`}
                  align={'center'}
                  justify={'center'}
                  direction="column"
                >
                  <Text
                    color="text"
                    fontSize={{base: '14px', md: '18px'}}
                    fontWeight={400}
                    className="sub-text-regular"
                  >
                    Shared Initial Deposit
                  </Text>
                  <Text
                    color="text"
                    fontSize={{base: '28px', md: '34px'}}
                    fontWeight={500}
                    className="heading-text-regular"
                  >
                    {formatToCurrency(sharedInitialDeposit)}
                  </Text>
                </Flex>

                <VStack
                  align={'stretch'}
                  divider={<Divider />}
                  mt="20px"
                  spacing={'8px'}
                  fontWeight={500}
                  className="sub-text-regular"
                >
                  <Flex justify={'space-between'} align={'center'}>
                    <Text color="matador_form.label" fontSize={'12px'}>
                      Split Ownership
                    </Text>
                    <Text color="text" fontSize={'13px'}>{`${
                      coownerInfo?.equity_value ?? '-'
                    }%`}</Text>
                  </Flex>

                  <Flex justify={'space-between'} align={'center'}>
                    <Text color="matador_form.label" fontSize={'12px'}>
                      Co-owners
                    </Text>
                    <CustomizableButton
                      border="1px solid"
                      h="22px"
                      w="50px"
                      bg="transparent"
                      borderColor="text"
                      onClick={() => setType('coOwnersList')}
                    >
                      <Text color={'text'} fontWeight={300} fontSize={'12px'}>
                        View
                      </Text>
                    </CustomizableButton>
                  </Flex>
                </VStack>

                {asset?.payment_plan?.plan_type === 'custom' && (
                  <Flex
                    mt="8px"
                    py="12px"
                    px="16px"
                    align={'center'}
                    justify={'space-between'}
                    borderRadius={'2px'}
                    cursor={'pointer'}
                    border="1px solid"
                    borderColor={'matador_border_color.100'}
                    onClick={() => setType('breakdown')}
                  >
                    <Text color="matador_text.500" fontSize={'14px'} fontWeight={400}>
                      Payment Breakdown
                    </Text>
                    <HStack align={'center'} justify={'center'} spacing={0}>
                      <Text color="matador_text.500" fontSize={'14px'} fontWeight={500}>
                        View
                      </Text>
                      <Icon as={BiCaretRight} color="text" fontSize={'25px'} />
                    </HStack>
                  </Flex>
                )}

                {!requestInfo?.action_completed && (
                  <Flex gap="8px" align={'center'}>
                    <CustomizableButton
                      w="full"
                      mt="30px"
                      border="1px solid #DD4449 !important"
                      bg="transparent"
                      color="#DD4449"
                      onClick={() => setType('inviteRejection')}
                    >
                      Reject
                    </CustomizableButton>
                    <Button
                      w="full"
                      mt="30px"
                      bg="custom_color.color"
                      color="custom_color.contrast"
                      onClick={handleProceed}
                    >
                      Accept
                    </Button>
                  </Flex>
                )}
              </Box>
            ) : (
              <Box w="full">
                <Text
                  fontWeight={500}
                  fontSize={'15px'}
                  color={'text'}
                  mb="15px"
                  className="heading-text-regular"
                >
                  {asset?.project?.name}
                </Text>
                {/* <Image h='195px' w='full' src={asset?.project?.photos[0]?.photo} /> */}

                <Flex
                  mt="20px"
                  h="130px"
                  w="full"
                  border="1px solid"
                  borderColor={'matador_border_color.100'}
                  bg="matador_background.100"
                  color={`text`}
                  align={'center'}
                  justify={'center'}
                  direction="column"
                >
                  <Text
                    color="text"
                    fontSize={{base: '14px', md: '18px'}}
                    fontWeight={400}
                    className="sub-text-regular"
                  >
                    Shared Unit price
                  </Text>
                  <Text
                    color="text"
                    fontSize={{base: '28px', md: '34px'}}
                    fontWeight={500}
                    className="heading-text-regular"
                  >
                    {formatToCurrency(sharedUnitPrice)}
                  </Text>
                </Flex>

                <VStack
                  align={'stretch'}
                  divider={<Divider />}
                  mt="20px"
                  spacing={'8px'}
                  fontWeight={500}
                  className="sub-text-regular"
                >
                  <Flex justify={'space-between'} align={'center'}>
                    <Text color="matador_form.label" fontSize={'12px'}>
                      Split Ownership
                    </Text>
                    <Text color="text" fontSize={'13px'}>{`${
                      coownerInfo?.equity_value ?? '-'
                    }%`}</Text>
                  </Flex>

                  <Flex justify={'space-between'} align={'center'}>
                    <Text color="matador_form.label" fontSize={'12px'}>
                      Co-owners
                    </Text>
                    <CustomizableButton
                      border="1px solid"
                      h="22px"
                      w="50px"
                      bg="transparent"
                      borderColor="text"
                      onClick={() => setType('coOwnersList')}
                    >
                      <Text color={'text'} fontWeight={300} fontSize={'12px'}>
                        View
                      </Text>
                    </CustomizableButton>
                  </Flex>
                </VStack>

                {!requestInfo?.action_completed && (
                  <Flex gap="8px" align={'center'}>
                    <CustomizableButton
                      w="full"
                      mt="30px"
                      border="1px solid #DD4449 !important"
                      bg="transparent"
                      color="#DD4449"
                      onClick={() => setType('inviteRejection')}
                    >
                      Reject
                    </CustomizableButton>
                    <Button
                      w="full"
                      mt="30px"
                      bg="custom_color.color"
                      color="custom_color.contrast"
                      onClick={handleProceed}
                    >
                      Accept
                    </Button>
                  </Flex>
                )}
              </Box>
            )}
          </Box>
        </>
      )}
    </>
  );
};

export default InviteesReaction;
