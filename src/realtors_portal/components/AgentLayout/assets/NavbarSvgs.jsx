import {Box} from '@chakra-ui/react';

export const NavSettingsIcon = ({
  boxSize = {base: '24px', md: '32px'},
  color = `#fff`,
  ...rest
}) => {
  return (
    <Box boxSize={boxSize} {...rest}>
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M27.2027 18.1068C27.6797 18.3601 28.0477 18.7601 28.3065 19.1601C28.8106 19.9868 28.7698 21.0001 28.2793 21.8935L27.3254 23.4935C26.8213 24.3468 25.881 24.8801 24.9137 24.8801C24.4367 24.8801 23.9053 24.7468 23.4693 24.4801C23.115 24.2535 22.7062 24.1735 22.2702 24.1735C20.9212 24.1735 19.7902 25.2801 19.7493 26.6001C19.7493 28.1335 18.4957 29.3335 16.9287 29.3335H15.0755C13.4949 29.3335 12.2414 28.1335 12.2414 26.6001C12.2141 25.2801 11.0831 24.1735 9.73415 24.1735C9.28448 24.1735 8.8757 24.2535 8.53504 24.4801C8.09902 24.7468 7.55396 24.8801 7.09068 24.8801C6.1096 24.8801 5.1694 24.3468 4.66523 23.4935L3.72503 21.8935C3.22087 21.0268 3.19362 19.9868 3.69778 19.1601C3.9158 18.7601 4.32458 18.3601 4.78787 18.1068C5.1694 17.9201 5.41467 17.6135 5.64631 17.2535C6.32762 16.1068 5.91883 14.6001 4.76062 13.9201C3.41163 13.1601 2.9756 11.4668 3.75228 10.1468L4.66523 8.57348C5.45555 7.25348 7.14519 6.78681 8.50779 7.56014C9.69327 8.20014 11.233 7.77348 11.928 6.64014C12.146 6.26681 12.2686 5.86681 12.2414 5.46681C12.2141 4.94681 12.364 4.45348 12.6229 4.05348C13.127 3.22681 14.04 2.69348 15.0347 2.66681H16.9559C17.9643 2.66681 18.8773 3.22681 19.3814 4.05348C19.6267 4.45348 19.7902 4.94681 19.7493 5.46681C19.7221 5.86681 19.8447 6.26681 20.0627 6.64014C20.7577 7.77348 22.2974 8.20014 23.4965 7.56014C24.8455 6.78681 26.5487 7.25348 27.3254 8.57348L28.2383 10.1468C29.0287 11.4668 28.5926 13.1601 27.2301 13.9201C26.0718 14.6001 25.663 16.1068 26.358 17.2535C26.5759 17.6135 26.8213 17.9201 27.2027 18.1068ZM12.146 16.0135C12.146 18.1068 13.8765 19.7735 16.0158 19.7735C18.155 19.7735 19.8447 18.1068 19.8447 16.0135C19.8447 13.9201 18.155 12.2401 16.0158 12.2401C13.8765 12.2401 12.146 13.9201 12.146 16.0135Z"
          fill={color}
        />
      </svg>
    </Box>
  );
};

export const NavWalletIcon = ({boxSize = {base: '24px', md: '32px'}, color = `#fff`, ...rest}) => {
  return (
    <Box boxSize={boxSize} {...rest}>
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M29.334 14.6267V17.3733C29.334 18.1067 28.7473 18.7067 28.0006 18.7333H25.3873C23.9473 18.7333 22.6273 17.68 22.5073 16.24C22.4273 15.4 22.7473 14.6133 23.3073 14.0667C23.8006 13.56 24.4806 13.2667 25.2273 13.2667H28.0006C28.7473 13.2933 29.334 13.8933 29.334 14.6267Z"
          fill={color}
        />
        <path
          d="M27.2937 20.7334H25.387C22.8537 20.7334 20.7203 18.8267 20.507 16.4C20.387 15.0134 20.8937 13.6267 21.907 12.64C22.7603 11.76 23.947 11.2667 25.227 11.2667H27.2937C27.6803 11.2667 28.0003 10.9467 27.9603 10.56C27.667 7.32002 25.5203 5.10669 22.3337 4.73335C22.0137 4.68002 21.6803 4.66669 21.3337 4.66669H9.33366C8.96033 4.66669 8.60033 4.69335 8.25366 4.74669C4.85366 5.17335 2.66699 7.70669 2.66699 11.3334V20.6667C2.66699 24.3467 5.65366 27.3334 9.33366 27.3334H21.3337C25.067 27.3334 27.6403 25 27.9603 21.44C28.0003 21.0534 27.6803 20.7334 27.2937 20.7334ZM17.3337 13H9.33366C8.78699 13 8.33366 12.5467 8.33366 12C8.33366 11.4534 8.78699 11 9.33366 11H17.3337C17.8803 11 18.3337 11.4534 18.3337 12C18.3337 12.5467 17.8803 13 17.3337 13Z"
          fill={color}
        />
      </svg>
    </Box>
  );
};

