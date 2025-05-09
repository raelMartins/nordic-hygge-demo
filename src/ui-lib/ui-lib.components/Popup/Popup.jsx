import React, { useEffect } from 'react';
import { Box, Text, Modal, ModalProps, ModalHeader, ModalContent, ModalOverlay, ModalCloseButton, useColorModeValue, VStack, ModalBody } from '@chakra-ui/react';
import { useLockedBody } from '../../ui-lib.hooks';

export const Popup = ({ isOpen, size, onClose, children, ...restModalProps }) => {
	const bg = useColorModeValue('#4545FE.80', 'gray.800');
	const [locked, setLocked] = useLockedBody(false, 'root');

	useEffect(() => {
		//   setLocked(!locked);
		// document.body.style.overflow = 'hidden';
		if (typeof window != 'undefined' && window.document) {
			document.body.style.overflow = 'unset';
			document.body.style.height = 'auto';
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<Modal autoFocus={false} scrollBehavior={'inside'} motionPreset='slideInBottom' isOpen={isOpen} onClose={onClose}>
			<ModalOverlay bg='rgba(0,0,0,0.95)' />
			<ModalContent minH='max-content' px={4} pb={6} pt={8} shadow='lg' bgColor={bg} borderRadius='2xl' minW={{ md: '400px' }} maxW={{ base: '90%', md: '400px' }} boxShadow='0px 40px 80px -1px rgba(31, 91, 242, 0.27)' {...restModalProps}>
				<ModalCloseButton onClose={onClose} />
				<ModalBody>{children}</ModalBody>
			</ModalContent>
		</Modal>
	);
};

const PopupHeader = ({ children, ...rest }) => {
	return (
		<ModalHeader p={0} {...rest}>
			<Text textStyle='h2' textAlign='left' pb={0}>
				{children}
			</Text>
		</ModalHeader>
	);
};

const PopupDescription = ({ children, ...rest }) => {
	return (
		<Text textStyle='p' {...rest}>
			{children}
		</Text>
	);
};

const PopupBody = ({ children, ...rest }) => {
	return (
		<VStack w='full' justify='center' my={4} {...rest}>
			{children}
		</VStack>
	);
};

Popup.Body = PopupBody;
Popup.Header = PopupHeader;
Popup.Description = PopupDescription;
