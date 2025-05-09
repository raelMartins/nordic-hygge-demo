import React from 'react';
import {HStack, Image, Stack, Text, Textarea} from '@chakra-ui/react';
import EmptyStarIcon from '@/realtors_portal/images/icons/emptyStarForFeedback.svg';
import starIcon from '@/realtors_portal/images/icons/starForFeedBack.svg';
import {STORENAMEFROMDOMAIN} from '@/constants/routes';
import {RButton} from '@/realtors_portal/ui-lib';

export const SetFeedBackForAgent = ({
  setRating,
  rating,
  fromAssets,
  message,
  handleMessage,
  isValid,
  handleSubmit,
  feedbackMutation,
}) => {
  return (
    <Stack w="full" spacing="none">
      <Text fontSize="12px" maxW="336.673px" fontWeight="300" mb="20.72px">
        {fromAssets
          ? `We would greatly appreciate your feedback on this property to help us enhance our services for you`
          : `Thank you for using ${STORENAMEFROMDOMAIN}! Help us improve our service
        by providing some feedback.`}
      </Text>
      <Ratings setRating={setRating} rating={rating} />
      <Text
        textAlign="start"
        w="full"
        mb="4.44px"
        as="label"
        htmlFor="message"
        fontSize="11.222px"
        //
        fontWeight="300"
      >
        Comment
      </Text>
      <Textarea
        // w="291px"
        py="6.41px"
        //
        id="message"
        value={message}
        w="full"
        h="105px"
        borderRadius="3.09px"
        fontSize={'14px'}
        resize="none"
        name="message"
        bg="#fff"
        mb="10px"
        border=" 1px solid "
        borderColor={`#e4e4e7 !important`}
        outline={`none`}
        _focus={{
          outline: `none`,
        }}
        _hover={{
          outline: `none`,
        }}
        _focusVisible={{
          outline: `none`,
        }}
        onChange={handleMessage}
      />

      <RButton
        variation={`primary`}
        width="100%"
        mt="20.04px"
        fontSize="12.826px"
        fontWeight="400"
        isDisabled={!isValid}
        onClick={handleSubmit}
        isLoading={feedbackMutation.isLoading}
      >
        Submit
      </RButton>
    </Stack>
  );
};

export const Ratings = ({rating, setRating, forHistory, starStyle, ...rest}) => {
  const handleStarSelection = idx => {
    if (idx === ~~rating) {
      return setRating(idx - 1);
    }
    return setRating(idx);
  };

  return (
    <HStack mb="20.72px" spacing="4px" {...rest}>
      {[1, 2, 3, 4, 5].map((item, idx) => {
        return (
          <HStack key={idx} h="31.8px" align="center" justify="center" w="31.88px" {...starStyle}>
            {item <= rating ? (
              <Image
                w="31.88px"
                h="31.8px"
                src={starIcon.src}
                onClick={() => (forHistory ? null : handleStarSelection(item))}
                alt="selected star icon"
                fontSize="3px"
                cursor={forHistory ? 'default' : 'pointer'}
                {...starStyle}
              />
            ) : (
              <Image
                w="31.88px"
                h="31.8px"
                src={EmptyStarIcon.src}
                cursor={forHistory ? 'default' : 'pointer'}
                onClick={() => (forHistory ? null : handleStarSelection(item))}
                alt="selected star icon"
                fontSize="3px"
                {...starStyle}
              />
            )}
          </HStack>
        );
      })}
    </HStack>
  );
};
