import {Center, Image, Text, VStack} from '@chakra-ui/react';
import React from 'react';
import empty from '../../images/icons/empty-icon.svg';
import emptyLight from '../../images/icons/empty-icon-light.svg';
import {appCurrentTheme} from '../../utils/localStorage';
import {LIGHT} from '../../constants/names';

const EmptyState = ({
  text,
  textStyle,
  centered = false,
  height,
  heading,
  noHeader,
  icon,
  noIcon,
  ...rest
}) => {
  return (
    <Center
      flexDir={`column`}
      maxH={height || {base: '150px'}}
      borderRadius="5px"
      w="full"
      justify="center"
      minH={`150px`}
      alignItems={centered && `center`}
      my={{base: '10px', md: '13px'}}
      {...rest}
    >
      <VStack>
        {noIcon
          ? null
          : icon || (
              <Image
                w="auto"
                h={{base: '30px', md: '50px'}}
                src={appCurrentTheme === LIGHT ? empty.src : emptyLight.src}
                alt="notification empty state"
              />
            )}
        {!noHeader && (
          <Text
            className="heading-text-regular"
            mt="10px"
            fontWeight="600"
            fontSize={{base: '16px', md: '20px'}}
            textAlign="center"
            fontFamily={rest.fontFamily}
            {...rest.headerStyle}
          >
            {heading || 'Nothing Found'}
          </Text>
        )}
        <Text
          fontWeight="400"
          fontSize={rest.textSize || {base: '12px', md: '16px'}}
          textAlign="center"
          style={textStyle}
        >
          {text || 'No data yet'}
        </Text>
      </VStack>
    </Center>
  );
};

export default EmptyState;
