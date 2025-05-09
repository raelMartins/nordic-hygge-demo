import {AddIcon, SmallCloseIcon} from '@chakra-ui/icons';
import {Box, Flex, Icon, Image, Stack, Text, VStack, useToast} from '@chakra-ui/react';
import React, {useCallback, useEffect, useState} from 'react';
import {useDropzone} from 'react-dropzone';
import {encodeFileToBase64, extractBase64} from '/src/realtors_portal/utils';
import uploadIcon from '/src/realtors_portal/images/icons/imageUploadIconDarkmode.svg';
import Upload from '/src/realtors_portal/images/icons/Upload.png';
import CloseIcon from '/src/realtors_portal/images/icons/closeForUploadImage.svg';
import plusIcon from '/src/realtors_portal/images/icons/plusIconForUploadImage.svg';

export const UploadImages = props => {
  const {setFieldValue, dropZoneProps, files, setFiles, values, maxFiles, index, ...rest} = props;

  const toast = useToast();

  const customScrollbarStyles = {
    '&::-webkit-scrollbar': {
      height: '4px',
      borderRadius: '16px',
    },
    '&::-webkit-scrollbar-track': {
      borderRadius: '16px',
      WebkitBoxShadow: 'inset 0 0 6px rgba(255, 255, 255, 0.1)',
    },
    '&::-webkit-scrollbar-thumb': {
      borderRadius: '16px',
      backgroundColor: 'rgba(217, 217, 217, 0.10)',
    },
  };
  console.log({files, dropZoneProps});
  const {getRootProps, getInputProps, isDragActive} = useDropzone({
    accept: {
      'image/*': [],
    },
    // maxSize: 2 * 1024 * 1024,

    // maxFiles: maxFiles || 1,

    onDrop: useCallback(acceptedFiles => {
      console.log({acceptedFiles});
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
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []),
  });
  const removeFile = index => {
    const copy = [...files];
    for (let i = 0; i < copy.length; i++) {
      if (i == index) {
        copy.splice(i, 1);
        i = copy.length;
      }
    }
    setFiles(copy);
  };

  useEffect(() => {
    if (files.length > maxFiles) {
      setFiles(files.slice(0, maxFiles));
      toast({
        description: `Sorry, you're limited to ${maxFiles} image uploads.`,
        status: 'warning',
        duration: 9000,
        isClosable: true,
      });
    }
    console.log({files, maxFiles});
  }, [files, setFiles, toast, maxFiles]);

  const thumbs =
    files &&
    files?.slice(0, maxFiles)?.map((file, index) => (
      <Flex maxW="680px" wrap="flex-wrap" key={index} align="center" h="full">
        <Box pos="relative" h="full">
          {/* <Icon
            as={}
            cursor="pointer"
            onClick={() => removeFile(index)}
            pos="absolute"
            right="-20%"
            zIndex={1000}
            top="0"
            width="30px"
            height="30px"
            alt="cancel_icon"
            color="red"
          /> */}
          <Image
            cursor="pointer"
            onClick={() => removeFile(index)}
            pos="absolute"
            right="50%"
            mx="0 auto"
            left="50%"
            transform="translateX(-50%)"
            zIndex={3}
            bottom="0"
            width="16px"
            height="16px"
            src={CloseIcon.src}
            alt="close icon"
          />

          <Image
            alt="image preview"
            w="110.552px"
            maxW="110.552px"
            objectFit="cover"
            maxH="70.138px"
            h="70.138px"
            borderRadius="19.862px"
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
    return () => files && files.forEach(file => URL.revokeObjectURL(file.preview));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <Box
      //   minW={{ base: "90%", xl: "580px" }}

      maxH="129px"
      w="full"
      border="0.5px solid #DADADA"
      borderRadius="5px"
      display="flex"
      justifyContent="start"
      alignItems="center"
      // flexWrap="wrap"
      overflowX="auto"
      // overflowY="hidden"

      sx={customScrollbarStyles}
      {...rest}
    >
      {files && files.length > 0 ? (
        <Flex gap="15px" align={'center'} px="20px">
          {thumbs}
          <input disabled={files.length >= maxFiles} {...getInputProps()} />
          {console.log({fileLeng: files.length >= maxFiles})}
          {files.length >= maxFiles ? null : (
            <div
              {...getRootProps({className: 'dropzone'})}
              style={{height: 'fit-content', width: '30px'}}
            >
              {/* <Icon
              ml="33px"
              as={AddIcon}
              color="#4545FE"
              fontWeight={900}
              fontSize="70px"
            /> */}
              <Image cursor="pointer" src={plusIcon.src} boxSize="30px" alt="plus icon" />
            </div>
          )}
        </Flex>
      ) : (
        <VStack
          w="full"
          align="center"
          cursor="pointer"
          h="100%"
          spacing={6}
          justify="center"
          pos="relative"
          {...getRootProps({className: 'dropzone'})}
        >
          <input {...getInputProps()} />

          {isDragActive ? (
            <Text color="#fff" fontSize="14px">
              Drop yours files here ...
            </Text>
          ) : (
            <Stack spacing="8px" align="center">
              <Image src={Upload.src} alt="upload icon" boxSize="19.4px" />
              <Text w="full" textAlign="center" fontSize="8px" fontWeight="400" color="#919191">
                Upload image
              </Text>
            </Stack>
          )}
        </VStack>
      )}
    </Box>
  );
};

export default UploadImages;
