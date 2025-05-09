import {Box, useTheme} from '@chakra-ui/react';

export const AssetPaymentWithBankSVG = ({darkBG, ...rest}) => {
  const theme = useTheme();
  const primaryColor = darkBG
    ? theme?.colors?.custom_color?.dark_background_pop
    : theme?.colors?.custom_color?.color;
  return (
    <Box width={`30px`} height={`30px`} {...rest}>
      <svg
        width={`100%`}
        height={`100%`}
        viewBox="0 0 30 30"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle opacity="0.15" cx="15" cy="15" r="15" fill={primaryColor} />
        <g clip-path="url(#clip0_5996_595)">
          <path
            d="M22.3938 9.08094C22.8313 9.26875 23.075 9.7375 22.9781 10.2C22.8844 10.6656 22.475 11 22 11V11.25C22 11.6656 21.6656 12 21.25 12H8.75C8.33594 12 8 11.6656 8 11.25V11C7.52531 10.9719 7.11597 10.6656 7.02052 10.2C6.92506 9.7375 7.16978 9.26875 7.60625 9.08094L14.6063 6.08085C14.8563 5.97305 15.1438 5.97305 15.3938 6.08085L22.3938 9.08094ZM15 10C15.5531 10 16 9.55313 16 9C16 8.44782 15.5531 8 15 8C14.4469 8 14 8.44782 14 9C14 9.55313 14.4469 10 15 10Z"
            fill={primaryColor}
          />
          <path
            opacity="0.4"
            d="M10.972 19H12.222V13H14.222V19H15.7501V13H17.7501V19H19.0001V13H21.0001V19.1344C21.0189 19.1437 21.0376 19.1281 21.0564 19.1687L22.5564 20.1687C22.922 20.4125 23.0845 20.8687 22.9564 21.2906C22.8282 21.7125 22.4407 22 22.0001 22H7.972C7.5595 22 7.17068 21.7125 7.043 21.2906C6.91528 20.8687 7.07871 20.4125 7.44543 20.1687L8.94543 19.1687C8.96325 19.1281 8.98137 19.1437 8.972 19.1344V13H10.972V19Z"
            fill={primaryColor}
          />
        </g>
        <defs>
          <clipPath id="clip0_5996_595">
            <rect width="16" height="16" fill="white" transform="translate(7 6)" />
          </clipPath>
        </defs>
      </svg>
    </Box>
  );
};

export const CheckIconSVG = ({darkBG, ...rest}) => {
  const theme = useTheme();
  const primaryColor = darkBG
    ? theme?.colors?.custom_color?.dark_background_pop
    : theme?.colors?.custom_color?.color;
  return (
    <Box width={`16px`} height={`17px`} {...rest}>
      <svg
        width={`100%`}
        height={`100%`}
        viewBox="0 0 16 17"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g id="Radio button">
          <circle id="Ellipse 38" cx="8" cy="8.5" r="7.5" stroke={primaryColor} />
          <circle id="Ellipse 39" cx="8" cy="8.5" r="5" fill={primaryColor} />
        </g>
      </svg>
    </Box>
  );
};

