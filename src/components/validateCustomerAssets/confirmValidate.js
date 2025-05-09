import {Box, Flex, Text, Center, Image, HStack, useToast, useTheme} from '@chakra-ui/react';
import {Button} from '@/ui-lib';

import {useMutation} from 'react-query';
import {PostForCustomerEquityValidationoOrDispute} from '@/api/listing';
import {toastForError} from '@/utils/toastForErrors';
import {useCustomToast} from '../CustomToast';

const QuestionMarkIcon = ({boxSize = `24px`}) => {
  const theme = useTheme();
  const color = theme?.colors?.matador_form.label;
  return (
    <Box boxSize={boxSize}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="100%"
        height="100%"
        viewBox="0 0 24 24"
        fill="none"
      >
        <path
          d="M17 18.4297H13L8.54999 21.3897C7.88999 21.8297 7 21.3598 7 20.5598V18.4297C4 18.4297 2 16.4297 2 13.4297V7.42969C2 4.42969 4 2.42969 7 2.42969H17C20 2.42969 22 4.42969 22 7.42969V13.4297C22 16.4297 20 18.4297 17 18.4297Z"
          stroke={color}
          strokeWidth="1.5"
          stroke-miterlimit="10"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M11.9998 11.3604V11.1504C11.9998 10.4704 12.4198 10.1104 12.8398 9.82037C13.2498 9.54037 13.6598 9.18039 13.6598 8.52039C13.6598 7.60039 12.9198 6.86035 11.9998 6.86035C11.0798 6.86035 10.3398 7.60039 10.3398 8.52039"
          stroke={color}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M11.9955 13.75H12.0045"
          stroke={color}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </Box>
  );
};

const ConfirmValidate = ({
  validation_requestsId,
  refetch,
  setType,
  drawer,
  customScrollbarStyles,
}) => {
  const toast = useCustomToast();
  const validateEquity = useMutation(
    formData => PostForCustomerEquityValidationoOrDispute(formData),
    {
      onSuccess: async res => {
        toast({
          // title: `Thank you for the feedback`,
          description: 'Thanks for your feedback!',
          status: 'success',
          duration: 5000,
          isClosable: true,
          position: 'top-right',
        });
        drawer?.onClose();
        setType('list');
        await refetch();
      },
      onError: err => {
        toastForError(err, true, toast);
      },
    }
  );

  const handleValidation = () => {
    const obj = {
      action: 'accept',
      validation_request_id: validation_requestsId,
    };

    return validateEquity.mutate(obj);
  };

  return (
    <Center
      minH={{base: `300px`, lg: `500px`}}
      h={'100%'}
      overflowY="auto"
      __css={customScrollbarStyles}
    >
      <Flex p="12px" w="full" direction="column" justify={'center'} align={'center'} gap="12px">
        <Center
          boxSize={`40px`}
          minW={`40px`}
          borderRadius={`50%`}
          overflow={`hidden`}
          position="relative"
        >
          <Box
            position="absolute"
            bg={`matador_text.100`}
            opacity={`.04`}
            top={`0`}
            left={`0`}
            bottom={`0`}
            right={`0`}
          />
          <QuestionMarkIcon />
        </Center>
        <Text color="text" fontWeight={`400`} fontSize="19px" lineHeight={`130%`}>
          Are you sure?
        </Text>
        <Text
          color={{base: `matador_form.label`}}
          fontSize={{base: `13px`}}
          fontWeight={{base: `400`}}
          lineHeight={{base: `150%`}}
          letterSpacing={{base: `0.26px`}}
          textAlign={`center`}
        >
          Please confirm all details are accurate. If you see any errors, please initiate a dispute.
          Otherwise, proceed with validation.
        </Text>

        <Flex mt="10px" gap="8px" align="stretch" mx={'auto'} w="full">
          <Box flex={`1`}>
            <Button
              variation={`secondary`}
              onClick={() => setType('summary')}
              p={`9px`}
              fontSize={`16px`}
              h={`100%`}
              letterSpacing={`.32px`}
            >
              No, Go Back
            </Button>
          </Box>
          <Button
            variation={`primary`}
            onClick={handleValidation}
            isLoading={validateEquity.isLoading}
            p={`9px`}
            fontSize={`16px`}
            boxStyle={{flex: `1`, padding: `2px`}}
            letterSpacing={`.32px`}
          >
            Yes, Validate
          </Button>
        </Flex>
      </Flex>
    </Center>
  );
};

export default ConfirmValidate;
