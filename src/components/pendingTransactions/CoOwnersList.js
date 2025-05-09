import React from 'react';
import {Box, VStack, Flex, Text, Image, HStack} from '@chakra-ui/react';
import {formatToCurrency} from '../../utils';
import {Spinner} from '../../ui-lib';
import {calculateSharedValue} from '../../utils/calculateFee';
import {fetchCustomersInfo} from '../../api/co_owners';
import {useQuery} from 'react-query';
import {tagCoOwnStatus} from '../../utils/coOwnerTag';
import useGetSession from '../../utils/hooks/getSession';

const CoOwnersList = ({asset, customScrollbarStyles, coowners, theHost, coOwnerLoading}) => {
  const totalValue = asset?.payment_plan?.initial_deposit_in_value ?? asset?.total_unit_price;
  const excludeHostFromCoowners = coowners?.filter(info => info?.id !== theHost?.id);
  const {sessionData: business_id} = useGetSession('businessId');

  const queryForCustomersInfo = `${coowners
    .map(element => {
      return `user[]=${element?.invitee?.id}`;
    })
    .join('&')}&business_id=${business_id}`;

  const customersFetch = useQuery(['users', queryForCustomersInfo], () =>
    fetchCustomersInfo(queryForCustomersInfo)
  );

  const findCustomerObjOfCoowner = (email, key) =>
    customersFetch?.data?.data?.user.find(item => item.email === email)?.[key] ?? '-';

  return (
    <Box h={'fit-content'} overflowY="auto" __css={customScrollbarStyles}>
      <Box w="full">
        <VStack w="full" spacing={'20px'}>
          {coOwnerLoading ? (
            <Spinner />
          ) : (
            <>
              <Flex w="full" justify={'space-between'} className="sub-text-regular">
                <HStack align={'center'} justify={'flex-start'} spacing={'13px'}>
                  <Box w="40px" h="40px" position={'relative'}>
                    <Image
                      w="full"
                      h="full"
                      src={findCustomerObjOfCoowner(theHost?.invitee?.email, 'avatar')}
                      borderRadius={'full'}
                    />
                    <Box
                      borderRadius={'full'}
                      p="2.5px 7.5px"
                      bg={'#CDCED0'}
                      position={'absolute'}
                      bottom={0}
                      right={'-10px'}
                    >
                      <Text fontSize={'8px'} fontWeight={500} color={'text'}>
                        {theHost?.equity_value}%
                      </Text>
                    </Box>
                  </Box>
                  <VStack align={'stretch'} spacing={'2px'}>
                    <Text fontSize={'16px'} fontWeight={500}>
                      {`${findCustomerObjOfCoowner(
                        theHost?.invitee?.email,
                        'first_name'
                      )} ${findCustomerObjOfCoowner(theHost?.invitee?.email, 'last_name')}`}
                    </Text>
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
                      <Image
                        w="full"
                        h="full"
                        src={findCustomerObjOfCoowner(user?.invitee?.email, 'avatar')}
                        borderRadius={'full'}
                      />
                      <Box
                        borderRadius={'full'}
                        p="2.5px 7.5px"
                        bg={'#CDCED0'}
                        position={'absolute'}
                        bottom={0}
                        right={'-10px'}
                      >
                        <Text fontSize={'8px'} fontWeight={500} color={'text'}>
                          {user?.equity_value}%
                        </Text>
                      </Box>
                    </Box>
                    <VStack align={'stretch'} spacing={'2px'}>
                      <Text fontSize={'16px'} fontWeight={500}>
                        {`${findCustomerObjOfCoowner(
                          user?.invitee?.email,
                          'first_name'
                        )} ${findCustomerObjOfCoowner(user?.invitee?.email, 'last_name')}`}
                      </Text>
                      <Text fontSize={'11px'} fontWeight={400}>
                        {user.invitee?.email}
                      </Text>
                    </VStack>
                  </HStack>

                  <VStack align={'flex-end'} spacing={'12px'}>
                    <Text fontSize={'13px'} fontWeight={400}>
                      {formatToCurrency(calculateSharedValue(user.equity_value, totalValue))}
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
  );
};

export default CoOwnersList;
