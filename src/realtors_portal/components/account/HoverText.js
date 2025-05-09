import {
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import React from 'react';
import {truncateLongText} from '/src/realtors_portal/utils/truncateLongText';

const HoverText = ({text, forPopUp, lens, ...rest}) => {
  const {isOpen, onToggle, onOpen, onClose} = useDisclosure();
  return (
    <Popover placement="top" autoFocus={false} isOpen={isOpen} onClose={onClose}>
      <PopoverTrigger>
        <Text
          onMouseLeave={() => (text.length <= (lens ?? 17) ? null : onClose())}
          onMouseEnter={() => (text.length <= (lens ?? 17) ? null : onOpen())}
          fontSize={'16px'}
          fontWeight="500"
          textAlign={'left'}
          cursor="default"
          pr="7px"
          wordWrap="break-word"
          textTransform="capitalize"
          {...rest}
        >
          {truncateLongText(text, lens)?.truncatedText}
        </Text>
      </PopoverTrigger>
      <PopoverContent w="fit-content">
        <PopoverArrow />
        <PopoverBody boxShadow="0 1px 4px rgba(0, 0, 0, 0.08)" borderRadius="8px">
          <Text
            w="fit-content"
            fontSize={'16px'}
            fontWeight="500"
            textAlign="center"
            whiteSpace="break-spaces"
            {...forPopUp}
          >
            {text}
          </Text>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
};

export default HoverText;
