import {useState} from 'react';
import {
  Box,
  Flex,
  HStack,
  Grid,
  Stack,
  Tag,
  TagLabel,
  Text,
  VStack,
  useDisclosure,
  Center,
} from '@chakra-ui/react';
import emptyIcon from '@/realtors_portal/images/icons/emptyIcon.png';
import {useRouter} from 'next/router';
import {formatToCurrency} from '@/realtors_portal/utils/formatAmount';
import See_review from './See_review';
import {CoOwners} from './co_owners';
import TransactionDetailsDrawer from '@/realtors_portal/components/Drawers/transactionDetails/transactionDetails';
import {EmptyState} from '@/realtors_portal/components/common/Table';
import {RButton} from '@/realtors_portal/ui-lib';
import Image from 'next/image';
import {GoBack} from '../assets/BackArrow';
import {EmptyPortfolioIcon} from '../assets/UsefulSVGs';

const AssetCard = ({propInfo}) => {
  const {query} = useRouter();
  const {isOpen, onOpen, onClose} = useDisclosure();
  const [selectedData, setSelectedData] = useState(null);
  const handleSeeReviewClick = data => {
    setSelectedData(data);
    onOpen();
  };
  const transactionDrawer = useDisclosure();
  const [equityId, setEquityId] = useState();
  const [unit, setUnit] = useState();
  const [runQuery, setRunQuery] = useState(false);

  const OpenDrawer = item => {
    transactionDrawer.onOpen();
    setEquityId(item?.equity_id);
    setUnit(item?.unit);
    setRunQuery(true);
  };

  const asset_details = [
    {
      label: `Purchase Price`,
      value: formatToCurrency(propInfo?.offer_price),
      hide: propInfo?.total_fractions,
    },
    {
      label: `Outstanding balance`,
      value: formatToCurrency(propInfo?.current_outstanding_balance),
      hide: propInfo?.total_fractions || propInfo?.current_outstanding_balance * 1 === 0,
    },
    // {
    //   label: `Unit type`,
    //   value: propInfo?.unit_type,
    // },
    {
      label: `Payment`,
      value: propInfo?.project?.payment_plan,
      hide: !propInfo?.project?.payment_plan,
    },
    {
      label: `Total paid`,
      value: formatToCurrency(propInfo?.total_paid),
      hide: propInfo?.total_fractions,
    },
    {
      label: `Fractional Price`,
      value: formatToCurrency(propInfo?.purchase_price * propInfo?.total_fractions),
      hide: !propInfo?.total_fractions,
    },
    {
      label: `Total No. of Fractions`,
      value: propInfo?.total_fractions,
      hide: !propInfo?.total_fractions,
    },
    {
      label: `Fractional Value`,
      value: formatToCurrency(propInfo?.total_fractions_value),
      hide: !propInfo?.total_fractions_value,
    },
  ];
  return (
    <>
      <Flex
        pt={4}
        pb={2}
        gap={{base: '14px', md: '25px'}}
        // direction={{base: 'column', lg: 'row'}}
        direction={{base: `column`, md: 'row'}}
        bg="#fff"
        p={{base: `0px`, md: '20px'}}
        w="100%"
        border={{base: '1px solid'}}
        borderColor={`#E4E4E7 !important`}
        borderRadius={{base: `6px`, md: `16px`}}
        overflow={`hidden`}
      >
        <Center
          h={{base: '100%'}}
          w={{base: '100%', md: 'auto'}}
          minH={{base: '100%', md: '100%'}}
          minW={{base: '100%', md: '180px'}}
          aspectRatio={{base: `38 / 26`, md: `1 / 1`}}
          borderRadius={{base: '0px', md: `15px`}}
          overflow="hidden"
          position={`relative`}
        >
          <Image
            src={propInfo?.project?.project?.photos[0]?.photo}
            alt={propInfo?.project?.project?.name}
            fill
            objectFit={{base: 'cover'}}
          />
        </Center>
        <Stack gap={{base: '20px'}} p={{base: `20px`, md: `0px`}}>
          <HStack gap={`24px`}>
            <Stack gap={`0px`}>
              <Text
                fontWeight="600"
                fontSize={{
                  base: propInfo?.unit?.unit_title?.length > 14 ? `18px` : '23px',
                  md: '20px',
                }}
                color="#191919"
                textAlign={'left'}
                lineHeight={`130%`}
              >
                {propInfo?.unit?.unit_title}
              </Text>
              <Text
                textTransform={'capitalize'}
                fontWeight="400"
                fontSize={{base: '16px', md: '14px'}}
                color="#606060"
                noOfLines={1}
                lineHeight={`140%`}
              >
                {propInfo?.project?.project?.name}
              </Text>
            </Stack>
            {/* {propInfo?.co_owners.length !== 0 ? (
                <CoOwners display={{base: 'flex', md: 'none'}} propInfo={propInfo?.co_owners} />
              ) : null} */}
            <StatusCard val={propInfo?.defaulting} />
          </HStack>
          <Flex
            direction={{base: `column`, md: `row`}}
            flexWrap={`wrap`}
            gap={{base: '24px'}}
            flex={`1`}
          >
            {asset_details?.map(
              (el, i) =>
                !el.hide && (
                  <Flex
                    key={i}
                    gap="7px"
                    align="left"
                    direction={{base: `row`, md: `column`}}
                    justify={{base: `space-between`, md: `center`}}
                    w={{base: `100%`, md: `max-content`}}
                  >
                    <Text
                      textAlign="start"
                      fontWeight="400"
                      fontSize={{base: '16px', md: '12px'}}
                      lineHeight="15px"
                      color="#606060"
                      whiteSpace={{md: 'nowrap'}}
                    >
                      {el?.label}
                    </Text>
                    <Text
                      textAlign="left"
                      fontWeight={{base: '600', lg: `500`}}
                      fontSize={{base: '16px', md: '14px'}}
                      lineHeight="18px"
                      color="#191919"
                      whiteSpace={'nowrap'}
                    >
                      {el?.value}
                    </Text>
                  </Flex>
                )
            )}

            {/* {propInfo?.co_owners.length ? (
              <CoOwners display={{base: 'none', md: 'flex'}} propInfo={propInfo?.co_owners} />
            ) : null} */}
          </Flex>
          <HStack justifySelf="flex-end" alignItems="center" spacing={{base: 2, md: 4}}>
            <RButton
              variation="primary"
              p={'12px 24px'}
              w={{base: '100%', md: '205px'}}
              onClick={() => OpenDrawer(propInfo)}
            >
              View Transactions
            </RButton>
            {propInfo?.feedback.feedback.length && (
              <RButton
                variation="secondary"
                p={'12px 24px'}
                w={{base: '100%', md: '205px'}}
                onClick={() => handleSeeReviewClick(propInfo)}
              >
                See review
              </RButton>
            )}
          </HStack>
        </Stack>
      </Flex>

      <TransactionDetailsDrawer
        modalDisclosure={transactionDrawer}
        runQuery={runQuery}
        equityId={equityId}
        userId={query?.id}
        unit={unit}
      />
      <See_review isOpen={isOpen} onClose={onClose} data={selectedData} />
    </>
  );
};

