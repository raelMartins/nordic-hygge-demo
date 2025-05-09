import React from 'react';
import {Center, Heading, HStack, Image, Text} from '@chakra-ui/react';
import {useRouter} from 'next/router';
import {IoChevronBack} from 'react-icons/io5';

export const BackArrowWithText = ({text}) => {
  const router = useRouter();
  return (
    <HStack onClick={() => router.back()}>
      <Center
        p={`13px`}
        borderRadius={`50%`}
        boxSize={`50px`}
        minW={`50px`}
        bg={`#F4F4F5`}
        border={`1px solid`}
        borderColor={`#E4E4E7`}
        fontSize={{base: `19x`, lg: `24px`}}
      >
        <IoChevronBack />
      </Center>
      <Heading>{text}</Heading>
    </HStack>
  );
};

export const GoBack = ({handleBack, text = `Back`, ...rest}) => {
  const router = useRouter();

  const handle_click = () => {
    handleBack ? handleBack() : router.back();
  };
  return (
    <HStack
      onClick={handle_click}
      cursor={`pointer`}
      gap={`12px`}
      display={{base: 'none', lg: 'flex'}}
      {...rest}
    >
      <Center
        p={`13px`}
        borderRadius={`50%`}
        boxSize={`50px`}
        minW={`50px`}
        bg={`#F4F4F5`}
        border={`1px solid`}
        borderColor={`#E4E4E7`}
        fontSize={{base: `19x`, lg: `24px`}}
      >
        <IoChevronBack />
      </Center>
      <Text
        color={{base: `#000`}}
        textAlign={{base: `center`}}
        fontSize={{base: `19x`, lg: `23px`}}
        fontWeight={{base: `600`}}
        lineHeight={{base: `130%`}}
      >
        {text}
      </Text>
    </HStack>
  );
};
