import {Box, Center, HStack, Stack, Text, VStack} from '@chakra-ui/react';

export const home_banner_style = {
  w: 'full',
  bg: 'matador_background.200',
  color: `text`,
  mx: 'auto',
  boxShadow: '0px 1px 2px 0px rgba(16, 24, 40, 0.05)',
  justify: 'space-between',
  p: {base: '16px', md: '12px'},
  minW: {md: `544px`},
  borderRadius: `4px`,
  border: `1px solid`,
  borderColor: `custom_color.opacity._20`,
  boxShadow: `0px 20px 24px -4px rgba(16, 24, 40, 0.08), 0px 8px 8px -4px rgba(16, 24, 40, 0.03)`,
};
export const home_banner_title_style = {
  fontSize: {base: '12px', md: '20px'},
  fontWeight: {base: 500},
  lineHeight: `130%`,
};
export const home_banner_text_style = {
  fontSize: {base: '11px', md: '14px'},
  fontWeight: 400,
  lineHeight: `140%`,
};
export const home_banner_icon_style = {
  p: {base: '4px', md: '5px'},
  justify: 'center',
  align: 'center',
  pos: `relative`,
  overflow: `hidden`,
  boxSize: {base: `43px`},
  borderRadius: `50%`,
  minW: `43px`,
  bg: `custom_color.opacity._10`,
};

export const HomeBanner = ({handleClick, title, text, icon, action = `View`}) => {
  return (
    // <Stack {...home_banner_style}>
    //   <HStack w="80%" spacing={{base: '3px', md: '16px'}} align={`flex-start`}>
    //     <Center {...home_banner_icon_style}>{icon}</Center>
    //     <VStack align={'flex-start'} spacing={0}>
    //       <Text {...home_banner_title_style}>{title}</Text>
    //       <Text {...home_banner_text_style}>{text}</Text>
    //     </VStack>
    //   </HStack>

    //   <HStack spacing={{base: '8px', md: '18px'}} pr="4px" justify={`flex-end`}>
    //     <Text
    //       color="custom_color.color"
    //       onClick={handleClick}
    //       boxShadow="0px 1px 2px 0px rgba(16, 24, 40, 0.05)"
    //       fontSize={{base: '13px', md: 'unset'}}
    //       fontWeight={{base: '500', md: 'unset'}}
    //       cursor={`pointer`}
    //     >
    //       {action || `View`}
    //     </Text>
    //   </HStack>
    // </Stack>
    <HStack
      background={`#191919`}
      color={`#D0D5DD`}
      box-shadow={`0px 20px 24px -4px rgba(16, 24, 40, 0.08), 0px 8px 8px -4px rgba(16, 24, 40, 0.03)`}
      textAlign={`center`}
      flexWrap={`wrap`}
      p={`25px`}
      fontSize={`16px`}
      fontWeight={`500`}
      lineHeight={`140%`}
      letterSpacing={`0.16px`}
      justify={`center`}
    >
      <Text>
        {title} {text} {` `}
        <Box
          as={`span`}
          onClick={handleClick}
          fontSize={{base: '13px', md: 'unset'}}
          fontWeight={{base: '500', md: 'unset'}}
          cursor={`pointer`}
          textDecor={`underline`}
        >
          {action || `View`}
        </Box>
      </Text>
    </HStack>
  );
};