// NOTE: Customer equities === investments made by customer
export const UserEquities = ({customerInfo}) => {
  return (
    <div>
      <HStack
        py={{base: `0px`, lg: `32px`}}
        visibility={`hidden`}
        display={{base: `none`, lg: `flex`}}
      >
        <GoBack />
      </HStack>
      <Text align={'start'} mb="15px" fontWeight={'500'}>
        Portfolio
      </Text>
      <Stack
        alignItems={'flex-start'}
        pb={4}
        h="fit-content"
        background={{base: 'transparent', lg: '#FFFFFF'}}
        p={{base: '0px', lg: '24px 18px'}}
        gap={{base: '12px', lg: '16px'}}
        border={{base: `none`, lg: '1px solid'}}
        borderColor={`#E4E4E7 !important`}
        borderRadius={{base: `8px`, md: `16px`}}
        overflow={`hidden`}
      >
        {customerInfo?.length == 0 ? (
          <EmptyState
            emptyIcon={<EmptyPortfolioIcon />}
            description="No property has been purchased yet"
            p={{base: '24px', md: '52px'}}
            bg="#fff"
            borderRadius="9px"
          />
        ) : (
          customerInfo?.map((propInfo, index) => <AssetCard key={index} propInfo={propInfo} />)
        )}
      </Stack>
    </div>
  );
};

export default UserEquities;

export const StatusCard = ({val}) => {
  let statusValue = val?.toLowerCase();
  let color =
    statusValue == 'completed'
      ? '#4545FE'
      : statusValue == 'defaulting'
      ? '#FF9103'
      : statusValue == 'terminated'
      ? '#FF3636'
      : statusValue == 'not defaulting'
      ? '#064B38'
      : statusValue == 'fractional'
      ? '#4545FE'
      : 'lightgray';
  let bg =
    statusValue == 'completed'
      ? 'rgba(69, 69, 254, 0.10)'
      : statusValue == 'defaulting'
      ? 'rgba(255, 145, 3, 0.10)'
      : statusValue == 'suspended'
      ? 'rgba(255, 54, 54, 0.1)'
      : statusValue == 'terminated'
      ? 'rgba(255, 54, 54, 0.10)'
      : statusValue == 'not defaulting'
      ? '#E7FBF5'
      : statusValue == 'fractional'
      ? 'rgba(69, 69, 254, 0.10)'
      : '#FFFFFF';
  return (
    val && (
      <Tag p={'8px 13px'} w="fit-content" color={color} bg={bg} borderRadius="48px">
        <TagLabel fontSize={{base: 'xs', md: 'md'}} mx="auto">
          {val}
        </TagLabel>
      </Tag>
    )
  );
};

export const EmptyStateView = ({text}) => {
  return (
    <VStack
      align="center"
      justify="center"
      // width="888px"
      w="full"
      height="276px"
      background="#FFFFFF"
      boxShadow="0px 4px 8px rgba(0, 0, 0, 0.02)"
      borderRadius="16px"
    >
      <Center position="relative" boxSize={`40px`}>
        <Image src={emptyIcon?.src} alt="empty_state" fill style={{objectFit: `contain`}} />
      </Center>
      <Text fontSize="20px" fontWeight="700">
        Nothing Found
      </Text>
      <Text pt="20px" fontWeight="400" fontSize="14px" lineHeight="18px" color="#606060">
        {text ?? 'Empty data'}
      </Text>
    </VStack>
  );
};
