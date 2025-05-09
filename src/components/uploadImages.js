import {
  Box,
  Flex,
  Icon,
  Image,
  Stack,
  Text,
  VStack,
  useToast,
  Center,
  useTheme,
} from '@chakra-ui/react';
import React, {useCallback, useEffect} from 'react';
import {useDropzone} from 'react-dropzone';
import uploadIcon from './../images/icons/Upload_settings.svg';
import {CloseIcon} from '@chakra-ui/icons';
import {FaPlus} from 'react-icons/fa';
import {encodeFileToBase64} from '../utils';
import {useCustomToast} from './CustomToast';

const UploadImagesIcon = ({boxSize = `33px`}) => {
  const theme = useTheme();
  const colors = theme?.colors;
  return (
    <Box width={boxSize} height={boxSize}>
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 33 33"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect
          x="2.6875"
          y="2.57422"
          width="28.125"
          height="28.125"
          rx="14.0625"
          fill={colors?.matador_background?.[`100`]}
        />
        <rect
          x="2.6875"
          y="2.57422"
          width="28.125"
          height="28.125"
          rx="14.0625"
          stroke={colors?.matador_background?.[`200`]}
          strokeWidth="4.21875"
        />
        <g clipPath="url(#clip0_4359_6254)">
          <path
            d="M14.4063 18.9805L16.75 16.6367M16.75 16.6367L19.0938 18.9805M16.75 16.6367V21.9102M21.4375 19.4157C22.1532 18.8246 22.6094 17.9304 22.6094 16.9297C22.6094 15.1499 21.1665 13.707 19.3867 13.707C19.2587 13.707 19.1389 13.6402 19.0739 13.5299C18.3098 12.2333 16.8991 11.3633 15.2852 11.3633C12.8581 11.3633 10.8906 13.3308 10.8906 15.7578C10.8906 16.9684 11.3801 18.0647 12.172 18.8595"
            stroke={colors?.matador_form?.label}
            strokeWidth="1.17188"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </g>
        <defs>
          <clipPath id="clip0_4359_6254">
            <rect
              width="14.0625"
              height="14.0625"
              fill={colors?.text}
              transform="translate(9.71875 9.60547)"
            />
          </clipPath>
        </defs>
      </svg>
    </Box>
  );
};

const UploadImages = props => {
  const {setFieldValue, files, setFiles, values, maxFiles, index, ...rest} = props;

  const toast = useCustomToast();

  const customScrollbarStyles = {
    '&::-webkit-scrollbar': {
      width: '4px',
      borderRadius: '16px',
    },
    '&::-webkit-scrollbar-track': {
      borderRadius: '16px',
      WebkitBoxShadow: 'inset 0 0 6px rgba(255, 255, 255, 0.1)',
    },
    '&::-webkit-scrollbar-thumb': {
      borderRadius: '16px',
      backgroundColor: '#ffffff',
      // outline: "1px solid slategrey", // You can include this line if needed
    },
  };

  const {getRootProps, getInputProps, isDragActive} = useDropzone({
    accept: {'image/*': []},
    maxSize: 2 * 1024 * 1024,

    // maxFiles: maxFiles || 1,

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
        duration: 5000,
        isClosable: true,
      });
    }
  }, [files, setFiles, toast, maxFiles]);

  const thumbs =
    files &&
    files?.slice(0, maxFiles)?.map((file, index) => (
      <Flex maxW="680px" wrap="flex-wrap" key={index} align="center" h="full">
        <Box pos="relative" h="full" pr="14.9px">
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

          <Center
            pos="absolute"
            right="50%"
            mx="0 auto"
            left="50%"
            transform="translateX(-50%)"
            zIndex={1000}
            bottom="0"
            cursor="pointer"
            bg="#d1d1d1"
            w="25px"
            h="25px"
            borderRadius="full"
            onClick={() => removeFile(index)}
          >
            <CloseIcon fontSize={10} />
          </Center>
          <Image
            alt="image preview"
            w="70px"
            maxW="70px"
            objectFit="cover"
            maxH="70px"
            h="70px"
            borderRadius="10px"
            src={file.preview}
            onLoad={() => {
              URL.revokeObjectURL(file.image);
            }}
          />
        </Box>
      </Flex>
    ));

  useEffect(() => {
    return () => files && files.forEach(file => URL.revokeObjectURL(file.preview));
  }, []);

  return (
    <Box
      w="full"
      border="0.5px solid #DADADA"
      borderRadius="5px"
      display="flex"
      justifyContent="start"
      alignItems="center"
      flexWrap="wrap"
      overflowY="auto"
      sx={customScrollbarStyles}
      p={`11.25px`}
      {...rest}
    >
      {files && files.length > 0 ? (
        <Flex flexWrap="wrap" rowGap="20px" align={'center'} py="13px" px="20px">
          {thumbs}
          <input
            disabled={files.length >= maxFiles}
            // accept=".jpg, .png"
            accept="image/*"
            {...getInputProps()}
          />
          {files.length >= maxFiles ? null : (
            <div {...getRootProps({className: 'dropzone'})} style={{height: 'fit-content'}}>
              <Center cursor="pointer" bg="#d1d1d1" w="25px" h="25px" borderRadius="full">
                <FaPlus size={12} style={{cursor: 'pointer'}} />
              </Center>
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
          <input accept=".jpg, .png" {...getInputProps()} />

          <Stack gap="8px" align="center" mt={'0 !important'}>
            {/* <Image src={uploadIcon.src} alt="upload icon" boxSize="33px" /> */}
            <UploadImagesIcon boxSize="33px" />

            <VStack
              color="matador_form.label"
              fontFamily={`Inter`}
              w="full"
              textAlign="center"
              fontSize="9px"
              lineHeight={`150%`}
              fontWeight={`400`}
              flexWrap={`wrap`}
              gap={`2px`}
            >
              <Flex gap={`2px`}>
                <Text color="text" fontWeight="600">
                  Click to upload
                </Text>
                {/* {isDragActive && <Text> or drag and drop</Text>} */}
                <Text> or drag and drop</Text>
              </Flex>
              <Text>SVG, PNG, JPG or GIF (max. 800x400px)</Text>
            </VStack>
          </Stack>
        </VStack>
      )}
    </Box>
  );
};

export default UploadImages;
