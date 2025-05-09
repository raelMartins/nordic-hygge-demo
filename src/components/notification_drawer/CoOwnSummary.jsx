import React from 'react';
import {Flex, Box, Text, VStack, Image, HStack, Icon} from '@chakra-ui/react';
import {useQuery} from 'react-query';
import {BsArrowLeft} from 'react-icons/bs';
import {CloseIcon} from '@chakra-ui/icons';
import {BiCaretRight} from 'react-icons/bi';
import {formatToCurrency} from '../../utils';
import {Button, CustomizableButton} from '../../ui-lib';
import {fetchInvestorPackets} from '../../api/payment';
import {formatDateToString} from '../../utils/formatDate';
import ThreeDots from '../loaders/ThreeDots';
import {formatPropertySize} from '@/utils/misc';

export const CoOwnSummary = ({asset, setType, customScrollbarStyles, onNotClose}) => {
  const HOME__OWNERS__PACKETS = useQuery(['fetchInvestorPackets', asset?.id], () =>
    fetchInvestorPackets(asset?.id)
  );
  const packet =
    HOME__OWNERS__PACKETS?.data?.data?.received?.length &&
    HOME__OWNERS__PACKETS?.data?.data?.received[0];

  const handleProceed = () => {
    setType('inviteesReaction');
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
            onClick={() => setType('notification')}
          />
          <Text color="text" fontSize={'20px'} fontWeight={500} className="heading-text-regular">
            Co-ownership
          </Text>
        </HStack>

        <CloseIcon fontSize={'17px'} onClick={onNotClose} cursor={'pointer'} />
      </Flex>

      <Box
        w="full"
        borderBottom="1px solid"
        borderColor={'matador_border_color.100'}
        mb="21px"
        mt={'14px'}
      />

      <Box px="24px" pb="38px" h={'fit-content'} overflowY="auto" __css={customScrollbarStyles}>
        {asset?.payment_plan ? (
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
              color="text"
              border="1px solid"
              borderColor={'matador_border_color.100'}
              bg="matador_background.100"
              align={'center'}
              justify={'center'}
              direction="column"
            >
              <Text
                fontSize={{base: '14px', md: '18px'}}
                fontWeight={400}
                className="sub-text-regular"
              >
                Initial deposit
              </Text>
              <Text
                fontSize={{base: '28px', md: '34px'}}
                fontWeight={500}
                className="heading-text-regular"
              >
                {formatToCurrency(asset?.payment_plan?.initial_deposit_in_value)}
              </Text>
            </Flex>

            <VStack
              align={'stretch'}
              mt="20px"
              spacing={'24px'}
              fontWeight={500}
              className="sub-text-regular"
            >
              <Flex justify={'space-between'} align={'center'}>
                <Text color="matador_form.label" fontSize={'12px'}>
                  Unit Size
                </Text>
                <Text color="text" fontSize={'13px'}>
                  {formatPropertySize(asset?.unit?.unit_size)}
                </Text>
              </Flex>
              <Flex justify={'space-between'} align={'center'}>
                <Text color="matador_form.label" fontSize={'12px'}>
                  Unit Type
                </Text>
                <Text color="text" fontSize={'13px'}>
                  {asset?.unit?.unit_title ?? '-'}
                </Text>
              </Flex>
              {!packet?.packet && !HOME__OWNERS__PACKETS?.isLoading ? null : (
                <Flex justify={'space-between'} align={'center'}>
                  <Text color="matador_form.label" fontSize={'12px'}>
                    Terms of Agreement
                  </Text>
                  {HOME__OWNERS__PACKETS?.isLoading ? (
                    <ThreeDots />
                  ) : (
                    <a rel="noreferrer" target="_blank" href={packet?.packet}>
                      <CustomizableButton
                        border="1px solid !important"
                        h="22px"
                        w="50px"
                        bg="transparent"
                        borderColor="text"
                      >
                        <Text color={'text'} fontWeight={300} fontSize={'12px'}>
                          View
                        </Text>
                      </CustomizableButton>
                    </a>
                  )}
                </Flex>
              )}
              <Flex justify={'space-between'} align={'center'}>
                <Text color="matador_form.label" fontSize={'12px'}>
                  Offer Date
                </Text>
                <Text color="text" fontSize={'13px'}>
                  {formatDateToString(asset?.created_at)}
                </Text>
              </Flex>
              <Flex justify={'space-between'} align={'center'}>
                <Text color="matador_form.label" fontSize={'12px'}>
                  Offer Expiration Date
                </Text>
                <Text color="text" fontSize={'13px'}>
                  {formatDateToString(asset?.offer_expires)}
                </Text>
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
                borderColor={`matador_border_color.100 !important`}
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

            <Button
              w="full"
              mt="30px"
              bg="custom_color.color"
              color="custom_color.contrast"
              onClick={handleProceed}
            >
              Proceed
            </Button>
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
              color="text"
              border="1px solid"
              borderColor={'matador_border_color.100'}
              bg="matador_background.100"
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
                Total unit price
              </Text>
              <Text
                color="text"
                fontSize={{base: '28px', md: '34px'}}
                fontWeight={500}
                className="heading-text-regular"
              >
                {formatToCurrency(asset?.total_unit_price)}
              </Text>
            </Flex>

            <VStack
              align={'stretch'}
              mt="20px"
              spacing={'24px'}
              fontWeight={500}
              className="sub-text-regular"
            >
              <Flex justify={'space-between'} align={'center'}>
                <Text color="matador_form.label" fontSize={'12px'}>
                  Unit Size
                </Text>
                <Text color="text" fontSize={'13px'}>
                  {formatPropertySize(asset?.unit?.unit_size)}
                </Text>
              </Flex>
              <Flex justify={'space-between'} align={'center'}>
                <Text color="matador_form.label" fontSize={'12px'}>
                  Unit Type
                </Text>
                <Text color="text" fontSize={'13px'}>
                  {asset?.unit?.unit_title ?? '-'}
                </Text>
              </Flex>
              {!packet?.packet && !HOME__OWNERS__PACKETS?.isLoading ? null : (
                <Flex justify={'space-between'} align={'center'}>
                  <Text color="matador_form.label" fontSize={'12px'}>
                    Terms of Agreement
                  </Text>
                  {HOME__OWNERS__PACKETS?.isLoading ? (
                    <ThreeDots />
                  ) : (
                    <a rel="noreferrer" target="_blank" href={packet?.packet}>
                      <CustomizableButton
                        border="1px solid !important"
                        h="22px"
                        w="50px"
                        bg="transparent"
                        borderColor="text"
                      >
                        <Text color={'text'} fontWeight={300} fontSize={'12px'}>
                          View
                        </Text>
                      </CustomizableButton>
                    </a>
                  )}
                </Flex>
              )}
              <Flex justify={'space-between'} align={'center'}>
                <Text color="matador_form.label" fontSize={'12px'}>
                  Offer Date
                </Text>
                <Text color="text" fontSize={'13px'}>
                  {formatDateToString(asset?.created_at)}
                </Text>
              </Flex>
              <Flex justify={'space-between'} align={'center'}>
                <Text color="matador_form.label" fontSize={'12px'}>
                  Offer Expiration Date
                </Text>
                <Text color="text" fontSize={'13px'}>
                  {formatDateToString(asset?.offer_expires)}
                </Text>
              </Flex>
            </VStack>

            <Button
              w="full"
              mt="30px"
              bg="custom_color.color"
              color="custom_color.contrast"
              onClick={handleProceed}
            >
              Proceed
            </Button>
          </Box>
        )}
      </Box>
    </>
  );
};

export default CoOwnSummary;
