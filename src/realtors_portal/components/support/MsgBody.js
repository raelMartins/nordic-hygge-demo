import {useEffect, useRef} from 'react';
import {Box, Icon, Image, Link, Text} from '@chakra-ui/react';
import {AiFillFile} from 'react-icons/ai';

import {formatTimestamp} from '/src/realtors_portal/utils/formatDate';

import PlayIcon from '/src/realtors_portal/images/icons/play-attachment.svg';

const MsgBody = ({msg, loggedInUserId}) => {
  const messagesEndRef = useRef(null);
  const chatContainerRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({behavior: 'smooth'});
  };

  useEffect(() => {
    scrollToBottom();
  }, []);
  return (
    <Box
      ref={chatContainerRef}
      display="flex"
      flexDirection="column"
      mb="16.75px"
      ml={loggedInUserId === msg?.author?.id ? 'auto' : ''}
    >
      <Box
        display="flex"
        flexDirection="column"
        gap="6.83px"
        w="fit-content"
        alignSelf={loggedInUserId === msg?.author?.id ? 'flex-end' : 'flex-start'}
      >
        <Text as="sup" textAlign="end" alignSelf="flex-end" mt={6}>
          {formatTimestamp(msg?.timestamp)}
        </Text>

        <Box
          bg={loggedInUserId === msg?.author?.id ? '#F5F5F5' : '#F2F4F7'}
          p="8.02px"
          borderBottomRadius="6.41px"
          borderTopLeftRadius={loggedInUserId === msg?.author?.id ? '6.41px' : ''}
          borderTopRightRadius={loggedInUserId === msg?.author?.id ? '' : '6.41px'}
          alignSelf={loggedInUserId === msg?.author?.id ? 'flex-end' : 'flex-start'}
          display="flex"
          flexDirection="column"
          gap="13.63px"
        >
          <Text flexWrap="wrap" maxWidth="320px" whiteSpace="pre-line">
            {msg?.content}
          </Text>

          <Box
            display="flex"
            gap={2}
            alignSelf={loggedInUserId === msg?.author?.id ? 'flex-end' : 'flex-start'}
          >
            {msg?.attachment && (
              <Link href={msg.attachment} isExternal cursor="pointer">
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
                  <Icon as={AiFillFile} w="15px" h="15px" color="#4545FE" />
                </Box>
              </Link>
            )}

            {msg?.image && (
              <Link
                href={msg.image}
                isExternal
                alignSelf={loggedInUserId === msg?.author?.id ? 'flex-end' : 'flex-start'}
                cursor="pointer"
              >
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
                  <Image w="15px" h="15px" src={PlayIcon.src} alt="attach icon" />
                </Box>
              </Link>
            )}
          </Box>
        </Box>
      </Box>
      <Box ref={messagesEndRef} />
    </Box>
  );
};

export default MsgBody;
