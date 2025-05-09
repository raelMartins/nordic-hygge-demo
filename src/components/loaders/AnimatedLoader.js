import { AbsoluteCenter, Spinner as DSpinner } from '@chakra-ui/react';
import React from 'react';

export const AnimatedLoader = ({ ...rest }) => {
	return (
		<AbsoluteCenter>
			<DSpinner thickness='10px' speed='0.65s' emptyColor='gray.200' color='blue.500' size='600px' />
		</AbsoluteCenter>
	);
};


export const Spinner = () => (
	<AbsoluteCenter>
		<DSpinner thickness='10px' speed='0.65s' emptyColor='gray.200' color='blue.500' size='600px' />
	</AbsoluteCenter>
);
