import {HStack, Button, Image, Text, VStack} from '@chakra-ui/react';
import Carousel, {consts} from 'react-elastic-carousel';
import React from 'react';
import HoverText from '@/ui-lib/ui-lib.components/hover/hoverOnText';

import {FaChevronRight} from 'react-icons/fa6';
import {Icon} from '@chakra-ui/react';
const StackHoldersForFractional = ({stackHolders}) => {
  const customScrollbarStyles = {
    '&::-webkit-scrollbar': {
      width: '4px',
      height: '4px',
      borderRadius: '16px',
    },
    '&::-webkit-scrollbar-track': {
      borderRadius: '16px',
      WebkitBoxShadow: 'inset 0 0 6px transparent',
    },
    '&::-webkit-scrollbar-thumb': {
      borderRadius: '16px',
      backgroundColor: ' rgba(255, 255, 255, 0.1) ',
      // outline: "1px solid slategrey", // You can include this line if needed
    },
  };

  const customCarouselStyles = {
    '.rec-slider-container': {
      margin: '0px 0px',
    },
    '.rec-item-wrapper': {
      // display: 'flex',
      // 'justify-content': 'start',
      width: '275px !important',
    },
    '.rec-swipable': {
      display: 'flex',
      'justify-content': 'start',
      gap: '13px',
    },
  };

  const breakPoints = [{width: 1, itemsToShow: 3}];

  const renderArrows = ({type, onClick, isEdge}) => {
    const pointer =
      type === consts.PREV ? (
        <HStack
          boxSize="36px"
          justify="center"
          backdropFilter="blur(4px)"
          align="center"
          p="8px"
          bg="#e5e5e5"
          borderRadius="full"
        >
          <Icon boxSize="15px" as={FaChevronRight} transform="rotate(180deg)" />
        </HStack>
      ) : (
        <HStack
          boxSize="36px"
          justify="center"
          backdropFilter="blur(4px)"
          align="center"
          p="8px"
          bg="#e5e5e5"
          borderRadius="full"
        >
          <Icon boxSize="15px" as={FaChevronRight} />
        </HStack>
      );

    return (
      <Button
        onClick={onClick}
        minW="fit-content"
        maxW="fit-content"
        bg="transparent"
        _hover={{bg: 'transparent'}}
        _active={{bg: 'transparent'}}
        _focus={{bg: 'transparent'}}
        p="0px"
        pr="0px"
        left={type === consts.PREV ? '16px' : 'initial'}
        right={type === consts.PREV ? 'initial' : '16px'}
        zIndex={2}
        top="50%"
        transform="translateY(-50%)"
        position="absolute"
        h="fit-content"
        isDisabled={isEdge}
        visibility={isEdge ? 'hidden' : 'visible'}
      >
        {pointer}
      </Button>
    );
  };
  return (
    <HStack
      w="full"
      overflowX="auto"
      position="relative"
      // sx={customScrollbarStyles}
      sx={customCarouselStyles}
    >
      <Carousel
        pagination={false}
        itemPadding={[0, 0, 0, 0]}
        enableAutoPlay={false}
        breakPoints={breakPoints}
        renderArrow={renderArrows}
      >
        {stackHolders.map((item, idx) => (
          <VStack
            key={idx}
            h="86.718px"
            spacing="2px"
            px="27px"
            justify="center"
            w="275px"
            //   mb="3px"
            borderRadius="5px"
            border="0.5px solid  #e4e4e4"
          >
            <HoverText
              lens={[10, 27]}
              text={item?.stakeholder_type ?? ''}
              fontSize="14px"
              wordBreak="keep-all"
              wordWrap="normal"
              whiteSpace="nowrap"
              textAlign="start"
              fontWeight="400"
              color="text"
            />

            <HoverText
              lens={[10, 30]}
              textAlign="start"
              wordBreak="keep-all"
              wordWrap="normal"
              whiteSpace="nowrap"
              text={item?.stakeholder_name ?? ''}
              fontSize="14px"
              fontWeight="500"
              color="text"
            />
          </VStack>
        ))}
      </Carousel>
    </HStack>
  );
};

export default StackHoldersForFractional;
