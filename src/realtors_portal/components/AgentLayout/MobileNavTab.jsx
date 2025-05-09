import {Box, ButtonGroup, Flex, Image} from '@chakra-ui/react';

export const MobileNavTab = ({link, color, sub_menu = false, isActive, handleClick = () => {}}) => {
  return (
    <Box
      borderRadius="lg"
      onClick={handleClick}
      bg={'transparent'}
      textAlign="left"
      width={'100%'}
      p="14px 12px"
      cursor={'pointer'}
    >
      <ButtonGroup isAttached variant="outline">
        <Flex
          textTransform={'capitalize'}
          fontSize="16px"
          color={color ? color : sub_menu ? '#667085' : '#000'}
          // color={color}
          fontWeight={sub_menu ? 500 : 600}
          lineHeight={`24px`}
        >
          <Image
            alt=""
            alignSelf="center"
            boxSize={'22px'}
            // src={isActive ? link.dark_iconSrc.src : link.iconSrc.src}
            src={link.iconSrc.src}
            mr="10px"
          />
          {link.name || link.linkText}
        </Flex>
      </ButtonGroup>
    </Box>
  );
};
