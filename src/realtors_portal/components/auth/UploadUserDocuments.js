import {Flex, Text, useToast} from '@chakra-ui/react';
import React, {useCallback, useEffect, useState} from 'react';
import {useDropzone} from 'react-dropzone';
import {encodeFileToBase64} from '../../../utils';
import {Button} from '../../../ui-lib';
import {appCurrentTheme} from '../../../utils/localStorage';
import {LIGHT} from '../../../constants/names';

export const UploadUserDocuments = ({handleDocument, displayText, isDisabled = false, type}) => {
  const extractBase64 = arr => arr.map(file => file.image);
  const [files, setFiles] = useState([]);
  const toast = useToast();

  const {getRootProps, getInputProps, isDragActive, acceptedFiles, fileRejections} = useDropzone({
    accept: {'image/*': [], 'application/pdf': []},
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
        // description: `${fileRejections[0].errors[0].code}: file is larger than 2MB`,
        description: `File is larger than 2MB`,
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
      w="full"
      bg={`matador_background.100`}
      align={'center'}
      gap="7px"
      justify="space-between"
      background={`custom_color.opacity._10`}
      p={{base: `10px 14px`}}
      {...getRootProps({className: 'dropzone'})}
    >
      <input {...getInputProps()} disabled={isDisabled} />

      {isDragActive ? (
        <Text color="matador_text.100" letterSpacing="0.52px" fontWeight={500} fontSize={13}>
          Drop the files here ...
        </Text>
      ) : (
        <Text color="matador_form.label" fontWeight={`400`} fontSize={`16px`} lineHeight={`120%`}>
          {displayText}
        </Text>
      )}
      <Button
        bg={`custom_color.color`}
        color={`custom_color.contrast`}
        borderRadius="9px"
        isDisabled={isDisabled}
        p={{base: `7px 18px`}}
        fontSize={`10.5px`}
        fontWeight={`500`}
        lineHeight={`130%`}
        h={`100%`}
      >
        Upload file
      </Button>
    </Flex>
  );
};

export default UploadUserDocuments;
