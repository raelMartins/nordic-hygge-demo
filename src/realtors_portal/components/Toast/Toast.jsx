import {useToast} from '@chakra-ui/react';
import React, {useEffect} from 'react';

export const CustomToast = (title, description, status, position, duration) => {
  const toast = useToast();
  // const {duration, title, description, status, position} = props;
  // useEffect(() => {
  return toast({
    title: title ?? 'Hi there!',
    description: description ?? '',
    status: status ?? 'warning',
    duration: duration ?? 8000,
    isClosable: true,
    position: position ?? 'top-right',
  });
  // }, []);
};
export default CustomToast;
