import React from 'react';
import {Box, Flex, Stack, Text, VStack} from '@chakra-ui/react';
import {LayoutView} from '@/components/page_layout';
import AssetCarousel from '@/components/assetCarousel';
import OtherUnits from '@/components/properties/listings/sections/otherUnits';
import MapViewBox from '@/components/properties/listings/sections/mapView';
import {UnitActionBox} from '@/components/properties/units/UnitActionBox';
import useGetSession from '@/utils/hooks/getSession';
import {Button} from '@/ui-lib';

export const UnitPage = ({openAuth, info, unitData, err}) => {
  const {sessionData: LoggedinUser} = useGetSession('loggedIn');

  const isError = err;

  const slideImages =
    unitData?.photos?.map(image => ({
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
      isError={isError}
      error={err}
      noNavbar={!LoggedinUser}
      noPadding
      fullFooter
      metaData={{
        title: unitData?.unit_title,
        description: unitData?.unit_description,
        image: slideImages?.[0],
      }}
    >
      {unitData && (
        <>
          <Box pos={`relative`}>
            <AssetCarousel videoUrl={info?.youtube_url} slideImages={slideImages} />
            <UnitActionBox openAuth={openAuth} unitData={unitData} info={info} />
          </Box>
          <Stack p={{base: '20px', lg: '40px 100px 20px'}} gap={{base: `64px`}}>
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
                  {unitData?.unit_description}
                </Text>
              </Stack>
              {brochure_url && (
                <VStack gap={{base: `18px`}} display={{base: `none`, lg: `flex`}}>
                  <Box
                    width={{base: `300px`, lg: `400px`}}
                    height={{base: `200px`}}
                    overflow={`hidden`}
                    bg={'#3B2338'}
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
          <OtherUnits
            info={info}
            excludingId={unitData?.id}
            p={{base: '20px 20px 60px', lg: '40px 100px 100px'}}
            bg={{base: `matador_background.300`}}
          />
        </>
      )}
    </LayoutView>
  );
};