export const CheckIconForFilterSVG = ({darkBG, ...rest}) => {
  const theme = useTheme();
  const primaryColor = darkBG
    ? theme?.colors?.custom_color?.dark_background_pop
    : theme?.colors?.custom_color?.color;
  return (
    <Box width={`16px`} height={`16px`} {...rest}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="100%"
        height="100%"
        viewBox="0 0 16 16"
        fill="none"
      >
        <g clip-path="url(#clip0_5966_5475)">
          <path
            d="M3.11111 2.49609H12.8889C13.051 2.49609 13.2064 2.56048 13.321 2.67508C13.4356 2.78969 13.5 2.94513 13.5 3.1072V12.885C13.5 13.0471 13.4356 13.2025 13.321 13.3171C13.2064 13.4317 13.051 13.4961 12.8889 13.4961H3.11111C2.94903 13.4961 2.7936 13.4317 2.67899 13.3171C2.56438 13.2025 2.5 13.0471 2.5 12.885V3.1072C2.5 2.94513 2.56438 2.78969 2.67899 2.67508C2.7936 2.56048 2.94903 2.49609 3.11111 2.49609ZM7.39072 10.4405L11.7113 6.11937L10.8472 5.25526L7.39072 8.71232L5.66189 6.98348L4.79778 7.84759L7.39072 10.4405Z"
            fill={primaryColor}
          />
        </g>
      </svg>
    </Box>
  );
};
export const DropDownArrorFilterSVG = ({...rest}) => {
  const theme = useTheme();
  const labelColor = theme?.colors?.matador_form?.label;
  return (
    <Box width={`13px`} height={`6px`} {...rest}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="100%"
        height="100%"
        viewBox="0 0 13 6"
        fill="none"
      >
        <path
          d="M6.88081 5.99899C6.97654 5.99331 7.0676 5.9557 7.13934 5.892L12.8462 0.755877V0.755977C12.935 0.681437 12.9898 0.574156 12.998 0.458509C13.0063 0.342868 12.9673 0.22892 12.89 0.142546C12.8127 0.0561643 12.7036 0.00481319 12.5879 0.000334362C12.4721 -0.00424357 12.3593 0.0383508 12.2755 0.118363L6.85405 4.9959L1.43258 0.118363C1.34878 0.0383508 1.23603 -0.00424382 1.12018 0.000334362C1.00444 0.00481268 0.895368 0.0561643 0.818051 0.142546C0.740826 0.228928 0.701813 0.342878 0.710073 0.458509C0.718333 0.574151 0.773069 0.681432 0.861938 0.755977L6.56875 5.8921C6.65423 5.96804 6.76669 6.00655 6.88084 5.99909L6.88081 5.99899Z"
          fill={labelColor}
        />
      </svg>
    </Box>
  );
};
export const SearchFilterIconSVG = ({...rest}) => {
  const theme = useTheme();
  const textColor = theme?.colors?.text;
  return (
    <Box width={`25px`} height={`24px`} {...rest}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="100%"
        height="100%"
        viewBox="0 0 25 24"
        fill="none"
      >
        <path
          d="M12 21.75C6.35 21.75 1.75 17.15 1.75 11.5C1.75 5.85 6.35 1.25 12 1.25C17.65 1.25 22.25 5.85 22.25 11.5C22.25 17.15 17.65 21.75 12 21.75ZM12 2.75C7.17 2.75 3.25 6.68 3.25 11.5C3.25 16.32 7.17 20.25 12 20.25C16.83 20.25 20.75 16.32 20.75 11.5C20.75 6.68 16.83 2.75 12 2.75Z"
          fill={textColor}
        />
        <path
          d="M22.4995 22.7514C22.3095 22.7514 22.1195 22.6814 21.9695 22.5314L19.9695 20.5314C19.6795 20.2414 19.6795 19.7614 19.9695 19.4714C20.2595 19.1814 20.7395 19.1814 21.0295 19.4714L23.0295 21.4714C23.3195 21.7614 23.3195 22.2414 23.0295 22.5314C22.8795 22.6814 22.6895 22.7514 22.4995 22.7514Z"
          fill={textColor}
        />
      </svg>
    </Box>
  );
};

