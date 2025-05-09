import { Container, Text, VStack } from '@chakra-ui/react';
import React from 'react';

export const Container2 = ({ children, ...restProps }) => {
	return (
		<Container
			maxW='888px'
			borderRadius='16px'
			background='#FFFFFF'
			boxShadow='md'
			border="1px solid #F4F4F4"
			{...restProps}>
			{children}
		</Container>
	);
};

export const Container3 = ({ title, children, titleFontSize, ...restProps }) => {
	return (
		<VStack mt={'20px'}>
			<Text alignSelf={'start'} my='10px' fontWeight={'600'} fontFamily='optimaMedium' fontSize={titleFontSize || '18px'} lineHeight={titleFontSize ? 'auto' : '23px'}>
				{title}
			</Text>
			<Container px='26px' py='23px' my='14px' maxW='100%' boxShadow='base' background='#FFFFFF' border='1px solid #F4F4F4' borderRadius={'16px'} {...restProps}>
				{children}
			</Container>
		</VStack>
	);
};