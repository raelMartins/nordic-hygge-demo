import {
  Box,
  Button,
  Flex,
  Heading,
  HStack,
  Stack,
  Text,
  VStack,
  Show,
  Hide,
  Link,
  useToast,
  Center,
  StackDivider,
} from '@chakra-ui/react';
import {BsDashLg} from 'react-icons/bs';
import {BiSolidPhoneCall} from 'react-icons/bi';
import Image from 'next/image';

export const User_profile_info = ({customerInfo, referral}) => {
  const toast = useToast();

  const placeACall = () => {
    toast({
      status: `info`,
      position: `top-right`,
      description: 'You are currently ineligible for this feature',
      duration: 3000,
    });
  };

  return (
    <Stack>
      <Show above="lg">
        <Box
          minW={'370px'}
          w={'370px'}
          display={'block'}
          p={`16px`}
          bg={`#fff`}
          border={{base: `none`, lg: '1px solid'}}
          borderColor={`#E4E4E7 !important`}
          borderRadius={`16px`}
          color="#191919"
          fontSize={`14px`}
          lineHeight={`140%`}
          fontWeight="400"
        >
          <Stack spacing={33}>
            <VStack>
              <Center
                borderRadius="50%"
                overflow={'hidden'}
                boxSize={`124px`}
                position={`relative`}
              >
                <Image src={customerInfo?.avatar ?? ''} alt="" style={{objectFit: `cover`}} fill />
              </Center>
              <Heading textAlign={'center'} fontSize={`28px`} fontWeight={`600`}>
                {`${customerInfo?.first_name ?? ''} ${customerInfo?.last_name ?? ''}`}
              </Heading>
            </VStack>
            <Stack w="100%">
              <HStack justify="space-between" borderBottom="1px solid #F5F5F5" pb={2}>
                <Text>Phone</Text>
                <VStack align={`flex-end`} gap="8px">
                  <Text fontWeight="600">{customerInfo?.phone}</Text>
                  <Flex align="center" gap="9px" display={{base: `flex`, lg: `none`}}>
                    <Button
                      as={Link}
                      href={`tel:${customerInfo?.phone}`}
                      px="8px"
                      borderRadius="48px"
                      h="23px"
                      alignSelf="flex-end"
                      // onClick={placeACall}
                      bg="rgba(69, 69, 254, 0.1)"
                    >
                      <Flex gap="10px" color="#4545FE" fontSize="12px">
                        <BiSolidPhoneCall />
                        <Text display={`none`}>Call now</Text>
                      </Flex>
                    </Button>
                  </Flex>
                </VStack>
              </HStack>
              <HStack justify="space-between" borderBottom="1px solid #F5F5F5" py={`14px`}>
                <Text>Email</Text>
                <Link href={customerInfo?.email ? `mailto:${customerInfo?.email}` : null}>
                  <Text fontWeight="600" color={customerInfo?.email ? '#4545FE' : '#191919'}>
                    {customerInfo?.email ?? <BsDashLg />}
                  </Text>
                </Link>
              </HStack>
              <HStack justify="space-between" borderBottom="1px solid #F5F5F5" py={`14px`}>
                <Text>Gender</Text>
                <Text fontWeight="600">{customerInfo?.gender || `N/A`}</Text>
              </HStack>
              {referral && (
                <HStack justify="space-between" borderBottom="1px solid #F5F5F5" py={`14px`}>
                  <Text>{referral?.type == 'created' ? 'Created by' : 'Referred by'}</Text>
                  <Text fontWeight="600">{referral?.name || `N/A`}</Text>
                </HStack>
              )}
            </Stack>
          </Stack>
        </Box>
      </Show>
      <Hide above="lg">
        <Stack
          bg={'#fff'}
          w={'full'}
          border={'1px solid'}
          borderColor={`#E4E4E7`}
          p={'16px 12px'}
          borderRadius={'8'}
          divider={<StackDivider m={`0px !important`} borderColor={`#E4E4E7`} />}
          gap={`12px`}
        >
          <HStack gap={'12px'}>
            <Center
              borderRadius="50%"
              overflow={'hidden'}
              boxSize={`50px`}
              minW={`50px`}
              position={`relative`}
            >
              <Image src={customerInfo?.avatar ?? ''} alt="" style={{objectFit: `hidden`}} fill />
            </Center>
            <VStack
              flex={`1`}
              fontSize={`13px`}
              align={'start'}
              gap="4px"
              fontWeight={`400`}
              lineHeight={`150%`}
              letterSpacing={`0.26px`}
            >
              <Text fontSize={`16px`} fontWeight={600} textTransform={'capitalize'}>
                {`${customerInfo?.first_name ?? ''} ${customerInfo?.last_name ?? ''}`}
              </Text>
              <Text color={'#27272A'}>{customerInfo?.phone}</Text>
              <Text color="#4545FE" as={Link} href={`mailto:${customerInfo?.email}`}>
                {customerInfo?.email ?? 'N/A'}
              </Text>
            </VStack>
            <Center
              borderRadius={`full`}
              border={`0.615px solid `}
              borderColor={`#EBEBFF`}
              background={`#F5F9FF`}
              boxSize={`32px`}
              color="#4545FE"
              fontSize="16px"
              as={Link}
              href={`tel:${customerInfo?.phone}`}
              // onClick={placeACall}
            >
              <BiSolidPhoneCall />
            </Center>
          </HStack>
          {/* {referral && (
            <HStack justify="space-between" borderBottom="1px solid #F5F5F5">
              <Text>{referral?.type == 'created' ? 'Created by' : 'Referred by'}</Text>
              <Text fontWeight="600">{referral?.name || `N/A`}</Text>
            </HStack>
          )} */}
        </Stack>
      </Hide>
    </Stack>
  );
};

export default User_profile_info;
