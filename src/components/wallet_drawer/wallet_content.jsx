import React, {useState} from 'react';
import {
  Flex,
  HStack,
  Image,
  Text,
  VStack,
  Box,
  Center,
  Stack,
  useTheme,
  DrawerCloseButton,
} from '@chakra-ui/react';
import withdrawalIcon from '@/images/withdrawal-transaction.svg';
import withdrawalIconLight from '@/images/withdrawal-transaction-light.svg';
import {Button, ResponsivePopupCloseButton, Spinner} from '@/ui-lib';
import {useQuery, useQueryClient} from 'react-query';
import {fetchStoreWalletTxns, fetchWalletCurrentBalance} from '@/api/Wallet';
import {formatDateToString} from '@/utils/formatDate';
import {formatToCurrency} from '@/utils';
import {appCurrentTheme} from '@/utils/localStorage';
import {LIGHT} from '@/constants/names';
import {CloseIcon} from '@chakra-ui/icons';
import {IoEyeOffOutline, IoEyeOutline} from 'react-icons/io5';
import EmptyState from '../appState/empty-state';
import {scrollBarStyles} from '../common/ScrollBarStyles';
import ErrorState from '../appState/error-state';
import {drawer_title_styles} from '../navbar/Navbar';
import ThreeDots from '../loaders/ThreeDots';
import {PaymentAccess} from '../payment/PaymentAccess';

export const EmptyTransactionsIcon = ({...rest}) => {
  const theme = useTheme();
  const color = theme?.colors?.text;
  return (
    <Box w={`32px`} h={`33px`} {...rest}>
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 32 33"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M26.6673 3.10938H13.334C12.2731 3.10938 11.2557 3.5308 10.5056 4.28095C9.75541 5.03109 9.33398 6.04851 9.33398 7.10938V16.4427C9.33398 17.5036 9.75541 18.521 10.5056 19.2711C11.2557 20.0213 12.2731 20.4427 13.334 20.4427H26.6673C27.7282 20.4427 28.7456 20.0213 29.4957 19.2711C30.2459 18.521 30.6673 17.5036 30.6673 16.4427V7.10938C30.6673 6.04851 30.2459 5.03109 29.4957 4.28095C28.7456 3.5308 27.7282 3.10938 26.6673 3.10938ZM28.0007 16.4427C28.0007 16.7963 27.8602 17.1355 27.6101 17.3855C27.3601 17.6356 27.0209 17.776 26.6673 17.776H13.334C12.9804 17.776 12.6412 17.6356 12.3912 17.3855C12.1411 17.1355 12.0007 16.7963 12.0007 16.4427V7.10938C12.0007 6.75575 12.1411 6.41662 12.3912 6.16657C12.6412 5.91652 12.9804 5.77604 13.334 5.77604H26.6673C27.0209 5.77604 27.3601 5.91652 27.6101 6.16657C27.8602 6.41662 28.0007 6.75575 28.0007 7.10938V16.4427ZM23.334 11.1094C22.8406 11.1123 22.3657 11.2975 22.0007 11.6294C21.7139 11.3688 21.3577 11.1971 20.9753 11.1351C20.5928 11.0732 20.2006 11.1236 19.8462 11.2804C19.4919 11.4371 19.1908 11.6934 18.9794 12.0181C18.768 12.3428 18.6554 12.7219 18.6554 13.1094C18.6554 13.4968 18.768 13.8759 18.9794 14.2006C19.1908 14.5253 19.4919 14.7816 19.8462 14.9384C20.2006 15.0951 20.5928 15.1456 20.9753 15.0836C21.3577 15.0217 21.7139 14.85 22.0007 14.5894C22.2414 14.8082 22.532 14.965 22.8471 15.0461C23.1621 15.1273 23.4923 15.1303 23.8088 15.055C24.1253 14.9797 24.4187 14.8283 24.6635 14.6139C24.9082 14.3996 25.097 14.1287 25.2134 13.8249C25.3298 13.5211 25.3704 13.1934 25.3315 12.8704C25.2926 12.5474 25.1755 12.2387 24.9904 11.9711C24.8052 11.7036 24.5575 11.4853 24.2689 11.3351C23.9803 11.1849 23.6593 11.1074 23.334 11.1094ZM21.334 23.1094C20.9804 23.1094 20.6412 23.2499 20.3912 23.4999C20.1411 23.7499 20.0007 24.0891 20.0007 24.4427V25.776C20.0007 26.1297 19.8602 26.4688 19.6101 26.7189C19.3601 26.9689 19.0209 27.1094 18.6673 27.1094H5.33398C4.98036 27.1094 4.64122 26.9689 4.39118 26.7189C4.14113 26.4688 4.00065 26.1297 4.00065 25.776V20.4427H5.33398C5.68761 20.4427 6.02674 20.3022 6.27679 20.0522C6.52684 19.8021 6.66732 19.463 6.66732 19.1094C6.66732 18.7558 6.52684 18.4166 6.27679 18.1666C6.02674 17.9165 5.68761 17.776 5.33398 17.776H4.00065V16.4427C4.00065 16.0891 4.14113 15.7499 4.39118 15.4999C4.64122 15.2499 4.98036 15.1094 5.33398 15.1094C5.68761 15.1094 6.02674 14.9689 6.27679 14.7189C6.52684 14.4688 6.66732 14.1297 6.66732 13.776C6.66732 13.4224 6.52684 13.0833 6.27679 12.8332C6.02674 12.5832 5.68761 12.4427 5.33398 12.4427C4.27312 12.4427 3.2557 12.8641 2.50556 13.6143C1.75541 14.3644 1.33398 15.3818 1.33398 16.4427V25.776C1.33398 26.8369 1.75541 27.8543 2.50556 28.6045C3.2557 29.3546 4.27312 29.776 5.33398 29.776H18.6673C19.7282 29.776 20.7456 29.3546 21.4957 28.6045C22.2459 27.8543 22.6673 26.8369 22.6673 25.776V24.4427C22.6673 24.0891 22.5268 23.7499 22.2768 23.4999C22.0267 23.2499 21.6876 23.1094 21.334 23.1094ZM8.00065 24.4427H9.33398C9.68761 24.4427 10.0267 24.3022 10.2768 24.0522C10.5268 23.8021 10.6673 23.463 10.6673 23.1094C10.6673 22.7558 10.5268 22.4166 10.2768 22.1666C10.0267 21.9165 9.68761 21.776 9.33398 21.776H8.00065C7.64703 21.776 7.30789 21.9165 7.05784 22.1666C6.80779 22.4166 6.66732 22.7558 6.66732 23.1094C6.66732 23.463 6.80779 23.8021 7.05784 24.0522C7.30789 24.3022 7.64703 24.4427 8.00065 24.4427Z"
          fill={color}
        />
      </svg>
    </Box>
  );
};

