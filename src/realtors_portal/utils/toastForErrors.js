import {useToast} from '@chakra-ui/react';

export const toastForError = (error, isError, toast) => {
  if (isError) {
    toast({
      title: 'Oops ...  ',
      description: `${
        error?.response?.status === 500
          ? "Apologies for the inconvenience. We're working on it. Please try again later."
          : error?.response?.status === 401
          ? 'Authentication Timeout: For security reasons, your session has timed out. Please log in again to continue.'
          : error?.response?.data?.message ?? error?.response?.message ?? 'Something went wrong'
      }`,
      status: 'error',
      duration: 8000,
      isClosable: true,
      position: 'top-right',
    });
  }
};

export const useErrorHandler = () => {
  const toast = useToast();
  const errorToast = (
    errorOptions = {title: 'Oops ...', defaultDescription: `Something went wrong`, duration: 6000},
    error
  ) => {
    return toast({
      title: errorOptions?.title,
      description: `${
        error?.response?.status === 401
          ? 'Authentication Timeout: For security reasons, your session has timed out. Please log in again to continue.'
          : error?.response?.data?.message
          ? error?.response?.data?.message
          : error?.response?.message
          ? error?.response?.message
          : error?.response?.status === 500
          ? "Apologies for the inconvenience. We're working on it. Please try again later."
          : errorOptions?.defaultDescription
      }`,
      status: 'error',
      isClosable: true,
      position: 'top-right',
      ...errorOptions,
    });
  };
  return {errorToast};
};