export const NavNotifIcon = ({boxSize = {base: '24px', md: '32px'}, color = `#fff`, ...rest}) => {
  return (
    <Box boxSize={boxSize} {...rest}>
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M24.9431 11.7285C24.9431 13.4031 25.3857 14.39 26.3597 15.5275C27.0978 16.3655 27.3337 17.4411 27.3337 18.608C27.3337 19.7736 26.9507 20.8802 26.1834 21.7786C25.179 22.8556 23.7623 23.5431 22.3166 23.6627C20.2215 23.8412 18.1253 23.9916 16.001 23.9916C13.8754 23.9916 11.7804 23.9018 9.68533 23.6627C8.23827 23.5431 6.82169 22.8556 5.81855 21.7786C5.05129 20.8802 4.66699 19.7736 4.66699 18.608C4.66699 17.4411 4.90419 16.3655 5.64098 15.5275C6.64545 14.39 7.05889 13.4031 7.05889 11.7285V11.1604C7.05889 8.91781 7.6181 7.45138 8.76966 6.01583C10.4817 3.92229 13.2261 2.66669 15.9414 2.66669H16.0606C18.8342 2.66669 21.6673 3.98271 23.3503 6.16623C24.4422 7.57223 24.9431 8.97689 24.9431 11.1604V11.7285ZM12.0986 26.7478C12.0986 26.0764 12.7148 25.7688 13.2846 25.6372C13.9511 25.4963 18.0127 25.4963 18.6793 25.6372C19.2491 25.7688 19.8653 26.0764 19.8653 26.7478C19.8321 27.387 19.4571 27.9538 18.939 28.3136C18.2671 28.8374 17.4787 29.169 16.6545 29.2886C16.1986 29.3476 15.7507 29.349 15.3107 29.2886C14.4851 29.169 13.6967 28.8374 13.0262 28.3123C12.5067 27.9538 12.1317 27.387 12.0986 26.7478Z"
          fill={color}
        />
      </svg>
    </Box>
  );
};

export const PMFeedbackIcon = ({boxSize = {base: '24px'}, color = `#27272A`, ...rest}) => {
  return (
    <Box boxSize={boxSize} {...rest}>
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M12 20.5H7C4 20.5 2 19 2 15.5V8.5C2 5 4 3.5 7 3.5H17C20 3.5 22 5 22 8.5V11.5"
          stroke={color}
          strokeWidth="1.5"
          strokeMiterlimit="10"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M17 9L13.87 11.5C12.84 12.32 11.15 12.32 10.12 11.5L7 9"
          stroke={color}
          strokeWidth="1.5"
          strokeMiterlimit="10"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M19.21 14.77L15.6701 18.31C15.5301 18.45 15.4 18.71 15.37 18.9L15.18 20.25C15.11 20.74 15.45 21.08 15.94 21.01L17.29 20.82C17.48 20.79 17.75 20.66 17.88 20.52L21.4201 16.98C22.0301 16.37 22.3201 15.66 21.4201 14.76C20.5301 13.87 19.82 14.16 19.21 14.77Z"
          stroke={color}
          strokeWidth="1.5"
          strokeMiterlimit="10"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M18.7002 15.28C19.0002 16.36 19.8402 17.2 20.9202 17.5"
          stroke={color}
          strokeWidth="1.5"
          strokeMiterlimit="10"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </Box>
  );
};

