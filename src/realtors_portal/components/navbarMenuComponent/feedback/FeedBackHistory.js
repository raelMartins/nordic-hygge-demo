import {HStack, Heading, Spinner, Stack, Text, VStack, useToast} from '@chakra-ui/react';
import React, {useState} from 'react';
import {changeDateFormat} from '/src/realtors_portal/utils/formatDate';
import {Ratings} from './SetFeedBack';
import {truncateLongText} from '/src/realtors_portal/utils/truncateLongText';

export const FeedBackHistory = ({feedBackHistoryArray, isLoading}) => {
  const starStyle = {
    h: '18.625px',
    w: '18.625px',
  };

  const [readMoreForResponse, setReadmoreForResponse] = useState('more');
  const [readMoreForFeedBack, setReadmoreForFeedBack] = useState('more');

  const customScrollbarStyles = {
    '&::-webkit-scrollbar': {
      width: '2px',
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

  return (
    <Stack w="full" spacing="15px" pr="5px">
      {isLoading ? (
        <VStack w="full" justify="center" align="center" h="20vh">
          <Spinner color="#fff" />
        </VStack>
      ) : (
        feedBackHistoryArray.map((feedbackObj, idx) => {
          return (
            <Stack
              spacing="none"
              key={idx}
              border="0.776px solid #282828"
              borderRadius="9.313px"
              maxH="287.14px"
              px="12.42px"
              py="12px"
            >
              <HStack w="full" justify="space-between">
                <Heading fontSize="14px" fontWeight="400" color="#fff">
                  Rating & Feedback
                </Heading>
                <Text fontSize="12px" fontWeight="400" color="#fff">
                  {feedbackObj.created_at
                    ? changeDateFormat(feedbackObj.created_at, 'add_time')
                    : '-'}
                </Text>
              </HStack>
              <Ratings
                starStyle={starStyle}
                rating={feedbackObj.star_rating}
                mb="15.52px"
                forHistory
                mt="15px"
                spacing="6.21px"
              />
              <Stack
                maxH="197.89px"
                py="9.31px"
                w="full"
                px="12.4px"
                spacing="15.521px"
                bg="#171717"
                borderRadius="6.208px"
              >
                <Stack spacing="9.37px" w="full">
                  <Heading as="h2" fontSize="10.091px" fontWeight="500" color="#fff">
                    Feedback
                  </Heading>
                  <Stack maxH="76px" overflow="auto" sx={customScrollbarStyles} w="full">
                    <Text fontSize="9.313px" fontWeight="300" color="#fff">
                      {
                        truncateLongText(
                          feedbackObj?.feedback,
                          readMoreForFeedBack === 'more' ? 300 : feedbackObj?.feedback?.length + 1
                        ).truncatedText
                      }
                      {feedbackObj.feedback?.length <= 300 ? (
                        ''
                      ) : (
                        <Text
                          color="#D7DFEF"
                          as="span"
                          cursor="pointer"
                          onClick={() =>
                            setReadmoreForFeedBack(readMoreForFeedBack === 'more' ? 'less' : 'more')
                          }
                        >
                          Read {readMoreForFeedBack}
                        </Text>
                      )}
                    </Text>
                  </Stack>
                </Stack>
                {feedbackObj?.response ? (
                  <Stack spacing="9.37px" w="full">
                    <Heading as="h2" fontSize="10.091px" fontWeight="500" color="#fff">
                      Response
                    </Heading>
                    <Stack maxH="45px" overflow="auto" sx={customScrollbarStyles} w="full">
                      <Text fontSize="9.313px" fontWeight="300" color="#fff">
                        {
                          truncateLongText(
                            feedbackObj?.response ?? '',
                            readMoreForResponse === 'more' ? 160 : feedbackObj?.response?.length + 1
                          ).truncatedText
                        }{' '}
                        {feedbackObj?.response?.length <= 160 ? (
                          ''
                        ) : (
                          <Text
                            color="#D7DFEF"
                            as="span"
                            cursor="pointer"
                            onClick={() =>
                              setReadmoreForResponse(
                                readMoreForResponse === 'more' ? 'less' : 'more'
                              )
                            }
                          >
                            Read {readMoreForResponse}
                          </Text>
                        )}
                      </Text>
                    </Stack>
                  </Stack>
                ) : null}
              </Stack>
            </Stack>
          );
        })
      )}
    </Stack>
  );
};

export default FeedBackHistory;