export const EmptyTransactionsIcon2 = ({...rest}) => {
  const theme = useTheme();
  const color = theme?.colors?.text;
  return (
    <Box w={`24px`} h={`24px`} {...rest}>
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M2 19C2 19 3 19 4 21C4 21 7.176 16 10 15M10.5 21H16C18.828 21 20.243 21 21.121 20.121C22 19.243 22 17.828 22 15V13C22 10.172 22 8.757 21.121 7.879C20.243 7 18.828 7 16 7H10M2 15V11C2 7.229 2 5.343 3.172 4.172C4.344 3.001 6.229 3 10 3H14C14.93 3 15.395 3 15.777 3.102C16.2855 3.23856 16.7491 3.50654 17.1212 3.87902C17.4934 4.25151 17.7609 4.71537 17.897 5.224C18 5.605 18 6.07 18 7"
          stroke={color}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M16 13.5C16 13.8978 16.158 14.2794 16.4393 14.5607C16.7206 14.842 17.1022 15 17.5 15C17.8978 15 18.2794 14.842 18.5607 14.5607C18.842 14.2794 19 13.8978 19 13.5C19 13.1022 18.842 12.7206 18.5607 12.4393C18.2794 12.158 17.8978 12 17.5 12C17.1022 12 16.7206 12.158 16.4393 12.4393C16.158 12.7206 16 13.1022 16 13.5Z"
          stroke={color}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </Box>
  );
};

