import {useState} from 'react';
import {Box, HStack, Image, Text, Heading, useToast, Button, Center} from '@chakra-ui/react';
import backArrow from '@/realtors_portal/images/icons/back-arrow.png';
import {useQuery} from 'react-query';
import {useRouter} from 'next/router';
import {CSVLink} from 'react-csv';
import downloadIcon from '@/realtors_portal/images/icons/download-icon.svg';
import {FRACTIONAL_TXNS_COLUMNS} from '@/realtors_portal/constants/listings';
import FractionalTxnHeader from '@/realtors_portal/components/listings/ListingInfo.components/ListingInfo.details/FractionalTxnHeader';
import AgentsLayoutView from '@/realtors_portal/components/AgentLayout/View';
import {Fractional} from '@/realtors_portal/api/agents';
import {MatadorCustomTable} from '@/realtors_portal/components/Table/Table';
import SortBy from '@/realtors_portal/components/assets/SortBy';
import {changeDateFormat} from '@/realtors_portal/utils/formatDate';
import {OvalLoader} from '@/realtors_portal/components/loaders/AnimatedLoader';
import useGetSession from '@/utils/hooks/getSession';
import {GoBack} from '@/realtors_portal/components/assets/BackArrow';
import {RButton} from '@/realtors_portal/ui-lib';

export const TransactionFractionalBreakdown = () => {
  const toast = useToast();
  const {query} = useRouter();
  const [addedParam, setAddedParam] = useState('');
  const [isCollapsed, setIsCollapsed] = useState(false);

  const {sessionData: LoggedInAgent} = useGetSession('a_details');
  const {sessionData: agentToken} = useGetSession('a_token');

  const storeName = LoggedInAgent?.storeName;

  const handleExpand = () => {
    return setIsCollapsed(!isCollapsed);
  };

  const param = query.id + addedParam;

  const TRANSACTIONS = useQuery(['fractional_listings_agents', param], () => Fractional(param));
  const FractionalTxns = TRANSACTIONS && TRANSACTIONS?.data?.data?.data;
  const router = useRouter();

  const getDataFromJSON = data => {
    const result = [];
    for (var i = 0; i < data?.length; i++) {
      data &&
        result.push({
          name: `${data[i].owner?.first_name} ${data[i].owner.last_name}`,
          'No. of fractional': data[i]?.amount,
          'Purchase Price': data[i]?.purchase_price,
          'Fractional value': data[i]?.equity_value,
          Date: changeDateFormat(data[i]?.created_at),
        });
    }
    return result;
  };

  const sort_params = [
    'Total Purchase Highest to Lowest',
    'Total Purchase Lowest to Highest',
    'Highest no. of Fractions to Lowest',
    'Lowest no. of Fractions to Highest',
  ];

  return (
    <div>
      <AgentsLayoutView
        isLoading={TRANSACTIONS?.isFetching}
        isError={TRANSACTIONS?.isError}
        error={TRANSACTIONS?.error}
      >
        <Box>
          <HStack py={{base: `24px`}}>
            <GoBack
              text={query?.name ? query?.name + ' Fractional' : 'Back'}
              display={{base: `flex`}}
            />
          </HStack>
          {!isCollapsed && <FractionalTxnHeader data={TRANSACTIONS?.data?.data?.overview} />}
          <HStack mb="18px" mt="25px" w="full"></HStack>
          <MatadorCustomTable
            isManageAgentEmpty="Oops! you don't have any data yet."
            handleExpand={handleExpand}
            isCollapsed={isCollapsed}
            // dontExpand
            downloadcsv={
              <CSVLink data={getDataFromJSON(FractionalTxns)}>
                <RButton
                  variation={`tertiary`}
                  w="max-content"
                  h={`max-content`}
                  color="#4545FE"
                  borderRadius="8px"
                  bg="#ffffff"
                  fontWeight="400"
                  fontSize="14px"
                  lineHeight="18px"
                  p={`10px`}
                >
                  <Image w="18px" h="18px" src={downloadIcon.src} alt="" />
                </RButton>
              </CSVLink>
            }
            nextPageUrl={'/agents/users/user_payment_breakdown_autopay'}
            sortBy={
              <SortBy
                sort_params={sort_params}
                url={addedParam}
                setUrl={setAddedParam}
                sortFor="fractional"
                hideText
              />
            }
            headerSpace="evenly"
            DATA={FractionalTxns}
            COLUMNS={FRACTIONAL_TXNS_COLUMNS(FractionalTxns)}
            border={{base: 'solid 1px #e4e4e4'}}
            overflow={`hidden`}
          />
        </Box>
      </AgentsLayoutView>
    </div>
  );
};

export default TransactionFractionalBreakdown;
