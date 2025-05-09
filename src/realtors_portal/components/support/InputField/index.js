import {useRef} from 'react';
import {Box, Button, Flex, Image, Input, Stack, Text} from '@chakra-ui/react';
import TextareaAutosize from 'react-textarea-autosize';

import AttachIcon from '/src/realtors_portal/images/icons/attach-icon.svg';
import CameraIcon from '/src/realtors_portal/images/icons/camera-icon.svg';
import CloseIcon from '/src/realtors_portal/images/icons/close-icon-blue.svg';
import SendIcon from '/src/realtors_portal/images/icons/send-icon-2.svg';

const InputField = ({
  handleFileChange,
  handleImageChange,
  removeFile,
  removeImage,
  message,
  handleChange,
  handleKeyDown,
  uploadedFile,
  uploadedImage,
  handleSubmit,
  attachment,
}) => {
  // file part
  const inputRef = useRef(null);

  const selectFile = () => {
    if (inputRef.current !== null) {
      inputRef.current.click();
    }
  };

  // image part
  const imageRef = useRef(null);

  const selectImage = () => {
    if (imageRef.current !== null) {
      imageRef.current.click();
    }
  };

  return (
    <Box py="15px" w="full" mt={2}>
      <Flex bg="#F5F5F5" borderRadius="12px" alignItems="center" w="full">
        <Box
          flex={1}
          w="full"
          display="flex"
          flexDirection="column"
          // as='form'
          background="#F5F5F5"
          borderRadius="12px"
          gap="8px"
          pl="16px"
          py="10px"
        >
          <Box w="full" flex={1} display="flex" alignItems="center">
            <Box display="flex" gap={3} pr={3} alignSelf="flex-end">
              <Stack>
                <Input
                  ref={inputRef}
                  onChange={handleFileChange}
                  type="file"
                  accept=".pdf"
                  hidden
                />
                <Image
                  w="20px"
                  h="20px"
                  src={AttachIcon.src}
                  alt="attach icon"
                  cursor="pointer"
                  color="#3D3D3D"
                  onClick={selectFile}
                />
              </Stack>

              <Stack>
                <Input
                  ref={imageRef}
                  onChange={handleImageChange}
                  type="file"
                  accept=".jpeg, .jpg, .png"
                  hidden
                />
                <Image
                  w="20px"
                  h="20px"
                  src={CameraIcon.src}
                  alt="camera icon"
                  cursor="pointer"
                  color="#3D3D3D"
                  onClick={selectImage}
                />
              </Stack>
            </Box>

            <Box bg="#F9FAFB" w="full" flex={1} display="flex" flexDirection="column" gap="8px">
              <TextareaAutosize
                cacheMeasurements
                value={message}
                onChange={e => handleChange(e)}
                placeholder="Type message..."
                style={{
                  width: '100%',
                  height: '30px',
                  // placeholder: '#919191',
                  color: '#191919',
                  background: '#F9FAFB',
                  fontSize: '14px',
                  borderRadius: '8px',
                  outline: 'transparent',
                  padding: '2px 0px',
                }}
                maxRows={4}
                onKeyDown={handleKeyDown}
              />

              {/* section for result */}
              {attachment && (
                <Box alignSelf="flex-start" display="flex" gap={2} pl="10px" pb="10px">
                  {uploadedFile && uploadedFile?.type === 'application/pdf' && (
                    <Box
                      display="flex"
                      gap={1}
                      bg="rgba(69, 69, 254, 0.10)"
                      p="8px"
                      borderRadius="8.02px"
                      alignItems="center"
                    >
                      <Text color="#4545FE" fontSize="9.62px" fontWeight="500">
                        view attachment
                      </Text>

                      <Image
                        w="15px"
                        h="15px"
                        src={CloseIcon.src}
                        alt="attach icon"
                        cursor="pointer"
                        onClick={removeFile}
                      />
                    </Box>
                  )}
                  {uploadedImage && (
                    <Box
                      display="flex"
                      gap={1}
                      bg="rgba(69, 69, 254, 0.10)"
                      p="8px"
                      borderRadius="8.02px"
                      alignItems="center"
                    >
                      <Text color="#4545FE" fontSize="9.62px" fontWeight="500">
                        view attachment
                      </Text>

                      <Image
                        w="15px"
                        h="15px"
                        src={CloseIcon.src}
                        alt="attach icon"
                        cursor="pointer"
                        onClick={removeImage}
                      />
                    </Box>
                  )}
                </Box>
              )}
            </Box>
          </Box>
        </Box>

        <Box alignSelf="flex-end" justifyItems="center" alignItems="center">
          <Button
            bg="transparent"
            borderRadius="12px"
            py="20px"
            _hover={{bg: 'transparent'}}
            onClick={handleSubmit}
          >
            <Image src={SendIcon.src} alt="send icon" />
          </Button>
        </Box>
      </Flex>
    </Box>
  );
};

export default InputField;
