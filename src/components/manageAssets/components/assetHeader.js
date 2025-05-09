import {Box, Heading, Skeleton, Text, VStack} from '@chakra-ui/react';
import React from 'react';
import {checkIfSFH} from '@/utils/misc';

const AssetHeader = ({bgImg, info, listingName, unitName, ...rest}) => {
  const is_detached = checkIfSFH(info);

  return (
    <Skeleton w="full" isLoaded={bgImg}>
      <VStack
        w="full"
        position="relative"
        h={{xl: '152px', base: '129px'}}
        bgImage={`${bgImg}`}
        backgroundSize="cover"
        backgroundPosition="center"
        backgroundRepeat="no-repeat"
        justify="center"
        align="center"
        spacing={{base: '13.38', xl: '11px'}}
        className="heading-text-regular"
        {...rest}
      >
        <Box position="absolute" left="0" w="full" h="full" bg="rgba(0,0,0,0.3)" />
        <Text
          as="header"
          fontSize="40px"
          position="relative"
          zIndex={1}
          fontWeight="400"
          color="#ffffff"
          // color="custom_color.color"
          textAlign="center"
          lineHeight="28px"
          className="heading-text-regular"
        >
          {listingName}
        </Text>
        {!is_detached && (
          <Text
            fontSize={{md: '16px', base: '14px'}}
            fontWeight="400"
            color="#ffffff"
            // color="custom_color.color"
            position="relative"
            zIndex={1}
            textAlign="center"
            lineHeight={{md: '22px', base: '20px'}}
          >
            {unitName}
          </Text>
        )}
        {/* <Text
          className="heading-text-regular"
          fontSize={{base: `23px`, lg: '40px'}}
          pb={{base: `0px`, lg: '20px'}}
          px={`40px`}
          // color="#FFF"
          color="custom_color.color"
          borderBottom={'2.688px solid'}
          // borderColor={`#ffffff`}
          borderColor={`custom_color.color`}
          w={{base: 'max-width', lg: 'max-content'}}
          maxW={{base: `800px`}}
          textAlign={'center'}
        >
          {unitName}, {listingName}
        </Text> */}
      </VStack>
    </Skeleton>
  );
};

export default AssetHeader;
