import {Box, Flex, HStack, Stack, Text, useDisclosure, useToast} from '@chakra-ui/react';
import Link from 'next/link';
import React, {useEffect, useState} from 'react';
import {useRouter} from 'next/router';
import {useQuery} from 'react-query';
import AgentsLayoutView from '@/realtors_portal/components/AgentLayout/View';
import PaymentPlan from '@/realtors_portal/components/listings/unit_info/PaymentPlan';
import imageFallback from '@/realtors_portal/images/image-fallback.png';
import {toastForError} from '@/realtors_portal/utils/toastForErrors';
import {fetchAllBundlePaymentPlanForAgents} from '@/realtors_portal/api/agents';
import {handleLastTwoDigits, removeLasttTwoDigits} from '@/realtors_portal/utils/';
import ViewImage from '@/realtors_portal/components/listings/ListingInfo.components/ListingInfo.details/ViewImage';
import {ListingImageCarousel} from '@/realtors_portal/components/listings/ListingsImageCarousel';
import useGetSession from '@/utils/hooks/getSession';
import {RButton} from '@/realtors_portal/ui-lib';
import {GoBack} from '@/realtors_portal/components/assets/BackArrow';
import isMobile from '@/utils/extras';
import {UnitSummary} from '@/realtors_portal/components/listings/unit_info/UnitSummary';
import {PaymentPlanAndClosingCosts} from '@/realtors_portal/components/listings/ListingInfo.components/PaymentPlanAndClosingCosts';

export const UnitInformation = () => {
  const {query} = useRouter();

  const bundleId = query && query?.id;
  const toast = useToast();
  const {data, isError, isLoading, error} = useQuery(['payment_plan', bundleId], () =>
    fetchAllBundlePaymentPlanForAgents(bundleId)
  );
  const UNIT_INFO = data && data?.data?.results[0].bundle;
  const [photoViewSrc, setPhotoViewSrc] = useState(null);
  const [bigPhotoViewSrc, setBigPhotoViewSrc] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const VIEW_IMAGE = useDisclosure();

  useEffect(
    () => setBigPhotoViewSrc(UNIT_INFO?.photos[0]?.photo ?? imageFallback.src),
    [UNIT_INFO?.photos[0]]
  );

  toastForError(error, isError, toast);

  const resetCurrentImageIndex = () => {
    setPhotoViewSrc(bigPhotoViewSrc);
  };

  return (
    <AgentsLayoutView isLoading={isLoading} isError={isError} error={error} mobileXPadding="0px">
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
              href={`/agents/listings/manage/unit_info/transactions/${bundleId}`}
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
            <Box flex={`1`}>
              <ListingImageCarousel
                images={UNIT_INFO?.photos.map(el => el.photo) || []}
                video_url={UNIT_INFO?.youtube_url}
              />
            </Box>
            <UnitSummary data={UNIT_INFO} />
          </Flex>
          <Stack gap={{base: `12px`, lg: `32px`}} px={{base: `24px`, lg: `0px`}}>
            {UNIT_INFO?.unit_description && (
              <Stack
                p={{base: `12px`, lg: `24px 28px`}}
                bg={`#ffffff`}
                gap={{base: `8px`, lg: `12px`}}
                border={{base: '1px solid'}}
                borderColor={`#E4E4E7`}
                borderRadius={{base: `6px`, lg: `12px`}}
                minH={{base: `195px`}}
                display={{base: `none`, lg: `flex`}}
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
                  {UNIT_INFO?.unit_description}
                </Text>
              </Stack>
            )}
            {/* <AgentsUnitDescription description={UNIT_INFO?.unit_description} /> */}
            <PaymentPlanAndClosingCosts listingDetail={UNIT_INFO?.project} unit_id={bundleId} />
            <RButton
              variation={`secondary`}
              w={`100%`}
              as={Link}
              prefetch={false}
              flex={{base: `1`, lg: 'auto'}}
              display={{base: `flex`, lg: 'none'}}
              href={`/agents/listings/manage/unit_info/transactions/${bundleId}`}
            >
              Transactions
            </RButton>
          </Stack>
        </Stack>

        <ViewImage
          modal={VIEW_IMAGE}
          src={photoViewSrc}
          currentImageIndex={currentImageIndex}
          photos={UNIT_INFO?.photos}
          setPhotoViewSrc={setPhotoViewSrc}
          setCurrentImageIndex={setCurrentImageIndex}
          resetCurrentImageIndex={resetCurrentImageIndex}
        />
      </Box>
    </AgentsLayoutView>
  );
};

export default UnitInformation;
