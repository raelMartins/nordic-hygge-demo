import {Tag, TagLabel} from '@chakra-ui/react';

export const handlePaymentTransactionType = type => {
  let val = type.toLowerCase();
  switch (val) {
    case 'equity_outright':
      return (
        <Tag
          //   w="130px"
          px="16px"
          //   variant="outline"

          color="#5451FF"
          border="none"
          bg="#E4EFFF"
          borderRadius="full"
          h="36px"
        >
          <TagLabel mx="auto">Outright payment</TagLabel>
        </Tag>
      );
      break;
    case 'equity_plan_initial':
      return (
        <Tag
          px="16px"
          color="#08C38F"
          colorScheme="#E4EFFF"
          bg="#ECFFFA"
          border="none"
          borderRadius="full"
          h="36px"
        >
          <TagLabel mx="auto">Initial deposit</TagLabel>
        </Tag>
      );
      break;
    case 'equity_plan_deposit':
      return (
        <Tag
          //   w="130px"
          px="16px"
          //   variant="outline"

          color="#5451FF"
          border="none"
          bg="#E4EFFF"
          borderRadius="full"
          h="36px"
        >
          <TagLabel mx="auto">Top up</TagLabel>
        </Tag>
      );
      break;
    case 'recurring':
      return (
        <Tag
          //   w="130px"
          px="16px"
          //   variant="outline"

          color="#5451FF"
          border="none"
          bg="#E4EFFF"
          borderRadius="full"
          h="36px"
        >
          <TagLabel mx="auto">Recurring</TagLabel>
        </Tag>
      );
      break;
    case 'outright payment':
      return (
        <Tag
          //   w="130px"
          px="16px"
          color="#5451FF"
          border="none"
          bg="#E4EFFF"
          borderRadius="full"
          h="36px"
        >
          <TagLabel mx="auto">Outright payment</TagLabel>
        </Tag>
      );
      break;

    default:
      break;
  }
  if (val.slice(0, 6) == 'shared') {
    return (
      <Tag w="130px" colorScheme="blue" borderRadius="full" h="36px">
        <TagLabel mx="auto">Shared payment</TagLabel>
      </Tag>
    );
  }
};
