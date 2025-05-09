import {Button} from '@/ui-lib';
import {
  Center,
  Flex,
  Stack,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  VStack,
} from '@chakra-ui/react';
import {getOrdinal} from '../../helper_functions';
import {changeDateFormat} from '@/utils/formatDate';
import {formatToCurrency} from '@/utils';
import ThreeDots from '@/components/loaders/ThreeDots';

const BreakdownEntry = ({data, title, index, date}) => {
  return (
    <VStack
      bg={`matador_background.100`}
      color={`text`}
      border={`1px solid`}
      borderColor={`matador_border_color.100`}
      p={`9px`}
      gap={`4px`}
      fontWeight={`400`}
      fontSize={`12px`}
      lineHeight={`138%`}
      letterSpacing={`0%`}
    >
      <Text textTransform={`capitalize`}>
        {title
          ? title
          : data?.transaction_action_type?.toLowerCase()?.includes(`initial`)
          ? `Initial Deposit`
          : `${getOrdinal(index + 1)} payment`}
      </Text>
      <Text fontWeight={`500`} fontSize={`13px`} lineHeight={`140%`} letterSpacing={`1%`}>
        {data?.amount ? formatToCurrency(data?.amount) : `TBD`}
      </Text>
      {date && (
        <Center bg={`matador_background.200`} p={`3px 8px`} borderRadius={`4px`} w={`max-content`}>
          <Text>{changeDateFormat(date)}</Text>
        </Center>
      )}
    </VStack>
  );
};

export const ValidationPaymentBreakdownView = ({
  asset,
  changeScreen,
  handleConfirm,
  HISTORY,
  UPCOMING,
  FEES_ARRAY,
  loadingHistory,
  loadingUpcoming,
}) => {
  const tab_style = {
    fontWeight: `500`,
    fontSize: `13.39px`,
    lineHeight: `150%`,
    letterSpacing: `2%`,
    border: `none`,
    color: `matador_form.label`,
    padding: `8px`,
    borderRadius: `6px`,
    _selected: {fontWeight: `600`, bg: `matador_background.200`, color: `text`},
    _hover: {fontWeight: `600`, bg: `matador_background.200`, color: `text`},
    _active: {fontWeight: `600`, bg: `matador_background.200`, color: `text`},
  };

  const plan_type = asset?.payment_plan?.plan_type;
  const periodic_payment = asset?.payment_plan?.periodic_payment;
  const payment_frequency = asset?.payment_plan?.payment_frequency;
  return (
    <Stack
      w={{base: `100%`, lg: `412px`}}
      bg={`matador_background.200`}
      maxH={`600px`}
      p={{base: `24px`}}
      position={`relative`}
      boxShadow={`0px 7.92px 7.92px -3.96px rgba(16, 24, 40, 0.03), 0px 19.8px 23.76px -3.96px rgba(16, 24, 40, 0.08)`}
    >
      <Flex direction={`column`} h={`100%`} overflowY={`auto`} flex={`1`} gap={`10px`} px={`4px`}>
        <Text
          className="heading-text-regular"
          fontWeight={`600`}
          fontSize={'20px'}
          color={'text'}
          lineHeight={`140%`}
          letterSpacing={`0%`}
          textTransform={`uppercase`}
        >
          {asset?.unit?.unit_title}
        </Text>

        <Tabs isFitted>
          <TabList
            bg={`matador_background.100`}
            padding={`6px`}
            gap={`8px`}
            borderRadius={`6px`}
            border={`none`}
          >
            <Tab {...tab_style}>Upcoming Payment</Tab>
            <Tab {...tab_style}>Previous Payment</Tab>
          </TabList>

          <TabPanels>
            <TabPanel px={`0px`} py={`4px`}>
              {loadingUpcoming ? (
                <Center minH={`100px`}>
                  <ThreeDots />
                </Center>
              ) : !UPCOMING?.length && !FEES_ARRAY?.length ? (
                <Center flexDir={`column`} minH={`100px`}>
                  <Text fontSize={`14px`} textTransform={`uppercase`} fontWeight={`500`}>
                    Nothing Found
                  </Text>
                  <Text fontSize={`12px`} color={`matador_form.label`}>
                    You have no upcoming payments
                  </Text>
                </Center>
              ) : plan_type === 'manual' ? (
                <BreakdownEntry
                  data={{
                    amount:
                      payment_frequency !== 'flexible' ? formatToCurrency(periodic_payment) : null,
                  }}
                  title={
                    payment_frequency
                      ? payment_frequency?.charAt(0).toUpperCase() +
                        payment_frequency?.slice(1) +
                        ' Payment'
                      : 'Periodic Payment'
                  }
                />
              ) : (
                <Stack gap={`4px`}>
                  {UPCOMING?.map((item, idx) => (
                    <BreakdownEntry
                      key={idx}
                      data={item}
                      index={(HISTORY?.length || 0) + idx}
                      date={item?.due_date}
                    />
                  ))}
                  {FEES_ARRAY?.map((item, idx) => (
                    <BreakdownEntry
                      key={idx}
                      data={item}
                      title={item?.name}
                      index={(HISTORY?.length || 0) + (UPCOMING?.length || 0) + idx}
                    />
                  ))}
                </Stack>
              )}
            </TabPanel>
            <TabPanel px={`0px`} py={`4px`}>
              {loadingHistory ? (
                <Center minH={`50px`}>
                  <ThreeDots />
                </Center>
              ) : !HISTORY?.length ? (
                <Center flexDir={`column`} minH={`100px`}>
                  <Text fontSize={`14px`} textTransform={`uppercase`} fontWeight={`500`}>
                    Nothing Found
                  </Text>
                  <Text fontSize={`12px`} color={`matador_form.label`}>
                    You have no previous payments
                  </Text>
                </Center>
              ) : (
                <Stack gap={`4px`}>
                  {HISTORY?.map((item, idx) => (
                    <BreakdownEntry key={idx} data={item} index={idx} date={item?.created_at} />
                  ))}
                </Stack>
              )}
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Flex>
      <Flex direction={`column`} gap={`8px`} pt={`20px`} position={`sticky`} bottom={`0px`}>
        <Button
          color={`text`}
          fontSize="16px"
          fontWeight="500"
          bg="matador_background.100"
          className={`tertiary-text`}
          lineHeight={`140%`}
          letterSpacing={`1%`}
          p={`12.5px`}
          border={`1px solid`}
          borderColor={`matador_border_color.100`}
          onClick={() => changeScreen('summary')}
        >
          Go Back
        </Button>
        <Button
          fontSize="16px"
          fontWeight="500"
          bg="custom_color.color"
          color="custom_color.contrast"
          onClick={handleConfirm}
          className={`tertiary-text`}
          lineHeight={`140%`}
          letterSpacing={`1%`}
          p={`12.5px`}
        >
          This looks correct
        </Button>
      </Flex>
    </Stack>
  );
};
