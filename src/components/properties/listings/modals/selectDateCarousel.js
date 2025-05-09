import {Box, Center, HStack, Text, VStack} from '@chakra-ui/react';
import React from 'react';
import {IoChevronBack, IoChevronForward} from 'react-icons/io5';

const SelectDateCarousel = ({mainDate, handleSelectedDate}) => {
  const getDatesArray = weeks => {
    const datesArray = [];
    const currentDate = new Date();
    const numberOfDays = weeks * 7;

    for (let i = 0; i <= numberOfDays; i++) {
      const newDate = new Date(currentDate);
      newDate.setDate(currentDate.getDate() + i);

      //create date array obj

      const dateArrayObj = {
        date: newDate.toISOString().split('T')[0],
        dayOfWeek: newDate.toLocaleString('en-US', {weekday: 'long'}),
        month: newDate.toLocaleString('en-US', {month: 'short'}),
        dayOfMonth: newDate.getDate(),
      };

      datesArray.push(dateArrayObj);
    }

    return datesArray;
  };
  const customScrollbarStyles = (trackColor = '#fff', thumbColor = '#cbcbcb') => ({
    '&::-webkit-scrollbar': {
      borderRadius: '16px',
      height: '2px',
    },
    '&::-webkit-scrollbar-track': {
      borderRadius: '16px',
      WebkitBoxShadow: `inset 0 0 6px ${trackColor}`,
    },
    '&::-webkit-scrollbar-thumb': {
      borderRadius: '16px',
      backgroundColor: thumbColor,
    },
  });

  const listOfDates = getDatesArray(3);

  const goBack = () => {
    const slider = document.getElementById(`date_slider`);
    slider.scrollBy(-200, 0);
  };

  const goForward = () => {
    const slider = document.getElementById(`date_slider`);
    slider.scrollBy(200, 0);
  };

  return (
    <Box position={`relative`} color={`#fff`}>
      <Center
        position={`absolute`}
        cursor={`pointer`}
        color={`#fff`}
        fontSize={`18px`}
        top={`0px`}
        bottom={`0px`}
        left={`-20px`}
        onClick={goBack}
      >
        <IoChevronBack />
      </Center>
      <Center
        position={`absolute`}
        cursor={`pointer`}
        color={`#fff`}
        fontSize={`18px`}
        top={`0px`}
        bottom={`0px`}
        right={`-20px`}
        onClick={goForward}
      >
        <IoChevronForward />
      </Center>
      <HStack
        id={`date_slider`}
        w="full"
        sx={customScrollbarStyles()}
        borderColor={'matador_border_color.100'}
        spacing="30px"
        overflowX="auto"
        scrollBehavior={`smooth`}
        scrollSnapType={`x mandatory`}
        css={{
          '&::-webkit-scrollbar': {
            display: 'none',
          },
        }}
      >
        {listOfDates.map((info, idx) => (
          <VStack
            key={idx}
            role="button"
            transition="0.4s ease-in-out"
            bg="#1C1C2A"
            border={`1px solid`}
            borderColor={mainDate === info.date ? 'custom_color.dark_background_pop' : '#24242B'}
            onClick={() => handleSelectedDate(info.date)}
            h="100px"
            opacity={mainDate === info.date ? '1' : '1'}
            minW="100px"
            maxW="100px"
            justify="center"
            p="16px"
            scrollSnapAlign={`start`}
            // scrollSnapStop={`always`}
          >
            <Text className="heading-text-regular" fontSize="13px" fontWeight="300">
              {info.dayOfWeek}
            </Text>
            <Text className="heading-text-regular" fontSize="23px" fontWeight="400">
              {info.dayOfMonth}
            </Text>
            <Text className="heading-text-regular" fontSize="13px" fontWeight="300">
              {info.month}
            </Text>
          </VStack>
        ))}
      </HStack>
    </Box>
  );
};

export default SelectDateCarousel;
