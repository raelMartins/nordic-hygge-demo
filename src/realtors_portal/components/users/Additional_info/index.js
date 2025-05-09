import React from 'react';
import {Stack, Text, VStack, Wrap, Container, Center, Flex, Box} from '@chakra-ui/react';

import {NextOfKinDetails} from './NextOfKinDetails';
import {formatToCurrency} from '/src/realtors_portal/utils/formatAmount';
import {changeDateFormat} from '/src/realtors_portal/utils/formatDate';
import BankDetails from './BankDetails';
import {BsDashLg} from 'react-icons/bs';

const styles = {
  boxShadow: 'sm',
  borderRadius: '16px',
  border: '1px solid #F5F5F5',
  align: 'center',
  paddingTop: '32px',
  height: 117,
  justify: 'center',
};
const InfoBox = ({title, text}) => {
  return (
    <VStack
      textAlign={{base: 'left', md: 'center'}}
      alignItems={{base: 'flex-start', md: 'center'}}
      w={{base: '100%', md: '229px'}}
      boxShadow={{base: 'none', md: 'sm'}}
      borderRadius={{base: `4px`, md: `12px`}}
      border={{base: '1px solid'}}
      borderColor={`#E4E4E7 !important`}
      minH={{base: 'none', md: '117px'}}
      justify={{base: 'flex-start', md: 'center'}}
      bg={`#FBFCFC`}
      padding={{base: `8px 12px`, md: `32px 34px`}}
      flex={{md: `1`}}
    >
      <Text
        fontWeight="400"
        fontSize={{base: `13px`, md: '14px'}}
        lineHeight="20px"
        color={{base: `#9D9D9D`, lg: '#606060'}}
      >
        {title}
      </Text>
      <Text
        fontWeight={{base: `500`}}
        fontSize={{base: `13px`, md: '20px'}}
        lineHeight="24px"
        color="#191919"
        minW={`150px`}
      >
        {text || `--`}
      </Text>
    </VStack>
  );
};

export const AdditionalInfo = ({customerInfo}) => {
  return (
    <Stack>
      <Text w="full" textAlign="start" fontSize="16px" fontWeight="500" mt={`20px`}>
        Additional Information
      </Text>
      <Box
        background={{base: 'transparent', md: '#FFFFFF'}}
        p={{base: '0px', md: `22px`}}
        pb={{base: `0px`, md: `40px`}}
        border={{base: `none`, md: '.5px solid'}}
        borderColor={`#E4E4E7 !important`}
        borderRadius={{base: `8px`, md: `16px`}}
        overflow={`hidden`}
      >
        <Flex
          flexWrap="wrap"
          justifyContent={{base: 'flex-start'}}
          gap="16px 24px"
          mb="25px"
          bg="#ffffff"
          padding={{base: '16px', md: '0px'}}
          border={{base: '.5px solid', md: `none`}}
          borderColor={`#E4E4E7 !important`}
          overflow={`hidden`}
        >
          <InfoBox
            title={
              customerInfo?.user_info?.yearly_income
                ? 'Annual Income'
                : customerInfo?.user_info?.monthly_income
                ? 'Monthly Income'
                : 'Income'
            }
            text={
              customerInfo?.user_info?.yearly_income
                ? `${formatToCurrency(customerInfo?.user_info?.yearly_income)}`
                : customerInfo?.user_info?.monthly_income
                ? `${formatToCurrency(customerInfo?.user_info?.monthly_income)}`
                : null
            }
          />
          <InfoBox title="Occupation" text={customerInfo?.user_info?.occupation} />
          <InfoBox title="Marital Status" text={customerInfo?.user_info?.marital_status} />
          <InfoBox title="Company Name" text={customerInfo?.user_info?.company_name} />
          <InfoBox title="Education" text={customerInfo?.user_info?.highest_education} />
          <InfoBox
            title="Date of Birth"
            text={changeDateFormat(customerInfo?.user_info?.date_of_birth)}
          />
          <InfoBox
            title="'Date Joined"
            text={changeDateFormat(customerInfo?.user_info?.sign_up_time)}
          />
        </Flex>
        {/* <BankDetails bankDetails={customerInfo?.finances} /> */}
        <NextOfKinDetails
          customerInfo={
            customerInfo && customerInfo?.next_of_kin?.length > 0 && customerInfo?.next_of_kin[0]
          }
        />
      </Box>
    </Stack>
  );
};
