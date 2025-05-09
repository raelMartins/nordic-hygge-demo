import {Button} from '@/ui-lib';
import {Box, Center, Heading, HStack, Stack, Text, useToast} from '@chakra-ui/react';
import {useRef} from 'react';
import {IoMdCheckmark, IoMdClose, IoMdInformation, IoMdWarning} from 'react-icons/io';

export function useCustomToast(props) {
  const toast = useToast(props);
  const toast_ref = useRef();

  function close_toast() {
    if (toast_ref.current) {
      toast.close(toast_ref.current);
    }
  }

  const renderToast = ({
    title,
    description,
    status = `info`,
    retryFunction = () => {},
    showRetryButton = false,
    retryText = `Try again`,
    ...content_options
  }) => {
    const alert_states = {
      info: {color: ` #FFA500`, title: title || `Attention`, icon: <IoMdInformation />},
      warning: {color: ` #FFA500`, title: title || `Warning`, icon: <IoMdWarning />},
      error: {color: ` #F04438`, title: title || `Error Occured`, icon: <IoMdClose />},
      success: {color: ` #48CA93`, title: title || `Successful`, icon: <IoMdCheckmark />},
      default: {color: `#77d7f7`, title: title || `Note`, icon: <IoMdWarning />},
    };

    const state = alert_states?.[status] || alert_states?.default;
    close_toast();
    toast_ref.current = toast({
      position: `top-right`,
      isClosable: showRetryButton ? true : content_options?.isClosable,
      render: () => (
        <Box bg={`#fff`} borderRadius={`6px`} border={`1px solid`} borderColor={state?.color}>
          <HStack p={`20px`} gap={`16px`} align={`flex-start`} bg={`${state?.color}1A`}>
            <Center
              boxSize={`24px`}
              minW={`24px`}
              borderRadius={`6px`}
              bg={state?.color}
              color={`#fff`}
              fontSize={`16px`}
            >
              {state?.icon}
            </Center>
            <Stack gap={`4px`} flex={`1`}>
              <Heading color={`#27303A`} fontSize={`14px`} fontWeight={`600`} lineHeight={`140%`}>
                {state?.title}
              </Heading>
              {description && (
                <Text color={`#2F3F53`} fontSize={`12px`} fontWeight={`400`} lineHeight={`160%`}>
                  {description}
                </Text>
              )}
            </Stack>
            <Stack align={`flex-end`} gap={`12px`}>
              {content_options?.isClosable && (
                <Center
                  onClick={close_toast}
                  cursor={`pointer`}
                  fontSize={`12px`}
                  boxSize={`14px`}
                  minW={`14px`}
                  borderRadius={`2px`}
                  color={`#979FA9`}
                  _hover={{bg: `${state?.color}1A`}}
                >
                  <IoMdClose />
                </Center>
              )}
              {showRetryButton && (
                <Button
                  color={`#FFF`}
                  fontSize={`12px`}
                  fontWeight={`400`}
                  lineHeight={`100%`}
                  bg={state?.color}
                  onClick={() => {
                    close_toast();
                    retryFunction();
                  }}
                  p={`10px 12px`}
                  borderRadius={`6px`}
                  h={`max-content`}
                >
                  {retryText}
                </Button>
              )}
            </Stack>
          </HStack>
        </Box>
      ),
      ...content_options,
    });
  };
  return renderToast;
}
