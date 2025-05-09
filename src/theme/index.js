import {LIGHT} from '../constants/names';
import {appCurrentTheme} from '../utils/localStorage';
import {color, colors} from './colors';
import {extendTheme} from '@chakra-ui/react';
import {typography} from './typography';

export const theme = extendTheme({
  color,

  textStyles: typography.textStyles,
  components: {
    Text: {
      baseStyle: {
        // color: 'text'
      },
      DrawerContent: {
        baseStyle: {
          bg: 'background',
        },
      },
    },
    Progress: {
      baseStyle: {
        filledTrack: {
          bg: 'black',
        },
      },
      variants: {
        main_store: {
          filledTrack: {
            bg: `custom_color.color_pop`,
          },
        },
        default: {
          filledTrack: {
            bg: `auto`,
          },
        },
      },
    },
    Button: {
      baseStyle: {
        _hover: {},
        // _hover: {
        //   opacity: `1`,
        // },
        _active: {
          opacity: `1`,
        },
      },
    },
    Input: {
      baseStyle: {
        _hover: {
          outline: `none`,
        },
        _focus: {
          outline: `none`,
        },
        _focusVisible: {
          outline: `none`,
        },
      },
    },
    Textarea: {
      baseStyle: {
        _hover: {
          outline: `none`,
          border: `1px solid`,
        },
        _focus: {
          outline: `none`,
        },
        _focusVisible: {
          outline: `none`,
        },
      },
    },
  },
  componentStyles: {
    cardOne: {
      pb: '.5em',
      mx: 'auto',
      my: '47px',
      px: '42px',
      h: '185px',
      bg: '#FFFFFF',
      spacing: 15,
      maxW: '1284px',
      justify: 'center',
      borderRadius: '16px',
      boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.02)',
    },
    imageFallback: {
      h: '110px',
      w: '114.06px',
      borderRadius: '14px',
      cursor: 'pointer',
    },
    bigContainer: {
      p: '12',
      marginBottom: '5em',
      maxW: '7xl',
      boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.02)',
      color: 'gray.900',
      borderRadius: '2xl',
      background: '#FFFFFF',
    },
    tableContainer: {
      maxW: 'fit-content',
      background: '#FFFFFF',
      color: 'gray.900',
      borderRadius: '16px',
      boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.02)',
      display: 'table',
      tableLayout: 'fixed',
      width: 'max-content',
    },
  },
  containerStyles: {
    p: '12',
    maxW: '7xl',
    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.02)',
    color: 'gray.900',
    borderRadius: '2xl',
    background: '#FFFFFF',
    border: '1px solid #E4E4E4',
  },
  md_Box: {
    bg: '#FFF',
    align: 'center',
    color: '#191919',
    borderRadius: '12px',
    height: '120px',
    minWidth: {md: '290px'},
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    border: '1px solid #F5F5F5',
  },
  transactionBox: {
    bg: '#FFF',
    borderRadius: '12px',
    height: '73px',
    width: '189px',
    textAlign: 'left',
    paddingX: '10px',
    paddingY: '8px',
    border: '1px solid #E4E4E4',
  },
  customerProfileCard: {
    spacing: 4,
    w: '100%',
    maxW: 371,
    h: 604,
    borderRadius: '16px',
    px: 17,
    boxShadow: 'sm',
    pt: 35,
    bg: '#FFFFFF',
    border: '1px solid #EEEEEE',
  },
});

export const themeStyles = extendTheme({...theme});
//convert hex to rgba with opacity
function addAlpha(color, opacity) {
  // coerce values so ti is between 0 and 1.
  var _opacity = Math.round(Math.min(Math.max(opacity || 1, 0), 1) * 255);
  return color + _opacity.toString(16).toUpperCase();
}

export const get_hex_color_complements = (hex, theme) => {
  const hex_string = hex.replace(`#`, ``);
  const hexcolor =
    hex_string?.length === 3
      ? `${hex_string[0]}${hex_string[0]}${hex_string[1]}${hex_string[1]}${hex_string[2]}${hex_string[2]}`
      : hex_string;

  let r = parseInt(hexcolor.substr(0, 2), 16);
  let g = parseInt(hexcolor.substr(2, 2), 16);
  let b = parseInt(hexcolor.substr(4, 2), 16);
  let yiq = (r * 299 + g * 587 + b * 114) / 1000;

  const color_pop =
    yiq >= 183 && theme === `light` ? '#191919' : yiq < 100 && theme !== `light` ? '#ffffff' : hex;

  let background =
    appCurrentTheme === LIGHT && yiq >= 200
      ? `#${addAlpha('191919', 1)}`
      : appCurrentTheme !== LIGHT && yiq <= 100
      ? `#${addAlpha('ffffff', 1)}`
      : `transparent`;

  return {
    primary: hex,
    custom_color: {
      spectrum: yiq >= 183 ? 'light' : 'dark',
      color: hex,
      contrast: yiq >= 183 ? '#191919' : '#ffffff',
      // accent: yiq >= 128 ? '#ffffff' : '#191919',
      accent: `#D7926B`,
      // contrast: parseInt(hexcolor, 16) > 0xffffff / 2 ? '#191919' : '#ffffff',
      // accent: parseInt(hexcolor, 16) > 0xffffff / 2 ? '#ffffff' : '#191919',
      background,
      dark_background_pop: yiq >= 128 ? hex : `#FFFFFF`,
      light_background_pop: yiq >= 128 ? `#191919` : hex,
      opacity: {
        _05: `${hex}0D`,
        _10: `${hex}1A`,
        _20: `${hex}33`,
        _30: `${hex}4D`,
        _40: `${hex}66`,
        _50: `${hex}80`,
        _60: `${hex}99`,
        _70: `${hex}B3`,
        _80: `${hex}cc`,
        _90: `${hex}e6`,
      },
      opacity_pop: {
        _05: `${color_pop}0D`,
        _10: `${color_pop}1A`,
        _20: `${color_pop}33`,
        _30: `${color_pop}4D`,
        _40: `${color_pop}66`,
        _50: `${color_pop}80`,
        _60: `${color_pop}99`,
        _70: `${color_pop}B3`,
        _80: `${color_pop}cc`,
        _90: `${color_pop}e6`,
      },
      color_pop,
      contrast_pop:
        color_pop === `#ffffff`
          ? '#191919'
          : color_pop === `#191919`
          ? '#ffffff'
          : yiq >= 183
          ? '#191919'
          : '#ffffff',
    },
  };
};

export function getContrast50(hex) {
  const hex_string = hex.replace(`#`, ``);
  const hexcolor = hex_string?.length === 3 ? `${hex_string}${hex_string}` : hex_string;
  return parseInt(hexcolor, 16) > 0xffffff / 2 ? '#191919' : '#ffffff';
}

export const currentTheme = mode => {
  const theme_obj = {...themeStyles, theme_name: mode};
  return extendTheme({
    ...theme_obj,
    theme: {name: mode},
    colors: colors[mode] || colors.default,
  });
};
