import {Box, Grid, GridItem, Stack, Text} from '@chakra-ui/react';
import {BsDashLg} from 'react-icons/bs';
import {formatToCurrency} from '@/realtors_portal/utils';
import {monthDayYear} from '@/realtors_portal/utils/formatDate';

const UserPaymentNumberPart = ({data}) => {
  const equityInfo = data;

  console.log({equityInfo});

  const equity_stats = [
    {
      label: `Purchase Price`,
      value: equityInfo?.total_unit_price ? (
        formatToCurrency(equityInfo?.total_unit_price)
      ) : (
        <BsDashLg />
      ),
      color: `#4545FE`,
    },
    {
      label: `Total Amount Paid`,
      value: equityInfo?.amount_paid ? formatToCurrency(equityInfo?.amount_paid) : <BsDashLg />,
      color: '#12D8A0',
    },
    {
      label: `Outstanding Balance`,
      value: equityInfo?.current_outstanding_balance ? (
        formatToCurrency(equityInfo?.current_outstanding_balance)
      ) : (
        <BsDashLg />
      ),
      color: '#FF6A6A',
    },
    {
      label: `Due Balance`,
      value: equityInfo?.next_due_balance ? (
        formatToCurrency(equityInfo?.next_due_balance)
      ) : (
        <BsDashLg />
      ),
      color: '#FF6A6A',
      date: equityInfo?.next_due_date ? monthDayYear(equityInfo?.next_due_date) : <BsDashLg />,
    },
  ];

  const fractional_equity_stats = [
    {
      label: `Total Fractional Value`,
      value: equityInfo?.fractional_equity_value ? (
        formatToCurrency(equityInfo?.fractional_equity_value)
      ) : (
        <BsDashLg />
      ),
      color: `#4545FE`,
    },
    {
      label: `Purchase Price`,
      value: equityInfo?.fractions_amount_paid ? (
        formatToCurrency(equityInfo?.fractions_amount_paid)
      ) : (
        <BsDashLg />
      ),
      color: '#12D8A0',
    },
    {
      label: `Total Fractions`,
      value: equityInfo?.amount_of_fractions,
      color: '#12D8A0',
    },
  ];

  const stats_object = {whole: equity_stats, fractional: fractional_equity_stats};

  const stats = stats_object?.[`${equityInfo?.type?.toLowerCase()}`] || stats_object?.whole;

  return (
    <Box
      w={'100%'}
      maxW={'100%'}
      overflowX={'auto'}
      css={{
        '-ms-overflow-style': 'none',
        'scrollbar-width': 'none',
        '::-webkit-scrollbar': {
          display: 'none',
        },
      }}
    >
      <Grid gap="16px" width="100%" templateColumns={{base: `repeat(4, 1fr)`, lg: `1fr 1fr`}}>
        {stats?.map((stat, i) => (
          <GridItem
            key={i}
            colSpan={{base: 1, lg: stats?.length % 2 === 1 && i + 1 === stats?.length ? 2 : 1}}
          >
            <Stack
              justifyContent="center"
              borderRadius="6px"
              border="1px solid"
              borderColor={`#e4e4e7 !important`}
              bg={{base: `#fff`, lg: `#FAFAFA`}}
              p={{base: `16px 12px`, lg: '16px 32px'}}
              gap={{base: `4px`, lg: `8px`}}
              alignItems={{base: `flex-start`, lg: 'center'}}
              textAlign={{base: `left`, lg: 'center'}}
              h={`100%`}
              mx={{lg: `auto`}}
              w={{
                base: `246px`,
                lg: stats?.length % 2 === 1 && i + 1 === stats?.length ? `50%` : `100%`,
              }}
            >
              <Text
                color={stat?.color}
                fontSize={{base: `19px`, lg: '14px'}}
                fontWeight="600"
                textAlign={{base: `left`, lg: 'center'}}
                order={{base: `2`, lg: `1`}}
              >
                {stat?.value}
              </Text>
              <Text
                fontSize={{base: `13px`, lg: '8px'}}
                fontWeight="400"
                textAlign={{base: `left`, lg: 'center'}}
                order={{base: `1`, lg: `2`}}
              >
                {stat?.label}
              </Text>
              {stat?.date && (
                <Text
                  fontSize="8px"
                  fontWeight="300"
                  alignItems="center"
                  textAlign={{base: `left`, lg: 'center'}}
                  display={{base: `none`, lg: 'block'}}
                >
                  {stat?.date}
                </Text>
              )}
            </Stack>
          </GridItem>
        ))}
      </Grid>
    </Box>
  );
};

export default UserPaymentNumberPart;
