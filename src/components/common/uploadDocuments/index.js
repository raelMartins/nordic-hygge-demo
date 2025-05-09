import React, { useState } from 'react';
import { FormControl, HStack, Select, VStack, Button, AspectRatio } from '@chakra-ui/react';
import { useFormik } from 'formik';
import { useRouter } from 'next/router';
import { LayoutView } from '../../../components';
import { BackArrowWithText } from '../../assets/BackArrow';
import { Container3 } from '../containers';
import { Input, UploadDocument } from '../../../ui-lib';

export function UploadDocument2({ onUpload, isLoading, type }) {
	const router = useRouter();
	const [document, setDocument] = useState([]);
	const handleBack = () => {
		router.back();
	};

	const formik = useFormik({
		initialValues: {},
		onSubmit: (values) => {
			const base64Arr = document.map((item) => item.image);
			let payload;
			if (type == 'profile') {
				payload = { document: base64Arr, ...values };
			} else {
				payload = { documents: base64Arr, ...values };
			}
			onUpload(payload);
		},
	});

	const isFieldNotEmpty = Boolean(document.length) && Boolean(formik.values.id_number) && Boolean(formik.values.document_type);

	return (
		<LayoutView maxW={'100%'}>
			<BackArrowWithText text='Back' onClick={handleBack} />
			<Container3 title={'Upload Documents'} titleFontSize={'32px'}>
				<FormControl as='form' onSubmit={formik.handleSubmit} display='flex' flexDirection='column' alignContent='center'>
					<VStack w='50%' spacing={'20px'}>
						<Input
							required
							type='text'
							id='id_number'
							name='id_number'
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
							value={formik.values.id_number}
							error={formik.touched.id_number && formik.errors.id_number}
							placeholder='Documents Number'
							_placeholder={{
								color: 'gray.500',
							}}
						/>
						<Select
							required
							type='text'
							id='document_type'
							name='document_type'
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
							error={formik.touched.document_type && formik.errors.document_type}
							value={formik.values.document_type}
							placeholder='Document Type'
							_placeholder={{
								color: 'gray.500',
							}}
							borderBottom='1px solid #CBCBCB !important'
							fontSize='16px'
							h={'48px'}>
							<option value='International Passport'>International Passport</option>
							<option value='National Identity Card'>National Identity Card</option>
							<option value='Driver License'>Driver License</option>
						</Select>
						<AspectRatio w={'60%'} maxW={'60%'} ratio={'1.77'} alignSelf={'start'}>
							<UploadDocument maxFiles={1} id='document' name='document' files={document} setFiles={setDocument} text={'Upload Document'} border={'1.5px solid #4545FE'} w={'60%'} />
						</AspectRatio>
					</VStack>
					<HStack flexDirection={'row-reverse'} gap={'10px'} mt={'100px'}>
						<Button disabled={!isFieldNotEmpty} variant={'solid'} my='30px' bgColor={'#4545FE'} color={'white'} _hover={{ background: '#4545FE' }} borderRadius={'12px'} paddingX='40px' paddingY='25px' isLoading={isLoading} onClick={formik.handleSubmit}>
							Proceed
						</Button>
						<Button
							my='30px'
							color={'#FF3636'}
							borderRadius={'12px'}
							border={'1px solid #FF3636'}
							bgColor={'white'}
							_hover={{ background: '#FF363630' }}
							paddingX='40px'
							paddingY='25px'
							onClick={() => {
								setDocument([]);
								formik.resetForm();
							}}>
							Discard
						</Button>
						<Button my='30px' bgColor={'#12D8A01A'} color={'#12D8A0'} borderRadius={'12px'} _hover={{ background: '#12D8A030' }} paddingX='40px' paddingY='25px'>
							Save to draft
						</Button>
					</HStack>
				</FormControl>
			</Container3>
		</LayoutView>
	);
}
