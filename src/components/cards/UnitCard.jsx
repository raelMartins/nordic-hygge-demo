import {Box, Center, Flex, Hide, HStack, Show, Stack, Text, VStack} from '@chakra-ui/react';
import Image from 'next/image';
import {useRouter} from 'next/router';
import {formatToCurrency} from '../../utils';
import {motion} from 'framer-motion';
import Link from 'next/link';
import {randomBackgroundColor} from '@/utils/misc';

export const UnitCard = ({isLoading, unit, projectID, sold_out, index, ...rest}) => {
  const router = useRouter();

  const handle_click = () => {
    router.push({
      pathname: `/listing-details/units/${unit?.id}`,
      query: {projectId: projectID},
    });
  };
  return isLoading ? (
    <></>
  ) : (
    <>
      <Flex
        direction={{base: `column`, md: `row`}}
        align={`center`}
        justify={`flex-start`}
        cursor={'pointer'}
        mx={'auto'}
        // maxH={{base: '350px', md: `490px`}}
        h={`100%`}
        w="full"
        borderRadius={'5px'}
        position={'relative'}
        onClick={handle_click}
        bg={{base: `matador_background.200`}}
        border={`1px solid`}
        borderColor={`matador_border_color.100`}
        {...rest}
      >
        <Center
          // aspectRatio={{base: `410  / 274`, xl: index % 3 === 1 ? '410  / 548' : '410  / 274'}}
          aspectRatio={{base: `600  / 336`}}
          position={'relative'}
          w={`100%`}
          overflow={`hidden`}
          bg={randomBackgroundColor()}
        >
          <Image src={unit?.photos?.[0]?.photo} alt={`image`} fill style={{objectFit: `cover`}} />
        </Center>

        <VStack
          align={'stretch'}
          justify={`flex-start`}
          // textAlign={`center`}
          gap={'16px'}
          w="full"
          zIndex={1}
          p={{base: `24px 30px`}}
        >
          <HStack justify={`space-between`} gap={`10px`}>
            <Stack gap={`4px`}>
              <Text
                color="custom_color.color_pop"
                fontWeight={`700`}
                fontSize={{base: '18px', lg: '23px'}}
                lineHeight={`104%`}
                textTransform={`uppercase`}
              >
                {unit?.unit_title}
              </Text>
              {!unit?.display_price || unit?.is_sold_out || unit?.quantity <= 0 || sold_out ? (
                <></>
              ) : (
                <Text
                  color={{base: `matador_text.300`}}
                  fontSize={{base: `13px`}}
                  fontWeight={{base: `600`}}
                  lineHeight={{base: `150%`}} /* 116.667% */
                  textTransform={{base: `capitalize`}}
                  letterSpacing={`.26px`}
                >
                  {unit?.is_sold_out || unit?.quantity <= 0 || sold_out
                    ? `Sold Out`
                    : unit?.display_price
                    ? `Starting from ${formatToCurrency(unit?.price)}`
                    : 'Contact for Price'}
                </Text>
              )}
            </Stack>
            {unit?.fraction_is_available || unit?.is_watchlist ? (
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
                <Center boxSize={`6px`} bg={`custom_color.color_pop`} borderRadius={`50%`} />
                <Text
                  color={{base: `matador_text.300`}}
                  fontSize={{base: `13px`}}
                  fontWeight={{base: `600`}}
                  lineHeight={{base: `150%`}} /* 116.667% */
                  textTransform={{base: `capitalize`}}
                >
                  {unit?.fraction_is_available
                    ? `Fractional`
                    : unit?.is_watchlist
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
            wordBreak={`break-word`}
            pr={`10px`}
          >
            {unit?.unit_description}
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
    </>
  );
};
