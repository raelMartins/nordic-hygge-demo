import {
  HStack,
  Image,
  Menu,
  MenuButton,
  MenuList,
  Stack,
  Text,
  VStack,
  useDisclosure,
} from '@chakra-ui/react';
import React from 'react';
import {priceString} from '/src/realtors_portal/utils';
import infoIcon from '/src/realtors_portal/images/icons/infoCircleForAllocation.svg';
import {formatPropertySize} from '@/realtors_portal/utils/truncateLongText';

export const UserPaymentListingInfo = ({autopay, listings_info, for_allocation, unit_info}) => {
  return (
    <HStack
      minW="1203px"
      mt="25px"
      border="solid 1.5px #4545FE"
      borderRadius="32px"
      spacing="46px"
      p="20px"
    >
      <HStack spacing="30px" pr="89px" borderRight="solid 1px #E4E4E4">
        <Image
          borderRadius="24px"
          boxSize="182px"
          objectFit="cover"
          src={listings_info?.photos?.[0]?.photo ?? ''}
          alt="listing image"
        />
        <VStack spacing="3px" justify="start">
          <Text textAlign="start" fontSize="32px" fontWeight="500" maxW="153px" color="#191919">
            {listings_info?.name ?? 'Astrid 2.0'}
          </Text>
          <Text textAlign="start" fontSize="18px" fontWeight="400" color="#606060">
            {listings_info?.status ?? 'Under constrution'}
          </Text>
        </VStack>
      </HStack>
      <HStack spacing="30px">
        <Image
          borderRadius="24px"
          boxSize="182px"
          objectFit="cover"
          src={unit_info?.photos?.[0]?.photo ?? ''}
          alt="listing image"
        />
        <VStack spacing="31px" align="start">
          <Text fontSize="24px" fontWeight="600" color="#191919">
            {unit_info?.unit_title ?? 'Astrid 2.0'}
          </Text>
          <HStack spacing="42px" w="full">
            <VStack w="full" align="start">
              <Text fontSize="14px" fontWeight="400" color="#606060">
                Unit size
              </Text>
              <Text textAlign="start" fontSize="18px" fontWeight="500" color="#191919">
                {formatPropertySize(unit_info?.unit_size ?? 400)}
              </Text>
            </VStack>
            <VStack w="full" align="start">
              <Text fontSize="14px" fontWeight="400" color="#606060">
                Unit price
              </Text>
              <Text
                fontSize="18px"
                minW="144px"
                w="full"
                fontWeight="500"
                textAlign="start"
                color="#191919"
              >
                {priceString(unit_info?.price ?? 10000)}
              </Text>
            </VStack>{' '}
            <VStack w="full" minW="119px" align="start">
              <Text fontSize="14px" fontWeight="400" color="#606060">
                Allocated unit
              </Text>
              {for_allocation?.can_allocate ? (
                <Text
                  textAlign="start"
                  fontSize="18px"
                  fontWeight="500"
                  color={!for_allocation?.allocation ? '#4545FE' : '#191919'}
                >
                  {for_allocation?.allocation ?? 'Not Allocated'}
                </Text>
              ) : (
                <MenuForAllocation />
              )}
            </VStack>
          </HStack>
        </VStack>
      </HStack>
    </HStack>
  );
};

export default UserPaymentListingInfo;

const MenuForAllocation = () => {
  const menuDisclosure = useDisclosure();
  return (
    <Menu placement="top" isOpen={menuDisclosure.isOpen} onClose={menuDisclosure.onClose}>
      <MenuButton onMouseEnter={menuDisclosure.onOpen} onMouseLeave={menuDisclosure.onClose}>
        <HStack spacing="4px">
          <Image src={infoIcon.src} alt="notify sign" />
          <Text textAlign="start" fontSize="18px" fontWeight="500" color="#FF6A6A">
            Not eligible
          </Text>
        </HStack>
      </MenuButton>
      <MenuList borderRadius="16px" p="0" maxW="361px" h="fit-content">
        <Stack borderRadius="16px" px="21px" justify="center" bg="#ffffff" h="118px">
          <Text textAlign="start" fontSize="12px" fontWeight="400" color="#3D3D3D">
            Once subscribers have made a payment equivalent to 46% of the total milestone amount,
            they will become eligible for property allocation.
          </Text>
        </Stack>
      </MenuList>
    </Menu>
  );
};
