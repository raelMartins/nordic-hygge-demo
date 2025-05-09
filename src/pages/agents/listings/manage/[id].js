import {
  Box,
  Container,
  Flex,
  Heading,
  HStack,
  Image,
  Text,
  VStack,
  useToast,
  useDisclosure,
  Stack,
} from '@chakra-ui/react';
import Link from 'next/link';
import React, {useRef} from 'react';
import {useRouter} from 'next/router';

import {useQuery} from 'react-query';
import ListingInfoAmenities from '@/realtors_portal/components/listings/ListingInfo.components/ListingInfoAmenities';

import {SetOpenHouseDate} from '@/realtors_portal/components/Modals/SetOpenHouseData';
import AgentsLayoutView from '@/realtors_portal/components/AgentLayout/View';
import {AgentSingleListing, getAgentAllContactPersons} from '@/realtors_portal/api/agents';
import ListingInfoWholeUnits from '@/realtors_portal/components/listings/ListingInfo.components/ListingInfoWholeUnits';
import {toastForError} from '@/realtors_portal/utils/toastForErrors';
import {RButton} from '@/realtors_portal/ui-lib/ui-lib.components';
import {ContactPersonDrawer} from '@/realtors_portal/components/Drawers/savedContactPerson';
import useGetSession from '@/utils/hooks/getSession';
import {GoBack} from '@/realtors_portal/components/assets/BackArrow';
import {ListingImageCarousel} from '@/realtors_portal/components/listings/ListingsImageCarousel';
import {ListingSummary} from '@/realtors_portal/components/listings/ListingInfo.components/ListingInfo.details/ListingSummary';
import {IoCall} from 'react-icons/io5';
import isMobile from '@/utils/extras';
import {PaymentPlanAndClosingCosts} from '@/realtors_portal/components/listings/ListingInfo.components/PaymentPlanAndClosingCosts';

export const SingleListingPage = () => {
  const router = useRouter();
  const {id} = router.query;
  const calendar_disclosure = useDisclosure();
  const contact_disclosure = useDisclosure();
  const contact_btn_ref = useRef();

  const singleListing = useQuery(['Singlelisting', id], () => AgentSingleListing(id));

  const listingDetail = singleListing?.data?.data?.project;
  const is_detached =
    listingDetail?.building_type === 'Detached' ||
    listingDetail?.building_type === 'Semi Detached' ||
    listingDetail?.building_type === 'Parcel of Land' ||
    listingDetail?.building_type === 'Land';

  const ALL_CONTACT_PERSONS_QUERY = useQuery(['allContactPersons', listingDetail?.id], () =>
    getAgentAllContactPersons(listingDetail?.id)
  );

  const ALL_CONTACT_PERSONS_DATA = ALL_CONTACT_PERSONS_QUERY?.data?.data?.results || [];
  const contact_people = !ALL_CONTACT_PERSONS_DATA?.length
    ? listingDetail?.contact_persons
    : ALL_CONTACT_PERSONS_DATA;

  return (
    <AgentsLayoutView
      isLoading={singleListing?.isLoading}
      isError={singleListing?.isError}
      error={singleListing.error}
      mobileXPadding="0px"
    >
      <Box>
        <HStack w="100%" justify="space-between" my={{lg: '0px'}} py={{base: `0px`, lg: '32px'}}>
          <GoBack />
          <Flex
            position={{base: 'fixed', lg: 'static'}}
            left={`0px`}
            bottom={{base: 0, lg: 'unset'}}
            height={{base: '105px', lg: 'unset'}}
            bg={{base: '#F8F8F8', lg: 'unset'}}
            w={{base: 'full', lg: 'unset'}}
            justify={{base: 'center', lg: 'space-between'}}
            gap="12px"
            align="center"
            zIndex={{base: `1001`, lg: `0`}}
            p={{base: `24px`, lg: '0px'}}
            display={{base: `none`, lg: 'flex'}}
          >
            <RButton
              variation={isMobile ? `primary` : `secondary`}
              borderColor={`#a3a3a3`}
              fontSize={`18px`}
              color={`#242526`}
              maxW={`185px`}
              lineHeight={`105%`}
              fontWeight={`400`}
              p={`16px 28px`}
              as={Link}
              prefetch={false}
              flex={{base: `1`, lg: 'auto'}}
              href={`/agents/listings/manage/transactions/${id}?name=${listingDetail?.name}&isFractional=${listingDetail?.is_fractionalized}`}
            >
              Transactions
            </RButton>
          </Flex>
        </HStack>
        <Stack gap={{base: `12px`, lg: `32px`}}>
          <Flex
            direction={{base: 'column', lg: 'row'}}
            gap={{base: `12px`, lg: `38px`}}
            bg={{base: `transparent`, lg: `#ffffff`}}
            p={{base: `0px`, lg: `24px 28px`}}
            border={{base: `none`, lg: '1px solid'}}
            borderColor={`#E4E4E7 !important`}
            borderRadius={{base: `6px`, lg: `12px`}}
          >
            <Stack flex={`1`} gap={`24px`}>
              <ListingImageCarousel
                images={listingDetail?.photo_urls || []}
                video_url={listingDetail?.youtube_url}
              />
              <RButton
                display={{base: `none`, lg: `block`}}
                w={`100%`}
                variation={`secondary`}
                onClick={contact_disclosure.onOpen}
              >
                <HStack justify={`center`} gap={`10px`}>
                  <IoCall fontSize={`18px`} />
                  <Text>Contact Persons</Text>
                </HStack>
              </RButton>
            </Stack>
            <ListingSummary
              data={listingDetail}
              contact_disclosure={contact_disclosure}
              is_detached={is_detached}
            />
          </Flex>
          <Stack gap={{base: `12px`, lg: `32px`}} px={{base: `24px`, lg: `0px`}}>
            {listingDetail?.description && (
              <Stack
                display={{base: `none`, lg: `flex`}}
                p={{base: `12px`, lg: `24px 28px`}}
                bg={`#ffffff`}
                gap={{base: `8px`, lg: `12px`}}
                border={{base: '1px solid'}}
                borderColor={`#E4E4E7`}
                borderRadius={{base: `6px`, lg: `12px`}}
                minH={{base: `195px`}}
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
                  {listingDetail?.description}
                </Text>
              </Stack>
            )}
            {!is_detached && <ListingInfoWholeUnits listingDetail={listingDetail} />}
            {/* <ListingInfoDocuments /> */}
            {listingDetail?.amenities?.length && (
              <Box display={{base: `none`, lg: `block`}}>
                <ListingInfoAmenities data={listingDetail?.amenities} />
              </Box>
            )}
            {is_detached && <PaymentPlanAndClosingCosts listingDetail={listingDetail} />}

            <RButton
              display={{base: `flex`, lg: `none`}}
              variation={`secondary`}
              as={Link}
              prefetch={false}
              flex={{base: `1`, lg: 'auto'}}
              w={`100%`}
              href={`/agents/listings/manage/transactions/${listingDetail?.id}?name=${listingDetail?.name}&isFractional=${listingDetail?.is_fractionalized}`}
            >
              Transactions
            </RButton>
          </Stack>
        </Stack>

        <SetOpenHouseDate ShowCalendar={calendar_disclosure} />
        <ContactPersonDrawer
          modalDisclosure={contact_disclosure}
          btnRef={contact_btn_ref}
          contactPerson={contact_people}
        />
      </Box>
    </AgentsLayoutView>
  );
};

export default SingleListingPage;