export const CreditCardShieldSVG = ({darkBG, ...rest}) => {
  const theme = useTheme();
  const primaryColor = darkBG
    ? theme?.colors?.custom_color?.dark_background_pop
    : theme?.colors?.custom_color?.color;
  return (
    <Box width={`24px`} height={`25px`} {...rest}>
      <svg
        width={`100%`}
        height={`100%`}
        viewBox="0 0 24 25"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g id="credit-card-shield">
          <path
            id="Icon"
            d="M22 10.5H2M22 11.5V8.7C22 7.5799 22 7.01984 21.782 6.59202C21.5903 6.2157 21.2843 5.90974 20.908 5.71799C20.4802 5.5 19.9201 5.5 18.8 5.5H5.2C4.0799 5.5 3.51984 5.5 3.09202 5.71799C2.7157 5.90973 2.40973 6.21569 2.21799 6.59202C2 7.01984 2 7.5799 2 8.7V16.3C2 17.4201 2 17.9802 2.21799 18.408C2.40973 18.7843 2.71569 19.0903 3.09202 19.282C3.51984 19.5 4.07989 19.5 5.2 19.5H11.5M18 21.5C18 21.5 21 20.0701 21 17.9252V15.4229L18.8124 14.6412C18.2868 14.4529 17.712 14.4529 17.1864 14.6412L15 15.4229V17.9252C15 20.0701 18 21.5 18 21.5Z"
            stroke={primaryColor}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </g>
      </svg>
    </Box>
  );
};

export const DebitCardSVG = ({darkBG, ...rest}) => {
  const theme = useTheme();
  const primaryColor = darkBG
    ? theme?.colors?.custom_color?.dark_background_pop
    : theme?.colors?.custom_color?.color;
  return (
    <Box width={`30px`} height={`30px`} {...rest}>
      <svg
        width={`100%`}
        height={`100%`}
        viewBox="0 0 30 30"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle opacity="0.12" cx="15" cy="15" r="15" fill={primaryColor} />
        <path d="M24 14H6V11H24V14Z" fill="white" />
        <path
          d="M22 8C23.1031 8 24 8.89531 24 10V11H6V10C6 8.89531 6.89531 8 8 8H22ZM24 20C24 21.1031 23.1031 22 22 22H8C6.89531 22 6 21.1031 6 20V14H24V20ZM9.5 18C9.225 18 9 18.225 9 18.5C9 18.775 9.225 19 9.5 19H11.5C11.775 19 12 18.775 12 18.5C12 18.225 11.775 18 11.5 18H9.5ZM13.5 19H17.5C17.775 19 18 18.775 18 18.5C18 18.225 17.775 18 17.5 18H13.5C13.225 18 13 18.225 13 18.5C13 18.775 13.225 19 13.5 19Z"
          fill={primaryColor}
        />
      </svg>
    </Box>
  );
};

export const PaymentWithBankSVG = ({darkBG, ...rest}) => {
  const theme = useTheme();
  const primaryColor = darkBG
    ? theme?.colors?.custom_color?.dark_background_pop
    : theme?.colors?.custom_color?.color;
  return (
    <Box width={`24px`} height={`25px`} {...rest}>
      <svg
        width={`100%`}
        height={`100%`}
        viewBox="0 0 24 25"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g id="building-columns-duotone 1" clip-path="url(#clip0_6047_4897)">
          <path
            id="Vector"
            d="M23.0906 5.12141C23.7469 5.40313 24.1125 6.10626 23.9672 6.80001C23.8266 7.49844 23.2125 8.00001 22.5 8.00001V8.37501C22.5 8.99844 21.9984 9.50001 21.375 9.50001H2.625C2.00391 9.50001 1.5 8.99844 1.5 8.37501V8.00001C0.78797 7.95782 0.173954 7.49844 0.0307792 6.80001C-0.112405 6.10626 0.254673 5.40313 0.909376 5.12141L11.4094 0.621271C11.7844 0.459576 12.2156 0.459576 12.5906 0.621271L23.0906 5.12141ZM12 6.50001C12.8297 6.50001 13.5 5.82969 13.5 5.00001C13.5 4.17172 12.8297 3.50001 12 3.50001C11.1703 3.50001 10.5 4.17172 10.5 5.00001C10.5 5.82969 11.1703 6.50001 12 6.50001Z"
            fill={primaryColor}
          />
          <path
            id="Vector_2"
            opacity="0.4"
            d="M5.95799 20H7.83299V11H10.833V20H13.1252V11H16.1252V20H18.0002V11H21.0002V20.2016C21.0283 20.2156 21.0564 20.1922 21.0846 20.2531L23.3346 21.7531C23.883 22.1187 24.1267 22.8031 23.9346 23.4359C23.7424 24.0687 23.1611 24.5 22.5002 24.5H1.45799C0.839243 24.5 0.256024 24.0687 0.0644931 23.4359C-0.127085 22.8031 0.118071 22.1187 0.668149 21.7531L2.91815 20.2531C2.94487 20.1922 2.97206 20.2156 2.95799 20.2016V11H5.95799V20Z"
            fill={primaryColor}
          />
        </g>
        <defs>
          <clipPath id="clip0_6047_4897">
            <rect width="24" height="24" fill="white" transform="translate(0 0.5)" />
          </clipPath>
        </defs>
      </svg>
    </Box>
  );
};

