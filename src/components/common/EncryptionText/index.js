import {HStack, Text} from '@chakra-ui/react';
import React from 'react';
import {GiPadlock} from 'react-icons/gi';

export const EncryptionText = () => {
	return (
		<HStack position='absolute' bottom='2%' w="100%" justify="center" spacing="7px" mx="auto" color='gray.400' pt="10px">
			<GiPadlock />
			<Text>End-to-end encryption</Text>
		</HStack>
	);
};

export default EncryptionText;