export const PMSuggestIdeaIcon = ({boxSize = {base: '24px'}, color = `#27272A`, ...rest}) => {
  return (
    <Box boxSize={boxSize} {...rest}>
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M22 11.5V15.5C22 19 20 20.5 17 20.5H7C4 20.5 2 19 2 15.5V8.5C2 5 4 3.5 7 3.5H12"
          stroke={color}
          strokeWidth="1.5"
          strokeMiterlimit="10"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M7 9L10.13 11.5C11.16 12.32 12.85 12.32 13.88 11.5"
          stroke={color}
          strokeWidth="1.5"
          strokeMiterlimit="10"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <g clip-path="url(#clip0_113_15723)">
          <path
            d="M20.1884 5.20417C20.07 6.18958 19.4246 6.58333 19.1459 6.86917C18.8667 7.15583 18.9167 7.21292 18.9354 7.63333C18.9386 7.68535 18.931 7.73745 18.9132 7.78644C18.8955 7.83542 18.8678 7.88025 18.8321 7.91815C18.7963 7.95606 18.7532 7.98624 18.7053 8.00684C18.6575 8.02743 18.6059 8.03801 18.5538 8.03792H17.4463C17.3942 8.03783 17.3427 8.02713 17.2949 8.00647C17.2471 7.98582 17.204 7.95564 17.1682 7.91778C17.1325 7.87992 17.1048 7.83518 17.0869 7.78627C17.069 7.73737 17.0613 7.68533 17.0642 7.63333C17.0642 7.22083 17.1025 7.125 16.8542 6.86917C16.5375 6.5525 15.7925 6.10542 15.7925 4.87583C15.7906 4.57042 15.852 4.26792 15.9728 3.9874C16.0936 3.70689 16.2712 3.45444 16.4945 3.24598C16.7177 3.03752 16.9817 2.87755 17.2698 2.77618C17.5579 2.6748 17.8639 2.63421 18.1684 2.65696C18.473 2.67971 18.7696 2.7653 19.0394 2.90836C19.3093 3.05141 19.5466 3.24881 19.7363 3.48812C19.9261 3.72743 20.0642 4.00346 20.142 4.29881C20.2198 4.59416 20.2356 4.90242 20.1884 5.20417Z"
            stroke={color}
            strokeWidth="0.666667"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M17.3582 8.015V8.645C17.3582 8.81708 17.4541 8.95833 17.572 8.95833H18.4274C18.5462 8.95833 18.6416 8.81667 18.6416 8.645V8.015M17.6749 3.62333C17.4289 3.62344 17.193 3.72126 17.019 3.89526C16.8451 4.06927 16.7474 4.30522 16.7474 4.55125M21.0549 4.96H21.8191M20.2857 2.455L20.8278 1.91292M20.7024 7.08333L21.2445 7.625M17.9999 0.990417V1.60833M15.1832 1.9125L15.7216 2.455M14.7666 7.625L15.3049 7.08333M14.9449 4.96H14.1812"
            stroke={color}
            strokeWidth="0.666667"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </g>
        <defs>
          <clipPath id="clip0_113_15723">
            <rect width="10" height="10" fill="white" transform="translate(13)" />
          </clipPath>
        </defs>
      </svg>
    </Box>
  );
};

export const PMReportBugIcon = ({boxSize = {base: '24px'}, color = `#27272A`, ...rest}) => {
  return (
    <Box boxSize={boxSize} {...rest}>
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M9.6 20H14.4C18.4 20 20 18.4 20 14.4V9.6C20 5.6 18.4 4 14.4 4H9.6C5.6 4 4 5.6 4 9.6V14.4C4 18.4 5.6 20 9.6 20Z"
          stroke={color}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M10.5 17H13.5C16 17 17 16 17 13.5V10.5C17 8 16 7 13.5 7H10.5C8 7 7 8 7 10.5V13.5C7 16 8 17 10.5 17Z"
          stroke={color}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M8.00977 4V2"
          stroke={color}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M12 4V2"
          stroke={color}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M16 4V2"
          stroke={color}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M20 8H22"
          stroke={color}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M20 12H22"
          stroke={color}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M20 16H22"
          stroke={color}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M16 20V22"
          stroke={color}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M12.0098 20V22"
          stroke={color}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M8.00977 20V22"
          stroke={color}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M2 8H4"
          stroke={color}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M2 12H4"
          stroke={color}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M2 16H4"
          stroke={color}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </Box>
  );
};