export const PendingTransactionBarSVG = ({darkBG, ...rest}) => {
  const theme = useTheme();
  const primaryColor = darkBG
    ? theme?.colors?.custom_color?.dark_background_pop
    : theme?.colors?.custom_color?.color;
  return (
    <Box width={`24px`} height={`24px`} {...rest}>
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M11.67 3C6.89 3 3 6.89 3 11.67C3 16.45 6.89 20.35 11.67 20.35C16.45 20.35 20.34 16.46 20.34 11.68C20.34 6.9 16.45 3 11.67 3ZM12.42 11.35C12.42 11.76 12.08 12.1 11.67 12.1C11.26 12.1 10.92 11.76 10.92 11.35V6.35C10.92 5.94 11.26 5.6 11.67 5.6C12.08 5.6 12.42 5.94 12.42 6.35V11.35Z"
          fill={primaryColor}
        />
        <path
          d="M14.8896 3.45H9.10965C8.70965 3.45 8.38965 3.13 8.38965 2.73C8.38965 2.33 8.70965 2 9.10965 2H14.8896C15.2896 2 15.6096 2.32 15.6096 2.72C15.6096 3.12 15.2896 3.45 14.8896 3.45Z"
          fill={primaryColor}
        />
      </svg>
    </Box>
  );
};

export const WalletCardSVG = ({darkBG, ...rest}) => {
  const theme = useTheme();
  const primaryColor = darkBG
    ? theme?.colors?.custom_color?.dark_background_pop
    : theme?.colors?.custom_color?.color;
  return (
    <Box width={`30px`} height={`30px`} {...rest}>
      <svg
        width={`100%`}
        height={`100%`}
        viewBox="0 0 30 30"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle opacity="0.12" cx="15" cy="15" r="15" fill={primaryColor} />
        <path
          d="M23.3329 15.5167V17.2333C23.3329 17.7 22.9495 18.0833 22.4745 18.0833H20.8662C19.9662 18.0833 19.1412 17.425 19.0662 16.525C19.0162 16 19.2162 15.5083 19.5662 15.1667C19.8745 14.85 20.2995 14.6667 20.7662 14.6667H22.4745C22.9495 14.6667 23.3329 15.05 23.3329 15.5167Z"
          fill={primaryColor}
        />
        <path
          d="M17.818 16.6333C17.743 15.7583 18.0596 14.9 18.693 14.275C19.2263 13.7333 19.968 13.4167 20.768 13.4167H21.243C21.4763 13.4167 21.668 13.225 21.6346 12.9917C21.4096 11.375 20.0096 10.125 18.3346 10.125H10.0013C8.15964 10.125 6.66797 11.6167 6.66797 13.4583V19.2917C6.66797 21.1333 8.15964 22.625 10.0013 22.625H18.3346C20.018 22.625 21.4096 21.375 21.6346 19.7583C21.668 19.525 21.4763 19.3333 21.243 19.3333H20.868C19.2846 19.3333 17.9513 18.15 17.818 16.6333ZM15.8346 14.9167H10.8346C10.493 14.9167 10.2096 14.6417 10.2096 14.2917C10.2096 13.9417 10.493 13.6667 10.8346 13.6667H15.8346C16.1763 13.6667 16.4596 13.95 16.4596 14.2917C16.4596 14.6333 16.1763 14.9167 15.8346 14.9167Z"
          fill={primaryColor}
        />
        <path
          d="M16.8429 8.31667C17.0595 8.54167 16.8679 8.875 16.5512 8.875H10.0262C9.11785 8.875 8.26785 9.14167 7.55952 9.6C7.23452 9.80833 6.79285 9.58333 6.95118 9.225C7.41785 8.13333 8.50952 7.375 9.76785 7.375H14.4512C15.4179 7.375 16.2762 7.71667 16.8429 8.31667Z"
          fill={primaryColor}
        />
      </svg>
    </Box>
  );
};

