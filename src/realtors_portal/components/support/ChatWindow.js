import {useState} from 'react';
import {Box, Icon, ModalBody, ModalFooter, ModalHeader, Text} from '@chakra-ui/react';
import {IoChevronBackOutline} from 'react-icons/io5';

import MsgBody from './MsgBody';
import InputField from './InputField';

import SupportBg from '/src/realtors_portal/images/supportbg.png';

const ChatWindow = ({
  data,
  supportType,
  loggedInUserId,
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
  goBack,
  altSupportType,
}) => {
  const [scrollBehavior, setScrollBehavior] = useState('inside');

  return (
    <>
      <Box
        bgImage={SupportBg.src}
        bgPosition="center"
        bgRepeat="no-repeat"
        bgSize="cover"
        borderTopRadius="16px"
        alignItems="center"
        mb="10px"
      >
        <ModalHeader display="flex" gap={1}>
          <Text fontSize="11.22px" display="flex" alignItems="center" color="#FFFFFF">
            {supportType
              ? supportType
              : altSupportType === 'transaction_issues'
              ? 'Transaction Issues'
              : altSupportType === 'bug_report'
              ? 'Bug Report'
              : altSupportType === 'enquiries'
              ? 'Enquiries'
              : altSupportType === 'something_else'
              ? 'Something Else'
              : ''}
          </Text>
        </ModalHeader>
        {/* <ModalCloseButton /> */}
      </Box>

      <ModalBody
        bg="#ffffff"
        maxHeight="450px"
        borderBottomRadius="16px"
        overflowY="auto"
        scrollBehavior={scrollBehavior}
      >
        {data?.data &&
          data?.data?.messages?.map((msg, index) => {
            return <MsgBody key={index} msg={msg} loggedInUserId={loggedInUserId} />;
          })}
      </ModalBody>

      <ModalFooter>
        <InputField
          handleFileChange={handleFileChange}
          handleImageChange={handleImageChange}
          removeFile={removeFile}
          removeImage={removeImage}
          message={message}
          handleChange={handleChange}
          handleKeyDown={handleKeyDown}
          uploadedFile={uploadedFile}
          uploadedImage={uploadedImage}
          handleSubmit={handleSubmit}
          attachment={attachment}
        />
      </ModalFooter>
    </>
  );
};

export default ChatWindow;
