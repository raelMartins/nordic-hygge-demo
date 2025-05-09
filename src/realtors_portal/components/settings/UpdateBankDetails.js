import {Box, Center, Flex, HStack, Stack, Text, useDisclosure, VStack} from '@chakra-ui/react';
import AddBankDetailsForAgents from './AddBankDetailsForAgents';
import {BankActionMenu} from './bankActionMenu';
import {RButton} from '@/realtors_portal/ui-lib';

const BankIcon = ({boxSize = `24px`, color = `#4545FE`, ...rest}) => {
  return (
    <Box boxSize={boxSize} {...rest}>
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M12.37 2.15003L21.37 5.75C21.72 5.89 22 6.31 22 6.68V10C22 10.55 21.55 11 21 11H3C2.45 11 2 10.55 2 10V6.68C2 6.31 2.28 5.89 2.63 5.75L11.63 2.15003C11.83 2.07003 12.17 2.07003 12.37 2.15003Z"
          stroke="#4545FE"
          strokeWidth="1.5"
          strokeMiterlimit="10"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M22 22H2V19C2 18.45 2.45 18 3 18H21C21.55 18 22 18.45 22 19V22Z"
          stroke={color}
          strokeWidth="1.5"
          strokeMiterlimit="10"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M4 18V11"
          stroke={color}
          strokeWidth="1.5"
          strokeMiterlimit="10"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M8 18V11"
          stroke={color}
          strokeWidth="1.5"
          strokeMiterlimit="10"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M12 18V11"
          stroke={color}
          strokeWidth="1.5"
          strokeMiterlimit="10"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M16 18V11"
          stroke={color}
          strokeWidth="1.5"
          strokeMiterlimit="10"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M20 18V11"
          stroke={color}
          strokeWidth="1.5"
          strokeMiterlimit="10"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M1 22H23"
          stroke={color}
          strokeWidth="1.5"
          strokeMiterlimit="10"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M12 8.5C12.8284 8.5 13.5 7.82843 13.5 7C13.5 6.17157 12.8284 5.5 12 5.5C11.1716 5.5 10.5 6.17157 10.5 7C10.5 7.82843 11.1716 8.5 12 8.5Z"
          stroke={color}
          strokeWidth="1.5"
          strokeMiterlimit="10"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </Box>
  );
};

const UpdateBankDetails = ({refetch, bank}) => {
  const {isOpen, onClose, onOpen} = useDisclosure();

  return (
    <VStack align={`stretch`}>
      <Text
        textAlign={'start'}
        fontWeight={{base: '600'}}
        fontSize={'19px'}
        lineHeight={'130%'}
        w="full"
        color={{base: `#191919`, lg: '#27272A'}}
        letterSpacing={{base: `.16px`}}
      >
        Bank Account
      </Text>
      <Stack
        background={{base: `transparent`, md: '#FFFFFF'}}
        border={{base: `none`, md: '1px solid'}}
        borderColor={` #E4E4E7 !important`}
        borderRadius={'12px'}
        p={{base: `0px`, md: `22px 18px`}}
        w={`100%`}
        gap={{base: `16px`, md: `4px`}}
      >
        <HStack justify={`space-between`}>
          {!bank ? (
            <Flex
              direction={{base: `column`, md: `row`}}
              width={'100%'}
              gap={`12px`}
              align="center"
              p={{base: `24px 12px`, md: `0px`}}
              background={{base: `#FFFFFF`, md: 'transparent'}}
              border={{base: `1px solid`, md: 'none'}}
              borderColor={` #E4E4E7 !important`}
              borderRadius={'12px'}
            >
              <Center boxSize={`40px`} borderRadius={`50%`} bg={`#EBEBFF`}>
                <BankIcon />
              </Center>
              <Text
                fontWeight="600"
                fontSize={{base: '14px', md: '16px'}}
                lineHeight="140%"
                color="#18181B"
                textTransform="capitalize"
                textAlign={{base: 'center', md: `left`}}
                w="full"
                letterSpacing={`0.16px`}
              >
                No account added yet
              </Text>
            </Flex>
          ) : (
            <Flex
              width={'100%'}
              gap={`12px`}
              align="center"
              p={{base: `12px`, md: `0px`}}
              background={{base: `#FFFFFF`, md: 'transparent'}}
              border={{base: `1px solid`, md: 'none'}}
              borderColor={` #E4E4E7 !important`}
              borderRadius={'12px'}
            >
              <Center boxSize={`40px`} borderRadius={`50%`} bg={`#EBEBFF`}>
                <BankIcon />
              </Center>{' '}
              <VStack align={`stretch`} gap={`4px`} flex={`1`}>
                <Text
                  fontWeight="600"
                  fontSize="16px"
                  lineHeight="140%"
                  color="#27272A"
                  textTransform="capitalize"
                  textAlign={'start'}
                  w="full"
                  letterSpacing={`.16px`}
                >
                  {bank?.account_name}
                </Text>
                <Text
                  fontWeight="400"
                  fontSize="13px"
                  lineHeight="150%"
                  color="#52525B"
                  textAlign={'start'}
                  w="full"
                  letterSpacing={`.26px`}
                >
                  {bank?.bank_name}
                </Text>
              </VStack>
              <BankActionMenu refetch={refetch} id={bank?.id} />
            </Flex>
          )}
        </HStack>
        <RButton
          variation={`secondary`}
          onClick={onOpen}
          ml={`auto`}
          w={{base: `100%`, md: `max-content`}}
        >
          Link Account
        </RButton>
      </Stack>

      <AddBankDetailsForAgents
        isOpen={isOpen}
        onClose={onClose}
        type
        refetch={refetch}
        bank={bank}
      />
    </VStack>
  );
};

export default UpdateBankDetails;