export const WalletButtonIcon = ({custom_color, theme_color = false, ...rest}) => {
  const theme = useTheme();
  const color = theme_color ? theme?.colors?.custom_color?.color : custom_color || `#fff`;
  return (
    <Box width={`21px`} height={`21px`} {...rest}>
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 21 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g clip-path="url(#clip0_3624_17449)">
          <path
            d="M8.27571 3.40727L9.71876 1.98125V9.21875C9.71876 9.65023 10.0685 10 10.5 10C10.9315 10 11.2813 9.65023 11.2813 9.21875V2.05848L12.6462 3.40727C12.9531 3.71055 13.4477 3.70758 13.751 3.4007C14.0543 3.09379 14.0513 2.59914 13.7445 2.29586L12.1199 0.690469C11.6766 0.245156 11.0877 0 10.4609 0C9.83419 0 9.24524 0.245156 8.802 0.690469L7.17743 2.29586C6.87055 2.59914 6.86758 3.09379 7.17087 3.4007C7.47418 3.70762 7.9688 3.71059 8.27571 3.40727Z"
            fill={color}
          />
          <path
            d="M1.28125 9.21875C1.71273 9.21875 2.0625 8.86898 2.0625 8.4375C2.0625 7.57594 2.76344 6.875 3.625 6.875H7.375C7.80648 6.875 8.15625 6.52523 8.15625 6.09375C8.15625 5.66227 7.80648 5.3125 7.375 5.3125H3.625C1.90188 5.3125 0.5 6.71438 0.5 8.4375C0.5 8.86898 0.849766 9.21875 1.28125 9.21875Z"
            fill={color}
          />
          <path
            d="M8.34484 10.0855C8.21398 10.0012 8.06746 9.96094 7.92262 9.96098C7.66586 9.96098 7.41437 10.0874 7.26504 10.3193C6.80031 11.041 6.55469 11.8643 6.55469 12.7002C6.55469 15.0264 8.32457 16.9189 10.5 16.9189C12.6754 16.9189 14.4453 15.0264 14.4453 12.7002C14.4453 11.8054 14.2188 11.0034 13.7721 10.3164C13.537 9.95473 13.053 9.85215 12.6913 10.0873C12.3296 10.3225 12.227 10.8064 12.4622 11.1682C12.7413 11.5974 12.8828 12.1128 12.8828 12.7002C12.8828 14.1648 11.8139 15.3564 10.5 15.3564C9.18609 15.3564 8.11719 14.1648 8.11719 12.7002C8.11719 12.165 8.27676 11.6342 8.57871 11.1653C8.8123 10.8025 8.70762 10.3191 8.34484 10.0855Z"
            fill={color}
          />
          <path
            d="M4.28906 11.9141C3.85759 11.9141 3.50781 12.2638 3.50781 12.6953C3.50781 13.1268 3.85759 13.4766 4.28906 13.4766C4.72053 13.4766 5.07031 13.1268 5.07031 12.6953C5.07031 12.2638 4.72053 11.9141 4.28906 11.9141Z"
            fill={color}
          />
          <path
            d="M16.7109 11.9141C16.2795 11.9141 15.9297 12.2638 15.9297 12.6953C15.9297 13.1268 16.2795 13.4766 16.7109 13.4766C17.1424 13.4766 17.4922 13.1268 17.4922 12.6953C17.4922 12.2638 17.1424 11.9141 16.7109 11.9141Z"
            fill={color}
          />
          <path
            d="M3.625 20L17.375 20C19.0981 20 20.5 18.5981 20.5 16.875V8.4375C20.5 6.71437 19.0981 5.3125 17.375 5.3125H13.625C13.1935 5.3125 12.8438 5.66227 12.8438 6.09375C12.8438 6.52523 13.1935 6.875 13.625 6.875H17.375C18.2366 6.875 18.9375 7.57594 18.9375 8.4375V16.875C18.9375 17.7366 18.2366 18.4375 17.375 18.4375L3.625 18.4375C2.76344 18.4375 2.0625 17.7366 2.0625 16.875V12.3437C2.0625 11.9123 1.71273 11.5625 1.28125 11.5625C0.849766 11.5625 0.5 11.9123 0.5 12.3437V16.875C0.5 18.5981 1.90187 20 3.625 20Z"
            fill={color}
          />
        </g>
        <defs>
          <clipPath id="clip0_3624_17449">
            <rect width="20" height="20" fill="white" transform="translate(0.5)" />
          </clipPath>
        </defs>
      </svg>
    </Box>
  );
};

