import { Box, Center, Flex, Text } from '@chakra-ui/react';

export const handleTagType = (type) => {
  let val = type.toLowerCase();
  switch (val) {
    case 'completed':
      return (
        <Center bg='rgba(8, 195, 143, 0.20)' borderRadius='full' h='fit-content' w='fit-content' px={{ base: '6px', md: '10px' }} py={{ base: '2px', md: '4px' }}>
          <Text fontSize={{ base: '7px', md: '14px' }} display={'inline'} noOfLines={1} fontWeight={500} mx='auto' color='#08C38F'>Completed</Text>
        </Center>
      );
    case 'in-construction':
      return (
        <Center bg='rgba(69, 69, 254, 0.20)' borderRadius='full' h='fit-content' w='fit-content' px={{ base: '6px', md: '10px' }} py={{ base: '2px', md: '4px' }}>
          <Text fontSize={{ base: '7px', md: '14px' }} display={'inline'} noOfLines={1} fontWeight={500} mx='auto' color='#4545FE'>In-construction</Text>
        </Center>
      );
    case 'sold-out':
      return (
        <Center bg='rgba(255, 0, 0, 0.20)' borderRadius='full' h='fit-content' w='fit-content' px={{ base: '6px', md: '10px' }} py={{ base: '2px', md: '4px' }}>
          <Text fontSize={{ base: '7px', md: '14px' }} display={'inline'} noOfLines={1} fontWeight={500} mx='auto' color='#FF0000'>Sold out</Text>
        </Center>
      );
    case 'proposed':
      return (
        <Center bg='rgba(144, 19, 254, 0.20)' borderRadius='full' h='fit-content' w='fit-content' px={{ base: '6px', md: '10px' }} py={{ base: '2px', md: '4px' }}>
          <Text fontSize={{ base: '7px', md: '14px' }} display={'inline'} noOfLines={1} fontWeight={500} mx='auto' color='#9013FE'>Proposed</Text>
        </Center>
      );

    case 'selling':
      return (
        <Center bg='rgba(250, 100, 0, 0.20)' borderRadius='full' h='fit-content' w='fit-content' px={{ base: '6px', md: '10px' }} py={{ base: '2px', md: '4px' }}>
          <Text fontSize={{ base: '7px', md: '14px' }} display={'inline'} noOfLines={1} fontWeight={500} mx='auto' color='#FA6400'>Selling</Text>
        </Center>
      );

    default:
      break;
  }
};