export const PMHelpCenterIcon = ({boxSize = {base: '24px'}, color = `#27272A`, ...rest}) => {
  return (
    <Box boxSize={boxSize} {...rest}>
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M20 12.2V13.9C20 17.05 18.2 18.4 15.5 18.4H6.5C3.8 18.4 2 17.05 2 13.9V8.5C2 5.35 3.8 4 6.5 4H9.2C9.07 4.38 9 4.8 9 5.25V9.15002C9 10.12 9.32 10.94 9.89 11.51C10.46 12.08 11.28 12.4 12.25 12.4V13.79C12.25 14.3 12.83 14.61 13.26 14.33L16.15 12.4H18.75C19.2 12.4 19.62 12.33 20 12.2Z"
          stroke={color}
          strokeWidth="1.5"
          strokeMiterlimit="10"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M22 5.25V9.15002C22 10.64 21.24 11.76 20 12.2C19.62 12.33 19.2 12.4 18.75 12.4H16.15L13.26 14.33C12.83 14.61 12.25 14.3 12.25 13.79V12.4C11.28 12.4 10.46 12.08 9.89 11.51C9.32 10.94 9 10.12 9 9.15002V5.25C9 4.8 9.07 4.38 9.2 4C9.64 2.76 10.76 2 12.25 2H18.75C20.7 2 22 3.3 22 5.25Z"
          stroke={color}
          strokeWidth="1.5"
          strokeMiterlimit="10"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M7.3999 22H14.5999"
          stroke={color}
          strokeWidth="1.5"
          strokeMiterlimit="10"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M11 18.4V22"
          stroke={color}
          strokeWidth="1.5"
          strokeMiterlimit="10"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M18.4955 7.25H18.5045"
          stroke={color}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M15.6957 7.25H15.7047"
          stroke={color}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M12.8954 7.25H12.9044"
          stroke={color}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </Box>
  );
};

