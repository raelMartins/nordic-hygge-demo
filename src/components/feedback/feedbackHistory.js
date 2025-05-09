import React from 'react';
import {Box, Flex, Text, VStack, HStack} from '@chakra-ui/react';
import {RiStarFill, RiStarLine} from 'react-icons/ri';
import {BsArrowLeft} from 'react-icons/bs';
import {scrollBarStyles} from '../common/ScrollBarStyles';

const FeedbackHistory = ({setScreen, feedbacks}) => {
  function formatTime(timeString) {
    const dateToUse = new Date(timeString).toLocaleTimeString();
    const [hourString, minute, sec] = dateToUse.split(':');
    const hour = +hourString % 24;
    return (hour % 12 || 12) + ':' + minute + (hour < 12 ? ' AM' : ' PM');
  }

  return (
    <Box p="20px" h="full" overflowY="auto" css={scrollBarStyles}>
      <VStack h="500px" align="stretch" spacing={'20px'}>
        {feedbacks?.map((feedback, i) => (
          <Box
            key={i}
            px="10px"
            py="5px"
            border="1px solid"
            borderColor="matador_border_color.100"
            bg="matador_background.100"
            borderRadius={'7px'}
          >
            <Flex w="full" justify={'space-between'} align={'center'}>
              <Text fontWeight={400} fontSize={'14px'} color="text">
                Rating & Feedback
              </Text>
              <Text fontWeight={400} fontSize={'12px'} color="text">
                {feedback.created_at
                  ? `${new Date(feedback.created_at).toDateString()} | ${formatTime(
                      feedback.created_at
                    )}`
                  : '-'}
              </Text>
            </Flex>

            <HStack my="7px" align={'center'} gap="-2px">
              {[1, 2, 3, 4, 5].map(index => (
                <>
                  {feedback.star_rating >= index ? (
                    <RiStarFill color="#FFA836" size={18} />
                  ) : (
                    <RiStarFill color="#969696" size={18} />
                  )}
                </>
              ))}
            </HStack>

            <Box px="13px" py="10px" bg="card_bg" borderRadius={'5px'}>
              <Text fontWeight={500} fontSize="10px" color="text">
                Feedback
              </Text>
              <Text fontSize={'10px'} fontWeight={300} color="text" mt="10px">
                {feedback.feedback}
              </Text>
              {feedback.response && (
                <>
                  <Text fontWeight={500} fontSize="10px" color="text" mt="15px">
                    Response
                  </Text>
                  <Text fontSize={'10px'} fontWeight={300} color="text" mt="10px">
                    {feedback.response}
                  </Text>
                </>
              )}
            </Box>
          </Box>
        ))}
      </VStack>
    </Box>
  );
};

export default FeedbackHistory;
