import {Box, Flex, usePrefersReducedMotion} from '@chakra-ui/react';
import {keyframes} from '@emotion/react';
import React from 'react';

export const ThreeDots = ({
  color = `custom_color.color_pop`,
  width = {base: '8px', md: '8px'},
  height = {base: '8px', md: '8px'},
  boxSize = {base: '8px', md: '8px'},
  darkBg = false,
  lightBg = false,
  circular = false,
  ...rest
}) => {
  const prefersReducedMotion = usePrefersReducedMotion();

  const keyframe_dot1 = keyframes`
  0% {
    transform: scale(1, 1);
  }
  25% {
    transform: scale(1, 1.5);
  }
  50% {
    transform: scale(1, 0.67);
  }
  75% {
    transform: scale(1, 1);
  }
  100% {
    transform: scale(1, 1);
  }
`;

  const keyframe_dot2 = keyframes`
 0% {
    transform: scale(1, 1);
  }
  25% {
    transform: scale(1, 1);
  }
  50% {
    transform: scale(1, 1.5);
  }
  75% {
    transform: scale(1, 1);
  }
  100% {
    transform: scale(1, 1);
  }
`;

  const keyframe_dot3 = keyframes`
 0% {
    transform: scale(1, 1);
  }
  25% {
    transform: scale(1, 1);
  }
  50% {
    transform: scale(1, 0.67);
  }
  75% {
    transform: scale(1, 1.5);
  }
  100% {
    transform: scale(1, 1);
  }
`;

  const animation1 = prefersReducedMotion ? undefined : `${keyframe_dot1} infinite 1s linear`;
  const animation2 = prefersReducedMotion ? undefined : `${keyframe_dot2} infinite 1s linear`;
  const animation3 = prefersReducedMotion ? undefined : `${keyframe_dot3} infinite 1s linear`;

  const dot_style = {
    position: 'relative',
    bg: darkBg
      ? `custom_color.dark_background_pop`
      : lightBg
      ? `custom_color.light_background_pop`
      : color,
    display: 'inline-block',
    height,
    width,
    margin: '0 2px',
    borderRadius: circular ? `full` : '5px',
    boxSize,
  };

  return (
    <Flex direction="row" align="center" justify={'center'}>
      <Box animation={animation1} {...dot_style} />
      <Box animation={animation2} {...dot_style} />
      <Box animation={animation3} {...dot_style} />
    </Flex>
  );
};

export default ThreeDots;
