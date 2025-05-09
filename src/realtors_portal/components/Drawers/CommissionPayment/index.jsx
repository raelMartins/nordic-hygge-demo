import {
  Center,
  Drawer,
  DrawerCloseButton,
  DrawerContent,
  DrawerOverlay,
  Flex,
  HStack,
  Stack,
  Text,
  VStack,
} from '@chakra-ui/react';
import {useQuery} from 'react-query';
import {OvalLoader} from '@/realtors_portal/components/loaders/AnimatedLoader';
import {drawer_style} from '@/realtors_portal/components/AgentLayout/drawers/drawer_style';
import {ArrowBackIcon} from '@chakra-ui/icons';
import {fetch_commision_payment_receipt} from '@/realtors_portal/api/agents';
import {EmptyState} from '../../common/Table';
import {Commission} from './Comission';
import isMobile from '@/utils/extras';

export const CommissionPaymentDrawer = ({disclosure, equityId, userId}) => {
  const handleClose = () => {
    return disclosure.onClose();
  };

  const COMMISSIONS_DATA = useQuery(
    ['commissions', equityId],
    () => fetch_commision_payment_receipt(equityId),
    {enabled: !!equityId}
  );

  const commissions = COMMISSIONS_DATA?.data?.data?.data;

  console.log({commissions});

  return (
    <Drawer
      isOpen={disclosure.isOpen}
      onClose={handleClose}
      borderRadius="16px"
      placement={isMobile ? `bottom` : 'right'}
    >
      <DrawerOverlay />
      <DrawerContent
        {...drawer_style}
        borderRadius={{base: `16px 16px 0px 0px`}}
        minH={`200px`}
        maxH={{base: `80vh`, lg: `100%`}}
        overflow={`auto`}
      >
        <HStack
          boxShadow={{
            base: `none`,
            lg: '4px 4px 8px 0px rgba(123, 157, 157, 0.05), -4px -4px 8px 0px rgba(123, 157, 157, 0.15)',
          }}
          mb="10px"
          py="12px"
          px="29px"
          justify="space-between"
          align="center"
          position="relative"
          width="full"
          fontSize="16px"
          fontWeight={600}
          color="#000000"
        >
          <Flex gap={`8px`} alignItems="center">
            <ArrowBackIcon cursor={`pointer`} onClick={handleClose} fontSize={`16px`} />
            <Text>Commission Payments</Text>
          </Flex>
          <Center position="relative" boxSize="30px">
            <DrawerCloseButton right="0px" left="0px" my="auto" color="#000" top="0" bottom="0" />
          </Center>
        </HStack>

        <Stack gap="12px" p={{base: `20px 15px`}} overflowY="auto">
          {COMMISSIONS_DATA?.isLoading ? (
            <VStack w="full" justify="center" align="center" h="20vh">
              <OvalLoader />
            </VStack>
          ) : !commissions?.length ? (
            <EmptyState
              text="No Commissions"
              description="Looks like there are no commissions yet"
              p={{base: '24px', md: '50px'}}
            />
          ) : (
            commissions?.map((el, i) => <Commission data={el} key={i} />)
          )}
        </Stack>
      </DrawerContent>
    </Drawer>
  );
};
