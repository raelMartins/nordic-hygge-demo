import React from 'react';
import {Morph} from '../../../../../ui-lib/ui-lib.components/morph';
import {
  Box,
  Center,
  Flex,
  HStack,
  Image,
  Stack,
  Text,
  useMediaQuery,
  useTheme,
} from '@chakra-ui/react';
import drawerArrow from '/src/images/icons/drawerArrow.svg';
import homeGif from '/src/images/animated_icons/home.gif';
import {Button} from '@/ui-lib';

const ConfirmIcon = () => {
  const theme = useTheme();
  const color = theme?.colors?.text;
  return (
    <Box boxSize={`60px`}>
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 60 60"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M22.0329 32.1646H15.751V19.0814C15.751 18.3303 15.4293 17.7291 14.9742 17.16C17.5934 15.074 20.1942 12.9641 22.8024 10.8653C24.209 9.73359 25.6155 8.60188 27.0212 7.47109L38.8687 17.1334C38.3705 17.6326 38.0625 18.3211 38.0625 19.0814V24.7087C38.0625 26.2321 39.2972 27.4667 40.8205 27.4667C42.3438 27.4667 43.5785 26.2321 43.5785 24.7087V21.8413H45.6231C46.7898 21.8413 47.8295 21.1077 48.2212 20.0081C48.6128 18.9086 48.2699 17.6831 47.3662 16.9458L28.7772 1.78314C27.7677 0.959411 26.3198 0.954814 25.3057 1.77119L6.4611 16.9329C5.54912 17.6666 5.19977 18.8948 5.58865 19.998C5.97753 21.1012 7.02006 21.8395 8.19038 21.8395H10.2368V34.9217C10.2368 36.445 11.4715 37.6797 12.9949 37.6797H22.0347C23.5581 37.6797 24.7927 36.445 24.7927 34.9217C24.7927 33.3983 23.5562 32.1646 22.0329 32.1646Z"
          fill={color}
        />
        <path
          d="M39.6017 28.9756C31.3497 28.9756 24.6367 35.6886 24.6367 43.9397C24.6367 52.1908 31.3507 58.9047 39.6017 58.9047C47.8528 58.9047 54.5658 52.1908 54.5658 43.9397C54.5658 35.6886 47.8528 28.9756 39.6017 28.9756ZM39.6017 53.3887C34.3909 53.3887 30.1528 49.1505 30.1528 43.9397C30.1528 38.7298 34.3909 34.4916 39.6017 34.4916C44.8116 34.4916 49.0498 38.7298 49.0498 43.9397C49.0498 49.1505 44.8116 53.3887 39.6017 53.3887Z"
          fill={color}
        />
        <path
          d="M40.673 39.9361L38.1807 42.3724L37.4002 41.8061C36.1664 40.9116 34.4417 41.1874 33.5481 42.4193C32.6536 43.653 32.9285 45.3777 34.1613 46.2713L36.8247 48.2038C37.3101 48.5559 37.8782 48.7287 38.4436 48.7287C39.1442 48.7287 39.841 48.463 40.3724 47.9436L44.5287 43.881C45.6191 42.8164 45.6384 41.0697 44.5738 39.9812C43.5083 38.8909 41.7606 38.8716 40.673 39.9361Z"
          fill={color}
        />
      </svg>
    </Box>
  );
};

const ConfirmSelection = ({handleScreen, mutation, allocationVal, handleSubmitAllocation}) => {
  return (
    <Center minH={`500px`}>
      <Stack
        w="full"
        gap={{base: '24px'}}
        p={{base: `32px 17px`, lg: ` 24px 12px`}}
        bg={`matador_background.100`}
        borderColor={`matador_border_color.100`}
      >
        <Center>
          <ConfirmIcon />
        </Center>
        <Text fontSize="19px" fontWeight="500" textAlign="center" color={`text`}>
          Are you sure you want {allocationVal}?
        </Text>
        <Flex justify="space-between" gap="12px" w="full">
          <Box flex={`1`}>
            <Button
              variation="secondary"
              fontWeight="400"
              color="#F04438"
              borderColor={`#F04438`}
              bg={`transparent`}
              onClick={handleScreen('select')}
              w="full"
              p={`11px`}
              h={`100%`}
            >
              no, GO BACK
            </Button>
          </Box>
          <Button
            variation="primary"
            isLoading={mutation.isLoading}
            onClick={handleSubmitAllocation}
            w="full"
            boxStyle={{width: `100%`, flex: `1`}}
            p={`11px`}
          >
            Proceed
          </Button>
        </Flex>
      </Stack>
    </Center>
  );
};

export default ConfirmSelection;
