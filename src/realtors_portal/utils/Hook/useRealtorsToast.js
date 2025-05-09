import {useToast} from '@chakra-ui/react';
import {useRef} from 'react';
import {IoMdCheckmark, IoMdClose, IoMdInformation, IoMdWarning} from 'react-icons/io';

export function useRealtorToast(props) {
  const toast = useToast(props);
  const toast_ref = useRef();

  function close_toast() {
    if (toast_ref.current) {
      toast.close(toast_ref.current);
    }
  }

  const renderToast = (
    {title, description, status = `info`, fallBackDescription, ...content_options},
    error
  ) => {
    close_toast();
    const alert_states = {
      info: {
        color: ` #FFA500`,
        title: title || `Attention`,
        description: description || ``,
        icon: <IoMdInformation />,
      },
      warning: {
        color: ` #FFA500`,
        title: title || `Warning`,
        description: description || ``,
        icon: <IoMdWarning />,
      },
      error: {
        color: ` #F04438`,
        title: title || `Oops`,
        description: `${
          description
            ? description
            : error?.response?.status === 401
            ? 'Authentication Timeout: For security reasons, your session has timed out. Please log in again to continue.'
            : error?.response?.data?.message
            ? error?.response?.data?.message
            : error?.response?.message
            ? error?.response?.message
            : fallBackDescription
            ? fallBackDescription
            : error?.response?.status === 500
            ? "Apologies for the inconvenience. We're working on it. Please try again later."
            : ``
        }`,
        icon: <IoMdClose />,
      },
      success: {
        color: ` #48CA93`,
        title: title || `Successful`,
        description: description || ``,
        icon: <IoMdCheckmark />,
      },
      default: {
        color: ` #77d7f7`,
        title: title || `Note`,
        description: description || ``,
        icon: <IoMdWarning />,
      },
    };

    const state = alert_states?.[status] || alert_states?.default;

    toast_ref.current = toast({
      position: `top-right`,
      title: state?.title,
      description: state?.description,
      duration: 6000,
      status,
      isClosable: true,
      ...content_options,
    });
  };
  return renderToast;
}
