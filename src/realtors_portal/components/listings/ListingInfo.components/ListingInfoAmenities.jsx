import {Box, Flex, Container, Image, Text, HStack, Heading, Stack} from '@chakra-ui/react';
import {AMENITIES} from '@/realtors_portal/constants/icons_image_url';

export const ListingInfoAmenities = ({data}) => {
  console.log({data});
  return (
    <Stack gap={{base: `8px`, lg: `25px`}}>
      <Text
        fontSize={{base: '19px', lg: '33px'}}
        fontWeight={{base: `600`, lg: '500'}}
        color={{base: `#191919`, lg: '#27272A'}}
        lineHeight={{base: `140%`, lg: '130%'}}
        letterSpacing={{base: `.16px`}}
      >
        Amenities
      </Text>

      <Flex
        p={{base: `12px`, lg: `24px 28px`}}
        bg={`#ffffff`}
        gap={{base: `11px`, lg: `18px`}}
        border={{base: '1px solid'}}
        borderColor={`#E4E4E7`}
        borderRadius={{base: `6px`, lg: `12px`}}
        flexWrap={`wrap`}
        justify={{base: `left`}}
      >
        {data.map((amenity, index) => (
          <HStack
            key={index}
            bg={{base: `transparent`, lg: '#F5F5F5'}}
            borderRadius="full"
            p={{base: '14px'}}
            gap={{base: `4px`, lg: `8px`}}
            color={`#3d3d3d`}
          >
            <Image
              alt=""
              src={AMENITIES[amenity.name.toLowerCase().replace(/ |\/+/g, '_', '_')]?.src}
              boxSize="24px"
            />
            <Text fontSiz={{base: `14px`, lg: `16px`}} lineHeight={`150%`}>
              {amenity.name}
            </Text>
          </HStack>
        ))}
      </Flex>
    </Stack>
  );
};

export default ListingInfoAmenities;
