import React, {useEffect, useState} from 'react';
import {Morph} from '../../../../ui-lib/ui-lib.components/morph';
import {
  HStack,
  Text,
  Input,
  useDisclosure,
  useMediaQuery,
  useToast,
  Center,
  Image,
  Tooltip,
} from '@chakra-ui/react';
import infoICon from '/src/images/icons/infoIConforAllocation.svg';

import SelectAllocation from './screens/selectAllocation';
import ConfirmSelection from './screens/confirmSelection';
import {useMutation, useQuery} from 'react-query';
import {
  addAllocationToEquity,
  fetchUnitAllocationImages,
  fetchUnitAllocations,
} from '../../../../api/allocations';
import {CreateToast} from '../../../../ui-lib';
import {toastForError} from '../../../../utils/toastForErrors';
import {useCustomToast} from '@/components/CustomToast';

const Allocations = ({equity, refetch}) => {
  const toast = useCustomToast();

  const defaultScrn = 'select allocation';
  const [isBelowMd] = useMediaQuery('(max-width: 913px)');
  const [screen, setScreen] = useState(defaultScrn);
  const {isOpen, onClose, onOpen} = useDisclosure();
  const [allocationVal, setAllocationVal] = useState('');

  const [uploads, setUploads] = useState([]);

  const FETCH_UNIT_ALLOCATIONS = useQuery(
    ['fetchUnitAllocations'],
    () => fetchUnitAllocations(equity?.unit?.id),
    {
      enabled: !!equity?.unit?.id,
    }
  );

  const FETCH_UNIT_ALLOCATION_IMAGES = useQuery(
    ['fetchUnitAllocationImages'],
    () => fetchUnitAllocationImages(equity?.unit?.id),
    {
      enabled: !!equity?.unit?.id,
    }
  );
  toastForError(FETCH_UNIT_ALLOCATIONS?.error, FETCH_UNIT_ALLOCATIONS?.isError, toast);

  useEffect(() => {
    FETCH_UNIT_ALLOCATION_IMAGES?.data?.data?.length > 0
      ? setUploads(FETCH_UNIT_ALLOCATION_IMAGES?.data?.data)
      : null;
  }, [FETCH_UNIT_ALLOCATION_IMAGES.data]);

  const ALLOCATIONS = FETCH_UNIT_ALLOCATIONS?.data?.data?.data;

  const mutation = useMutation(formData => addAllocationToEquity(formData), {
    onSuccess: async res => {
      refetch();
      toast({
        description: `${allocationVal} has been allocated succesfully`,
        status: 'success',
        position: 'top-right',
        duration: 8000,
        isClosable: true,
      });
      onClose();
    },
    onError: err => {
      toastForError(err, true, toast);
    },
  });
  const handleSubmitAllocation = () => {
    mutation.mutate({equity_id: equity?.id, allocation: allocationVal});
  };
  const handleScreen = scrn => () => {
    return setScreen(scrn);
  };

  const handleClose = () => {
    setScreen(defaultScrn);
    return onClose();
  };

  // switch component depending on the screen size
  const Morphed = Morph[isBelowMd ? 'drawer' : 'modal'];

  const displayAllocationScreens = scrn => {
    switch (scrn) {
      case 'select allocation':
        return (
          <SelectAllocation
            ALLOCATIONS={ALLOCATIONS}
            FETCH_UNIT_ALLOCATION_IMAGES={FETCH_UNIT_ALLOCATION_IMAGES}
            FETCH_UNIT_ALLOCATIONS={FETCH_UNIT_ALLOCATIONS}
            setAllocationVal={setAllocationVal}
            allocationVal={allocationVal}
            uploads={uploads}
            handleClose={handleClose}
            handleScreen={handleScreen}
          />
        );
      case 'confirm selection':
        return (
          <ConfirmSelection
            allocationVal={allocationVal}
            handleSubmitAllocation={handleSubmitAllocation}
            mutation={mutation}
            handleScreen={handleScreen}
          />
        );
      default:
        return (
          <SelectAllocation
            ALLOCATIONS={ALLOCATIONS}
            FETCH_UNIT_ALLOCATIONS={FETCH_UNIT_ALLOCATIONS}
            FETCH_UNIT_ALLOCATION_IMAGES={FETCH_UNIT_ALLOCATION_IMAGES}
            setAllocationVal={setAllocationVal}
            allocationVal={allocationVal}
            uploads={uploads}
            handleClose={handleClose}
            handleScreen={handleScreen}
          />
        );
    }
  };

  return (
    <>
      {equity?.unit?.allocation_type === 'manual' && equity?.allocation ? (
        <Center
          fontSize={{base: '12px', md: '13.664px'}}
          lineHeight={{base: '14px', md: '17px'}}
          fontWeight="400"
          color="text"
        >
          {equity?.allocation}
        </Center>
      ) : equity?.unit?.allocation_type === 'auto' ? (
        equity?.allocation ? (
          <Center
            fontSize={{base: '12px', md: '13.664px'}}
            lineHeight={{base: '14px', md: '17px'}}
            fontWeight="400"
            color="text"
          >
            {equity?.allocation}
          </Center>
        ) : equity?.can_allocate == true ? (
          <HStack
            bg={ALLOCATIONS?.length ? 'matador_text.100' : 'matador_text.300'}
            align="center"
            justify="center"
            role="button"
            onClick={ALLOCATIONS?.length ? onOpen : null}
            p={{base: '8px 10px', md: '5.699px 15.197px'}}
            maxH={{base: '23px', md: '25.39px'}}
          >
            <Text
              color="matador_background.100"
              fontSize={{base: '10px', md: '11.297px'}}
              fontWeight="400"
            >
              Select allocation
            </Text>
          </HStack>
        ) : (
          <Center>
            {/* <Tooltip
              borderRadius="3px"
              fontSize="12px"
              hasArrow
              placement="auto"
              label={` Once subscribers have made a payment equivalent to ${equity?.unit?.allocation_milestone}%
             of the total milestone amount, they will become eligible for property allocation.`}
            > */}
            <HStack spacing="4px">
              <Image src={infoICon.src} alt="info icon" />
              <Text
                fontSize={{base: '12px', md: '13.664px'}}
                lineHeight={{base: '14px', md: '17px'}}
                fontWeight="600"
                color="text"
              >
                Eligible at {equity?.unit?.allocation_milestone ?? '-'}%
              </Text>
            </HStack>
            {/* </Tooltip> */}
          </Center>
        )
      ) : (
        <Text color="text" fontSize={{base: '10px', md: '11.297px'}} fontWeight="400">
          Not allocated yet
        </Text>
      )}
      <Morphed
        isOpen={isOpen}
        onClose={handleClose}
        placement={isBelowMd ? 'bottom' : ''}
        autofocus={false}
      >
        <Morphed.overlay />
        <Morphed.content
          mt={{md: '15vh'}}
          borderRadius="0px"
          p="0px"
          maxW="fit-content"
          //   minW={{base: 'fit-content', lg: 'fit-content'}}
        >
          {displayAllocationScreens(screen)}
        </Morphed.content>
      </Morphed>
    </>
  );
};

export default Allocations;
