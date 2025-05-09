import {useMutation, useQuery} from 'react-query';
import {fetchWatchlist, toggleWatchlistApi} from '../../api/watchlist';
import {useToast} from '@chakra-ui/react';
import {CustomToast} from '../ui-lib.components/Toast';
import {useCustomToast} from '@/components/CustomToast';

const useWatchlist = ({info, refetch}) => {
  const toast = useCustomToast();
  const {data: watchlistData, refetch: watchlistRefetch} = useQuery(
    ['waitlistipoiid'],
    fetchWatchlist
  );
  const watchlist = watchlistData?.data?.watchlist;

  const isWatchlisted = watchlist?.find(ppt => ppt?.project?.id === info?.id);

  const toggleWatchlistMutation = useMutation(body => toggleWatchlistApi(body.id), {
    onSuccess: async res => {
      console.log('res', res);
      toast({
        render: () => <CustomToast description={`${info?.name} ${res?.data?.message}`} />,
        duration: 4000,
        isClosable: true,
        position: 'top-right',
      });
      if (refetch) await refetch();
      await watchlistRefetch();
    },
    onError: err => {
      toast({
        title: 'An error occured',
        description: `${err?.code} : ${err?.message}`,
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: 'top-right',
      });
    },
  });

  const toggleWatchlist = e => {
    if (toggleWatchlistMutation.isLoading) return;
    e?.stopPropagation();
    return toggleWatchlistMutation.mutate({id: info?.id});
  };

  const addToWatchlist = e => {
    if (toggleWatchlistMutation.isLoading) return;
    e?.stopPropagation();
    if (isWatchlisted) return;
    return toggleWatchlistMutation.mutate({id: info?.id});
  };

  const removeFromWatchlist = e => {
    if (toggleWatchlistMutation.isLoading) return;
    e?.stopPropagation();
    if (!isWatchlisted) return;
    return toggleWatchlistMutation.mutate({id: info?.id});
  };

  return {
    toggleWatchlist,
    addToWatchlist,
    removeFromWatchlist,
    isWatchlisted,
    isWatchlistLoading: toggleWatchlistMutation.isLoading,
  };
};

export default useWatchlist;
