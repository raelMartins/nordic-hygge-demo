export const toastForError = (error, isError, toast) => {
  if (isError) {
    toast({
      title: 'Oops ...',
      description: `${error?.response?.status === 500
          ? "Apologies for the inconvenience. We're working on it. Please try again later."
          : error?.response?.status === 401
            ? 'Authentication Timeout: For security reasons, your session has timed out. Please log in again to continue.'
            : error?.response?.data?.message ??
            error?.response?.message ??
            error?.message ??
            'Something went wrong'
        }`,
      status: 'error',
      duration: 5000,
      isClosable: true,
      position: 'top-right',
    });
  }
};
