import {Box, Tag, TagLabel} from '@chakra-ui/react';
import React from 'react';

const PaymentTypeTag = ({type, tagStyle}) => {
  const transactionType = key => {
    switch (key) {
      case 'outright':
        return {case: 'outright', text: 'Outright Payment', color: 'matador_text.100'};
      case 'shared_outright':
        return {text: 'Outright Payment', color: 'matador_text.100'};
      case 'equity_outright':
        return {text: 'Outright Payment', color: 'matador_text.100'};
      case 'shared_equity_outright':
        return {
          text: 'Outright Payment',

          bg: '#DDDDDD',
          color: 'matador_text.100',
        };
      case 'initial_deposit':
        return {
          case: 'initial_deposit',
          text: 'Initial deposit',

          bg: '#DDDDDD',
          color: 'matador_text.100',
        };
      case 'shared_equity_plan_initial':
        return {
          case: 'Initial deposit',
          text: 'Initial deposit',

          bg: '#DDDDDD',
          color: 'matador_text.100',
        };
      case 'installment':
        return {case: 'installment', text: 'Deposit', color: 'matador_text.100'};

      case 'equity_plan_deposit':
        return {
          text: 'Deposit',

          bg: '#DDDDDD',
          color: 'matador_text.100',
        };
      case 'equity_plan_initial':
        return {
          text: 'Initial deposit',

          bg: '#DDDDDD',
          color: 'matador_text.100',
        };
      case 'recurring':
        return {
          case: 'recurring',
          text: 'Deposit',

          bg: '#DDDDDD',
          color: 'matador_text.100',
        };
      case 'fraction':
        return {case: 'fraction', text: 'Fractional', color: 'matador_text.100'};

      default:
        return {case: 'default', text: 'Deposit', colorScheme: 'gray'};
    }
  };

  const displayTag = () => {
    return (
      <Box display={'flex'} {...tagStyle?.box}>
        <Tag
          minW={{base: '97.3px', md: '106px'}}
          // bg={transactionType(type)?.bg}
          border="1px solid"
          borderColor={`text`}
          bg="transparent"
          h={{base: '22px', md: '31.35px'}}
          p={{base: '6.013px 12.026px', md: '9px 17.633px'}}
          borderRadius="0px"
          {...tagStyle?.tag}
        >
          <TagLabel
            mx="auto"
            color={transactionType(type)?.color}
            fontSize={{base: '12px', md: '15.1px'}}
            fontWeight="400"
            {...tagStyle?.label}
          >
            {transactionType(type).text}
          </TagLabel>
        </Tag>
      </Box>
    );
  };

  return displayTag();
};

export default PaymentTypeTag;
