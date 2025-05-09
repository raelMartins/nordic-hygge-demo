import {fetchAgentProjectDocument} from '@/realtors_portal/api/agents';
import {ContactPersonDrawer} from '@/realtors_portal/components/Drawers/savedContactPerson';
import {MapViewBox, RButton} from '@/realtors_portal/ui-lib';
import {handleLastTwoDigits, removeLasttTwoDigits} from '@/realtors_portal/utils';
import isMobile from '@/utils/extras';
import useGetSession from '@/utils/hooks/getSession';
import {InfoIcon, InfoOutlineIcon} from '@chakra-ui/icons';
import {
  Box,
  Flex,
  HStack,
  Link,
  Stack,
  Tag,
  TagLabel,
  Text,
  useDisclosure,
  VStack,
} from '@chakra-ui/react';
import {BiCaretRight} from 'react-icons/bi';
import {useQuery} from 'react-query';
import ListingInfoAmenities from '../ListingInfoAmenities';

export const ListingSummary = ({data, contact_disclosure, is_detached, ...rest}) => {
  const {sessionData: LoggedInAgent} = useGetSession('a_details');
  const {sessionData: agentToken} = useGetSession('a_token');

  const storeName = LoggedInAgent?.storeName;

  const Brochure = useQuery(['brochure-document', data], () =>
    fetchAgentProjectDocument(data?.id, 'brochure', storeName, agentToken)
  );
  const PaymentPlan = useQuery(['paymentplan-contract-document', data], () =>
    fetchAgentProjectDocument(data?.id, 'paymentplan', storeName, agentToken)
  );
  const Outright = useQuery(['outright-document', data], () =>
    fetchAgentProjectDocument(data?.id, 'outright', storeName, agentToken)
  );
  console.log({data});

  const brochure_link =
    Brochure?.data?.data?.results?.[0]?.document_url ||
    Brochure?.data?.data?.results?.[0]?.document_file;
  const payment_plan_link =
    PaymentPlan?.data?.data?.results?.[0]?.document_url ||
    PaymentPlan?.data?.data?.results?.[0]?.document_file;
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
      label: `Start Date`,
      value: `${data?.start_period} ${data?.start_year}`,
      link: ``,
      hide: !data?.start_year,
    },
    {
      label: `Est. completion date`,
      value: `${data?.end_period} ${data?.end_year}`,
      link: ``,
      hide: !data?.end_year,
    },
    {label: `Listing Type`, value: data?.building_type, link: ``, hide: !data?.building_type},
    {label: `Land Title`, value: data?.land_title, link: ``, hide: !data?.land_title},
    {label: `Land Size`, value: data?.land_size, link: ``, hide: !data?.land_size},
    {
      label: `Total Units`,
      value: data?.units_available,
      link: ``,
      hide: !data?.units_available || is_detached,
    },
    {
      label: `Commission`,
      value: `${data?.internal_commission_rate}%`,
    },
    {
      label: `Location`,
      value: (
        <HStack
          as={Link}
          minW={`max-content`}
          gap={`6px`}
          cursor={`pointer`}
          href={`https://maps.google.com/?q=${data?.latitude},${data?.longitude}`}
          target="_blank"
          rel="noreferrer noopener"
          textDecor={`none`}
        >
          <Text color="#4545FE" noOfLines={`1`} textTransform={`capitalize`}>
            {data?.address}
          </Text>
          <BiCaretRight />
        </HStack>
      ),
      hide: isMobile,
    },
    {
      label: `Contact Person`,
      value: (
        <HStack
          minW={`max-content`}
          gap={`6px`}
          cursor={`pointer`}
          onClick={contact_disclosure.onOpen}
        >
          <Text color="#4545FE">View</Text>
          <BiCaretRight />
        </HStack>
      ),
      hide: !isMobile,
    },
    {
      label: `Brochure`,
      value: ``,
      link: BROCHURE,
      hide: !BROCHURE,
    },
    {
      label: `Outright Contract`,
      value: ``,
      link: outright_payment_link,
      hide: !outright_payment_link,
    },
    // ...documents?.map(el => {
    //   return {
    //     label: `${el?.purpose === `outright` ? `Outright Contract` : el?.purpose}`,
    //     value: ``,
    //     link: el?.document_url || el?.document_file,
    //     // hide: !el?.document_file || !is_detached,
    //     hide: !el?.document_url && !el?.document_file,
    //   };
    // }),
  ];
  return (
    <Stack gap={{base: `12px`, lg: `20px`}} flex={`1`} px={{base: `24px`, lg: `0px`}} {...rest}>
      <Flex
        direction={{
          base: parseInt(data?.current_fraction_price) > 0 ? `column` : `row`,
          lg: `column`,
        }}
        gap={{base: `12px`, lg: `20px`}}
        justify={{base: `space-between`, lg: `flex-start`}}
        flexWrap={`wrap`}
      >
        <HStack gap={`8px`} flexWrap={`wrap`}>
          <VStack align="flex-start">
            <Text
              color={{base: `#191919`}}
              fontSize={{base: `23px`, lg: `32px`}}
              fontWeight={{base: `600`, lg: `500`}}
              lineHeight={{base: `130%`, lg: `normal`}}
            >
              {data?.name}
            </Text>
            <Text
              display={{base: `block`, lg: `none`}}
              color={{base: `#52525B`}}
              fontSize={{base: `13px`}}
              fontWeight={{base: `400`}}
              lineHeight={{base: `150%`}}
              letterSpacing={`0.26px`}
              textTransform={`capitalize`}
            >
              {data?.address}
            </Text>
          </VStack>
          {data?.payment_plan_is_available == true && (
            <Tag
              borderRadius="full"
              bg="#F0FDF4"
              p="8px 12px"
              display={{
                base: parseInt(data?.current_fraction_price) > 0 ? `block` : `none`,
                md: `block`,
              }}
            >
              <TagLabel
                color="#116932"
                fontSize={`16px`}
                fontWeight={`500`}
                lineHeight={`140%`}
                letterSpacing={`.16px`}
              >
                Payment Plan
              </TagLabel>
            </Tag>
          )}
        </HStack>
        <Flex
          // p={{base: `12px`, lg: '20px'}}
          p={{base: `0px`, lg: '20px'}}
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
              {removeLasttTwoDigits(Number(data?.starting_from))}
              {handleLastTwoDigits(Number(data?.starting_from))}
            </Text>
            <Text
              fontWeight=" 400"
              fontSize={{base: '13px', lg: '14px'}}
              lineHeight="150%"
              color="#3F3F46"
              letterSpacing={{base: `.26px`}}
            >
              Starting Price
            </Text>
          </Stack>
          {parseInt(data?.current_fraction_price) > 0 && (
            <Stack spacing="1px">
              <Text
                display="flex"
                fontWeight="600"
                fontSize={{base: '19px', lg: `22px`, '2xl': '28px'}}
                color="#4545FE"
                flexWrap={`wrap`}
                lineHeight={`130%`}
              >
                {removeLasttTwoDigits(Number(data?.current_fraction_price ?? 0))}
                {handleLastTwoDigits(Number(data?.current_fraction_price ?? 0.0))}
              </Text>
              <Text
                fontWeight=" 400"
                fontSize={{base: '13px', lg: '14px'}}
                lineHeight="150%"
                color="#3F3F46"
                letterSpacing={{base: `.26px`}}
              >
                Price per fraction
              </Text>
            </Stack>
          )}
        </Flex>
      </Flex>
      {data?.description && (
        <Stack
          display={{base: `flex`, lg: `none`}}
          p={{base: `12px`, lg: `24px 28px`}}
          bg={`#ffffff`}
          gap={{base: `8px`, lg: `12px`}}
          border={{base: '1px solid'}}
          borderColor={`#E4E4E7 !important`}
          borderRadius={{base: `6px`, lg: `12px`}}
        >
          <Text
            fontWeight={{base: `600`, lg: `500`}}
            fontSize={{base: '19px', lg: '23px'}}
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
            {data?.description}
          </Text>
        </Stack>
      )}
      <Stack
        p={{base: `12px`, lg: '20px'}}
        bg={{base: '#FFFFFF', lg: '#FBFCFC'}}
        border="1px solid"
        borderColor={`#E4E4E7`}
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
      {data?.amenities?.length && (
        <Box display={{base: `block`, lg: `none`}}>
          <ListingInfoAmenities data={data?.amenities} />
        </Box>
      )}
      <Stack gap={{base: `8px`, lg: `25px`}} display={{base: `flex`, lg: `none`}}>
        <Text
          fontSize={{base: '19px', lg: '33px'}}
          fontWeight={{base: `600`, lg: '500'}}
          color={{base: `#191919`, lg: '#27272A'}}
          lineHeight={{base: `140%`, lg: '130%'}}
          letterSpacing={{base: `.16px`}}
          display={{base: `block`, lg: `none`}}
        >
          Map View
        </Text>
        <MapViewBox
          lat={data?.latitude}
          lng={data?.longitude}
          width="full"
          height={isMobile ? `171px` : '350px'}
        />
      </Stack>
    </Stack>
  );
};
