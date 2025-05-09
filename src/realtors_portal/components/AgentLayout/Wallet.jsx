import {
  Box,
  Center,
  Drawer,
  DrawerCloseButton,
  DrawerContent,
  DrawerOverlay,
  Flex,
  Heading,
  HStack,
  Image,
  Stack,
  Text,
  useDisclosure,
  VStack,
} from '@chakra-ui/react';
import WithdrawalModal from '../account/WithdrawalModal';
import {useQuery} from 'react-query';
import {accountTransactions, fetchAccountInfo} from '@/realtors_portal/api/agents';
import {formatToCurrency} from '@/realtors_portal/utils';
import useGetSession from '@/utils/hooks/getSession';
import {drawer_style} from './drawers/drawer_style';
import {TransactionIcon} from './assets/NavbarSvgs';
import {EmptyState} from '../common/Table';

export default function Wallet({WALLET_DRAWER}) {
  const WITHDRAWAL_DRAWER = useDisclosure();
  const {sessionData: LoggedInAgent} = useGetSession('a_details');
  const {sessionData: agentToken} = useGetSession('a_token');

  const storeName = LoggedInAgent?.storeName;

  const {data, isLoading, isError} = useQuery('account-transactions', () =>
    accountTransactions(agentToken, storeName)
  );
  const {data: accountInfo} = useQuery('account-info', () =>
    fetchAccountInfo(agentToken, storeName)
  );
  const openWithdraw = () => {
    WITHDRAWAL_DRAWER.onOpen();
  };

  const transactions = data?.data?.data.filter(
    nullTrans =>
      nullTrans?.transaction_type === 'commission' && nullTrans?.connected_request !== null
  );

  return (
    <>
      <Box>
        <Drawer
          isOpen={WALLET_DRAWER?.isOpen}
          onClose={WALLET_DRAWER?.onClose}
          closeOnSelect={false}
          size="sm"
          // blockScrollOnMount={false}
        >
          <DrawerOverlay />
          <DrawerContent {...drawer_style}>
            <HStack
              pb="12px"
              pt="14px"
              h="49.699px"
              bg="#F5F5F5"
              px="25px"
              justify="space-between"
              align="center"
              position="relative"
            >
              <Heading fontSize="18.9px" fontWeight="700" display={'flex'} gap="5">
                {/* <Image
                  src={backArrow.src}
                  alt="back button"
                  onClick={WALLET_DRAWER?.onClose}
                  cursor="pointer"
                /> */}
                Commission
              </Heading>
              <HStack spacing="15px">
                <VStack
                  position="relative"
                  justify="center"
                  align="center"
                  w="30px"
                  h="30px"
                  borderRadius="5px"
                  transition="0.3s ease-in-out"
                  _hover={{
                    width: '30px',
                    height: '30px',
                  }}
                >
                  <DrawerCloseButton
                    right="0px"
                    left="0px"
                    my="auto"
                    color="#000"
                    top="0"
                    bottom="0"
                    border={'none'}
                    boxShadow="none"
                    _focus={{boxShadow: 'none', border: ' none'}}
                  />
                </VStack>
              </HStack>
            </HStack>

            <VStack w="full" bg="#fff" p={`56px 24px`}>
              <Text
                color={'#52525B'}
                fontSize="13px"
                fontWeight={{base: `400`}}
                lineHeight={{base: `150%`}}
                letterSpacing={{base: `0.26px`}}
              >
                Total Commission Received
              </Text>
              <Text color={'#27272A'} fontSize={'33px'} fontWeight={600} lineHeight={`130%`}>
                {formatToCurrency(accountInfo?.data?.naira_balance)}
              </Text>
              {/* <Button
                onClick={openWithdraw}
                rightIcon={<Image src={withdrawIcon.src} alt="wallet icon" />}
                borderRadius={'full'}
                bg="#191919"
                width={'70%'}
                color="#fff"
                py="6"
                height={'40px'}
                _hover={{bg: '#191919'}}
              >
                Withdraw
              </Button> */}
            </VStack>
            <Box
              bg="#f5f5f5"
              p="12px 20px"
              color={`#27272A`}
              fontSize={`16px`}
              fontWeight={`500`}
              lineHeight={`140%`}
              letterSpacing={`0.16px`}
            >
              <Text>Transaction History</Text>
            </Box>
            <VStack overflow={'auto'} pt="2">
              {!transactions?.length ? (
                <EmptyState
                  text="No Transactions"
                  description="Looks like no transactions have been made"
                  p={{base: '24px', md: '52px'}}
                  bg="#fff"
                  borderRadius="9px"
                />
              ) : (
                transactions?.map(trans => (
                  <Flex
                    key={trans?.id}
                    width={'85%'}
                    height={'76px'}
                    borderBottom={'0.5px solid #D1D1D6'}
                    py={`16px`}
                    alignItems={'center'}
                    gap={`16px`}
                  >
                    <Center
                      boxSize={`40px`}
                      minWidth={`40px`}
                      borderRadius={`50%`}
                      border={`0.3px solid`}
                      borderColor={`#E4E4E7 !important`}
                      background={`#FAFAFA`}
                    >
                      <TransactionIcon boxSize="16px" transaction_type={trans?.transaction_type} />
                    </Center>
                    <Flex justifyContent={'space-between'} flex={`1`}>
                      <Stack gap={`4px`}>
                        <Text
                          color={'#3F3F46'}
                          fontSize="16px"
                          fontWeight={`600`}
                          lineHeight={`140%`}
                          letterSpacing={`0.16px`}
                        >
                          {trans?.transaction_type === 'commission'
                            ? 'Commission received'
                            : 'Withdrawal'}
                        </Text>
                        <Text
                          color={'#52525B'}
                          fontSize={`13px`}
                          fontWeight={`400`}
                          lineHeight={`150%`}
                          letterSpacing={`0.26px`}
                        >
                          {trans?.transaction_type === 'commission'
                            ? trans?.connected_request?.unit?.unit_title
                            : `To ${trans?.bank_name}`}
                        </Text>
                      </Stack>
                      <Stack
                        fontSize={'16px'}
                        gap={`6px`}
                        align={`flex-end`}
                        lineHeight={`150%`}
                        letterSpacing={`0.26px`}
                      >
                        <Text fontWeight="600" color={`#3F3F46`}>
                          {formatToCurrency(trans?.amount)}
                        </Text>
                        {trans?.connected_request?.percentage_paid && (
                          <Text color={`#52525B`} fontWeight={`400`}>
                            {trans?.connected_request?.percentage_paid}%
                          </Text>
                        )}
                      </Stack>
                    </Flex>
                  </Flex>
                ))
              )}
            </VStack>
          </DrawerContent>
        </Drawer>
      </Box>
      <WithdrawalModal drawerDisclosure={WITHDRAWAL_DRAWER} walletDrawer={WALLET_DRAWER} />
    </>
  );
}
