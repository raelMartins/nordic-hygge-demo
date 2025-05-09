import {
  Box,
  Center,
  Flex,
  HStack,
  Skeleton,
  SkeletonText,
  Stack,
  Text,
  useTheme,
  useToast,
  VStack,
} from '@chakra-ui/react';
import {motion} from 'framer-motion';
import {formatToCurrency} from '../../utils';
import {useRouter} from 'next/router';
import Image from 'next/image';
import Link from 'next/link';
import {randomBackgroundColor} from '@/utils/misc';
import {useCustomToast} from '../CustomToast';

export const ListingCard = ({
  isLoading,
  data,
  refetch,
  is_id_watchlisted,
  index,
  full_width = false,
  ...rest
}) => {
  const router = useRouter();
  const toast = useCustomToast();

  const theme = useTheme();

  const handle_card_click = () => {
    router.push(`/listing-details/${data?.id}`);
  };

  const color = randomBackgroundColor();

  return isLoading ? (
    <Skeleton w={`100%`} aspectRatio={`508 / 540`} startColor={`${color}66`} endColor={color} />
  ) : (
    <Flex
      direction={{base: `column`, md: full_width ? `row` : `column`}}
      align={`flex-start`}
      justify={`flex-start`}
      cursor={'pointer'}
      mx={'auto'}
      // maxH={{base: '350px', md: `490px`}}
      h={`100%`}
      w="full"
      borderRadius={'5px'}
      position={'relative'}
      overflow={`hidden`}
      onClick={handle_card_click}
      bg={{base: `matador_background.200`}}
      gap={{md: full_width ? `10px` : `0px`}}
      border={`1px solid`}
      borderColor={`matador_border_color.100`}
      {...rest}
    >
      <Center
        aspectRatio={{base: `590  / 443`}}
        position={'relative'}
        w={{base: `100%`, md: full_width ? `50%` : '100%'}}
        h={`auto`}
        overflow={`hidden`}
        order={{base: `1`}}
        bg={color}
      >
        <Image src={data?.photos?.[0]?.photo} alt={`image`} fill style={{objectFit: `cover`}} />
      </Center>

      <VStack
        align={'stretch'}
        justify={`flex-start`}
        gap={'16px'}
        w={{base: `100%`, md: full_width ? `50%` : '100%'}}
        zIndex={1}
        p={{base: `24px 30px`}}
        flex={{base: `1`, md: full_width ? `none` : `1`}}
        order={{base: `2`}}
      >
        <HStack justify={`space-between`}>
          <Stack gap={`4px`}>
            <Text
              color="custom_color.color_pop"
              fontWeight={`700`}
              fontSize={{base: '18px', lg: '23px'}}
              lineHeight={`104%`}
              textTransform={`uppercase`}
            >
              {data?.name}
            </Text>

            <Text
              color={{base: `matador_text.300`}}
              fontSize={{base: `13px`}}
              fontWeight={{base: `600`}}
              lineHeight={{base: `150%`}} /* 116.667% */
              textTransform={{base: `capitalize`}}
              letterSpacing={`.26px`}
            >
              {data?.is_sold_out
                ? `Sold Out`
                : data?.display_price
                ? `Starting from ${formatToCurrency(data?.starting_from)}`
                : 'Contact for Price'}
            </Text>
          </Stack>
          {data?.fraction_is_available || data?.is_watchlist || data?.payment_plan_is_available ? (
            <Flex
              align={`center`}
              gap={`5px`}
              p={`2px 6px`}
              borderRadius={{base: `4px`}}
              border={{base: `0.5px solid`}}
              borderColor={`matador_border_color.100`}
              background={{base: `matador_background.100`}}
              minW={`max-content`}
            >
              {data?.payment_plan_is_available ? (
                <Skeleton
                  boxSize={`6px`}
                  borderRadius={`50%`}
                  startColor="rgba(200,200,200,0.01)"
                  endColor="custom_color.color_pop"
                />
              ) : (
                <Center boxSize={`6px`} bg={`custom_color.color_pop`} borderRadius={`50%`} />
              )}
              <Text
                color={{base: `matador_text.300`}}
                fontSize={{base: `13px`}}
                fontWeight={{base: `600`}}
                lineHeight={{base: `150%`}} /* 116.667% */
                textTransform={{base: `capitalize`}}
              >
                {data?.fraction_is_available
                  ? `Fractional`
                  : data?.payment_plan_is_available
                  ? `Payment Plan`
                  : data?.is_watchlist
                  ? `Added to Watchlist`
                  : ``}
              </Text>
            </Flex>
          ) : null}
        </HStack>

        <Text
          color={`matador_text.400`}
          fontSize={{base: `16px`}}
          fontWeight={`400`}
          lineHeight={`160%`}
          letterSpacing={`0.32px`}
          noOfLines={`5`}
          flex={`1`}
          wordBreak={`break-word`}
        >
          {data?.description}
        </Text>
        <Text
          color="custom_color.color_pop"
          fontWeight={`700`}
          fontSize={{base: '13px'}}
          lineHeight={`150%`}
          textTransform={`capitalize`}
          textAlign={{base: 'left'}}
          mt={{base: `40px`, md: `0px`}}
          borderBottom={`1px solid`}
          width={`max-content`}
          py={`5px`}
          letterSpacing={`0.26px`}
        >
          Learn More
        </Text>
      </VStack>
    </Flex>
  );
};
