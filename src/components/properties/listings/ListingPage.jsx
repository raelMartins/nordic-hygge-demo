import React, {useRef} from 'react';
import {Box, Flex, Stack, Text, VStack} from '@chakra-ui/react';
import {Button} from '@/ui-lib';
import {useRouter} from 'next/router';
import MapViewBox from '@/components/properties/listings/sections/mapView';
import AllUnits from '@/components/properties/listings/sections/allUnits';
import {LayoutView} from '@/components/page_layout';
import AssetCarousel from '@/components/assetCarousel';
import {ListingActionBox} from '@/components/properties/listings/ListingActionBox';
import useGetSession from '@/utils/hooks/getSession';
import {UnitsList} from './sections/UnitsList';
import {checkIfSFH} from '@/utils/misc';

export const ListingPage = ({openAuth, info, err}) => {
  const router = useRouter();
  const id = router.query.id;
  const allUnitsRef = useRef();

  const {sessionData: LoggedinUser} = useGetSession('loggedIn');

  // const {data, isError, isLoading, refetch} = useQuery(
  //   ['fetchProjectById', id],
  //   () => fetchProjectsById(parseInt(id)),
  //   {enabled: !!id}
  // );

  // const info = data?.data?.project;

  const isLoading = false;
  const isError = err;
  const is_detached = checkIfSFH(info);

  const slideImages =
    info?.photos?.map(image => ({
      original: image.photo,
      thumbnail: image.photo,
    })) || [];

  const brochure_url =
    info?.property_document?.find(el => el.purpose === `brochure`)?.document_url ||
    info?.property_document?.find(el => el.purpose === `brochure`)?.document_file ||
    info?.property_document?.[0]?.document_url ||
    info?.property_document?.[0]?.document_file ||
    null;

  return (
    <LayoutView
      noFooter={isLoading}
      isLoading={isLoading}
      isError={isError}
      error={err}
      noNavbar={!LoggedinUser || isLoading}
      noPadding
      fullFooter
      metaData={{title: info?.name, description: info?.description, image: slideImages?.[0]}}
    >
      {info && (
        <>
          <Box position={`relative`}>
            <AssetCarousel videoUrl={info?.youtube_url} slideImages={slideImages} />
            <ListingActionBox info={info} openAuth={openAuth} />
          </Box>
          <Stack
            p={{base: '20px', lg: '40px 100px 20px'}}
            gap={{base: `64px`}}
            pb={{base: `20px`, lg: `60px`}}
          >
            {/* <Flex gap={`20px`} direction={{base: `column`, lg: `row`}}>
                  <Stack flex={`1`}>
                    <Text
                      fontSize={{base: '24px', lg: '48px'}}
                      color="matador_text.100"
                      className="heading-text-bold"
                      // textAlign={`center`}
                      fontWeight={`700`}
                      lineHeight={`120%`}
                      letterSpacing={`1.9px`}
                      textTransform={`uppercase`}
                    >
                      Description
                    </Text>
                    <Text
                      lineHeight={'180%'}
                      fontSize={{base: `14px`, lg: '20px'}}
                      fontWeight={`500`}
                      letterSpacing={{base: `0.84px`, lg: `.4px`}}
                      color="matador_form.label"
                    >
                      {info?.description}
                    </Text>
                  </Stack>
                  <Amenities info={info} flex={`1`} />
                </Flex> */}

            <Flex
              direction={{base: `column`, md: `row`}}
              align={{base: `flex-start`}}
              gap={{base: `40px`}}
            >
              <Stack gap={{base: `20px`}} flex={`1`}>
                <Text
                  className="heading-text-regular"
                  fontSize={{base: `32px`}}
                  color="text"
                  lineHeight={`130%`}
                  textTransform={`uppercase`}
                  fontWeight={`600`}
                  letterSpacing={`1.908px`}
                >
                  Overview
                </Text>
                <Text
                  lineHeight={'160%'}
                  fontSize={{base: `14px`, lg: '16px'}}
                  fontWeight={`400`}
                  letterSpacing={{base: `.32px`}}
                  color="matador_text.200"
                  flex={`1`}
                  wordBreak={`break-word`}
                >
                  {info?.description}
                </Text>
              </Stack>
              {brochure_url && (
                <VStack gap={{base: `18px`}} display={{base: `none`, lg: `flex`}}>
                  <Box
                    width={{base: `300px`, lg: `400px`}}
                    height={{base: `200px`}}
                    overflow={`hidden`}
                    bg={'#183d3d'}
                  >
                    <embed
                      src={brochure_url}
                      type="application/pdf"
                      width={`418px`}
                      height={`230px`}
                      style={{overflow: `hidden`}}
                    />
                  </Box>

                  <Button
                    padding={{base: `12px 18px`}}
                    border={`1px solid`}
                    color={`text`}
                    borderColor={`matador_border_color.100`}
                    background={`matador_background.100`}
                    cursor={`pointer`}
                    fontSize={`14px`}
                    fontWeight={`500`}
                    lineHeight={`130%`}
                    textTransform={`uppercase`}
                    onClick={() => window.open(brochure_url)}
                  >
                    View Brochure
                  </Button>
                </VStack>
              )}
            </Flex>

            {/* <Divider my='40px' w='100%' /> */}
            {info?.maps_view && (
              <Stack gap={{base: `20px`}}>
                <Text
                  className="heading-text-regular"
                  fontSize={{base: `32px`}}
                  color="text"
                  lineHeight={`130%`}
                  textTransform={`uppercase`}
                  fontWeight={`600`}
                  letterSpacing={`1.908px`}
                >
                  Map View
                </Text>
                <MapViewBox
                  lat={info?.latitude}
                  lng={info?.longitude}
                  width="full"
                  height="527px"
                />
              </Stack>
            )}
          </Stack>
          {!is_detached && (
            <UnitsList
              info={info}
              p={{base: '20px 20px 60px', lg: '40px 100px 100px'}}
              ref={allUnitsRef}
              bg={{base: `matador_background.300`}}
            />
          )}
        </>
      )}
    </LayoutView>
  );
};