export const ChatIconForInspectionFeedback = ({darkBG, ...rest}) => {
  const theme = useTheme();
  const primaryColor = darkBG
    ? theme?.colors?.custom_color?.dark_background_pop
    : theme?.colors?.custom_color?.color;
  return (
    <Box width={`24px`} height={`24px`} {...rest}>
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M9.15039 7.49023C8.59039 7.49023 8.15039 7.94023 8.15039 8.49023C8.15039 9.04023 8.60039 9.49023 9.15039 9.49023C9.70039 9.49023 10.1504 9.04023 10.1504 8.49023C10.1504 7.94023 9.70039 7.49023 9.15039 7.49023Z"
          fill={primaryColor}
        />
        <path
          d="M21.46 5.04C20.62 3.09 18.77 2 16.19 2H7.81C4.6 2 2 4.6 2 7.81V16.19C2 18.77 3.09 20.62 5.04 21.46C5.23 21.54 5.45 21.49 5.59 21.35L21.35 5.59C21.5 5.44 21.55 5.22 21.46 5.04ZM10.53 12.24C10.14 12.62 9.63 12.8 9.12 12.8C8.61 12.8 8.1 12.61 7.71 12.24C6.69 11.28 5.57 9.75 6 7.93C6.38 6.28 7.84 5.54 9.12 5.54C10.4 5.54 11.86 6.28 12.24 7.94C12.66 9.75 11.54 11.28 10.53 12.24Z"
          fill={primaryColor}
        />
        <path
          d="M19.4699 20.5295C19.6899 20.7495 19.6599 21.1095 19.3899 21.2595C18.5099 21.7495 17.4399 21.9995 16.1899 21.9995H7.8099C7.5199 21.9995 7.3999 21.6595 7.5999 21.4595L13.6399 15.4195C13.8399 15.2195 14.1499 15.2195 14.3499 15.4195L19.4699 20.5295Z"
          fill={primaryColor}
        />
        <path
          d="M21.9998 7.81087V16.1909C21.9998 17.4409 21.7498 18.5209 21.2598 19.3909C21.1098 19.6609 20.7498 19.6809 20.5298 19.4709L15.4098 14.3509C15.2098 14.1509 15.2098 13.8409 15.4098 13.6409L21.4498 7.60087C21.6598 7.40087 21.9998 7.52087 21.9998 7.81087Z"
          fill={primaryColor}
        />
      </svg>
    </Box>
  );
};

