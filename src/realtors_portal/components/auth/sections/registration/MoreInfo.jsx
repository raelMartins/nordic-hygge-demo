import {Button, FormInput, FormSelect} from '@/ui-lib';
import {Box, Center, HStack, Stack, Text} from '@chakra-ui/react';
import UploadUserDocuments from '../../UploadUserDocuments';
import {form_input_style} from '../registerForm';
import default_avatar from '@/realtors_portal/images/avatar.svg';
import Image from 'next/image';
import {encodeFileToBase64} from '@/realtors_portal/utils';
import {useCallback} from 'react';
import {useDropzone} from 'react-dropzone';

export const MoreRegistrationInfo = ({
  formik,
  isValid,
  handleUpdate,
  mutation,
  handleDate,
  handleDocument,
  doc,
  avatar,
  onAvatarChange,
  ...rest
}) => {
  const {getRootProps, getInputProps} = useDropzone({
    accept: {
      'image/*': [],
    },
    maxFiles: 1,
    onDrop: useCallback(acceptedFiles => {
      acceptedFiles.forEach(file =>
        encodeFileToBase64(file)
          .then(res => {
            onAvatarChange([Object.assign({image: res}, {preview: URL.createObjectURL(file)})]);
          })
          .catch(err => {
            return err;
          })
      );
    }, []),
  });

  return (
    <Stack gap={`8px`}>
      <Text
        fontSize={'23px'}
        fontWeight={700}
        color="text"
        className="heading-text-regular"
        textAlign={`center`}
        lineHeight={`140%`}
        maxW={`80%`}
        mx={`auto`}
      >
        Let’s get to know you more{' '}
      </Text>
      <Stack gap={`-10px`}>
        <Text
          color="red"
          fontSize={`18px`}
          fontWeight={`500`}
          lineHeight={`20px`}
          letterSpacing={`0.01em`}
        >
          * Required
        </Text>
        <HStack {...getRootProps({className: 'dropzone'})} cursor={`pointer`}>
          <Center
            position={`relative`}
            boxSize={`75px`}
            minW={`75px`}
            borderRadius={`50%`}
            overflow={`hidden`}
          >
            <Image
              src={avatar || formik.values.avatar || default_avatar.src}
              alt={`image`}
              fill
              objectFit="cover"
            />
          </Center>

          <Box
            bg={`custom_color.color`}
            color={`custom_color.contrast`}
            p={{base: `7px 18px`}}
            fontSize={`10.5px`}
            fontWeight={`500`}
            lineHeight={`130%`}
            w={`max-content`}
          >
            <Text w={`max-content`}>Upload Passport Photograph</Text>
          </Box>
          <input {...getInputProps()} />
        </HStack>
      </Stack>
      <FormSelect
        {...form_input_style}
        p={`0px`}
        color={`matador_form.label`}
        opacity=".85"
        type="text"
        onChange={formik.handleChange('highest_education')}
        value={formik.values.highest_education}
        placeholder="Highest Level of Education "
        options={[
          'High School Diploma',
          `Bachelor's Degree`,
          'Post-Secondary Certificate',
          'College',
          `Master's Degree`,
          'PHD',
        ]}
      />
      <FormSelect
        {...form_input_style}
        p={`0px`}
        color={`matador_form.label`}
        opacity=".85"
        options={['Male', 'Female']}
        placeholder="Gender"
        type="text"
        onChange={formik.handleChange('gender')}
        value={formik.values.gender}
      />
      <FormInput
        {...form_input_style}
        type="text"
        // onChange={formik.handleChange('date_of_birth')}
        onChange={handleDate}
        placeholder="Date of Birth (DD/MM/YYY)"
        value={formik.values.date_of_birth}
        fontSize={13}
      />
      <FormInput
        {...form_input_style}
        placeholder="Residential Address"
        type="text"
        onChange={formik.handleChange('address')}
        value={formik.values.address}
      />

      <FormSelect
        {...form_input_style}
        p={`0px`}
        color={`matador_form.label`}
        opacity=".85"
        options={['Married', 'Single', `Divorced`, `Widowed`, `Rather Not Say`]}
        placeholder="Marital Status"
        type="text"
        onChange={formik.handleChange('marital_status')}
        value={formik.values.marital_status}
      />
      {/* <FormSelect
          {...form_input_style}
          p={`0px`}
                    color={`matador_form.label`}
                    opacity=".85"
          
          placeholder="Employment Status"
          type="text"
          onChange={formik.handleChange('employment_status')}
          value={formik.values.employment_status}
          options={['Employed', 'Unemployed', 'Self employed']}
        /> */}
      <FormInput
        {...form_input_style}
        placeholder="Company's Name"
        type="text"
        onChange={formik.handleChange('company_name')}
        value={formik.values.company_name}
      />

      {/* <FormInput
          {...form_input_style}
          placeholder="Company Address"
          type="text"
          onChange={formik.handleChange('company_address')}
          value={formik.values.company_address}
        /> */}
      <UploadUserDocuments
        noNeedForType
        displayText={
          doc?.[0]
            ? // ? `Uploaded: ${toDateFormat(doc?.[0]?.created_at)}`
              `ID Uploaded`
            : 'Upload ID'
        }
        handleDocument={handleDocument}
      />
      <Button
        onClick={handleUpdate}
        isLoading={mutation.isLoading}
        isDisabled={!isValid}
        variation={`primary`}
        fontSize={`12px`}
        lineHeight={`150%`}
        textTransform={`uppercase`}
        boxStyle={{width: `100%`}}
        p={`8px`}
      >
        Proceed
      </Button>
    </Stack>
  );
};
