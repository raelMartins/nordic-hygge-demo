import {Box, Flex, Grid, HStack, Heading, Text, VStack, useTheme} from '@chakra-ui/react';
import {Button} from '../../../../ui-lib';

export const ColorToggler = ({changeColors = () => {}}) => {
  const theme = useTheme();
  // const colors = ['lightgray', 'teal', 'purple', 'navy'];
  const colors = [
    {bg: 'lightgray', text: '#000'},
    {bg: 'teal', text: '#fff'},
    {bg: 'purple', text: '#fff'},
    {bg: 'navy', text: '#fff'},
    {bg: 'red', text: '#fff'},
    {bg: '#362FD9', text: '#fff'},
    {bg: '#19518D', text: '#fff'},
    {bg: '#932128', text: '#fff'},
    {bg: '#FAB702', text: '#fff'},
    {bg: '#800080', text: '#fff'},
    {bg: '#719150', text: '#fff'},
    {bg: '#719150', text: '#fff'},
    {bg: '#0C5738', text: '#fff'},
    {bg: '#CBCBCB', text: '#000'},
    {bg: '#F77925', text: '#fff'},
    {bg: '#A37F26', text: '#fff'},
    {bg: '#A96C40', text: '#fff'},
    {bg: '#AD857E', text: '#fff'},
  ];
  return (
    <Box w="100%" maxW={'500px'} color="matador_text.100">
      <Heading fontSize={'18px'} mb="20px">
        Colors
      </Heading>
      <HStack>
        <VStack w="100%" alignItems="flex-start">
          <Flex gap={'10px'} align={'center'} mb="20px">
            <Text fontSize={'14px'}>Primary Button</Text>
            <Button bg="matador_button_bg.100" color="matador_button_text.100">
              Test Button
            </Button>
          </Flex>
          <Grid templateColumns={`repeat(5,1fr)`} gap={'10px'}>
            {colors.map((el, i) => (
              <Box
                key={i}
                aspectRatio={'1 / 1'}
                bg={el.bg}
                w="50px"
                h="50px"
                // w="20px"
                cursor={'pointer'}
                borderRadius={'10px'}
                onClick={
                  () =>
                    changeColors({
                      primary: el.bg,
                      matador_button_bg: {...theme.colors.matador_button_bg, 100: el.bg},
                      matador_button_text: {...theme.colors.matador_button_text, 100: el.text},
                    })
                  // changeColors({matador_button_bg: {100: el}})
                }
              ></Box>
            ))}
          </Grid>
        </VStack>
        <VStack w="100%" alignItems="flex-start">
          <Flex gap={'10px'} align={'center'} mb="20px">
            <Text fontSize={'14px'}>Secondary Button</Text>
            <Button bg="matador_button_bg.200" color="matador_button_text.200">
              Test Button
            </Button>
          </Flex>
          <Grid templateColumns={`repeat(5,1fr)`} gap={'10px'}>
            {colors.map((el, i) => (
              <Box
                key={i}
                aspectRatio={'1 / 1'}
                bg={el.bg}
                w="50px"
                h="50px"
                // w="20px"
                cursor={'pointer'}
                borderRadius={'10px'}
                onClick={
                  () =>
                    changeColors({
                      matador_button_bg: {...theme.colors.matador_button_bg, 200: el.bg},
                      matador_button_text: {...theme.colors.matador_button_text, 200: el.text},
                    })
                  // changeColors({matador_button_bg: {200: el}})
                }
              ></Box>
            ))}
          </Grid>
        </VStack>
      </HStack>
    </Box>
  );
};