export const OffersIcon = ({darkBG, ...rest}) => {
  const theme = useTheme();
  const primaryColor = darkBG
    ? theme?.colors?.custom_color?.dark_background_pop
    : theme?.colors?.custom_color?.color;
  return (
    <Box width={`24px`} height={`24px`} {...rest}>
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M21.9199 16.7506C21.5899 19.4106 19.4099 21.5906 16.7499 21.9206C15.1399 22.1206 13.6399 21.6806 12.4699 20.8206C11.7999 20.3306 11.9599 19.2906 12.7599 19.0506C15.7699 18.1406 18.1399 15.7606 19.0599 12.7506C19.2999 11.9606 20.3399 11.8006 20.8299 12.4606C21.6799 13.6406 22.1199 15.1406 21.9199 16.7506Z"
          fill={primaryColor}
        />
        <path
          d="M9.99 2C5.58 2 2 5.58 2 9.99C2 14.4 5.58 17.98 9.99 17.98C14.4 17.98 17.98 14.4 17.98 9.99C17.97 5.58 14.4 2 9.99 2ZM9.05 8.87L11.46 9.71C12.33 10.02 12.75 10.63 12.75 11.57C12.75 12.65 11.89 13.54 10.84 13.54H10.75V13.59C10.75 14 10.41 14.34 10 14.34C9.59 14.34 9.25 14 9.25 13.59V13.53C8.14 13.48 7.25 12.55 7.25 11.39C7.25 10.98 7.59 10.64 8 10.64C8.41 10.64 8.75 10.98 8.75 11.39C8.75 11.75 9.01 12.04 9.33 12.04H10.83C11.06 12.04 11.24 11.83 11.24 11.57C11.24 11.22 11.18 11.2 10.95 11.12L8.54 10.28C7.68 9.98 7.25 9.37 7.25 8.42C7.25 7.34 8.11 6.45 9.16 6.45H9.25V6.41C9.25 6 9.59 5.66 10 5.66C10.41 5.66 10.75 6 10.75 6.41V6.47C11.86 6.52 12.75 7.45 12.75 8.61C12.75 9.02 12.41 9.36 12 9.36C11.59 9.36 11.25 9.02 11.25 8.61C11.25 8.25 10.99 7.96 10.67 7.96H9.17C8.94 7.96 8.76 8.17 8.76 8.43C8.75 8.77 8.81 8.79 9.05 8.87Z"
          fill={primaryColor}
        />
      </svg>
    </Box>
  );
};

export const ValidateAssetHomeIcon = ({darkBG, ...rest}) => {
  const theme = useTheme();
  const primaryColor = darkBG
    ? theme?.colors?.custom_color?.dark_background_pop
    : theme?.colors?.custom_color?.color;
  return (
    <Box width={`24px`} height={`24px`} {...rest}>
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M13.3 8.11032L14.62 10.7503C14.8 11.1103 15.28 11.4703 15.68 11.5303L18.07 11.9303C19.6 12.1903 19.96 13.2903 18.86 14.3903L17 16.2603C16.69 16.5703 16.51 17.1803 16.61 17.6203L17.14 19.9303C17.56 21.7503 16.59 22.4603 14.98 21.5103L12.74 20.1803C12.33 19.9403 11.67 19.9403 11.26 20.1803L9.00997 21.5003C7.39997 22.4503 6.42997 21.7403 6.84997 19.9203L7.37997 17.6103C7.47997 17.1803 7.29997 16.5703 6.98997 16.2503L5.13997 14.4003C4.03997 13.3003 4.39997 12.1903 5.92997 11.9403L8.31997 11.5403C8.71997 11.4703 9.19997 11.1203 9.37997 10.7603L10.7 8.12032C11.41 6.68032 12.59 6.68032 13.3 8.11032Z"
          fill={primaryColor}
        />
        <path
          d="M6 9.75C5.59 9.75 5.25 9.41 5.25 9V2C5.25 1.59 5.59 1.25 6 1.25C6.41 1.25 6.75 1.59 6.75 2V9C6.75 9.41 6.41 9.75 6 9.75Z"
          fill={primaryColor}
        />
        <path
          d="M18 9.75C17.59 9.75 17.25 9.41 17.25 9V2C17.25 1.59 17.59 1.25 18 1.25C18.41 1.25 18.75 1.59 18.75 2V9C18.75 9.41 18.41 9.75 18 9.75Z"
          fill={primaryColor}
        />
        <path
          d="M12 4.75C11.59 4.75 11.25 4.41 11.25 4V2C11.25 1.59 11.59 1.25 12 1.25C12.41 1.25 12.75 1.59 12.75 2V4C12.75 4.41 12.41 4.75 12 4.75Z"
          fill={primaryColor}
        />
      </svg>
    </Box>
  );
};
