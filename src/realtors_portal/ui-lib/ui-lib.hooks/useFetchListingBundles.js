import {useQuery} from 'react-query';
// import { fetchAllListingBundles } from "@/realtors_portal/api/listings";
import {fetchAllListingBundles} from '@/realtors_portal//api/agents';
import {AnimatedLoader} from '@/realtors_portal/components/loaders/AnimatedLoader';
import useGetSession from '@/utils/hooks/getSession';
import {useRealtorToast} from '@/realtors_portal/utils/Hook/useRealtorsToast';

export const useFetchListingBundles = id => {
  const toast = useRealtorToast();

  const {sessionData: LoggedInAgent} = useGetSession('a_details');
  const {sessionData: agentToken} = useGetSession('a_token');

  const storeName = LoggedInAgent?.storeName;

  const {data, isError, isLoading} = useQuery(['listingBundles', id], () =>
    fetchAllListingBundles(id, storeName, agentToken)
  );
  if (isLoading) {
    return <AnimatedLoader />;
  }
  if (isError) {
    return toast({title: `Kindly refresh the page' `, status: 'error'});
  }

  return {
    listingBundles: data.data.results,
    isLoading,
    isError,
  };
};
