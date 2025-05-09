import {Flex, HStack, Stack, StackDivider, Text, VStack} from '@chakra-ui/react';
import {useQuery} from 'react-query';
import {fetchAllUnits, fetchFractionalInfo} from '@/api/listing';
import useLocalStorage from '@/utils/hooks/useLocalStorage';
import BookmarkProperty from './bookmark';
import useWatchlist from '@/ui-lib/ui-lib.hooks/useWatchlist';
import {Button} from '@/ui-lib';
import {formatToCurrency} from '@/utils';
import {AmountText} from '@/ui-lib/ui-lib.components/hover/hoverOnText';
import useGetSession from '@/utils/hooks/getSession';
import {useCustomToast} from '@/components/CustomToast';
import {PaymentAccess} from '@/components/payment/PaymentAccess';
import {checkIfSFH} from '@/utils/misc';

export const PropertyInfo = ({info, openAuth, change_screen}) => {
  const toast = useCustomToast();
  const [storeThemeInfo] = useLocalStorage('storeThemeInfo');
  const {toggleWatchlist, isWatchlisted} = useWatchlist({info});
  const {sessionData: LoggedinUser} = useGetSession('loggedIn');

  const handleAuthClick = func => {
    if (!LoggedinUser) {
      return openAuth();
    } else {
      return func();
    }
  };

  const fractionalIsEnabled = storeThemeInfo?.isFractionalEnabled ?? false;

  const {data: allUnits} = useQuery(
    ['fetchAllUnits', info?.id],
    () => fetchAllUnits(parseInt(info?.id)),
    {enabled: !!info?.id}
  );

  const unitsData = allUnits?.data?.results;
  const unitThatWasFractionalized = unitsData?.find(item => item?.is_fraction_sale_available);

  const {data: fractionalDetail} = useQuery(
    ['fractional', unitThatWasFractionalized?.id],
    () => fetchFractionalInfo(unitThatWasFractionalized?.id),
    {enabled: !!unitThatWasFractionalized?.id}
  );
  const fractionalData = fractionalDetail?.data;
  const unitData = fractionalData?.fraction_data?.unit;
  const leftFractions =
    Number(unitData?.total_fractions) - Number(unitData?.total_purchased_fractions);

  const has_fractions = info.is_fractionalized && fractionalIsEnabled;
  const is_detached = checkIfSFH(info);
  const canDisplayPrice = info?.display_price;

  const transparent_button_styles = {
    bg: 'transparent !important',
    color: `custom_color.dark_background_pop`,
    border: '0.5px solid',
    borderColor: `custom_color.dark_background_pop`,
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

  const primary_is_not_inspection = info.is_sold_out || is_detached || has_fractions;

  const alert_sold_out = () => {
    return toast({
      title: 'Sold Out',
      description: `This Listing is sold out`,
      status: 'info',
      duration: 5000,
      isClosable: true,
      position: 'top-right',
    });
  };

  return (
    <Stack gap={`24px`} w={{base: `100%`}}>
      <Stack textAlign={`center`} gap={`4px`}>
        <Text
          className="heading-text-regular"
          fontSize={
            info?.name?.length > 30 ? {base: `14px`, lg: `28px`} : {base: `24px`, lg: `46px`}
          }
          fontStyle={`normal`}
          fontWeight={`600`}
          lineHeight={`130%`}
          textTransform={`uppercase`}
        >
          {info?.name}
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
              Location
            </Text>
            <Text
              fontSize={
                info?.address?.length > 50 ? {base: `10px`, lg: `14px`} : {base: `14px`, lg: `18px`}
              }
              noOfLines={`4`}
            >
              {info?.address}
            </Text>
          </VStack>
          {!info?.display_price && !info.is_sold_out ? null : (
            <VStack
              flex={`1`}
              fontWeight={`500`}
              lineHeight={`140%`}
              letterSpacing={`0.28px`}
              textTransform={`uppercase`}
              p={`4px`}
            >
              {info.is_sold_out ? (
                <Text fontSize={{base: `14px`, lg: `20px`}}>Sold Out</Text>
              ) : (
                <>
                  <Text fontSize={{base: `10px`, lg: `14px`}}>
                    {is_detached ? `PRICE` : `STARTING FROM`}
                  </Text>
                  <AmountText
                    textSizePX="20px"
                    mobileTextSizePX={`14px`}
                    value={formatToCurrency(info?.starting_from)}
                  />
                </>
              )}
            </VStack>
          )}
        </HStack>
      </Stack>
      <Flex direction="column" gap="12px" justify={'space-between'} w={`100%`}>
        {info.is_sold_out ? (
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
        ) : has_fractions ? (
          <PaymentAccess
            checkFractions
            content={
              <Button
                variation={`primary`}
                {...button_styles}
                onClick={() =>
                  handleAuthClick(() =>
                    leftFractions <= 0 ? alert_sold_out() : change_screen('fractional')
                  )
                }
                w={`100%`}
              >
                <HStack>
                  <Text fontSize={`16px`}>
                    {leftFractions <= 0 ? 'Fractions Sold out' : 'Buy Fraction'}
                  </Text>{' '}
                </HStack>
              </Button>
            }
          />
        ) : is_detached ? (
          !canDisplayPrice ? (
            <PaymentAccess
              content={
                <Button
                  variation={`primary`}
                  {...button_styles}
                  onClick={() => change_screen('contact')}
                >
                  <HStack>
                    <Text fontSize={`16px`}>Contact For Price</Text>
                  </HStack>
                </Button>
              }
            />
          ) : (
            <>
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
            </>
          )
        ) : null}
        {info?.inspection_enabled &&
          (primary_is_not_inspection ? (
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
          ) : (
            <Button
              variation={`primary`}
              {...button_styles}
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
          ))}
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
    </Stack>
  );
};
