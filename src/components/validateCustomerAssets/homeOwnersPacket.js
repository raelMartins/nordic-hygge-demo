import React, {useRef} from 'react';
import {Spinner} from '../../ui-lib/ui-lib.components';
import {Box, Flex, Image, Text, VStack} from '@chakra-ui/react';
import {fetchInvestorPackets} from '../../api/payment';
import {useQuery} from 'react-query';
import {formatDateToString} from '../../utils/formatDate';
import homeOnwersImage from '../../../images/home-owners-packet.svg';
import {BiCaretRight} from 'react-icons/bi';
import ErrorState from '../appState/error-state';

export const HomeOwnersPacket = ({equityData, setType, customScrollbarStyles}) => {
  const HOME__OWNERS__PACKETS = useQuery(['fetchInvestorPackets', equityData?.id], () =>
    fetchInvestorPackets(equityData?.id)
  );

  return (
    <Box px="24px" pb="38px" h={'fit-content'} overflowY="auto" __css={customScrollbarStyles}>
      {HOME__OWNERS__PACKETS?.isLoading ? (
        <VStack w="full" h="full" maxH={'450px'}>
          <Spinner />
        </VStack>
      ) : HOME__OWNERS__PACKETS?.isError ? (
        <ErrorState />
      ) : (
        <VStack mt="20px" align={'stretch'} mx="auto" w="full" height={'80%'} overflowY="auto">
          {HOME__OWNERS__PACKETS?.data?.data?.received?.map((item, index) => (
            <Flex
              key={index}
              align={'center'}
              justify={'space-between'}
              w="full"
              px="20px"
              py="18px"
              shadow={'md'}
              borderRadius={'12px'}
              border="1px solid #E4E4E4 !important"
            >
              <Flex align={'center'} gap="10px">
                <Image src={homeOnwersImage.src} />
                <VStack align={'flex-start'} spacing="0">
                  <Text fontSize={'15px'} fontWeight={500} fontFamily="optimaMedium">
                    Project report
                  </Text>
                  <Text fontSize={'11px'} fontWeight={400} fontFamily="optimaMedium">
                    {item?.added_at ? `Uploaded: ${formatDateToString(item?.added_at)}` : 'n/a'}
                  </Text>
                </VStack>
              </Flex>
              <a rel="noreferrer" target="_blank" href={item?.packet}>
                <Flex align={'center'} gap="10px">
                  <Text
                    fontSize={'14px'}
                    color="#932128"
                    fontWeight={400}
                    fontFamily="optimaMedium"
                  >
                    View
                  </Text>
                  <BiCaretRight size={24} color="#932128" />
                </Flex>
              </a>
            </Flex>
          ))}
        </VStack>
      )}
    </Box>
  );
};

export default HomeOwnersPacket;