const TransactionsDirection = ({type = `debit`}) => {
  return type === `credit` ? (
    <Box>
      <svg
        width="36"
        height="37"
        viewBox="0 0 36 37"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect
          y="0.789062"
          width="35.6001"
          height="35.6001"
          rx="17.8001"
          fill="#ECFDF3"
          fillOpacity="0.1"
        />
        <path
          d="M17.7991 26.5602C13.401 26.5602 9.82617 22.9853 9.82617 18.5872C9.82617 14.1891 13.401 10.6143 17.7991 10.6143C18.1032 10.6143 18.3554 10.8664 18.3554 11.1705C18.3554 11.4746 18.1032 11.7268 17.7991 11.7268C14.0166 11.7268 10.9387 14.8047 10.9387 18.5872C10.9387 22.3697 14.0166 25.4476 17.7991 25.4476C21.5816 25.4476 24.6596 22.3697 24.6596 18.5872C24.6596 18.2831 24.9117 18.031 25.2158 18.031C25.5199 18.031 25.7721 18.2831 25.7721 18.5872C25.7721 22.9853 22.1972 26.5602 17.7991 26.5602Z"
          fill="#12B76A"
        />
        <path
          d="M19.1345 17.8095C18.9936 17.8095 18.8526 17.7576 18.7414 17.6464C18.5263 17.4313 18.5263 17.0753 18.7414 16.8602L24.8231 10.7785C25.0382 10.5634 25.3942 10.5634 25.6093 10.7785C25.8243 10.9936 25.8243 11.3496 25.6093 11.5647L19.5276 17.6464C19.4237 17.7502 19.2828 17.8095 19.1345 17.8095Z"
          fill="#12B76A"
        />
        <path
          d="M22.1229 18.4018H18.5406C18.2365 18.4018 17.9844 18.1496 17.9844 17.8455V14.2633C17.9844 13.9592 18.2365 13.707 18.5406 13.707C18.8447 13.707 19.0969 13.9592 19.0969 14.2633V17.2893H22.1229C22.427 17.2893 22.6791 17.5415 22.6791 17.8455C22.6791 18.1496 22.427 18.4018 22.1229 18.4018Z"
          fill="#12B76A"
        />
      </svg>
    </Box>
  ) : type === `debit` ? (
    <Box transform={`rotate(180deg)`}>
      <svg
        width="36"
        height="37"
        viewBox="0 0 36 37"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect
          y="0.876953"
          width="35.6001"
          height="35.6001"
          rx="17.8001"
          fill="#D92E33"
          fillOpacity="0.1"
        />
        <path
          d="M17.7991 26.648C13.401 26.648 9.82617 23.0732 9.82617 18.6751C9.82617 14.277 13.401 10.7021 17.7991 10.7021C18.1032 10.7021 18.3554 10.9543 18.3554 11.2584C18.3554 11.5625 18.1032 11.8147 17.7991 11.8147C14.0166 11.8147 10.9387 14.8926 10.9387 18.6751C10.9387 22.4576 14.0166 25.5355 17.7991 25.5355C21.5816 25.5355 24.6596 22.4576 24.6596 18.6751C24.6596 18.371 24.9117 18.1188 25.2158 18.1188C25.5199 18.1188 25.7721 18.371 25.7721 18.6751C25.7721 23.0732 22.1972 26.648 17.7991 26.648Z"
          fill="#FF5050"
        />
        <path
          d="M19.1345 17.8974C18.9936 17.8974 18.8526 17.8455 18.7414 17.7343C18.5263 17.5192 18.5263 17.1632 18.7414 16.9481L24.8231 10.8664C25.0382 10.6513 25.3942 10.6513 25.6093 10.8664C25.8243 11.0815 25.8243 11.4375 25.6093 11.6526L19.5276 17.7343C19.4237 17.8381 19.2828 17.8974 19.1345 17.8974Z"
          fill="#FF5050"
        />
        <path
          d="M22.1229 18.4897H18.5406C18.2365 18.4897 17.9844 18.2375 17.9844 17.9334V14.3512C17.9844 14.0471 18.2365 13.7949 18.5406 13.7949C18.8447 13.7949 19.0969 14.0471 19.0969 14.3512V17.3772H22.1229C22.427 17.3772 22.6791 17.6294 22.6791 17.9334C22.6791 18.2375 22.427 18.4897 22.1229 18.4897Z"
          fill="#FF5050"
        />
      </svg>
    </Box>
  ) : (
    <></>
  );
};

