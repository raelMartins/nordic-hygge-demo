import {useQueryClient} from 'react-query';

const useRefetchWithKey = queryKey => {
  const queryClient = useQueryClient();

  const handleRefetch = async () => {
    await queryClient.invalidateQueries(queryKey);
  };

  return handleRefetch;
};

export default useRefetchWithKey;
