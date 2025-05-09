import { Box, Text, Image } from '@chakra-ui/react';
import React from 'react';
import penScribble from '../../images/pen-scribble.svg';
import penScribbleMobile from '../../images/pen-scribble-mobile.svg';

export const WrapTextWithScribble = ({ children, isInline, ...rest }) => {
	return (
		<Text as={isInline && 'span'} mx='auto' position='relative' w='fit-content' px={5} py={2} {...rest}>
			<Image display={{ base: 'none', md: 'flex' }} top="-30%" right={'2%'} transform={'rotate(-2.6deg)'} position={'absolute'} src={penScribble.src} alt='' />
			<Image display={{ base: 'block', md: 'none' }} top="-10%" right={'2%'} transform={'rotate(-2.6deg)'} position={'absolute'} src={penScribbleMobile.src} alt='' />
			{children}
		</Text>
	);
};

export default WrapTextWithScribble;
