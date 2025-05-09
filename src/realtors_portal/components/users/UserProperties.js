import {Box, HStack, Stack} from '@chakra-ui/react';
import {useRouter} from 'next/router';
import {AdditionalInfo} from './Additional_info';
import {UserAddress} from './User_address';
import UserEquities from './User_equity';
import {Inspection} from './inspection';
import {GoBack} from '../assets/BackArrow';

export default function UserProperties({customerInfo, ...rest}) {
  const {query} = useRouter();

  console.log({customerInfo});

  return (
    <Stack flex={`1`} minH="100vh" gap={{base: `20px`, md: `30px`}} {...rest}>
      <UserEquities customerInfo={customerInfo?.customer_investments} />
      <Inspection
        id={query.id}
        customerInfo={customerInfo}
        data={customerInfo?.inspection_requests?.ongoing}
        isClosed={customerInfo?.inspection_requests?.closed?.length > 0}
        closedRequests={customerInfo?.inspection_requests?.closed}
      />
      <UserAddress customerInfo={customerInfo?.user_info} />
      <AdditionalInfo customerInfo={customerInfo} />
    </Stack>
  );
}
