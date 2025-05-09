import React, {useState} from 'react';
import {
  HStack,
  VStack,
  Stack,
  Text,
  Avatar,
  Spinner as Loader,
  FormControl,
  Input,
  Button,
  useToast,
  Image,
} from '@chakra-ui/react';
import {demarcatedDateTime} from '@/realtors_portal/utils/formatDate';
import RatingIcon from './rating';
import {useFormik} from 'formik';
import {useMutation, useQueryClient} from 'react-query';
import send from '@/realtors_portal/images/icons/send.svg';
import {respondToInspectionFeedBack} from '@/realtors_portal/api/customers';
import {toastForError} from '@/realtors_portal/utils/toastForErrors';
import useGetSession from '@/utils/hooks/getSession';

const ReviewDetails = ({reviewData, setOpenDetails}) => {
  const [showInput, setShowInput] = useState(true);
  const toast = useToast();
  const queryClient = useQueryClient();

  const {sessionData: LoggedInAgent} = useGetSession('a_details');
  const {sessionData: agentToken} = useGetSession('a_token');

  const storeName = LoggedInAgent?.storeName;

  const formik = useFormik({
    initialValues: {
      text: '',
    },
    onSubmit: values => {
      mutation.mutate({response: values.text});
      setShowInput(false);
    },
  });
  const mutation = useMutation(
    formBody => respondToInspectionFeedBack(formBody, reviewData.id, agentToken),
    {
      onSuccess: () => {
        formik.resetForm();
        setOpenDetails(false);
        return queryClient.invalidateQueries('customer-profile-id');
      },
      onError: err => {
        onClose();
        formik.resetForm();
        toastForError(err, true, toast);
      },
    }
  );

  return (
    <VStack
      padding="1rem"
      borderRadius="12px"
      border="1px solid #E4E4E4"
      width="100%"
      alignItems="flex-start"
      my="0.8rem"
    >
      <HStack justifyContent="space-between" width="100%">
        <Text fontSize="16px" fontWeight="400">
          Rating & Feedback
        </Text>
        <Text fontSize="12px" fontWeight="400">
          {demarcatedDateTime(reviewData?.created_at)}
        </Text>
      </HStack>
      <Stack my="0.5rem">
        <HStack>
          {[...Array(5)].map((_, index) => (
            <RatingIcon key={index} fill={index < reviewData.star_rating ? '#FF9103' : '#CBCBCB'} />
          ))}
        </HStack>
      </Stack>
      <Stack background="#F5F5F5" borderRadius="12px" padding="12px 16px" width="100%">
        <Text fontSize="13px" fontWeight="500">
          Feedback
        </Text>
        <Text fontSize="12px" fontWeight="300">
          {reviewData?.feedback}
        </Text>
        {reviewData?.response === null && (
          <FormControl
            as="form"
            mt="15px"
            display="flex"
            onSubmit={formik.handleSubmit}
            gap="12px"
            align="center"
          >
            <Input
              required
              type="input"
              id="text_for_inspection_feedback"
              name="text"
              onChange={formik.handleChange}
              value={formik.values.text}
              noLabel
              notes
              placeholder="Type in your message"
              _placeholder={{
                color: 'gray.500',
              }}
            />
            <Button
              alignSelf="center"
              background="#4545FE"
              borderRadius="10px"
              _hover={{bg: '#4545FE'}}
              notes
              w="fit-content"
              p="0"
              m="0"
              type="submit"
              isDisabled={!formik.values.text}
              _disabled={{
                cursor: 'not-allowed',
                pointerEvents: 'all',
              }}
            >
              {mutation.isLoading ? (
                <Loader color="white" size="xs" />
              ) : (
                <Image borderRadius="full" alt="send image icon" src={send.src} />
              )}
            </Button>
          </FormControl>
        )}
      </Stack>
      {reviewData?.response !== null && (
        <Stack background="#F5F5F5" borderRadius="12px" padding="12px 16px" width="100%">
          <HStack justify="space-between" width="100%">
            <Text size="13.002px" fontWeight="500">
              Response
            </Text>
            <Text fontSize="12px" fontWeight="400">
              {demarcatedDateTime(reviewData?.response_time)}
            </Text>
          </HStack>
          <HStack>
            <Avatar size="md" src={reviewData?.respondent?.avatar} />
            <VStack align="start" gap="0">
              <Text fontSize="14px">{reviewData?.respondent.full_name}</Text>
            </VStack>
          </HStack>

          <Text size="12px">{reviewData.response}</Text>
        </Stack>
      )}
    </VStack>
  );
};

export default ReviewDetails;
