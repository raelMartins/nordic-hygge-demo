import {HStack, Link, Text} from '@chakra-ui/react';
import {useQuery} from 'react-query';
import {storeDetails} from '../../../api/auth';

export const Footer = ({agent, isDrawer, ...rest}) => {
  const STOREINFO = useQuery(['storeInfo'], storeDetails);
  const store_data = STOREINFO.data?.data?.data;

  const TERMS = agent ? store_data?.agent_document : store_data?.customer_document;
  const PRIVACY_POLICY = agent
    ? store_data?.agent_privacy_policy
    : store_data?.customer_privacy_policy;

  return (
    <HStack
      w="full"
      justify="space-between"
      borderTop="1px solid"
      borderColor={`matador_border_color.100`}
      px={{base: '18px', md: isDrawer ? `18px` : '100px'}}
      py="14px"
      fontSize={{base: `12px`, md: isDrawer ? `12px` : `15px`}}
      alignSelf="end"
      justifySelf="end"
      bg="background"
      color={`matador_form.label`}
      {...rest}
    >
      <Text
        fontWeight="400"
        as={Link}
        href={`https://www.myxellia.io/`}
        target="_blank"
        rel="noopener noreferrer"
      >
        Created with myxellia.io
      </Text>
      <HStack gap={{base: '16px', md: isDrawer ? `16px` : '40px'}}>
        {TERMS && (
          <Link
            onClick={!TERMS ? e => e.preventDefault() : null}
            href={`${TERMS ? TERMS : ''}`}
            target={TERMS ? '_blank' : ''}
            cursor="pointer"
            fontWeight="400"
          >
            Terms of Service
          </Link>
        )}
        {PRIVACY_POLICY && (
          <Link
            onClick={!PRIVACY_POLICY ? e => e.preventDefault() : null}
            href={PRIVACY_POLICY ? PRIVACY_POLICY : '#'}
            target={PRIVACY_POLICY ? '_blank' : ''}
            fontWeight="400"
          >
            Privacy Policy
          </Link>
        )}
      </HStack>
    </HStack>
  );
};
