import {useTheme} from '@chakra-ui/react';

export const TerribleSVG = ({selected = true}) => {
  const theme = useTheme();
  const primaryColor = selected
    ? theme?.colors?.custom_color?.color
    : theme.colors.matador_form?.label;
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
      <circle
        cx="12"
        cy="12"
        r="9.25"
        stroke={primaryColor}
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M16 16.25L14 14.25L12 16.25L10 14.25L8 16.25"
        stroke={primaryColor}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M8 7.5L11 9.5L8 11"
        stroke={primaryColor}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M16 7.5L13 9.5L16 11"
        stroke={primaryColor}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export const BadSVG = ({selected = true}) => {
  const theme = useTheme();
  const primaryColor = selected
    ? theme?.colors?.custom_color?.color
    : theme.colors.matador_form?.label;
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
      <circle
        cx="12"
        cy="12"
        r="9.25"
        stroke={primaryColor}
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M16 16.25C16 14.8693 14.2091 13.75 12 13.75C9.79086 13.75 8 14.8693 8 16.25"
        stroke={primaryColor}
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <circle
        cx="9.25"
        cy="9.25"
        r="1"
        stroke={primaryColor}
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <circle
        cx="14.75"
        cy="9.25"
        r="1"
        stroke={primaryColor}
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export const OkaySVG = ({selected = true}) => {
  const theme = useTheme();
  const primaryColor = selected
    ? theme?.colors?.custom_color?.color
    : theme.colors.matador_form?.label;
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
      <circle
        cx="12"
        cy="12"
        r="9.25"
        stroke={primaryColor}
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M8 14.25C8 15.6307 9.79086 16.75 12 16.75C14.2091 16.75 16 15.6307 16 14.25"
        stroke={primaryColor}
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <circle
        cx="9.25"
        cy="9.25"
        r="1"
        stroke={primaryColor}
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <circle
        cx="14.75"
        cy="9.25"
        r="1"
        stroke={primaryColor}
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export const GoodSVG = ({selected = true}) => {
  const theme = useTheme();
  const primaryColor = selected
    ? theme?.colors?.custom_color?.color
    : theme.colors.matador_form?.label;
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
      <circle
        cx="12"
        cy="12"
        r="9.25"
        stroke={primaryColor}
        stroke-width="1.5"
        stroke-linecap="round"
      />
      <path
        d="M8 14.25C8 15.6307 9.79086 16.75 12 16.75C14.2091 16.75 16 15.6307 16 14.25"
        stroke={primaryColor}
        stroke-width="1.5"
        stroke-linecap="round"
      />
      <circle
        cx="9.25"
        cy="9.25"
        r="1"
        stroke={primaryColor}
        stroke-width="1.5"
        stroke-linejoin="round"
      />
      <circle
        cx="14.75"
        cy="9.25"
        r="1"
        stroke={primaryColor}
        stroke-width="1.5"
        stroke-linejoin="round"
      />
    </svg>
  );
};

export const AwesomeSVG = ({selected = true}) => {
  const theme = useTheme();
  const primaryColor = selected
    ? theme?.colors?.custom_color?.color
    : theme.colors.matador_form?.label;
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
      <circle
        cx="12"
        cy="12"
        r="9.25"
        stroke={primaryColor}
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M12 16.75C9.79086 16.75 8 15.6307 8 14.25C8 13.5 8.38983 13.25 12 13.25C15.6102 13.25 16 13.5 16 14.25C16 15.6307 14.2091 16.75 12 16.75Z"
        stroke={primaryColor}
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M16.25 9.25C16.25 8.42157 15.5784 7.75 14.75 7.75C13.9216 7.75 13.25 8.42157 13.25 9.25"
        stroke={primaryColor}
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M10.75 9.25C10.75 8.42157 10.0784 7.75 9.25 7.75C8.42157 7.75 7.75 8.42157 7.75 9.25"
        stroke={primaryColor}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
