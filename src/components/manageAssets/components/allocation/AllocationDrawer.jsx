import {
  addAllocationToEquity,
  fetchUnitAllocationImages,
  fetchUnitAllocations,
} from '@/api/allocations';
import {drawer_styles, drawer_title_styles} from '@/components/navbar/Navbar';
import {toastForError} from '@/utils/toastForErrors';
import {Box, Flex, HStack, Text, useToast} from '@chakra-ui/react';
import {useEffect, useState} from 'react';
import {useMutation, useQuery} from 'react-query';
import SelectAllocation from './screens/selectAllocation';
import ConfirmSelection from './screens/confirmSelection';
import {CloseIcon} from '@chakra-ui/icons';
import {scrollBarStyles} from '@/components/common/ScrollBarStyles';
import {ResponsivePopup, ResponsivePopupContent} from '@/ui-lib';
import {useCustomToast} from '@/components/CustomToast';

export const AllocationDrawer = ({equity, refetch, modal}) => {
  const toast = useCustomToast();

  const defaultScrn = 'select';
  const [screen, setScreen] = useState(defaultScrn);
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
      modal?.onClose();
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
    return modal?.onClose();
  };

  const drawer_content = {
    select: (
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
    ),
    confirm: (
      <ConfirmSelection
        allocationVal={allocationVal}
        handleSubmitAllocation={handleSubmitAllocation}
        mutation={mutation}
        handleScreen={handleScreen}
      />
    ),
  }[screen];
  return (
    <ResponsivePopup
      autoFocus={false}
      isCentered
      onCloseComplete={handleClose}
      blockScrollOnMount={true}
      onClose={handleClose}
      isOpen={modal?.isOpen}
      placement={'right'}
    >
      <ResponsivePopupContent {...drawer_styles}>
        <Flex {...drawer_title_styles}>
          <Text>Unit Allocation</Text>
          <HStack gap="5px">
            <CloseIcon
              color="text"
              cursor="pointer"
              fontSize="17px"
              onClick={modal?.onClose}
              mt={2}
            />
          </HStack>
        </Flex>
        <Box overflowY="auto" css={scrollBarStyles} p={`24px`}>
          {drawer_content || (
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
          )}
        </Box>
      </ResponsivePopupContent>
    </ResponsivePopup>
  );
};
