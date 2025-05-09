import {Box} from '@chakra-ui/react';
import {BsBookmarkDash, BsBookmarkDashFill} from 'react-icons/bs';

export const WatchlistBookmark = ({is_watchlist, toggleWatchlist, color, ...rest}) => {
  return (
    <Box onClick={toggleWatchlist} fontSize={'28'} color={color || 'white'}>
      {is_watchlist ? <BsBookmarkDashFill /> : <BsBookmarkDash />}
    </Box>
  );
};

export default WatchlistBookmark;
