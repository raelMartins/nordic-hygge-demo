import {Space} from './Space';
import {Center, Stack, useMediaQuery, Flex, Text, Box} from '@chakra-ui/react';
import {useQuery} from 'react-query';
import {Spinner} from '@/ui-lib';
import NotificationList from './NotificationList';
import {fetchNotifs, fetchSpace} from '@/api/FetchNotif';
import {drawer_title_styles} from '../navbar/Navbar';
import ThreeDots from '../loaders/ThreeDots';

export const Main = ({onNotClose, onDrawerOpen, setRequestInfo, setType, isSpace, setIsSpace}) => {
  const {data, isLoading: notificationLoading, refetch} = useQuery(['notifs'], fetchNotifs);
  const {data: spaceData, isLoading: spaceLoading} = useQuery(['spaces'], fetchSpace);
  const [isMobile] = useMediaQuery('(max-width: 767px)');
  const dateOrTimeAgo = (ts, data) => {
    const d = new Date(); // Gets the current time
    const nowTs = Math.floor(d.getTime() / 1000); // getTime() returns milliseconds, and we need seconds, hence the Math.floor and division by 1000
    const seconds = nowTs - Math.floor(new Date(ts).getTime() / 1000);

    // more that two days
    if (seconds >= 2 * 24 * 3600) {
      let datee = '';
      data
        ? (datee = data)
        : (datee = `${new Date(ts).getDate().toString().padStart(2, '0')}/${(
            new Date(ts).getMonth() + 1
          )
            .toString()
            .padStart(2, '0')}/${new Date(ts).getFullYear().toString()}`);
      return datee;
    }
    // a day
    if (seconds > 24 * 3600) {
      return 'Yesterday';
    }

    if (seconds > 3600) {
      const h = seconds / 3600;
      return `${Math.floor(h)} hour${h > 1 ? 's' : ''} ago`;
    }

    if (seconds > 60) {
      const m = seconds / 60;
      return `${Math.floor(m)} minute${m > 1 ? 's' : ''} ago`;
    }
  };

  return (
    <Box display={`flex`} flexDir={`column`} w="full" h={`100%`}>
      <Flex {...drawer_title_styles}>
        <Text>Notification Centre</Text>
      </Flex>
      <Stack spacing={'0px'} stretch overflowY="auto">
        {notificationLoading ? (
          <Center w="full" h="300px">
            {/* <Spinner disableAbsoluteCenteredSpinner h={`50px`} w={`50px`} /> */}
            <ThreeDots />
          </Center>
        ) : (
          <NotificationList dateOrTimeAgo={dateOrTimeAgo} data={data} />
        )}
      </Stack>
      {/* {isMobile && <Footer />} */}
    </Box>
  );
};

export default Main;
