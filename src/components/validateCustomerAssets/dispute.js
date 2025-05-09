import React, {useState} from 'react';
import {Text, Box, Image, Center, Textarea, useToast, Stack} from '@chakra-ui/react';
import processingLoader from '../../images/processing-transaction.gif';
import successfulLoader from '../../images/successful-transaction.gif';
import {Button} from '../../ui-lib';
import {useMutation} from 'react-query';
import {PostForCustomerEquityValidationoOrDispute} from '../../api/listing';
import {toastForError} from '../../utils/toastForErrors';
import {useCustomToast} from '../CustomToast';

const Dispute = ({
  equityData,
  setType,
  customScrollbarStyles,
  refetch,
  validation_requestsId,
  drawer,
}) => {
  const [message, setMessage] = useState('');
  const toast = useCustomToast();

  const disputeEquity = useMutation(
    formData => PostForCustomerEquityValidationoOrDispute(formData),
    {
      onSuccess: async res => {
        toast({
          title: `Thank you for the feedback`,
          description: 'We’ll get back to you as soon as possible.',
          status: 'success',
          duration: 5000,
          isClosable: true,
          position: 'top-right',
        });
        drawer?.onClose();
        await refetch();
      },
      onError: err => {
        toastForError(err, true, toast);
      },
    }
  );

  const handleDispute = () => {
    if (!isValid)
      return toast({
        description: 'Enter your message',
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: 'top-right',
      });
    const obj = {
      action: 'reject',
      reason: message,
      validation_request_id: validation_requestsId,
    };
    return disputeEquity.mutate(obj);
  };

  const isValid = !!message.trim();

  const handleResetModal = () => {
    disputeEquity.reset();
    drawer?.onClose();
  };

  return (
    <Stack h={'100%'} minH={`400px`} overflowY="auto" __css={customScrollbarStyles}>
      <Text
        color="matador_text.500"
        fontSize={{base: '13px', md: '16px'}}
        fontWeight={500}
        mb="10px"
      >
        {/* Kindly let us know the error in the information provided{' '} */}
        Oh no. We are truly sorry your experience didn&apos;t meet expectations.
      </Text>

      <Textarea
        onChange={e => setMessage(e.target.value)}
        value={message}
        resize="none"
        placeholder="Tell us about the issue..."
        border="0.5px solid"
        borderColor={`matador_border_color.100 !important`}
        bg={`matador_background.200`}
        borderRadius={'8px'}
        color={`text`}
        w="full"
        h="150px"
        p={{base: `10px 14px`}}
      />

      <Button
        variation={`primary`}
        disabled={disputeEquity.isLoading}
        loading={disputeEquity.isLoading}
        onClick={handleDispute}
        // align="right"
        isLoading={disputeEquity.isLoading}
        fontSize={`16.567px`}
        fontWeight={`600`}
        lineHeight={`140%`}
        letterSpacing={`0.497px`}
        boxStyle={{width: `100%`, marginTop: `auto`}}
      >
        Submit
      </Button>
    </Stack>
  );
};

export default Dispute;
