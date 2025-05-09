import {fetchAgentProjectDocument} from '@/realtors_portal/api/agents';
import {handleLastTwoDigits, removeLasttTwoDigits} from '@/realtors_portal/utils';
import {formatPropertySize} from '@/realtors_portal/utils/truncateLongText';
import useGetSession from '@/utils/hooks/getSession';
import {Box, Flex, HStack, Link, Stack, Tag, TagLabel, Text, VStack} from '@chakra-ui/react';
import {BiCaretRight} from 'react-icons/bi';
import {useQuery} from 'react-query';

export const UnitSummary = ({data, ...rest}) => {
  const {sessionData: LoggedInAgent} = useGetSession('a_details');
  const {sessionData: agentToken} = useGetSession('a_token');
  console.log({data});

  const storeName = LoggedInAgent?.storeName;

  const Brochure = useQuery(['brochure-document', data], () =>
    fetchAgentProjectDocument(data?.id, 'brochure', storeName, agentToken)
  );
  const Outright = useQuery(['outright-document', data], () =>
    fetchAgentProjectDocument(data?.id, 'outright', storeName, agentToken)
  );

  const brochure_link =
    Brochure?.data?.data?.results?.[0]?.document_url ||
    Brochure?.data?.data?.results?.[0]?.document_file;
  const outright_payment_link =
    Outright?.data?.data?.results?.[0]?.document_url ||
    Outright?.data?.data?.results?.[0]?.document_file;

  const documents = data?.property_document || [];

  const BROCHURE =
    documents?.find(el => el.purpose === `brochure`)?.document_url ||
    documents?.find(el => el.purpose === `brochure`)?.document_file ||
    documents?.[0]?.document_url ||
    documents?.[0]?.document_file ||
    null;

  const summary_details = [
    {
      label: `Unit Size`,
      value: formatPropertySize(data?.unit_size),
      link: ``,
    },
    {
      label: `Land Title`,
      value: data?.project?.land_title,
      link: ``,
      hide: data?.project?.land_title,
    },
    {label: `Number of Bedroom`, value: data?.no_of_bedrooms, hide: data?.no_of_bedrooms <= 0},
    {
      label: `Allocation Milestone`,
      value: `${data?.allocation_milestone}%`,
      hide: !data?.allocation_milestone,
    },
    {
      label: `Outright Terms of Agreement`,
      value: ``,
      link: outright_payment_link,
      hide: !outright_payment_link,
    },
    {
      label: `Brochure`,
      value: ``,
      link: BROCHURE,
      hide: !BROCHURE,
    },
    // ...documents?.map(el => {
    //   return {
    //     label: `${el?.purpose === `outright` ? `Outright Terms of Agreement` : el?.purpose}`,
    //     value: ``,
    //     link: el?.document_url || el?.document_file,
    //     hide: !el?.document_url && !el?.document_file,
    //   };
    // }),
  ];
  return (
    <Stack gap={{base: `12px`, lg: `20px`}} flex={`1`} px={{base: `24px`, lg: `0px`}} {...rest}>
      <Flex
        direction={{
          base: `row`,
          lg: `column`,
        }}
        gap={{base: `12px`, lg: `20px`}}
        justify={{base: `space-between`, lg: `flex-start`}}
        flexWrap={`wrap`}
      >
        <HStack gap={`8px`} flexWrap={`wrap`}>
          <Text
            color={{base: `#191919`}}
            fontSize={{base: `23px`, lg: `32px`}}
            fontWeight={{base: `600`, lg: `500`}}
            lineHeight={{base: `130%`, lg: `normal`}}
          >
            {data?.unit_title}
          </Text>
        </HStack>
        <Flex
          p={{base: `12px`, lg: '20px'}}
          // bg={{base: '#FFFFFF', lg: '#FBFCFC'}}
          bg={{base: 'transparent', lg: '#FBFCFC'}}
          justify="space-between"
          border={{base: `none`, lg: '1px solid'}}
          borderColor={`#E4E4E7 !important`}
          borderRadius={{base: `6px`, lg: `8px`}}
          gap={`10px`}
          justifyContent={`space-between`}
          flexWrap={`wrap`}
        >
          <Stack spacing="1px">
            <Text
              display="flex"
              fontWeight="600"
              fontSize={{base: '19px', lg: `22px`, '2xl': '28px'}}
              color="#4545FE"
              flexWrap={`wrap`}
              lineHeight={`130%`}
            >
              {removeLasttTwoDigits(Number(data?.price))}
              {handleLastTwoDigits(Number(data?.price))}
            </Text>
            <Text
              fontWeight=" 400"
              fontSize={{base: '13px', lg: '14px'}}
              lineHeight="150%"
              color="#3F3F46"
              letterSpacing={{base: `.26px`}}
            >
              Unit Price
            </Text>
          </Stack>
        </Flex>
      </Flex>
      {data?.unit_description && (
        <Stack
          p={{base: `12px`, lg: `24px 28px`}}
          bg={`#ffffff`}
          gap={{base: `8px`, lg: `12px`}}
          border={{base: '1px solid'}}
          borderColor={`#E4E4E7`}
          borderRadius={{base: `6px`, lg: `12px`}}
          display={{base: `flex`, lg: `none`}}
        >
          <Text
            fontWeight={{base: `600`, lg: `500`}}
            fontSize={{base: '16px', lg: '23px'}}
            lineHeight="130%"
            m={`0px`}
            color={`#27272A`}
          >
            Description
          </Text>

          <Text
            fontWeight={400}
            fontSize={{base: `13px`, lg: '16px'}}
            color="#52525B"
            lineHeight={{base: `150%`, lg: `140%`}}
            letterSpacing={{base: `0.26px`, lg: `0.16px`}}
          >
            {data?.unit_description}
          </Text>
        </Stack>
      )}
      <Stack
        p={{base: `12px`, lg: '20px'}}
        bg={{base: '#FFFFFF', lg: '#FBFCFC'}}
        border="1px solid"
        borderColor={`#E4E4E7 !important`}
        borderRadius={{base: `6px`, lg: `8px`}}
        gap={`0px`}
      >
        {summary_details?.map(
          (el, i) =>
            !el.hide && (
              <HStack justify={`space-between`} py={`12px`} key={i}>
                <Text
                  color={{base: `#3F3F46`}}
                  fontSize={{base: `13px`, lg: `16px`}}
                  fontWeight={{base: `400`}}
                  lineHeight={{base: `150%`}}
                  letterSpacing={{base: `0.26px`}}
                  textTransform={`capitalize`}
                >
                  {el.label}
                </Text>
                {el.link ? (
                  <Link
                    fontSize={{base: `16px`}}
                    fontWeight={{base: `500`}}
                    href={el.link}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <HStack minW={`max-content`} gap={`6px`}>
                      <Text color="#4545FE">View</Text>
                      <BiCaretRight />
                    </HStack>
                  </Link>
                ) : (
                  <Text
                    color={{base: `#000`}}
                    textAlign={{base: `right`}}
                    fontSize={{base: `16px`}}
                    fontWeight={{base: `500`}}
                    lineHeight={{base: `140%`}} /* 22.4px */
                    letterSpacing={{base: `0.16px`}}
                  >
                    {el.value}
                  </Text>
                )}
              </HStack>
            )
        )}
      </Stack>
    </Stack>
  );
};
