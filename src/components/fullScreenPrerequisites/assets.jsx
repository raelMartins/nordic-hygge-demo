import {Box, useTheme} from '@chakra-ui/react';

export const CheckSVG = ({boxSize = `84px`, ...rest}) => {
  const theme = useTheme();
  const textColor = theme?.colors?.text;
  const primaryColor = theme?.colors?.custom_color?.color_pop;

  return (
    <Box boxSize={boxSize} {...rest}>
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 84 84"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect x="6" y="6" width="72" height="72" rx="36" fill={textColor} fillOpacity="0.06" />
        <rect
          x="6"
          y="6"
          width="72"
          height="72"
          rx="36"
          stroke={textColor}
          strokeOpacity="0.04"
          strokeWidth="12"
        />
        <path
          d="M36.5701 42L40.1851 45.63L47.4301 38.37"
          stroke={primaryColor}
          strokeWidth="2.25"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M40.1251 27.675C41.1601 26.79 42.8551 26.79 43.9051 27.675L46.2751 29.715C46.7251 30.105 47.5651 30.42 48.1651 30.42H50.7151C52.3051 30.42 53.6101 31.725 53.6101 33.315V35.865C53.6101 36.45 53.9251 37.305 54.3151 37.755L56.3551 40.125C57.2401 41.16 57.2401 42.855 56.3551 43.905L54.3151 46.275C53.9251 46.725 53.6101 47.565 53.6101 48.165V50.715C53.6101 52.305 52.3051 53.61 50.7151 53.61H48.1651C47.5801 53.61 46.7251 53.925 46.2751 54.315L43.9051 56.355C42.8701 57.24 41.1751 57.24 40.1251 56.355L37.7551 54.315C37.3051 53.925 36.4651 53.61 35.8651 53.61H33.2701C31.6801 53.61 30.3751 52.305 30.3751 50.715V48.15C30.3751 47.565 30.0601 46.725 29.6851 46.275L27.6601 43.89C26.7901 42.855 26.7901 41.175 27.6601 40.14L29.6851 37.755C30.0601 37.305 30.3751 36.465 30.3751 35.88V33.3C30.3751 31.71 31.6801 30.405 33.2701 30.405H35.8651C36.4501 30.405 37.3051 30.09 37.7551 29.7L40.1251 27.675Z"
          stroke={primaryColor}
          strokeWidth="2.25"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </Box>
  );
};