export const PMLogoutIcon = ({boxSize = {base: '24px'}, color = `#EF4444`, ...rest}) => {
  return (
    <Box boxSize={boxSize} {...rest}>
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M8.8999 7.56001C9.2099 3.96001 11.0599 2.49001 15.1099 2.49001H15.2399C19.7099 2.49001 21.4999 4.28001 21.4999 8.75001V15.27C21.4999 19.74 19.7099 21.53 15.2399 21.53H15.1099C11.0899 21.53 9.2399 20.08 8.9099 16.54"
          stroke={color}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M15.0001 12H3.62012"
          stroke={color}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M5.85 8.64999L2.5 12L5.85 15.35"
          stroke={color}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </Box>
  );
};
export const TransactionIcon = ({boxSize = `24px`, transaction_type = `commission`, ...rest}) => {
  const color = transaction_type === `commission` ? `#22C55E` : `red`;
  const rotate = transaction_type === `commission` ? `0` : `180`;
  return (
    <Box boxSize={boxSize} transform={`rotate(${rotate}deg)`} {...rest}>
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M9.32031 11.68L11.8803 14.24L14.4403 11.68"
          stroke={color}
          strokeWidth="1.5"
          strokeMiterlimit="10"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M11.8809 4V14.17"
          stroke={color}
          strokeWidth="1.5"
          strokeMiterlimit="10"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M20 12.18C20 16.6 17 20.18 12 20.18C7 20.18 4 16.6 4 12.18"
          stroke={color}
          strokeWidth="1.5"
          strokeMiterlimit="10"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </Box>
  );
};
export const NavSearchIcon = ({boxSize = `24px`, color = `#27272A`, ...rest}) => {
  return (
    <Box boxSize={boxSize} {...rest}>
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M11.5 21C16.7467 21 21 16.7467 21 11.5C21 6.25329 16.7467 2 11.5 2C6.25329 2 2 6.25329 2 11.5C2 16.7467 6.25329 21 11.5 21Z"
          stroke={color}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M22 22L20 20"
          stroke={color}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </Box>
  );
};
export const ShareLinkIcon = ({boxSize = `20px`, color = `#ffffff`, ...rest}) => {
  return (
    <Box boxSize={boxSize} {...rest}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="100%"
        height="100%"
        viewBox="0 0 21 20"
        fill="none"
      >
        <g clipPath="url(#clip0_1144_2284)">
          <path
            d="M16.6105 12.2229C15.9804 12.2235 15.3599 12.3773 14.8026 12.6711C14.2452 12.965 13.7677 13.39 13.4113 13.9096L7.98716 11.4605C8.37242 10.5301 8.37392 9.48519 7.99132 8.55378L13.408 6.09212C13.9362 6.85608 14.7208 7.40542 15.6193 7.64049C16.5179 7.87556 17.4709 7.78079 18.3056 7.37337C19.1403 6.96595 19.8013 6.27287 20.1687 5.41984C20.5361 4.56681 20.5857 3.61034 20.3083 2.72393C20.0309 1.83751 19.4451 1.07986 18.6569 0.588413C17.8688 0.096962 16.9306 -0.0957392 16.0126 0.0452638C15.0946 0.186267 14.2575 0.651634 13.6532 1.35695C13.0489 2.06227 12.7174 2.96082 12.7188 3.88962C12.7224 4.10945 12.7447 4.32858 12.7855 4.54462L7.02716 7.16128C6.47411 6.64313 5.78175 6.29781 5.03514 6.16775C4.28853 6.03769 3.52018 6.12855 2.8245 6.42916C2.12882 6.72978 1.5361 7.22706 1.11916 7.85992C0.702215 8.49277 0.479214 9.23364 0.477548 9.99149C0.475883 10.7493 0.695627 11.4912 1.10978 12.1259C1.52394 12.7605 2.11447 13.2604 2.80882 13.5641C3.50318 13.8678 4.27112 13.962 5.01829 13.8352C5.76547 13.7084 6.45934 13.3662 7.01466 12.8505L12.788 15.4571C12.7479 15.673 12.7259 15.8918 12.7222 16.1113C12.722 16.8806 12.95 17.6326 13.3773 18.2723C13.8045 18.912 14.4119 19.4106 15.1226 19.7051C15.8333 19.9995 16.6154 20.0766 17.3699 19.9266C18.1244 19.7766 18.8174 19.4061 19.3614 18.8622C19.9053 18.3182 20.2758 17.6252 20.4258 16.8707C20.5758 16.1161 20.4988 15.3341 20.2043 14.6234C19.9098 13.9127 19.4112 13.3053 18.7715 12.878C18.1318 12.4508 17.3798 12.2228 16.6105 12.2229ZM16.6105 1.66712C17.0501 1.66695 17.4799 1.79716 17.8455 2.04127C18.2111 2.28538 18.4961 2.63243 18.6644 3.03853C18.8328 3.44462 18.8769 3.89152 18.7912 4.32269C18.7056 4.75387 18.494 5.14996 18.1832 5.46087C17.8724 5.77177 17.4764 5.98353 17.0452 6.06935C16.6141 6.15517 16.1672 6.11121 15.761 5.94302C15.3548 5.77483 15.0077 5.48996 14.7634 5.12446C14.5192 4.75895 14.3888 4.32922 14.3888 3.88962C14.3893 3.30045 14.6235 2.73553 15.04 2.31885C15.4565 1.90217 16.0213 1.66778 16.6105 1.66712ZM4.38883 12.2229C3.94922 12.2231 3.51944 12.0929 3.15384 11.8488C2.78825 11.6047 2.50325 11.2576 2.33491 10.8515C2.16657 10.4454 2.12243 9.99855 2.2081 9.56737C2.29376 9.1362 2.50536 8.74011 2.81615 8.4292C3.12694 8.11829 3.52295 7.90654 3.9541 7.82072C4.38524 7.73489 4.83216 7.77886 5.23831 7.94705C5.64447 8.11524 5.99163 8.4001 6.23588 8.76561C6.48012 9.13111 6.61049 9.56085 6.61049 10.0005C6.60983 10.5895 6.37558 11.1543 5.9591 11.571C5.54262 11.9876 4.97792 12.2221 4.38883 12.2229ZM16.6105 18.3338C16.1709 18.3338 15.7412 18.2034 15.3757 17.9592C15.0102 17.715 14.7254 17.3679 14.5572 16.9618C14.389 16.5557 14.3449 16.1088 14.4307 15.6777C14.5165 15.2466 14.7281 14.8506 15.0389 14.5397C15.3498 14.2289 15.7458 14.0172 16.1769 13.9315C16.608 13.8457 17.0549 13.8897 17.461 14.058C17.8671 14.2262 18.2142 14.511 18.4584 14.8765C18.7026 15.242 18.833 15.6717 18.833 16.1113C18.8326 16.7006 18.5983 17.2656 18.1816 17.6823C17.7648 18.099 17.1998 18.3333 16.6105 18.3338Z"
            fill={color}
          />
        </g>
        <defs>
          <clipPath id="clip0_1144_2284">
            <rect width="20" height="20" fill={color} transform="translate(0.5)" />
          </clipPath>
        </defs>
      </svg>
    </Box>
  );
};
