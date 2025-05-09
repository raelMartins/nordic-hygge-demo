import {Flex, Text, useToast} from '@chakra-ui/react';
import React, {useCallback, useEffect, useState} from 'react';
import {useDropzone} from 'react-dropzone';
import {encodeFileToBase64} from '@/utils';
import {Button} from '@/ui-lib';
import {appCurrentTheme} from '@/utils/localStorage';
import {LIGHT} from '@/constants/names';
import {settings_input_field_style} from '.';
import {useCustomToast} from '../CustomToast';

export const UploadUserDocuments = ({handleDocument, displayText, isDisabled = false, type}) => {
  const extractBase64 = arr => arr.map(file => file.image);
  const [files, setFiles] = useState([]);
  const toast = useCustomToast();

  const {getRootProps, getInputProps, isDragActive, acceptedFiles, fileRejections} = useDropzone({
    accept: {'image/*': [], 'application/pdf': []},
    // accept: type === `utility_bill` ? {'image/*': [], 'application/pdf': []} : {'image/*': []},
    maxSize: 2 * 1024 * 1024,
    disabled: isDisabled,
    multiple: false,
    onDrop: useCallback(acceptedFiles => {
      acceptedFiles.forEach(file =>
        encodeFileToBase64(file).then(res => {
          setFiles(prevValue => [
            ...prevValue,
            Object.assign({image: res}, file, {
              preview: URL.createObjectURL(file),
            }),
          ]);
        })
      );
    }),
  });

  useEffect(() => {
    if (fileRejections.length) {
      toast({
        description: `${fileRejections[0].errors[0].code}: file is larger than 2MB`,
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: 'top-right',
      });
    }
  }, [fileRejections, acceptedFiles]);

  useEffect(() => {
    if (files.length) {
      handleDocument(extractBase64(files));
    }
  }, [files]);

  useEffect(() => {
    return () => files && files.forEach(file => URL.revokeObjectURL(file.preview));
  }, []);

  return (
    <Flex
      {...settings_input_field_style}
      w="full"
      p="11.5px 16px"
      align={'center'}
      gap="7px"
      justify="space-between"
      {...getRootProps({className: 'dropzone'})}
    >
      <input {...getInputProps()} disabled={isDisabled} />

      {isDragActive ? (
        <Text letterSpacing="0.52px" fontWeight={500} fontSize={13}>
          Drop the files here ...
        </Text>
      ) : (
        <Text letterSpacing="0.52px" fontWeight={500} fontSize={13}>
          {displayText}
        </Text>
      )}
      <Button
        bg={'#919191'}
        color={'#fff'}
        borderRadius="4px"
        isDisabled={isDisabled}
        p={`4px 10px`}
        fontSize={`12px`}
        lineHeight={`140%`}
        fontWeight={`400`}
        h={`100%`}
      >
        Choose file
      </Button>
    </Flex>
  );
};

export default UploadUserDocuments;
