import {useCustomToast} from '@/components/CustomToast';
import {formatToCurrency} from '@/utils';
import {ArrowBackIcon, CopyIcon} from '@chakra-ui/icons';
import {Box, Center, Flex, HStack, Stack, StackDivider, Text, useToast} from '@chakra-ui/react';
import {useState} from 'react';
import {IoCopy, IoCopyOutline} from 'react-icons/io5';

export const FallBackBankTransfer = ({accounts, amount, go_back = () => {}, for_listing}) => {
  const [account_number, set_account_number] = useState(null);
  const toast = useCustomToast();

  const copy = acc_num => {
    set_account_number(acc_num);
    // onCopy();
    toast({
      title: 'Account Number Copied! 👍🏻',
      status: 'info',
      duration: 1500,
      isClosable: true,
      position: 'top-right',
    });
    setTimeout(() => {
      set_account_number(null);
    }, 2000);
  };
  return (
    <Stack w="full" gap={`12px`}>
      <Center
        flexDir={`column`}
        gap={`4px`}
        borderRadius={`5px`}
        border={`1px solid`}
        borderColor={for_listing ? `#24242B` : `matador_border_color.100`}
        bgColor={for_listing ? `#1C1C2A` : `matador_background.100`}
        p={`35px`}
      >
        <Text
          fontSize={{base: '13px'}}
          fontWeight={400}
          lineHeight={`150%`}
          letterSpacing={`.26px`}
        >
          You will pay
        </Text>
        <Text
          // className="heading-text-regular"
          fontWeight={{base: '500', lg: '600'}}
          fontSize={{base: '19px', lg: '24px'}}
          lineHeight={{base: `140%`}}
        >
          {formatToCurrency(amount)}
        </Text>
      </Center>
      <Box>
        <Text fontSize={`13px`} fontWeight={`500`} lineHeight={`140%`} mb={`8px`}>
          {/* Choose the bank of your preference */}
          Use the account number(s) below
        </Text>
        <Stack
          gap={`4px`}
          borderRadius={`5px`}
          border={`1px solid`}
          borderColor={for_listing ? `#24242B` : `matador_border_color.100`}
          bgColor={for_listing ? `#1C1C2A` : `matador_background.100`}
          divider={<StackDivider borderColor={` #24242B`} />}
          p={`12.5px 10px`}
        >
          {accounts?.map((account, i) => (
            <HStack
              justify={`space-between`}
              p={`12px 10px`}
              lineHeight={`150%`}
              letterSpacing={`0.26px`}
              key={i}
            >
              <Text fontSize={`13px`} fontWeight={`400`}>
                {account?.bank_name || account?.account_bank_name}
              </Text>
              <HStack gap={`7px`}>
                <Stack gap={`4px`} textAlign={`right`}>
                  <Text fontSize={`13px`} fontWeight={`600`}>
                    {account?.account_number}
                  </Text>
                  <Text fontSize={`10px`} fontWeight={`400`} opacity={`.9`}>
                    {account?.account_name}
                  </Text>
                </Stack>
                {/* <CopyIcon
                  onClick={() => copy(account?.account_number)}
                  fontSize={'16px'}
                  color={
                    account_number === account?.account_number ? 'custom_color.color' : 'inherit'
                  }
                  cursor="pointer"
                  h={6}
                  w={6}
                /> */}
                <Center
                  cursor="pointer"
                  onClick={() => copy(account?.account_number)}
                  fontSize={`16px`}
                  color={account_number === account?.account_number && `custom_color.color_pop`}
                >
                  {account_number === account?.account_number ? <IoCopy /> : <IoCopyOutline />}
                </Center>
              </HStack>
            </HStack>
          ))}
        </Stack>
      </Box>
    </Stack>
  );
};
