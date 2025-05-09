import {Box, Flex, Icon, Image, ModalBody, ModalHeader, Text} from '@chakra-ui/react';
import {BsChevronRight} from 'react-icons/bs';

import SupportBg from '/src/realtors_portal/images/supportbg.png';
import TransactionIcon from '/src/realtors_portal/images/icons/support_transact.svg';
import BugIcon from '/src/realtors_portal/images/icons/support_bug.svg';
import EnquiriesIcon from '/src/realtors_portal/images/icons/support_enquiries.svg';
import ConcernIcon from '/src/realtors_portal/images/icons/support_concern.svg';

const InitiateChatBody = ({handleSupportType}) => {
  return (
    <>
      <Box
        borderTopRadius="16px"
        alignItems="center"
        bgImage={SupportBg.src}
        bgPosition="center"
        bgRepeat="no-repeat"
        bgSize="cover"
      >
        <ModalHeader display="flex" flexDirection="column" padding="60px 23px">
          <Text fontSize="26px" fontWeight="500" lineHeight="36.40px" color="#FFFFFF">
            Hi there
          </Text>
          <Text
            fontSize="26px"
            color="rgba(255,255,255,0.70)"
            fontWeight="500"
            lineHeight="36.40px"
          >
            How can we help you?
          </Text>
        </ModalHeader>
        {/* <ModalCloseButton /> */}
      </Box>

      <ModalBody bg="#FFFFFF" borderBottomRadius="16px">
        <Box display="flex" flexDirection="column" gap="12px" w="fit-content" py="55px">
          <Flex
            bg="#F2F4F7"
            p="16px"
            borderRadius="8px"
            gap="8px"
            alignItems="center"
            justifyContent="flex-start"
            cursor="pointer"
            onClick={() => handleSupportType('transaction_issues')}
          >
            <Image
              w="23px"
              h="23px"
              src={TransactionIcon.src}
              alt="transaction icon"
              borderRadius={50}
            />

            <Box
              display="flex"
              gap={3}
              alignItems="center"
              justifyContent="space-between"
              width="full"
            >
              <Text
                fontSize="12px"
                color="#3D3D3D"
                fontWeight="500"
                lineHeight="1.5"
                wordWrap="break-word"
              >
                Are you experiencing any problems related to your transactions?
              </Text>

              <Icon as={BsChevronRight} w="16px" h="16px" color="#223342" />
            </Box>
          </Flex>

          <Flex
            bg="#F2F4F7"
            p="16px"
            borderRadius="8px"
            gap="8px"
            alignItems="center"
            justifyContent="flex-start"
            cursor="pointer"
            onClick={() => handleSupportType('bug_report')}
          >
            <Image w="23px" h="23px" src={BugIcon.src} alt="bug icon" borderRadius={50} />

            <Box
              display="flex"
              gap={3}
              alignItems="center"
              justifyContent="space-between"
              width="full"
            >
              <Text
                fontSize="12px"
                color="#3D3D3D"
                fontWeight="500"
                lineHeight="1.5"
                wordWrap="break-word"
              >
                Have you encountered any software bugs or issues?
              </Text>

              <Icon as={BsChevronRight} w="16px" h="16px" color="#223342" />
            </Box>
          </Flex>

          <Flex
            bg="#F2F4F7"
            p="16px"
            borderRadius="8px"
            gap="8px"
            alignItems="center"
            justifyContent="flex-start"
            cursor="pointer"
            onClick={() => handleSupportType('enquiries')}
          >
            <Image
              w="23px"
              h="23px"
              src={EnquiriesIcon.src}
              alt="enquiries icon"
              borderRadius={50}
            />

            <Box
              display="flex"
              gap={3}
              alignItems="center"
              justifyContent="space-between"
              width="full"
            >
              <Text
                fontSize="12px"
                color="#3D3D3D"
                fontWeight="500"
                lineHeight="1.5"
                wordWrap="break-word"
              >
                Do you have inquiries?
              </Text>

              <Icon as={BsChevronRight} w="16px" h="16px" color="#223342" />
            </Box>
          </Flex>

          <Flex
            bg="#F2F4F7"
            p="16px"
            borderRadius="8px"
            gap="8px"
            alignItems="center"
            justifyContent="flex-start"
            cursor="pointer"
            onClick={() => handleSupportType('something_else')}
          >
            <Image w="23px" h="23px" src={ConcernIcon.src} alt="concern icon" borderRadius={50} />

            <Box
              display="flex"
              gap={3}
              alignItems="center"
              justifyContent="space-between"
              width="full"
            >
              <Text
                fontSize="12px"
                color="#3D3D3D"
                fontWeight="500"
                lineHeight="1.5"
                wordWrap="break-word"
              >
                For anything else, describe your concern, and we&apos;ll help.
              </Text>

              <Icon as={BsChevronRight} w="16px" h="16px" color="#223342" />
            </Box>
          </Flex>
        </Box>
      </ModalBody>
    </>
  );
};

export default InitiateChatBody;
