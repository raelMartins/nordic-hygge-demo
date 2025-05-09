import {
  Button,
  Heading,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  Text,
  VStack,
  useDisclosure,
} from '@chakra-ui/react';
import React from 'react';

const HoverForRejectReason = ({status, colorScheme, reason}) => {
  const {isOpen, onToggle, onClose} = useDisclosure();

  return (
    <Popover placement="top" isOpen={isOpen} onClose={onClose}>
      {/* <Button > */}
      <PopoverTrigger>
        <Button
          onMouseLeave={() => (reason ? onToggle() : null)}
          onMouseEnter={() => (reason ? onToggle() : null)}
          mt="0"
          type="button"
          px="13px"
          py="8px"
          //   notes
          bg={colorScheme[status].bg}
          color={colorScheme[status].color}
          textTransform="capitalize"
          fontSize="16px"
          fontWeight="500"
          borderRadius="48px"
        >
          {' '}
          {status}
        </Button>
      </PopoverTrigger>
      {/* </Button> */}
      <PopoverContent borderRadius="16px">
        <PopoverArrow />

        <PopoverBody
          p="20px"
          boxShadow="0 1px 4px rgba(0, 0, 0, 0.08)"
          borderRadius="16px"
          //   border="solid black 1px"
        >
          <VStack align="start" spacing="15px" w="full">
            <Heading fontSize="18px" fontWeight="700" color="#000000">
              Rejection reason
            </Heading>

            <Text
              textAlign="start"
              w="full"
              fontSize={'14px'}
              pr="7px"
              color="#000000"
              whiteSpace="break-spaces"
            >
              {reason}
            </Text>
          </VStack>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
};

export default HoverForRejectReason;
