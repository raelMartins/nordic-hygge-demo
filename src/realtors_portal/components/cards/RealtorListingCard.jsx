import {Box, Flex, Skeleton, Text, VStack} from '@chakra-ui/react';
import {useRouter} from 'next/router';
import defaultImage from '@/realtors_portal/images/image-fallback.png';

import Image from 'next/image';

export const RealtorListingCard = ({data, isLoading, ...rest}) => {
  const router = useRouter();
  const colors = ['#2A2F36', '#183D3D', '#3B2338'];

  const handle_card_click = () => {
    router.push(`/agents/listings/manage/${data?.id}`);
  };

  return isLoading ? (
    <Skeleton
      shadow={'sm'}
      cursor={'pointer'}
      whileTap={{scale: 0.98}}
      whileHover={{scale: 1.01}}
      aspectRatio={{base: '416 / 280'}}
      mx={'auto'}
      h={{base: '100%'}}
      w="full"
      borderRadius={'20px'}
      position={'relative'}
      startColor="rgba(200, 200, 200, .5)"
      endColor="rgba(200, 200, 200, .8)"
    />
  ) : (
    <Box
      shadow={'sm'}
      cursor={'pointer'}
      _hover={{scale: `1.01`}}
      aspectRatio={{base: '416  / 280'}}
      // bg="rgba(200, 200, 200)"
      bg={colors?.[Math.floor(Math.random() * 3)]}
      mx={'auto'}
      // maxH={{ base: `280px` }}
      h={`100%`}
      w="100%"
      borderRadius={'20px'}
      overflow={`hidden`}
      position={'relative'}
      onClick={handle_card_click}
      {...rest}
    >
      <Image
        src={data?.photos[0]?.photo ?? defaultImage?.src}
        alt={`image`}
        fill
        style={{objectFit: `cover`}}
      />

      <VStack
        bottom="0px"
        position={'absolute'}
        p={`20px`}
        align={'stretch'}
        justify={`flex-end`}
        gap={'8px'}
        w="full"
        zIndex={1}
        minH={`280px`}
        background={`linear-gradient(180deg, rgba(0, 0, 0, 0) 33.02%, rgba(0, 0, 0, 0.80) 86.38%)`}
      >
        <Flex w="full" justify={'space-between'} align={'center'}>
          <Text
            color="#fff"
            fontWeight={500}
            fontSize={{base: '16px', lg: '20px'}}
            lineHeight={`100%`}
          >
            {data?.name}
          </Text>
        </Flex>
        <Text
          color={'#fff'}
          fontWeight={`500`}
          fontSize={{base: '13px'}}
          lineHeight={`150%`}
          letterSpacing={`0.26px`}
        >
          {data?.landmark ?? data?.address}{' '}
        </Text>
      </VStack>
    </Box>
  );
};
