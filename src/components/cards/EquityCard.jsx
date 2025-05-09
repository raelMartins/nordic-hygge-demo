import {Center, Flex, Text, VStack} from '@chakra-ui/react';
import Image from 'next/image';

export const EquityCard = ({equity, sub_text, title, image, handleClick}) => {
  return (
    <Flex
      direction={`column`}
      w={'full'}
      maxW="405px"
      // h={{base: '98px', md: '104px'}}
      bg="matador_background.100"
      onClick={handleClick}
      cursor="pointer"
      align={'center'}
      gap={4}
      rounded={'2px'}
      border={'1px solid'}
      borderColor={`matador_border_color.100`}
      borderRadius={`8px`}
      p={'16px'}
      textAlign={'center'}
    >
      <Center
        width={`308.454px`}
        height={`186.887px`}
        aspectRatio={{base: `308 / 187`}}
        position={`relative`}
        borderRadius={`4px`}
        overflow={`hidden`}
      >
        <Image
          alt="next_image"
          src={image || equity?.project?.photos[0]?.photo}
          fill
          style={{objectFit: `cover`}}
        />
      </Center>
      <VStack align="stretch" spacing={'4px'} px="8px" py="9px" className="heading-text-regular">
        <Text
          fontSize={`16px`}
          fontWeight="700"
          color="matador_text.100"
          lineHeight={`167%`}
          letterSpacing={`1.732px`}
          textTransform={`uppercase`}
        >
          {title || equity?.project?.name}
        </Text>
        <Text
          fontSize={{base: `16px`}}
          fontWeight="500"
          color="matador_text.400"
          lineHeight={`180%`}
        >
          {sub_text || equity?.project?.landmark}
        </Text>
      </VStack>
    </Flex>
  );
};
