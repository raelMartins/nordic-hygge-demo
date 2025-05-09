import {Box, Center, HStack, Stack, Text, useMediaQuery} from '@chakra-ui/react';
import {useRouter} from 'next/router';
import React from 'react';
import {useFetchListingBundles} from '@/realtors_portal/ui-lib';
import {formatToCurrency} from '@/realtors_portal/utils/';
import fallback from '@/realtors_portal/images/image-fallback.png';
import {FractionalizedIcon} from '../../assets/UsefulSVGs';
import Image from 'next/image';

const RealtorUnitCard = ({unit, payment_plan}) => {
  const router = useRouter();
  const colors = ['#2A2F36', '#183D3D', '#3B2338'];

  console.log({unit});
  return (
    <Stack
      position={'relative'}
      gap={{base: `8px`, lg: `16px`}}
      borderRadius="16px"
      w={{base: '189.5px', lg: '292px'}}
      onClick={() => router.push(`unit_info/${unit?.id}`)}
      cursor={`pointer`}
    >
      <Center
        w={{base: '189.5px', lg: '292px'}}
        h={{base: '173px', lg: '266.5px'}}
        borderRadius={{base: `8px`, lg: '12px'}}
        position={'relative'}
        overflow={'hidden'}
        bg={colors?.[Math.floor(Math.random() * 3)]}
      >
        <Image
          alt="Unit Image"
          src={unit?.photos?.[0]?.photo || fallback.src}
          fill
          style={{objectFit: `cover`}}
        />

        {unit?.quantity === 1 && (
          <HStack
            position={`absolute`}
            right={`5px`}
            top={`5px`}
            p={`3px 8px`}
            borderRadius={`8px`}
            border={`1px solid`}
            borderColor={`#D6D6D6 !important`}
            background={`#F5F5F5`}
            color={`#191919`}
            fontSize={{base: `9px`, lg: `14px`}}
            fontWeight={`500`}
          >
            <Text>{unit?.quantity} Unit Left</Text>
          </HStack>
        )}
      </Center>

      <Stack gap={{base: `4px`}}>
        <Text fontSize={{base: '16px', lg: '24px'}} fontWeight="600" color="#000000">
          {unit?.unit_title}
        </Text>
        <Text
          color={`#52525B`}
          fontSize={{base: `13px`, lg: `16px`}}
          fontWeight={{base: `500`}}
          lineHeight={{base: `150%`}}
          letterSpacing={`.26px`}
        >
          {payment_plan ? `Starting from ` : ``} {formatToCurrency(unit?.price)}
        </Text>
        {unit?.is_fraction_sale_available ? (
          <HStack
            bg="#4545FE"
            gap={{base: '6px', lg: `8px`}}
            w="max-content"
            color={`#ffffff`}
            fontSize={{base: `12px`, lg: `14px`}}
            fontWeight={{base: `500`}}
            borderRadius={{base: `full`}}
            p={{base: `4px`, lg: `4px 12px`}}
          >
            <FractionalizedIcon />
            <Text>Fractionalized</Text>
          </HStack>
        ) : null}
      </Stack>
    </Stack>
  );
};

export const ListingInfoWholeUnits = ({listingDetail}) => {
  const {listingBundles} = useFetchListingBundles(listingDetail?.id);

  return (
    <Stack gap={{base: `8px`, lg: `25px`}}>
      <Text
        fontSize={{base: '19px', lg: '33px'}}
        fontWeight={{base: `600`, lg: '500'}}
        color={{base: `#191919`, lg: '#27272A'}}
        lineHeight={{base: `140%`, lg: '130%'}}
        letterSpacing={{base: `.16px`}}
      >
        Available Units
      </Text>
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
        <HStack gap={{base: `20px`, md: '38px'}} minWidth="max-content" align={`stretch`}>
          {listingBundles &&
            listingBundles?.map((unit, index) => (
              <RealtorUnitCard
                key={index}
                unit={unit}
                payment_plan={listingDetail?.payment_plan_is_available}
              />
            ))}
        </HStack>
      </Box>
    </Stack>
  );
};

export default ListingInfoWholeUnits;
