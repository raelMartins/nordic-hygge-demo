import {Heading, Flex, HStack, Stack, Text, VStack, Button, Image} from '@chakra-ui/react';
import rightArrow from '@/realtors_portal/images/icons/arrow_right_listings_agent.svg';

import {fetchOutrightContract} from '@/realtors_portal/api/agents';
import {useQuery} from 'react-query';
import {formatToCurrency} from '@/realtors_portal/utils';
import useGetSession from '@/utils/hooks/getSession';
import {formatPropertySize} from '@/realtors_portal/utils/truncateLongText';

export const UnitPropertyInformation = ({unitDetail}) => {
  const boxStyle = {
    maxW: {lg: '480px'},
    w: {lg: '100%'},
    height: '70px',

    background: '#F8F8F8',
    borderRadius: '12px',
  };

  const {sessionData: LoggedInAgent} = useGetSession('a_details');
  const {sessionData: agentToken} = useGetSession('a_token');

  const storeName = LoggedInAgent?.storeName;

  const {data, isLoading} = useQuery('outright-contract', () =>
    fetchOutrightContract(unitDetail?.id, agentToken, storeName)
  );

  return (
    <VStack
      w="full"
      maxW={{base: '100%', lg: '520px'}}
      ml={{base: '', lg: 'auto'}}
      spacing="26px"
      px={{base: 4, lg: 0}}
    >
      <Heading
        textAlign={'left'}
        alignSelf="flex-start"
        fontWeight="500"
        fontSize={{base: '24px', lg: '32px'}}
      >
        {unitDetail?.unit_title}
      </Heading>
      <Stack direction={{base: 'column', lg: 'row'}} spacing="18px" w="full">
        <Flex
          w="full"
          p="20px 26px"
          {...boxStyle}
          minH="96px"
          bg="#FFFFFF"
          justify="space-between"
          border="1px solid #E4E4E4"
        >
          <Stack spacing="1px">
            <Text
              display="flex"
              fontWeight="600"
              fontSize="28px"
              color={`#45454FE`}
              lineHeight="36px"
            >
              {formatToCurrency(unitDetail?.price)}
            </Text>
            <Text fontWeight=" 400" fontSize="14px" lineHeight="18px" color="#606060">
              Unit Price
            </Text>
          </Stack>
        </Flex>
      </Stack>
      <Stack w="100%" mt="26px" spacing={'20px'}>
        {unitDetail?.unit_size && (
          <HStack
            justify="space-between"
            borderBottom={{lg: '1px solid #E4E4E4'}}
            pb={{lg: '12px'}}
          >
            <Text
              color={{base: '#667085', lg: '#606060'}}
              fontWeight={400}
              fontSize="14px"
              lineHeight="18px"
            >
              Unit size
            </Text>
            <Text
              fontWeight={500}
              fontSize="14px"
              lineHeight="18px"
              textAlign="right"
              color="#191919"
            >
              {formatPropertySize(unitDetail?.unit_size)}
            </Text>
          </HStack>
        )}
        <HStack justify="space-between" borderBottom={{lg: '1px solid #E4E4E4'}} pb={{lg: '12px'}}>
          <Text
            color={{base: '#667085', lg: '#606060'}}
            fontWeight={400}
            fontSize="14px"
            lineHeight="18px"
          >
            Land Title
          </Text>
          <Text
            fontWeight={500}
            fontSize="14px"
            lineHeight="18px"
            textAlign="right"
            color="#191919"
          >
            {unitDetail?.unit_title}
          </Text>
        </HStack>
        {unitDetail?.no_of_bedrooms > 0 && (
          <HStack
            justify="space-between"
            borderBottom={{lg: '1px solid #E4E4E4'}}
            pb={{lg: '12px'}}
          >
            <Text
              color={{base: '#667085', lg: '#606060'}}
              fontWeight={400}
              fontSize="14px"
              lineHeight="18px"
            >
              Bedrooms
            </Text>
            <Text
              fontWeight={500}
              fontSize="14px"
              lineHeight="18px"
              textAlign="right"
              color="#191919"
            >
              {unitDetail?.no_of_bedrooms}
            </Text>
          </HStack>
        )}
        <HStack justify="space-between" borderBottom={{lg: '1px solid #E4E4E4'}} pb={{lg: '12px'}}>
          <Text
            color={{base: '#667085', lg: '#606060'}}
            fontWeight={400}
            fontSize="14px"
            lineHeight="18px"
          >
            Unit quantity
          </Text>
          <Text
            fontWeight={500}
            fontSize="14px"
            lineHeight="18px"
            textAlign="right"
            color="#191919"
          >
            {unitDetail?.total_quantity}
          </Text>
        </HStack>
        {unitDetail?.allocation_milestone && (
          <HStack
            // display={{base: 'none', lg: 'flex'}}
            justify="space-between"
            borderBottom={{lg: '1px solid #E4E4E4'}}
            pb={{lg: '12px'}}
          >
            <Text
              color={{base: '#667085', lg: '#606060'}}
              fontWeight={400}
              fontSize="14px"
              lineHeight="18px"
            >
              Allocation milestone
            </Text>
            <Text
              fontWeight={500}
              fontSize="14px"
              lineHeight="18px"
              textAlign="right"
              color="#191919"
            >
              {unitDetail?.allocation_milestone}%
            </Text>
          </HStack>
        )}
        {data?.data?.results[0]?.document_file && (
          <HStack
            justify="space-between"
            align={`center`}
            borderBottom={{lg: '1px solid #E4E4E4'}}
            pb={{lg: '12px'}}
          >
            <Text
              color={{base: '#667085', lg: '#606060'}}
              fontWeight={400}
              fontSize="14px"
              lineHeight="18px"
            >
              Outright Agreement
            </Text>
            <HStack align={'center'} spacing="3px">
              <Button
                target="_blank"
                as="a"
                href={data?.data.results[0].document_file}
                variant="link"
                color="#4545FE"
                textAlign="start"
                cursor="pointer"
              >
                View
              </Button>
              <Image alt="arrowIcon" src={rightArrow.src} />
            </HStack>
          </HStack>
        )}
      </Stack>
      {/* <Show below="md">
        <VStack gap={0} p={'14px'} justify={'start'} align="start" w="full" h="full">
          <Text fontWeight={600} fontSize={'12px'} color="#191919">
            Unit Allocations
          </Text>
          <Text
            fontSize={'12px'}
            fontWeight={300}
            textAlign="start"
            color="#3D3D3D"
            lineHeight={'15px'}
          >
            Once subscribers have made a payment equivalent to {unitDetail?.allocation_milestone}%
            of the total milestone amount, they will become eligible for property allocation.
          </Text>
        </VStack>
      </Show> */}
      {/* <Box bg={{base: '#fff', lg: 'unset'}} w={'full'}>
        {data?.data?.results[0]?.document_file && (
          <Stack
            p="10.2px 13.2px"
            justify="start"
            alignSelf="start"
            align="start"
            mt={{base: 4, lg: '23px'}}
            mb={{base: 4, lg: '23px'}}
            mx={{base: 4, lg: 0}}
            bg={'#fff'}
            border={'1px solid #E4E4E4'}
            borderRadius="8.7px"
            spacing="none"
            maxW={'175px'}
          >
            <Image alt="doc icon" src={docIcon.src} h="33.8px" w="40px" />
            <Text fontWeight={{base: 500, lg: 400}} mt="8px">
              Outright Contract
            </Text>
            <HStack align={'center'} mt="16px" spacing="3px">
              <Button
                target="_blank"
                as="a"
                href={data?.data.results[0].document_file}
                variant="link"
                color="#4545FE"
                textAlign="start"
                cursor="pointer"
              >
                View
              </Button>
              <Image alt="arrowIcon" src={rightArrow.src} />
            </HStack>
          </Stack>
        )}
      </Box> */}
    </VStack>
  );
};

export default UnitPropertyInformation;
