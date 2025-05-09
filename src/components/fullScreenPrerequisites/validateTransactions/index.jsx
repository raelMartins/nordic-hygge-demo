import {useEffect, useState} from 'react';
import {ValidateSummary} from './summary';
import {ValidationPaymentBreakdown} from './breakdown';
import {DisputeValidation} from './dispute';
import {ConfirmPopup} from '../ConfirmPopup';
import {Center, useDisclosure, useToast} from '@chakra-ui/react';
import {PostForCustomerEquityValidationoOrDispute} from '@/api/listing';
import {useMutation} from 'react-query';
import ThreeDots from '@/components/loaders/ThreeDots';

export const ValidateTransactionsScreen = ({screen, asset, setScreen, handleProgress}) => {
  const validationRequestArray = asset?.validation_requests;
  const request_id = validationRequestArray?.[validationRequestArray?.length - 1]?.id;

  const validate_disclosure = useDisclosure();
  const [changingAsset, setChangingAsset] = useState(false);
  const toast = useToast();

  const handleAssetChange = () => {
    handleProgress();
    setChangingAsset(true);
  };

  const validateEquity = useMutation(
    formData => PostForCustomerEquityValidationoOrDispute(formData),
    {
      onSuccess: async res => {
        handleAssetChange();
        toast({
          title: `Validation Successful`,
          status: `success`,
          duration: 5000,
          isClosable: true,
          position: 'top-right',
        });
        validate_disclosure?.onClose();
      },
      onError: err => {
        toast({
          title: 'Validation Error',
          description: `There was an error validating this asset`,
          status: 'error',
          duration: 5000,
          isClosable: true,
          position: 'top-right',
        });
      },
    }
  );

  const validateAsset = () => {
    console.log({asset, request_id});
    const obj = {
      action: 'accept',
      validation_request_id: request_id,
    };
    return validateEquity.mutate(obj);
  };

  const current_screen = {
    summary: (
      <ValidateSummary
        asset={asset}
        changeScreen={setScreen}
        handleConfirm={validate_disclosure.onOpen}
      />
    ),
    breakdown: (
      <ValidationPaymentBreakdown
        asset={asset}
        changeScreen={setScreen}
        handleConfirm={validate_disclosure.onOpen}
      />
    ),
    dispute: (
      <DisputeValidation
        request_id={request_id}
        changeScreen={setScreen}
        handleProgress={handleAssetChange}
        handleConfirm={validate_disclosure.onOpen}
      />
    ),
  }[screen];

  useEffect(() => {
    if (asset) {
      setChangingAsset(false);
    }
  }, [asset]);
  return (
    <>
      {changingAsset ? (
        <Center minH={`100px`}>
          <ThreeDots boxSize={`20px`} />
        </Center>
      ) : (
        current_screen
      )}
      <ConfirmPopup
        disclosure={validate_disclosure}
        proceedAction={validateAsset}
        text={`
        By confirming, you acknowledge that the property details, 
        payment amount, and transaction date are accurate to the best of your knowledge. 
        Please double-check before proceeding.
        `}
        isLoading={validateEquity?.isLoading}
      />
    </>
  );
};
