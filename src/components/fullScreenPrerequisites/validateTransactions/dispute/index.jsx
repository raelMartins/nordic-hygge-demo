import React, {useState} from 'react';
import {useToast} from '@chakra-ui/react';
import {useMutation} from 'react-query';
import {PostForCustomerEquityValidationoOrDispute} from '@/api/listing';
import {DisputeValidationView} from './view';

export const DisputeValidation = ({request_id, changeScreen, handleProgress}) => {
  const [message, setMessage] = useState('');
  const toast = useToast();

  const disputeEquity = useMutation(
    formData => PostForCustomerEquityValidationoOrDispute(formData),
    {
      onSuccess: res => {
        handleProgress();
        toast({
          title: `Thank you for the feedback`,
          description: 'We’ll get back to you as soon as possible.',
          status: `success`,
          duration: 5000,
          isClosable: true,
          position: 'top-right',
        });
      },
      onError: err => {
        toast({
          title: `Dispute Error`,
          description: 'There seems to be an error registering your dispute. Please try again',
          status: 'error',
          duration: 5000,
          isClosable: true,
          position: 'top-right',
        });
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
      validation_request_id: request_id,
    };
    return disputeEquity.mutate(obj);
  };

  const isValid = !!message.trim();

  return (
    <DisputeValidationView
      handleDispute={handleDispute}
      setMessage={setMessage}
      message={message}
      changeScreen={changeScreen}
      isLoading={disputeEquity?.isLoading}
    />
  );
};
