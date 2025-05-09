import {Box, Flex, HStack, Stack, StackDivider, Text, VStack} from '@chakra-ui/react';
import useWatchlist from '@/ui-lib/ui-lib.hooks/useWatchlist';
import {Button} from '@/ui-lib';
import {formatToCurrency} from '@/utils';
import {AmountText} from '@/ui-lib/ui-lib.components/hover/hoverOnText';
import BookmarkProperty from '../listings/sections/bookmark';
import useGetSession from '@/utils/hooks/getSession';
import {useCustomToast} from '@/components/CustomToast';
import {PaymentAccess} from '@/components/payment/PaymentAccess';
import {formatPropertySize} from '@/utils/misc';

export const UnitOptions = ({info, openAuth, unitData, change_screen}) => {
  const toast = useCustomToast();
  const {toggleWatchlist, isWatchlisted} = useWatchlist({info});
  const {sessionData: LoggedinUser} = useGetSession('loggedIn');

  const handleAuthClick = func => {
    if (!LoggedinUser) {
      return openAuth();
    } else {
      return func();
    }
  };

  const transparent_button_styles = {
    bg: 'transparent !important',
    color: 'custom_color.dark_background_pop',
    border: '0.5px solid',
    borderColor: 'custom_color.dark_background_pop',
    fontWeight: '400',
  };

  const button_styles = {
    flex: `1`,
    width: '100%',
    p: {base: `10.6px`, lg: '13px'},
    height: `100% !important`,
    borderRadius: `0px`,
    opacity: '1',
    fontWeight: {base: `500`, lg: '600'},
    fontSize: {base: `14px`, lg: '16px'},
    lineHeight: '140%',
    letterSpacing: '0.48px',
    textTransform: 'uppercase',
  };

  const alert_sold_out = () => {
    return toast({
      title: 'Sold Out',
      description: `This Unit is sold out`,
      status: 'info',
      duration: 5000,
      isClosable: true,
      position: 'top-right',
    });
  };

  const unitIsSoldOut = unitData.quantity <= 0 || info?.is_sold_out;

  return (
    <Box w={{base: `100%`}}>
      <Stack textAlign={`center`} gap={`32px`} mb={`24px`}>
        <Text
          className="heading-text-regular"
          fontSize={
            unitData?.unit_title?.length > 25
              ? {base: `14px`, lg: `28px`}
              : {base: `24px`, lg: `48px`}
          }
          fontStyle={`normal`}
          fontWeight={`600`}
          lineHeight={`130%`}
          textTransform={`uppercase`}
        >
          {unitData?.unit_title}
        </Text>
        <HStack divider={<StackDivider orientation="vertical" borderColor={`#DDD`} />}>
          <VStack
            flex={`1`}
            fontWeight={`500`}
            lineHeight={`140%`}
            letterSpacing={`0.28px`}
            textTransform={`uppercase`}
            textAlign={`center`}
            p={`4px`}
          >
            <Text fontSize={{base: `10px`, lg: `14px`}} color={`#DDDDDD`}>
              Unit Size
            </Text>
            <Text fontSize={{base: `14px`, lg: `18px`}} noOfLines={`4`}>
              {formatPropertySize(unitData?.unit_size)}
            </Text>
          </VStack>
          <VStack
            flex={`1`}
            fontWeight={`500`}
            lineHeight={`140%`}
            letterSpacing={`0.28px`}
            textTransform={`uppercase`}
            p={`4px`}
          >
            {unitIsSoldOut ? (
              <Text fontSize={{base: `14px`, lg: `20px`}}>Sold Out</Text>
            ) : (
              <>
                <Text fontSize={{base: `10px`, lg: `14px`}}>
                  {!unitData?.display_price ? `Contact For Price` : `STARTING FROM`}
                </Text>
                {unitData?.display_price && (
                  <AmountText
                    textSizePX="20px"
                    mobileTextSizePX={`14px`}
                    value={formatToCurrency(unitData?.price)}
                  />
                )}
              </>
            )}
          </VStack>
        </HStack>
      </Stack>
      <Flex direction="column" gap="12px" justify={'space-between'} w={`100%`}>
        {unitIsSoldOut ? (
          <BookmarkProperty
            info={info}
            InnerComponent={
              <Button variation={`primary`} {...button_styles}>
                <HStack>
                  <Text fontSize={`16px`}>
                    {isWatchlisted ? `Added to Watchlist` : `notify when available`}
                  </Text>{' '}
                </HStack>
              </Button>
            }
          />
        ) : (
          <PaymentAccess
            content={
              <Button
                variation={`primary`}
                onClick={() => handleAuthClick(() => change_screen('purchase'))}
                {...button_styles}
              >
                <HStack>
                  <Text fontSize={`16px`}>Proceed To Payment</Text>{' '}
                </HStack>
              </Button>
            }
          />
        )}
        <Button
          {...button_styles}
          {...transparent_button_styles}
          onClick={() =>
            handleAuthClick(() =>
              info.is_sold_out ? alert_sold_out() : change_screen('inspection')
            )
          }
        >
          <HStack>
            <Text fontSize={`16px`}>Schedule Inspection</Text>
          </HStack>
        </Button>
        <Button
          {...button_styles}
          {...transparent_button_styles}
          onClick={() => change_screen('contact')}
        >
          <HStack>
            <Text fontSize={`16px`}>Contact Person</Text>
          </HStack>
        </Button>
      </Flex>
    </Box>
  );
};
