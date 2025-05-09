import {Text, Button, useDisclosure} from '@chakra-ui/react';
import React from 'react';
import {Popup} from '@/realtors_portal/ui-lib';

export const ConvertToFractions = () => {
  const FRACTIONALIZE_UNIT_MODAL = useDisclosure();
  const handleFractionalization = () => {
    alert('Ready to fractionalize??');
    FRACTIONALIZE_UNIT_MODAL.onClose();
  };
  return (
    <div>
      {/* <Button onClick={FRACTIONALIZE_UNIT_MODAL.onOpen} w='158px' h='36px' variant='secondary' fontSize='14px'>
				Convert to fractions
			</Button> */}
      <Popup
        pt="45px"
        pb="15px"
        minH="392px"
        h="fit-content"
        isCentered
        minW="725px"
        isOpen={FRACTIONALIZE_UNIT_MODAL.isOpen}
        onClose={FRACTIONALIZE_UNIT_MODAL.onClose}
      >
        <Text textAlign="left" color="#191919" fontSize="24px" fontWeight={600}>
          Convert Unit to Fractions
        </Text>
        <Popup.Body>
          <Button onClick={handleFractionalization} variant="primary" mx="auto" w="321px" h="55px">
            Proceed
          </Button>
        </Popup.Body>
      </Popup>
    </div>
  );
};
export default ConvertToFractions;