export const WalletContent = ({setPage, onWalClose, avatar}) => {
  const WALLET__ACCOUNT_BALANCE = useQuery(
    ['fetchWalletCurrentBalance'],
    fetchWalletCurrentBalance,
    {refetchInterval: 2 * 60 * 1000}
  );
  const Account_balance = WALLET__ACCOUNT_BALANCE?.data?.data?.data?.naira_balance;
  const WALLET__TXNS = useQuery(['fetchStoreWalletTxns'], fetchStoreWalletTxns, {
    refetchInterval: 2 * 60 * 1000,
  });
  const [showPrice, setShowPrice] = useState(false);
  const [isRefetching, setIsrefetching] = useState(false);
  const queryClient = useQueryClient();
  let TIME_OF_DAY = '';

  const handleRefresh = async () => {
    setIsrefetching(true);
    await queryClient.invalidateQueries(['fetchWalletCurrentBalance']); // Invalidate the 'myData' query

    await WALLET__ACCOUNT_BALANCE.refetch();
    setIsrefetching(false);
  };

  let time = new Date().getHours();

  // if (time >= 5 && time < 12) {
  if (time >= 0 && time < 12) {
    TIME_OF_DAY = 'morning';
  } else if (time >= 12 && time < 17) {
    TIME_OF_DAY = 'afternoon';
    // } else if (time >= 17 || time < 5) {
  } else if (time >= 17) {
    TIME_OF_DAY = 'evening';
  }

  return (
    <Stack
      px={{base: 0}}
      pb="38px"
      bg="card_bg"
      minH={'fit-content'}
      overflowY="auto"
      css={scrollBarStyles}
      gap={`0px`}
    >
      <Flex
        {...drawer_title_styles}
        borderBottom="1px solid"
        borderColor={`matador_border_color.100 !important`}
        display={{base: `none`, lg: `flex`}}
      >
        <HStack spacing="12px">
          <Text>Wallet</Text>
        </HStack>
        {/* <CloseIcon
          display={{base: 'none', md: 'flex'}}
          fontSize={'12px'}
          cursor="pointer"
          color="text"
          onClick={onWalClose}
        /> */}
        <ResponsivePopupCloseButton />
      </Flex>
      <Stack
        flexDirection="column"
        bg="matador_background.100"
        w="full"
        gap="24px"
        border={'none'}
        p={{base: `32px 20px`}}
        borderBottom="1px solid"
        borderColor={`matador_border_color.100 !important`}
      >
        <Box>
          <Text
            lineHeight={`150%`}
            fontSize={'14px'}
            fontWeight={`400`}
            color="text"
            letterSpacing="0.28px"
          >
            Current Balance
          </Text>
          <HStack spacing="16px" justify={`space-between`} h={`100%`}>
            {showPrice ? (
              <Text
                lineHeight={`100%`}
                color="text"
                fontSize={{base: '40px', lg: '32px'}}
                fontWeight={'600'}
                m={`0px`}
              >
                {Account_balance ? formatToCurrency(Account_balance) : '0.00'}
              </Text>
            ) : (
              <Text
                lineHeight={`100%`}
                color="text"
                fontSize={{base: '40px', lg: '32px'}}
                fontWeight={'600'}
                display={`flex`}
                align={`center`}
              >
                ∗∗∗∗∗∗
              </Text>
            )}
            <Box cursor="pointer" onClick={() => setShowPrice(!showPrice)} fontSize={22}>
              {showPrice ? <IoEyeOutline /> : <IoEyeOffOutline />}
            </Box>
          </HStack>
        </Box>
        <HStack justify={{base: 'center', lg: 'space-between'}} align={'stretch'} w="full">
          <PaymentAccess
            content={
              <Button
                variation={`primary`}
                fontSize="16px"
                fontWeight={{base: 600}}
                onClick={() => setPage('deposit')}
                gap="8px"
                boxStyle={{flex: 1}}
                p={`11px`}
              >
                <HStack gap={`8px`}>
                  <WalletButtonIcon transform={`rotate(180deg)`} />
                  <Text fontSize={{base: '16px', lg: '18px'}}> Deposit</Text>
                </HStack>
              </Button>
            }
          />
          <PaymentAccess
            checkWithdrawal
            content={
              <Button
                p={`11px`}
                fontSize="16px"
                fontWeight={{base: 600}}
                onClick={() => setPage('withdrawal')}
                border="1px solid"
                borderColor="custom_color.color !important"
                color="custom_color.color"
                bg="custom_color.background"
                gap="8px"
                flex={`1`}
                h={`100%`}
                textTransform="uppercase"
              >
                <HStack gap={`8px`}>
                  <WalletButtonIcon theme_color />
                  <Text fontSize={{base: '16px', lg: '18px'}}>Withdraw</Text>
                </HStack>
              </Button>
            }
          />
        </HStack>
      </Stack>
      <Stack p={{base: `24px 20px`}} bg="card_bg" w="full" alignSelf={'end'} justifySelf={'end'}>
        <Box>
          <Text
            fontSize={{base: `12px`, lg: `14px`}}
            fontWeight={`500`}
            letterSpacing="0.84px"
            textTransform={`uppercase`}
            lineHeight={`120%`}
          >
            Transaction History
          </Text>
          <VStack spacing={{base: '6px', lg: '10px'}} align="stretch" mt="14px">
            {WALLET__TXNS?.isLoading ? (
              <Center h="200px" w="full">
                <ThreeDots />
              </Center>
            ) : WALLET__TXNS?.isError ? (
              <ErrorState />
            ) : (
              <>
                {WALLET__TXNS?.data?.data?.message?.length > 0 ? (
                  <>
                    {WALLET__TXNS?.data?.data?.message.map((item, i) => {
                      let type = item.direction;
                      return (
                        <Flex
                          direction="row"
                          justify={'space-between'}
                          align="center"
                          key={item?.id}
                          py="12px"
                        >
                          <HStack spacing="14px">
                            <TransactionsDirection type={type} />
                            {/* <Flex
                              justify="center"
                              align="center"
                              w="34px"
                              h="34px"
                              borderRadius={'full'}
                            >
                              <Image
                                alt="next_image"
                                transform={type === 'credit' ? 'rotate(180deg)' : ''}
                                src={
                                  appCurrentTheme === LIGHT
                                    ? withdrawalIcon.src
                                    : withdrawalIconLight.src
                                }
                              />
                            </Flex> */}
                            <VStack align="stretch" spacing="3px" direction={'column'}>
                              <Text
                                color="text"
                                fontSize={'14px'}
                                fontWeight={{base: 600, lg: 700}}
                              >
                                {type == 'debit'
                                  ? 'Withdrawal'
                                  : type == 'credit'
                                  ? 'Deposit'
                                  : null}
                              </Text>
                              <Text color="text" fontSize={`12.5px`} fontWeight={400} opacity={0.6}>
                                {item?.successful_at && formatDateToString(item?.successful_at)}
                              </Text>
                            </VStack>
                          </HStack>

                          <VStack align="flex-end" spacing="3px" direction={'column'}>
                            <Text
                              color="text"
                              fontSize={{base: '12px', lg: '14px'}}
                              fontWeight={{base: '600', lg: '700'}}
                            >
                              {type == 'debit' ? '-' : type == 'credit' ? '+' : null}{' '}
                              {formatToCurrency(item?.amount) || '0'}
                            </Text>
                            <Text
                              color="text"
                              fontSize={{base: '10px', lg: '11px'}}
                              fontWeight={400}
                              opacity={0.6}
                            >
                              {formatToCurrency(item?.balance_before_transaction) || '0'}
                            </Text>
                          </VStack>
                        </Flex>
                      );
                    })}
                  </>
                ) : (
                  <EmptyState
                    icon={<EmptyTransactionsIcon />}
                    textSize={12}
                    headerStyle={{textTransform: 'uppercase', fontWeight: 700, fontSize: '14px'}}
                    height={{base: '300px'}}
                    minH={{base: '300px'}}
                    noIcon
                    //   noHeader
                    text={`Looks like you haven't processed any transactions yet.`}
                    // textStyle={{fontSize: `12px`, fontWeight: `400`}}
                  />
                )}
              </>
            )}
          </VStack>
        </Box>
      </Stack>
    </Stack>
  );
};

export default WalletContent;
