import React, {useEffect, useState} from 'react';
import {Stack, Flex, Center} from '@chakra-ui/react';

import AllocationGallery from '../components/allocationGallery';

import SelectUnit from '../components/selectUnit';
import {Button, Spinner} from '@/ui-lib';
import ErrorState from '@/components/appState/error-state';

const SelectAllocation = ({
  handleScreen,
  uploads,
  ALLOCATIONS,
  setAllocationVal,
  allocationVal,
  FETCH_UNIT_ALLOCATIONS,
  FETCH_UNIT_ALLOCATION_IMAGES,
}) => {
  return FETCH_UNIT_ALLOCATIONS.isLoading || FETCH_UNIT_ALLOCATION_IMAGES.isLoading ? (
    <Center flex={`1`}>
      <Spinner />
    </Center>
  ) : FETCH_UNIT_ALLOCATIONS?.isError ? (
    <Center flex={`1`}>
      <ErrorState text={`Oops something went wrong fetching allocations,please try again later.`} />
    </Center>
  ) : (
    <>
      <Stack w="full" gap="18px">
        <AllocationGallery uploads={uploads} />
        <SelectUnit
          ALLOCATIONS={ALLOCATIONS}
          setAllocationVal={setAllocationVal}
          allocationVal={allocationVal}
        />
        <Flex>
          <Button
            variation={`primary`}
            p={{base: '9px '}}
            isDisabled={!allocationVal}
            onClick={handleScreen('confirm')}
            boxStyle={{width: '100%'}}
          >
            Proceed
          </Button>
        </Flex>
      </Stack>
    </>
  );
};

export default SelectAllocation;
