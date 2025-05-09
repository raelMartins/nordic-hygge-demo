/* eslint-disable react/jsx-key */
import { Flex, Box, Text, VStack, Image, HStack, Icon } from '@chakra-ui/react';
import { Spinner } from '../../ui-lib';
import { formatToCurrency } from '../../utils';
import { calculateSharedValue } from '../../utils/calculateFee';
import { BsArrowLeft } from 'react-icons/bs';
import { CloseIcon } from '@chakra-ui/icons';
import { tagCoOwnStatus } from '../../utils/coOwnerTag';
import avatar from '../../images/avatar.jpeg';

export const CoOwnersList = ({
  asset,
  setType,
  coOwnerLoading,
  coowners,
  onNotClose,
  theHost,
  customScrollbarStyles,
}) => {
  const totalValue = asset?.payment_plan?.initial_deposit_in_value ?? asset?.total_unit_price;
  const excludeHostFromCoowners = coowners?.filter(info => info?.id !== theHost?.id);

  return (
    <>
      <Flex w="full" justify={'space-between'} align={'center'} px="24px" pt={'28px'}>
        <HStack align={'center'}>
          <Icon
            color="text"
            as={BsArrowLeft}
            fontSize={'27px'}
            style={{cursor: 'pointer'}}
            onClick={() => setType('inviteesReaction')}
          />
          <Text color="text" fontSize={'20px'} fontWeight={500} className="heading-text-regular">
            Co-ownership invite details
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
        <Box w="full">
          <VStack w="full" spacing={'20px'}>
            {coOwnerLoading ? (
              <Spinner />
            ) : (
              <>
                <Flex w="full" justify={'space-between'} className="sub-text-regular">
                  <HStack align={'center'} justify={'flex-start'} spacing={'13px'}>
                    <Box w="40px" h="40px" position={'relative'}>
                      <Image alt="" w="full" h="full" src={avatar.src} borderRadius={'full'} />
                      <Box
                        borderRadius={'full'}
                        px="6px"
                        py="2px"
                        bg={'#CDCED0'}
                        position={'absolute'}
                        bottom={0}
                        right={'-10px'}
                      >
                        <Text fontSize={'8px'} fontWeight={500} color={'#000000'}>
                          {theHost?.equity_value}%
                        </Text>
                      </Box>
                    </Box>
                    <VStack align={'stretch'} spacing={'2px'}>
                      <Text
                        fontSize={'16px'}
                        fontWeight={500}
                      >{`${theHost?.invitee?.first_name} ${theHost?.invitee?.last_name}`}</Text>
                      <Text fontSize={'11px'} fontWeight={400}>
                        {theHost?.invitee?.email}
                      </Text>
                    </VStack>
                  </HStack>

                  <VStack align={'flex-end'} spacing={'12px'}>
                    <Text fontSize={'13px'} fontWeight={400}>
                      {formatToCurrency(calculateSharedValue(theHost?.equity_value, totalValue))}
                    </Text>
                    <Box
                      borderRadius={'full'}
                      px="10px"
                      py="3px"
                      bg={tagCoOwnStatus(theHost?.status)?.bg}
                    >
                      <Text fontSize={'13px'} color={tagCoOwnStatus(theHost?.status)?.color}>
                        {tagCoOwnStatus(theHost?.status)?.text}
                      </Text>
                    </Box>
                  </VStack>
                </Flex>
                {excludeHostFromCoowners?.map(user => (
                  <Flex w="full" justify={'space-between'} className="sub-text-regular">
                    <HStack align={'center'} justify={'flex-start'} spacing={'13px'}>
                      <Box w="40px" h="40px" position={'relative'}>
                        <Image alt="" w="full" h="full" src={avatar.src} borderRadius={'full'} />
                        <Box
                          borderRadius={'full'}
                          px="6px"
                          py="2px"
                          bg={'#CDCED0'}
                          position={'absolute'}
                          bottom={0}
                          right={'-10px'}
                        >
                          <Text fontSize={'8px'} fontWeight={500} color={'#000000'}>
                            {user?.equity_value}%
                          </Text>
                        </Box>
                      </Box>
                      <VStack align={'stretch'} spacing={'2px'}>
                        <Text
                          fontSize={'16px'}
                          fontWeight={500}
                        >{`${user?.invitee?.first_name} ${user?.invitee?.last_name}`}</Text>
                        <Text fontSize={'11px'} fontWeight={400}>
                          {user?.invitee?.email}
                        </Text>
                      </VStack>
                    </HStack>

                    <VStack align={'flex-end'} spacing={'12px'}>
                      <Text fontSize={'13px'} fontWeight={400}>
                        {formatToCurrency(calculateSharedValue(user?.equity_value, totalValue))}
                      </Text>
                      <Box
                        borderRadius={'full'}
                        px="10px"
                        py="3px"
                        bg={tagCoOwnStatus(user?.status)?.bg}
                      >
                        <Text fontSize={'13px'} color={tagCoOwnStatus(user?.status)?.color}>
                          {tagCoOwnStatus(user?.status)?.text}
                        </Text>
                      </Box>
                    </VStack>
                  </Flex>
                ))}
              </>
            )}
          </VStack>
        </Box>
      </Box>
    </>
  );
};

export default CoOwnersList;
