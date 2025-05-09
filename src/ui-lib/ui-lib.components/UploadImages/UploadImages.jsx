import { AddIcon, SmallCloseIcon } from '@chakra-ui/icons';
import { Box, Flex, Icon, Image, Stack, Text, VStack } from '@chakra-ui/react';
import React, { useCallback, useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { encodeFileToBase64, extractBase64 } from '/src/utils';

export const UploadImages = (props) => {
	const { setFieldValue, files, setFiles, values, index, ...rest } = props;
	const { getRootProps, getInputProps, isDragActive } = useDropzone({
		accept: { 'image/*': [] },
		onDrop: useCallback((acceptedFiles) => {
			acceptedFiles.forEach((file) =>
				encodeFileToBase64(file).then((res) => {
					setFiles((prevValue) => [
						...prevValue,
						Object.assign({ image: res }, file, {
							preview: URL.createObjectURL(file),
						}),
					]);
				})
			);
			// eslint-disable-next-line react-hooks/exhaustive-deps
		}, []),
	});
	const removeFile = (index) => {
		const copy = [...files];
		for (let i = 0; i < copy.length; i++) {
			if (i == index) {
				copy.splice(i, 1);
				i = copy.length;
			}
		}
		setFiles(copy);
	};

	const thumbs =
		files &&
		files.map((file, index) => (
			<Flex maxW="680px" wrap='flex-wrap' key={index} align='center' h='full'>
				<Box pos='relative' h='full' mr={8}>
					<Icon as={SmallCloseIcon} cursor='pointer' onClick={() => removeFile(index)} pos='absolute' right='-20%' zIndex={1000} top='0' width='30px' height='30px' alt='cancel_icon' color='red' />

					<Image
						alt='next_image'
						boxSize={138}
						borderRadius='16px'
						src={file.preview}
						// Revoke data uri after image is loaded
						onLoad={() => {
							URL.revokeObjectURL(file.image);
						}}
					/>
				</Box>
			</Flex>
		));
	// useEffect(() => {
	// 	setFieldValue(`units.${index}.photos`, extractBase64(files));
	// }, [files]);

	useEffect(() => {
		return () => files && files.forEach((file) => URL.revokeObjectURL(file.preview));
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
	return (
		<Box minW={{ base: '90%', xl: '580px' }} h='201px' border='1.5px solid #4545FE' borderRadius='32px' {...rest} mt='67px'>
			{files && files.length > 0 ? (
				<Flex align={'center'} p={6}>
					{thumbs}
					<input accept='.jpg, .png' {...getInputProps()} />
					<div {...getRootProps({ className: 'dropzone' })}>
						<Icon ml='33px' as={AddIcon} color='#4545FE' fontWeight={900} fontSize='70px' />
					</div>
				</Flex>
			) : (
				<VStack w="full" align="center" cursor='pointer' h='100%' spacing={6} justify='center' pos='relative' {...getRootProps({ className: 'dropzone' })}>
					<input accept='.jpg, .png' {...getInputProps()} />

					{isDragActive ? <p>Drop the files here ...</p> : <Stack spacing={4}>
						<p><small>{`Drag and drop Files here, or click to select files`}</small></p>
						<Text textAlign="center" fontSize="12px"><b>Max. size: 2Mb</b></Text>
					</Stack>}
				</VStack>
			)}
		</Box>
	);
};

export default UploadImages