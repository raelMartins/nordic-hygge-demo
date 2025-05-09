import React from 'react';
import {Box, Flex, Text, VStack} from '@chakra-ui/react';
import {motion} from 'framer-motion';
import {formatToCurrency} from '../../utils';
import {useRouter} from 'next/router';
import Image from 'next/image';

export const CardTwo = ({data, projectId, sold_out = false, ...rest}) => {
  const router = useRouter();

  const handle_click = () => {
    router.push({
      pathname: `/listing-details/units/${data?.id}`,
      query: {projectId},
    });
  };

  return (
    <Box
      shadow={'sm'}
      as={motion.div}
      maxWidth={'597.45px'}
      cursor={'pointer'}
      whileTap={{scale: 0.98}}
      whileHover={{scale: 1.01}}
      style={{aspectRatio: '397  / 490'}}
      bg="card_bg"
      mx={'auto'}
      // aspectRatio={{base: `1 / 1`, md: `38 / 36'`}}
      h={{base: 'auto', md: '540px'}}
      w="full"
      {...rest}
      // bgImage={data?.photos[0]?.photo || `/`}
      // bgSize={'cover'}
      position={'relative'}
      onClick={handle_click}
    >
      <Box bg="black" opacity={0.6} position={'absolute'} h="full" w="full" zIndex={0} />
      <Image
        src={data?.photos?.[0]?.photo}
        alt={`image`}
        fill
        style={{objectFit: `cover`}}
        // placeholder="blur"
      />

      <Flex position={'absolute'} top="20px" right="20px" align={'center'} gap="12px" zIndex={`1`}>
        {data?.is_sold_out || data?.quantity <= 0 || sold_out ? (
          <Box px="16px" py="8px" borderRadius={'4px'} bg="#D6D6D6" h={`max-content`}>
            <Text className="heading-text-regular" fontSize={'12px'} color="#191919">
              SOLD OUT
            </Text>
          </Box>
        ) : null}
      </Flex>

      <VStack
        bottom="30px"
        position={'absolute'}
        px={{base: '12px', md: '24px'}}
        align={'stretch'}
        spacing={'8px'}
        w="full"
        zIndex={1}
      >
        <Text color="white" className="heading-text-regular" fontWeight={400} fontSize={'24px'}>
          {data?.unit_title}
        </Text>
        <Text
          color={data?.display_price ? 'white' : 'primary'}
          fontWeight={400}
          fontSize={'16px'}
          className="sub-text-regular"
        >
          {console.log({unit_data: data})}
          {data?.display_price ? formatToCurrency(data?.price) : 'Contact for Price'}
        </Text>
      </VStack>
    </Box>
  );
};
